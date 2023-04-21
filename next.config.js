module.exports = {

    async rewrites() { 
      return [ 
       //接口申请 前缀带上/api-text/
        { source: '/styled-text', destination: `https://foolcopywriter.top/styled-text` }, 
        { source: '/qa', destination: `https://foolcopywriter.top/qa` }, 
  
      ]
    },
    }