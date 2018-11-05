<template>
  <div class="personInfo">
    <!-- <Header></Header> -->
    <div class="content">
        <h2>修改个人信息</h2>
        <div class="person_from">
            <el-form :model="personFrom" label-width="80px">
                <el-form-item label="账户名称">
                    <el-input v-model="personFrom.account" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="真实名称">
                    <el-input v-model="personFrom.username" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="personFrom.eamil" placeholder="再次输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="personFrom.phone" placeholder="再次输入新密码"></el-input>
                </el-form-item>
                <div class="person_btn clearfix">
                     <el-button class="ok_btn " type="primary">确定</el-button>
                     <el-button  class="cancle_btn" type="danger">取消</el-button>
                </div>
            </el-form>
        </div>
        <div class="base_info">
            <div class="left">
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="right"></div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'index',
  data(){
      return{
        personFrom: {
            account: '',
            username: '',
            eamil:'',
            phone:'',
        },
      }
  },
  mounted() {
      
  },
  methods:{
      
  }
}
</script>



<style scoped>
.content{
    width: 100%;
    max-width: 1306px;
    background-color: #fff;
    margin: 104px auto 0;
    padding: 68px 0 88px;
}
.content h2{
    font-size:20px;
    font-weight:500;
    color:rgba(48,49,51,1);
    text-align: center;
    padding-bottom: 36px;
}
.content .person_from{
    width: 332px;
    margin: 0 auto;
}
.content .person_btn{
    padding-top: 60px;
}
.person_btn .ok_btn{
    float: left;
    width: 98px;
}
.person_btn .cancle_btn{
    float: right;
    width: 98px;
}
</style>