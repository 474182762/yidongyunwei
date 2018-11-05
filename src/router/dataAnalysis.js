export default {
  path:'dataAnalysis',
  component:r => require(['@/views/dataAnalysis/dataAnalysis.vue'], r),
  children:[
    // {
    //   path:'',
    //   component:r => require(['@/components/system/personInfo.vue'], r)
    // }
  ]
};