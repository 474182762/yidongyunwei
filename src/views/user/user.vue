<template>
  <div class="user">
    <headerTop></headerTop>  
    <router-view class="reset_info"></router-view>
  </div>
</template>
<script>
    import headerTop from '@/components/headerTop'
export default {
  name:'user',
  components:{
      headerTop
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
.user{
  width: 100%;
  height: 100%;
}
.reset_info{
  width: 100%;
   height: calc(100% - 120px);
  background: #e4e7ed;
   overflow-y: auto; 
}

</style>