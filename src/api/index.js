// baseUrl,config in config/index.js
import $http from '@/utils/http'
const nodeApi = process.NODE_API || 'dev'
const openid = 'olJv21ZoQfLBSMYhQ7hv0u0IFYYw'
const url = {
  baseUrl: 'http://mp-test.kukusport.com'
}
class Api {
  constructor () {
    this.baseUrl = url.baseUrl
    this.openid = openid
  }
  getCode (phoneNumber) {
    return $http.get(`${this.baseUrl}/api/customer/bind/${phoneNumber}`, '', {msg: '获取验证码失败！请重试或联系客服！'})
  }
  // 验证手机号
  checkPhone (phoneNumber) {
    return $http.get(`${this.baseUrl}/api/customer/bind/${phoneNumber}`, '', {msg: '发送手机验证码失败！请重试或联系客服！'})
  }
  // 登录
  login (data) {
    return $http.get(`${this.baseUrl}/api/coach/login/${data.phone}/${data.code}/${data.orgId}`, '', {msg: '登录失败，请联系客服！'})
  }
}
const api = new Api()
export default api
