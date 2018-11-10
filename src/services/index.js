import CommonService from './common'

export default {
  install (Vue) {
    let commonService = new CommonService()
    Vue.prototype.$commonService = commonService
  }
}
