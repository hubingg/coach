import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', redirect: '/login'},
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/views/login'], resolve),
      meta: {
        title: '个人中心登录'
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: (resolve) => require(['@/views/mine/index'], resolve),
      meta: {
        title: '我的'
      }
    },
    {
      path: '/mine/edit',
      name: 'editMine',
      component: (resolve) => require(['@/views/mine/edit'], resolve),
      meta: {
        title: '我的'
      }
    },
    {
      path: '/index/achievement',
      name: 'Achievement',
      component: (resolve) => require(['@/views/achievement/index'], resolve),
      meta: {
        title: '业绩'
      }
    },
    {
      path: '/index/course',
      name: 'Course',
      component: (resolve) => require(['@/views/course/index'], resolve),
      meta: {
        title: '课程'
      }
    },
    {
      path: '/index/privateCourse',
      name: 'PrivateCourse',
      component: (resolve) => require(['@/views/course/private-course'], resolve),
      meta: {
        title: '课程'
      }
    },
    {
      path: '/index/confirmCourse',
      name: 'ConfirmCourse',
      component: (resolve) => require(['@/views/confirmCourse/index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/index/schedule',
      name: 'Schedule',
      component: (resolve) => require(['@/views/schedule/index'], resolve),
      meta: {
        title: '日程'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const name = window.localStorage.getItem("adminName")
  if (to.name == 'login') {
    next()
    return 
  }
  if (name) {
    next()
  } else {bus
    next()
    router.push({name: 'login'})
  }
})
export default router