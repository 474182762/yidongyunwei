<template>
  <div class="password">
    <div class="content">
        <h2>修改密码</h2>
        <div class="password_from">
            <el-form :model="passwordFrom" label-width="80px">
                <el-form-item label="原密码">
                    <el-input v-model="passwordFrom.oldpassword" type='password' placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="passwordFrom.newpassword" type='password' placeholder="请输入新密码"></el-input>
                </el-form-item>
                 <el-form-item label="再次输入">
                    <el-input v-model="passwordFrom.twopassword" type='password' placeholder="再次输入新密码"></el-input>
                </el-form-item>
                <div class="passwprd_btn clearfix">
                     <el-button class="ok_btn " type="primary">确定</el-button>
                     <el-button  class="cancle_btn" type="danger">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'index',
  data(){
      return{
        passwordFrom: {
            oldpassword: '',
            newpassword: '',
            twopassword:''
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
    padding: 68px 0 148px;
}
.content h2{
    font-size:20px;
    font-weight:500;
    color:rgba(48,49,51,1);
    text-align: center;
    padding-bottom: 36px;
}
.content .password_from{
    width: 332px;
    margin: 0 auto;
}
.content .passwprd_btn{
    padding-top: 60px;
}
.passwprd_btn .ok_btn{
    float: left;
    width: 98px;
}
.passwprd_btn .cancle_btn{
    float: right;
    width: 98px;
}
</style>