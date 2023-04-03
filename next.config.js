module.exports = {

    async rewrites() { 
      return [ 
       //接口申请 前缀带上/api-text/
        { source: '/styled-text', destination: `https://fastapi-production-806b.up.railway.app/styled-text` }, 
        { source: '/qa', destination: `https://fastapi-production-806b.up.railway.app/qa` }, 
  
      ]
    },
    }