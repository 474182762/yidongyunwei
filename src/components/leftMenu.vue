<template>
  <div class="left_menu">
    <!-- <el-menu
      :default-active="activeIndex"
      background-color="#2F3541"
      text-color="#fff"
      router >
       <el-menu-item  v-for= "(item,index) in menuList" :index="item.url" :key ='item.id'>
          <i class="icon iconfont" :class="item.icon"></i>
          <span class="menn_link">{{item.name}}</span>
          <router-link slot="title" class="menn_link" :to="item.url">{{item.name}}</router-link> 
      </el-menu-item> 
    </el-menu> -->
    <ul>
      
        <li v-for= "(item,index) in menuList" :class="{active:item.active}" @click="selectMenu(item,index)" :key ='item.id'>
          <router-link slot="title"  :to="item.url" style="display:block">
            <i class="icon iconfont" :class="item.icon"></i>
            <span class="menn_link">{{item.name}}</span>
          </router-link> 
        </li>
      
    </ul>
  </div>  
</template>

<script>

export default {
  name: 'leftMenu',
  props: ['menuList'],
  data () {
    return {
    }
  },
  mounted(){
    let This= this;
  },
  methods:{
    selectMenu(item,index){
      let This = this;
      This.menuList.forEach((item,index)=>{
        item['active'] = false;
      });
      item.active=true
    }
  }
}
</script>

<style scoped>
.left_menu ul{
  /* padding-top: 20px; */
  background:rgba(47,53,65,1);
}
.left_menu ul li{
  height: 80px;
  line-height: 80px;
  padding-left: 36px;
  cursor: pointer;
   border-left:4px solid transparent;
}
.left_menu ul .active{
  border-left:4px solid #409EFF;
  background:rgba(59,67,84,1);
}
.left_menu .menn_link {

    color: #fff;
    font-size:18px;
    font-weight:500;
}

</style>
<style>
.left_menu .el-menu-item, .left_menu .el-submenu__title{
  height: 70px;
  line-height: 70px;
  border-left:4px solid rgba(255,255,255,0)
}
.left_menu .el-menu-item.is-active{
  border-left-color: #409EFF;
}

.left_menu .icon{
  font-size: 20px;
  color:#fff;
}
.left_menu .el-menu-item.is-active .icon{
  color:#fff;
}
</style>
