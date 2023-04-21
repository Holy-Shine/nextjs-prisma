import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import axios from 'axios';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import CreateIcon from '@mui/icons-material/Create';
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        web3创业群. Powered by BO/GU/LC/GG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function SignIn() {
  const [raw_text, setRawText]       = useState("")
  const [other_plat, setOtherPlat]   = useState("")
  const [user_style, setUserStyle]   = useState("")
  const [styled_text, setStyledText] = useState("")
  const [key, setKey]                = useState("")
  const [plat, setPlat]              = useState("PLAT_REDBOOK")
  const [loading, setLoading]        = useState(false)
  const [load_text, setLoadText]      = useState("开始润色")
  const [alert_open, setAlertOpen]   = useState(false)
  const [alert_msg, setAlertMsg]     = useState("")
  const [tab_idx, setTabIdx]         = useState(0)

  // 聊天变量
  const [queryText, setQueryText]    = useState("")
  const [ansText, setAnsText]        = useState("")



  const handleStyledText = async () => {
    if(plat==='PLAT_OTHER' && other_plat.length==0){
      setAlertMsg("请输入平台名!!!")
      setAlertOpen(true)
      return      
    }
    if(raw_text.length==0){
      setAlertMsg("请先输入要润色的文本!!!")
      setAlertOpen(true)
      return 
    }
    setLoadText('正在润色, 请稍后')
    setLoading(true)

    const response = await axios.post("/styled-text", {
        text: raw_text,
        platform: plat,
        n_token: 100,
        key: key,
        style: user_style
      }
    );
    const stream = response.data;

    stream.on('data', data => {
        console.log(data);
    });
    
    stream.on('end', () => {
        console.log("stream done");
    });
    // .then(res=>{
    //   setLoading(false)
    //   console.log(res)
    //   if(res.data.success===false){
    //     setAlertMsg(res.data.msg)
    //     setAlertOpen(true)
    //   }
    //   else{
    //     setStyledText(res.data.msg)
    //   }
    // }).catch(error=>{
    //     console.log(error)
    // })

  }

  const handleLoading = () => {
    setLoading(false)
  }

  const handlePlatChange = (event) => {
      setPlat(event.target.value)
      console.log(plat)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const handleTabChange = (event, newTabIdx) => {
    setTabIdx(newTabIdx)
  }

  const handleQA = () => {
    if(queryText.length==0){
      setAlertMsg("请先输入问题!!!")
      setAlertOpen(true)
      return 
    }
    setLoadText('正在获取答案, 请稍后')
    setLoading(true)
    axios.post("/qa", {
        text: queryText,
        n_token: 100,
        key: key
      }
    ).then(res=>{
      setLoading(false)
      console.log(res)
      if(res.data.success===false){
        setAlertMsg(res.data.msg)
        setAlertOpen(true)
      }
      else{
        setAnsText(res.data.msg)
      }
    }).catch(error=>{
        console.log(error)
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Snackbar open={alert_open} autoHideDuration={5000} onClose={handleAlertClose} anchorOrigin={{vertical:'top', horizontal:'center'}}>
          <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            {alert_msg}
          </Alert>
        </Snackbar>
        {/* <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleLoading}
        >
          <CircularProgress color="inherit" />
          <Typography>{loadText}</Typography>
        </Backdrop> */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Style-GPT
          </Typography> 
          <Tabs value={tab_idx} onChange={handleTabChange} variant='fullWidth'>
            <Tab label="润色" />
            <Tab label="聊天" />
          </Tabs>
          {tab_idx===0 && (
            <Box component="form" noValidate sx={{ mt: 1 }}>

              {/* OpenAI Key */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                id="input-with-icon-textfield"
                label="key"
                fullWidth
                value={key}
                onChange={(event)=>{setKey(event.target.value)}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              </Box>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">渲染风格</FormLabel> */}
                <RadioGroup aria-label="platform" name="gender1" row value={plat} onChange={handlePlatChange}>
                  <FormControlLabel value="PLAT_REDBOOK" control={<Radio />} label="小红书" />
                  <FormControlLabel value="PLAT_WECHAT" control={<Radio />} label="微信" />
                  <FormControlLabel value="PLAT_WEIBO" control={<Radio />} label="微博" />
                  <FormControlLabel value="PLAT_OTHER" control={<Radio />} label="其他平台" />
                </RadioGroup>
              </FormControl>
              {plat==="PLAT_OTHER" && (
                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  maxRows={10}
                  name="other_plat"
                  placeholder="请输入其他平台名称(必填)"
                  multiline
                  id="other_plat"
                  value={other_plat}
                  onChange={(event)=>{setStyledText("");setOtherPlat(event.target.value)}}
                />          
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                maxRows={10}
                name="style"
                placeholder="请输入该平台润色风格(可以为空)"
                multiline
                id="style"
                value={user_style}
                onChange={(event)=>{setStyledText("");setUserStyle(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                maxRows={10}
                name="raw_text"
                placeholder="请输入要润色的文本"
                multiline
                id="raw_text"
                value={raw_text}
                onChange={(event)=>{setStyledText("");setRawText(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                maxRows={10}
                name="styled_text"
                placeholder="润色结果"
                disabled
                multiline
                id="raw_text"
                value={styled_text}
              />
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleStyledText}
                loading={loading}
                loadingPosition="end"
                endIcon={<CreateIcon />}
              >
                {load_text}
              </LoadingButton>
            </Box>
          )}
          {tab_idx===1 && (
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {/* OpenAI Key */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                id="input-with-icon-textfield"
                label="key"
                fullWidth
                value={key}
                onChange={(event)=>{setKey(event.target.value)}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                maxRows={10}
                name="query_text"
                placeholder="请输入聊天文本"
                multiline
                id="query_text"
                value={queryText}
                onChange={(event)=>{setAnsText("");setQueryText(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                maxRows={10}
                name="ans_text"
                placeholder="GPT的回答"
                disabled
                multiline
                id="ans_text"
                value={ansText}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleQA}
              >
                获取GPT的回答
              </Button>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}