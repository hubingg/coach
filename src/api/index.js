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
  getClub (data) {
    return $http.get(`${this.baseUrl}/coach/coachInfo/brief/${data.id}`, '', {msg: '获取俱乐部信息失败！'})
  }
  getCode (phoneNumber) {
    return $http.get(`${this.baseUrl}/coach/bind/${phoneNumber}`, '', {msg: '获取验证码失败！请重试或联系客服！'})
  }
  // 验证手机号
  checkPhone (phoneNumber) {
    return $http.get(`${this.baseUrl}/coach/bind/${phoneNumber}`, '', {msg: '发送手机验证码失败！请重试或联系客服！'})
  }
  // 登录
  login (data) {
    return $http.get(`${this.baseUrl}/coach/coachLogin/${data.phone}/${data.code}/${data.orgId}`, '', {msg: '登录失败，请联系客服！'})
  }
  getWxConfig (data) {
    return $http.get(`${this.baseUrl}/coach/coachInfo/scanInfo?url=${data.url}`, data, {msg: '请求失败！'})
  }
  getCoachHours (data) {
    return $http.get(`${this.baseUrl}/coach/coachInfo/hours/${data.instructorId}/${data.orgId}`, '', {msg: '请求失败！'})
  }
  checkCourse (data) {
    return $http.post(`${this.baseUrl}/coach/coachInfo/courseCheck`, data, {msg: '核销课程失败！'})
  }
  getPresale (data) {
    return $http.get(`${this.baseUrl}/coach/coachInfo/scanCourse?courseCode=${data.courseCode}&orgId=${data.orgId}`, '', {msg: '获取排期信息失败！'})
  }
}
const api = new Api()
export default api
