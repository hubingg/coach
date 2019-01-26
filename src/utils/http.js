import axios from 'axios'
import helper from './helper'
import { MessageBox, Indicator } from 'mint-ui'
import config from '@/utils/config'
const service = axios.create({
  timeout: 20000
})


function login () {
  // const appId = 'wxb9f58c55902b2ecf'
  const appId = config.appId
  const code = helper.getUrlParam('code')
  // const code = '021J6epM0JhLo42r8SoM0dSbpM0J6epb'
  const local = window.location.href
  // const local = 'instructor.kukusport.com'
  // console.log(local)
  if(code== null || code == '' ) {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
  }else {
    // 看下code拼接在哪
    helper.getHttp(`https://mp.kukusport.com/wechat/coach/code/retrive?code=${code}&state=STATE`, function(res) {
      let data = eval("("+res+")")
      localStorage.setItem('coachToken', data.data)
    })
  }
} 
// login()

service.interceptors.request.use((config) => {
  const coachToken = localStorage.getItem('coachToken') || helper.getCookie('coachToken')
  config.headers.Accept = 'application/json'
  if (!coachToken) {
    login()
    return
  }
  // console.log(1111)
  // if (config.url.indexOf('api/check')>0) {
  //   return config
  // }
  // config.headers.coachToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWUiOjE1NDI5MDA0MTEwMTksInVzZXJpZCI6IjUwNjIxODA2NDI3Nzg0ODA2NCIsIm9wZW5pZCI6Im9tOUEzMHYtc3o2MllRb1Y2NUlNYUFnanctNTAifQ.B9UDKNrJ5fIP45GGOFCa40LyNuqGN--xSgBhWxfSRb8; JSESSIONID=EB0F299AC7A701BD7918105323A0B0FF'
  // config.headers.coachToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvbTlBMzBtUjZ2UkNvbWpUQXlVSUlYRmNWZzk4IiwibG9naW5UaW1lIjoxNTQzMjQ0MTgyMDYwfQ.G8v0hApdW31yUmC_W7o3PO1YU5QgrfXmMlBGQzB07V0'
  config.headers.coachToken = coachToken
  return config
})



// respone interceptor
// service.interceptors.response.use((response) => {
//   console.log(response)
//   // if (status === 200) {
//   //   return Promise.resolve(response)
//   // } else {
//   //   return Promise.reject(response)
//   // }
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
