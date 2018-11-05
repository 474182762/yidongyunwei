<template>
  <div class="worthcloud">
    <headerTop @menuData = 'menuData'></headerTop>
    <div class="worthcloud_content">
        <div class ='menu_left'>
          <leftMenu :menuList='leftMenuList'></leftMenu>
        </div>
        <div class="content_right">
            <router-view ></router-view>
        </div>
    </div>
    
  </div>
</template>
<script>
import headerTop from '@/components/headerTop'
import leftMenu from '@/components/leftMenu'
import {menuList} from '../utils/menu'
export default {
  name:'index',
  components:{
      headerTop,
      leftMenu
  },
  data(){
      return{
        leftMenuList:menuList[1],
      }
  },
  mounted() {
   
  },
  methods:{
    /*菜单切换ID*/
    menuData(id){
      let This = this;
      menuList[id-1].forEach((item,index)=>{
        item['active'] = false;
      })
      menuList[id-1][0]['active']=true
      This.leftMenuList = menuList[id-1];
    }
  }
}
</script>



<style scoped>
.worthcloud{
  width:100%;
  height: 100%;
}
.worthcloud_content{
  height: calc(100% - 90px); 
  display: flex;
  display: -webkit-box;
}
.worthcloud_content .menu_left{
  width:12.91666666%;
  min-width: 156px;
  background-color: #2F3541;
}
.worthcloud_content .content_right{
  height: 100%;
  background-color: #e4e7ed;
  flex: 1;
  box-flex:1;
  -webkit-flex:1;
  -webkit-box-flex:1;
  overflow-y: auto;
}

</style>
