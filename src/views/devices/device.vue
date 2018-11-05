<template>
  <div class="device">
     <router-view></router-view>
  </div>
</template>
<script>
import leftMenu from '../../components/leftMenu'
export default {
  name:'device',
  components:{
    leftMenu
  },
  data(){
      return{

      }
  },
  mounted() {
      
  },
  methods:{
      
  }
}
</script>



<style scoped>
.device {
  width: 100%;
  overflow: hidden;
}
/* .device .menu_left{
  width:248px;
  background-color: #2F3541;
}
.device .device_warp{
  height: 100%;
  flex: 1;
  box-flex:1;
  -webkit-flex:1;
  -webkit-box-flex:1;
  overflow-y: auto;
} */

</style>