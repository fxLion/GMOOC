import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import axios from 'axios'
import util from '@/util/util'
import constants from '@/util/constants'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/business',
      component: (resolve) => require(['@/components/common/home.vue'], resolve),
      children: [
        {
          path: '',
          component: (resolve) => require(['@/components/common/mainContent.vue'], resolve)
        },
        {
          path: 'sharePlatform',
          component: (resolve) => require(['@/components/business/sharePlatform/sharePlatform.vue'], resolve)
        },
        {
          path: 'coDeveloped',
          component: (resolve) => require(['@/components/business/co-developed/co-developed.vue'], resolve),
          children: [
            {
              path: '',
              component: (resolve) => require(['@/components/business/co-developed/coDeveloped.vue'], resolve)
            },
            {
              path: 'addProject',
              component: (resolve) => require(['@/components/business/co-developed/addProject.vue'], resolve)
            },
            {
              path: 'projectDetail',
              component: (resolve) => require(['@/components/business/co-developed/projectDetail.vue'], resolve)
            },
            {
              path: 'editProject',
              component: (resolve) => require(['@/components/business/co-developed/editProject.vue'], resolve)
            }
          ]
        },
        {
          path: 'help',
          component: (resolve) => require(['@/components/business/help/help.vue'], resolve)
        },
        {
          path: 'userCenter',
          component: (resolve) => require(['@/components/system/userCenter/userCenter.vue'], resolve)
        }
      ]
    }
  ]
})
routes.beforeEach((to, from, next) => {
  if (Vue.prototype.$myresource === undefined) {
    Vue.prototype.$myresource = util.getSessionInfo('resource')
  }
  axios({
    url: '/static/config.json'
  }).then(function (result) {
    if (window.localStorage) {
      window.localStorage.setItem('IP', result.data.IP)
      window.localStorage.setItem('PORT', result.data.PORT)
      window.localStorage.setItem('PROTOCOL', result.data.PROTOCOL)
      window.localStorage.setItem('PROTOCOL_WEBSOCKET', result.data.PROTOCOL_WEBSOCKET)
      window.localStorage.setItem('PROJECT', result.data.PROJECT)
      constants.JS_CONTEXT = window.localStorage.getItem('PROTOCOL') + '://' +
        window.localStorage.getItem('IP') + ':' +
        window.localStorage.getItem('PORT') + '/' +
        window.localStorage.getItem('PROJECT')
      next()
    } else {
      alert('当前浏览器不支持localStorage，请升级版本')
    }
  }).catch(function (err) {
    alert(err)
  })
})

export default routes
