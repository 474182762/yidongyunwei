<template>
  <div class="header">
    <div class="left" ><img src="../assets/header1.png" alt=""></div>
    <div class="middle">
      <el-menu :default-active="activeIndex"  class="header_menu" mode="horizontal" @select="menuSelect">
          <el-menu-item index="1"><router-link to='/home/dataAnalysis'>数据统计</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to='/home'>设备管理</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to='/home/developer'>后台开发</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to='/home/system'>系统管理</router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="right">
        <el-dropdown  trigger="click" class="user_down">
          <span class="el-dropdown-link">{{nickname}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item><router-link to='/personInfo'>修改个人信息</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to='/password'>修改密码</router-link></el-dropdown-item> -->
             <el-dropdown-item><span @click="dialogPersonVisible = true">修改个人信息</span></el-dropdown-item>
            <el-dropdown-item><span @click="dialogPasswordVisible = true">修改密码</span></el-dropdown-item>
            <el-dropdown-item ><span @click="logOut">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <!-- 修改个人信息弹框 -->
    <el-dialog title="修改个人信息" :visible.sync="dialogPersonVisible" width='410px'>
        <el-form :model="personFrom" label-width="80px">
            <el-form-item label="账户名称">
                <el-input v-model="personFrom.account" size="small" placeholder="请输入账户名称"></el-input>
            </el-form-item>
            <el-form-item label="真实名称">
                <el-input v-model="personFrom.username" size="small" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="personFrom.eamil" size="small" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="personFrom.phone" size="small" placeholder="请输入联系方式"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPersonVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="PersonInfoSubmit"  size="small">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogPasswordVisible" width='410px'>
        <el-form :model="passwordFrom" label-width="80px">
            <el-form-item label="原密码">
                <el-input v-model="passwordFrom.old_password" type='password' placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="passwordFrom.new_password" type='password' placeholder="请输入新密码"></el-input>
            </el-form-item>
              <el-form-item label="再次输入">
                <el-input v-model="passwordFrom.ret_password" type='password' placeholder="再次输入新密码"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPasswordVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="PasswordSubmit"  size="small">确 定</el-button>
        </div>
    </el-dialog>
  </div>  
</template>

<script>
import { log_out, change_password,modify_information} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  name: 'headerTop',
  data () {
    return {
      activeIndex:'2',
      dialogPersonVisible:false,
      dialogPasswordVisible:false,
      nickname:'',
      personFrom: {
          account: '',
          username: '',
          eamil:'',
          phone:'',
      },
      passwordFrom: {
            old_password: '',
            new_password: '',
            ret_password:''
        }
    }
  },
  mounted() {
    let This = this;
    let userInfo = getUser().user
   
    This.nickname=This.personFrom.account=userInfo.nickname;
    This.personFrom.username=userInfo.realname;
    This.personFrom.eamil=userInfo.email;
    This.personFrom.phone=userInfo.mobile;

  },
  methods:{
    menuSelect(key, keyPath){
      let This = this;
      This.$emit('menuData',key)
    },
    /*修改密码*/
    PasswordSubmit(){
      let This = this;
      let data ={
        'token':getUser().user.token,
        'old_password':This.passwordFrom.old_password,
        'new_password':This.passwordFrom.new_password,
        'ret_password':This.passwordFrom.ret_password
      }
      axios.post(change_password,data).then((res)=>{
          if(res.code== '0'){

              This.dialogPasswordVisible = false
              This.$message.success('密码修改成功');
          }else{
            This.$message.error(res.message);
          }
      })
    },
    /*个人信息修改*/
    PersonInfoSubmit(){
      let This = this;
      let data ={
        'token':getUser().user.token,
        'nickname':This.personFrom.account,
        'realname':This.personFrom.username,
        'email':This.personFrom.eamil,
        'mobile':This.personFrom.phone
      }
      axios.post(modify_information,data).then((res)=>{
          if(res.code== '0'){
            
              This.dialogPersonVisible = false
              This.$message.success('修改信息成功');
          }else{
            This.$message.error(res.message);
          }
      })
    },
    /*退出登录*/
    logOut(){
      let This = this;
      let data={
        token:getUser().user.token
      }
      This.$confirm(' 是否退出值得看运维系统?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(log_out,data).then((res)=>{
            if(res.code=='0'){

              This.$message.success('退出成功!');
              This.$router.push({path:'/'})

            }else{
              This.$message.error(res.message);
            }
            
          })
          
        }).catch(() => { 
        
        });
    }
  }
}
</script>

<style scoped>

.header{
  width: 100%;
  height: 90px;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  border-bottom: 1px solid #D2D2D2;
}
.header .left{
  width: 248px;
  padding: 6px 0;
}
.header .left img{
  margin: 0 auto;
}
.header .middle{
  padding: 25px 0;
  flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex:1;
}
.header .header_menu{
  border-bottom:none;
}
.header .header_menu .el-menu-item{
  font-size:20px;
  font-weight:500;
  color:rgba(48,49,51,1);
  padding: 0;
  margin: 0 30px;
  height: 40px;
  line-height: 40px;
}
.header .right{
  width: 20.31%;
  padding: 33px 0;
}
.header .right .user_down{

}
.header .right .user_down span{
    font-size:18px;
    font-weight:500;
    cursor: pointer;
    color: #303133;
}
.header .right .user_down span:hover{

  color:rgba(64,158,255,1);
}

.header .right .user_down a{
   color:#606266;
}
</style>
