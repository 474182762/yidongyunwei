<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  box-sizing: -webkit-border-box;
}

ul,ol,li{list-style:none;margin-top: 0; margin-bottom: 0}
a,u{text-decoration:none; color: #666}
img{border:0;display:block;}
.clearfix:after{content:".";display:block;clear:both;height:0;overflow:hidden;visibility:hidden;}
html,body,#app{
  width: 100%;
  height: 100%;
  line-height: 1.2;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;  
  
  /* overflow: hidden; */
}
/*公共样式*/
 .el-table__header thead tr th{
  padding: 36px 0 12px;
  /* font-size:18px;
  font-family:'PingFang-SC-Medium';
  font-weight:500; */
  /* color:rgba(96,98,102,1); */
}
.el-table tbody tr td{
  /* padding: 9px 0; */
  /* font-size:16px;
  font-family:'PingFang-SC-Medium';
  font-weight:500;
  color:rgba(138,141,146,1); */
} 
</style>
