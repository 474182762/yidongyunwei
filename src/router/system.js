export default {
  path:'/',
  component:r => require(['@/views/system/system.vue'], r),
  children:[
    {
      path:'system',
      component:r => require(['@/views/system/systemAccount.vue'], r)
    },
    {
      path:'addaccount',
      component:r => require(['@/views/system/addAccount.vue'], r)
    },
    {
      path:'systemlog',
      component:r => require(['@/views/system/systemLog.vue'], r)
    },
    {
      path:'systemrole',
      component:r => require(['@/views/system/systemRole.vue'], r)
    },
    {
      path:'addrole',
      component:r => require(['@/views/system/addRole.vue'], r)
    }
  ]
};