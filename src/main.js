// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mintUi from 'mint-ui'
import Api from '@/api'
import Services from '@/services'
import 'mint-ui/lib/style.css'
import '@/assets/package/ydui.flexible.js'
import '@/assets/package/fastclick.js'
import global from '@/utils/global'
import '@/assets/stylus/index.styl'
import 'vue-ydui/dist/ydui.base.css'
Vue.config.productionTip = false
Vue.prototype.$api = Api
Vue.prototype.GLOBAL = global

Vue.use(Services)
Vue.use(mintUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//启动APP后，监听手机端，将click事件的300ms延迟去掉
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => {
        window.FastClick && FastClick.attach(document.body);
    }, false);
}

// 移动端使用vconsole调试
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
new VConsole()
