export default {
  path:'/',
  component:r => require(['@/views/devices/device.vue'], r),
  children:[
    {
      path:'/',
      component:r => require(['@/views/devices/devicelist.vue'], r)
    },
    {
      path:'deviceInfo',
      component:r => require(['@/views/devices/deviceInfo.vue'], r)
    },
    {
      path:'hardware',
      component:r => require(['@/views/devices/hardware.vue'], r)
    },
    {
      path:'addhardware',
      component:r => require(['@/views/devices/addhardware.vue'], r)
    },
    {
      path:'UUid',
      component:r => require(['@/views/devices/uuidList.vue'], r)
    }
  ]
};