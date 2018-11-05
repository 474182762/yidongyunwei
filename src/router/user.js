export default {
  path:'',
  component:r => require(['@/views/user/user.vue'], r),
  children:[
    { /*修改密码 */
      path: '/password',
      name: 'password',
      component: r => require(["@/views/user/password.vue"], r)
    },
    { /*修改个人信息 */
      path: '/personInfo',
      name: 'personInfo',
      component: r => require(["@/views/user/personInfo.vue"], r)
    },
  ]
};