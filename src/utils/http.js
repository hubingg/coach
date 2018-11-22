import axios from 'axios'
import helper from './helper'
import { MessageBox, Indicator } from 'mint-ui'

const service = axios.create({
  timeout: 20000
})


function login () {
  const appId = 'wxb9f58c55902b2ecf'
  const code = helper.getUrlParam('code')
  // const code = '021J6epM0JhLo42r8SoM0dSbpM0J6epb'
  const local = window.location.href
  // const local = 'mp-test.kukusport.com'
  console.log(local)
  if(code== null || code == '' ) {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
  }else {
    // 看下code拼接在哪
    helper.getHttp(`http://mp-test.kukusport.com/wechat/coach/code/retrive?code=${code}&state=STATE`, function(res) {
      let data = eval("("+res+")")
      localStorage.setItem('usertoken', data.data)
    })
  }
} 
// login()

service.interceptors.request.use((config) => {
  // const usertoken = localStorage.getItem('usertoken') || helper.getCookie('usertoken')
  config.headers.Accept = 'application/json'
  // if (!usertoken) {
  //   login()
  //   return
  // }
  // console.log(1111)
  // if (config.url.indexOf('api/check')>0) {
  //   return config
  // }
  config.headers.usertoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWUiOjE1NDI5MDA0MTEwMTksInVzZXJpZCI6IjUwNjIxODA2NDI3Nzg0ODA2NCIsIm9wZW5pZCI6Im9tOUEzMHYtc3o2MllRb1Y2NUlNYUFnanctNTAifQ.B9UDKNrJ5fIP45GGOFCa40LyNuqGN--xSgBhWxfSRb8; JSESSIONID=EB0F299AC7A701BD7918105323A0B0FF'
  // config.headers.usertoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWUiOjE1NDAxMjkxMjkxMTAsInVzZXJpZCI6IjUwMTg1NTQxNjE4Njc0ODkyOCIsIm9wZW5pZCI6Im9tOUEzMG1SNnZSQ29talRBeVVJSVhGY1ZnOTgifQ.iymymlB6AMdXTv45Gu3aIYPZzRPnb1A0YJxT1qd_T-g'
  // config.headers.usertoken = usertoken
  return config
})



// respone interceptor
// service.interceptors.response.use((response) => {
//   console.log(response.data)
//   if (status === 200) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(response)
//   }
// })

function getToken() {
  requestHandle({
    url: 'api/check',
    method: 'post'
  }).then((res) => {
    console.log(res)
  })
}
function requestHandle (params, {msg} = {}) {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return new Promise((resolve, reject) => {
    service(params).then(res => {
      Indicator.close()
      if (msg && res.data.code !== 0) {
        MessageBox.alert(msg)
        return
      }
      resolve(res.data)
      resolve(res)
    }).catch((err) => {
      Indicator.close()
      MessageBox('提示', '网络连接失败')
      reject(err)
    })
  })
}
let storage = window.localStorage
storage.setItem("c",3)

export default {
  post (url, params, options) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params
    }, options)
  },
  get (url, params, options) {
    return requestHandle({
      method: 'get',
      url: url, 
    }, options)
  }
}
