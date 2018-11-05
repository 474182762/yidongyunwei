export default {
  path:'/',
  component:r => require(['@/views/develop/develop.vue'], r),
  children:[
    {
      path:'developer',
      component:r => require(['@/views/develop/developerList.vue'], r)
    },
    {
      path:'applyList',
      component:r => require(['@/views/develop/applyList.vue'], r)
    },
    {
      path:'applyInfo',
      component:r => require(['@/views/develop/applyInfo.vue'], r)
    },
    {
      path:'sdklist',
      component:r => require(['@/views/develop/sdkList.vue'], r)
    }
  ]
};