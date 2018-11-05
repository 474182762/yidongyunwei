<template>
  <div class="login">
        <div class="login_content">
            <div class="warp">
                <div class="left"><img src="../../assets/login1.png" alt=""></div>
                <div class="right">
                    <img src="../../assets/logo.png" alt="">
                    <div class="login_info">
                        <el-form :model="loginFrom" label-width="80px">
                            <el-form-item label="用户名">
                                <!-- <i class="el-icon-edit"></i> -->
                                <el-input v-model="loginFrom.name" placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="loginFrom.password" type='password' placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-checkbox v-model="remember">记住我</el-checkbox>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" class="login_btn" @click="userLogin">登录</el-button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import { login } from '../../utils/url'
import axios from '@/utils/axios'
export default {
    name:'login',
    data(){
         return{
            loginFrom: {
                name: '',
                password: ''
            },
            remember:false
         }
    },
    mounted(){
        let This = this;
        let account =  JSON.parse(localStorage.getItem('account'));
        console.log(account.remember)
        if(account.remember){
            This.loginFrom.name = account.login;
            This.loginFrom.password = account.password;
            This.remember = account.remember
        }
    },
    methods:{
        userLogin(){
            let This = this;
            let data = {
                'login':This.loginFrom.name,
                'password':This.loginFrom.password
            }
            axios.post(login,data).then((res)=>{
                if(res.code=='0'){

                    This.remember?data['remember'] = true:data['remember'] = false
                    localStorage.setItem('account',JSON.stringify(data))
                    localStorage.setItem('userinfo',JSON.stringify(res.data))
                    This.$message.success('登录成功');
                    This.$router.push({path:'/home'})

                }else{
                     This.$message.error(res.message);
                }
                
            })
        }
    }

}
    
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    background:linear-gradient(240deg,rgba(99,176,255,1) 0%,rgba(0,99,202,1) 100%);
    position: relative;
}
.login .login_content{
    width: 100%;
    height: 100%;
    max-width: 1500px;
    max-height: 840px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    background-color: #fff;
}
.login_content .warp{
    height: 100%;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.login_content .left{
    width: 1001px;
}
.login_content .right{
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.login_content .right img{
    margin: 174px 0 122px 92px;
}
.login_content .right .login_info{
    width: 304px;
    margin-left:50px;
}
.login_content .right .login_btn {
    display: block;
    width: 140px;
    font-size: 16px;
    margin: 0 auto;
}
</style>

