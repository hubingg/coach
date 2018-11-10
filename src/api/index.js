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
  // 获取俱乐部信息
  getOrgInfo () {
    let orgId = window.localStorage.getItem("orgid")
    return $http.get(`${this.baseUrl}/api/club/brief/${orgId}`, '', {msg: '获取俱乐部信息失败！'})
  }
  // 添加联系人
  // addRelation (data) {
  //   return $http.post(`${this.baseUrl}/api/user/relation/add`, data, {msg: '添加失败！'})
  // }
  addRelation (data) {
    return $http.post(`${this.baseUrl}/api/user/relation/add`, data, {msg: '添加失败！'})
  }
  // 编辑联系人
  editRelation (data) {
    return $http.post(`${this.baseUrl}/api/user/relation/update`, data, {msg: '添加失败！'})
  }
  // 删除联系人
  delRelation ({id}) {
    return $http.get(`${this.baseUrl}/api/user/relation/delete/${id}`, '', {msg: '删除失败！'})
  }
  // 获取用户信息
  // getUserInfo ({token}) {
  //   return $http.get(`${this.baseUrl}/api/user/info/${token}`, '', {msg: '获取用户信息失败！'})
  // }
  getUserInfo () {
    return $http.get(`${this.baseUrl}/api/user/info`, '', {msg: '获取个人信息失败'})
  }
  // 编辑用户信息
  // editUserInfo (data) {
  //   return $http.post(`${this.baseUrl}/api/user/info/modify`, data, {msg: '编辑用户信息失败！'})
  // }
  editUserInfo (data) {
    return $http.post(`${this.baseUrl}/api/user/info/modify`, data, {msg: '编辑用户信息失败！'})
  }
  // 登录校验
  login ({phoneNumber}) {
    return $http.get(`${this.baseUrl}/api/customer/login/${phoneNumber}`, '', {msg: '编辑用户信息失败！'})
  }
  // 获取课程列表
  getCourseList ({crowd, type, orgId}) {
    return $http.get(`${this.baseUrl}/api/course/list/${crowd}/${type}/${orgId}`)
  }
  // 课程详情
  getCourseDetail ({crowd, type, orgId, coachId}) {
    return $http.get(`${this.baseUrl}/api/course/schedule/${crowd}/${type}/${orgId}/${coachId}`, '', {msg: '获取课程详情失败！'})
  }
  getRelationsList () {
    return $http.get(`${this.baseUrl}/api/member/relations`, '', {msg: '获取联系人列表失败！'})
  }
  // 验证手机号
  checkPhone (phoneNumber) {
    return $http.get(`${this.baseUrl}/api/customer/bind/${phoneNumber}`, '', {msg: '发送手机验证码失败！请重试或联系客服！'})
  }
  // 登录
  login (data) {
    return $http.get(`${this.baseUrl}/api/customer/bind/${data.phone}/${data.code}`, '', {msg: '登录失败，请联系客服！'})
  }
  // 支付订单
  pay (data) {
    return $http.post(`${this.baseUrl}/api/pay/pre/pay/${data.courseId}/${data.presaleId}/${data.coachId}/${data.orgId}`,data)
  }
  // 已购课程
  getOrderCourse (data) {
    return $http.get(`${this.baseUrl}/api/orderCourse/orderCourseInfo/${data.userId}/${data.courseType}/${data.orgId}`, '', {msg: '获取课程信息失败！'})
  }
  // 已购课程列表
  getOrderCourseList (data) {
    return $http.post(`${this.baseUrl}/api/orderCourse/orderCourseList`, data)
  }
  // 已购课程详情
  getOrderCourseDetail (data) {
    return $http.post(`${this.baseUrl}/api/orderCourse/orderCourseInfo/${data.orderNo}/${data.userId}/${data.orgId}`, data)
  }
  // 获取订单列表
  getOrderList (data) {
    return $http.post(`${this.baseUrl}/api/order/list`, data, {msg: '获取订单列表失败！'})
  }
  // 获取订单信息
  getOrderDetail (data) {
    return $http.get(`${this.baseUrl}/api/order/info/${data.orderno}/${data.orgId}`, '', {msg: '获取订单信息失败！'})
  }
  // 取消订单
  cancelOrder (data) {
    return $http.get(`${this.baseUrl}/api/order/cancel/${data.orderNo}/${data.orgId}`, '')
  }
}
const api = new Api()
export default api
