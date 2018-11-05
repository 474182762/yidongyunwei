import Vue from 'vue'
import Router from 'vue-router'
import dataAnalysisRouter from './dataAnalysis'
import devicesRouter from './devices'
import developRouter from './develop'
import systemRouter from './system'
import userRouter from './user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { /* 登录 */
      path: '/',
      name: 'login',
      component: r => require(["@/views/user/login.vue"], r)
    },
    { /* 登录后的内容页面 */
      path: '/home',
      name: 'index',
      component:r => require(["@/views/index.vue"], r),
       children:[
          devicesRouter,
          dataAnalysisRouter,
          developRouter,
          systemRouter
       ]
    }
    // userRouter
    
  ]
})
