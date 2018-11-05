<template>
    <div class="add_account">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="account_breadcrumb">
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{accountTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="account_top">
            <div class="left">{{accountTitle}}</div>
            <div class="right">
                <el-button size="small" @click="$router.go(-1)">取消</el-button>
                <el-button size="small" @click="addAccountSubmit">保存</el-button>
            </div>
        </div>
        <div class="account_from">
            <el-form :model="accountFrom" class="account_warp" label-width='80px'>
                <el-form-item label="账号">
                    <el-input v-model="accountFrom.account" size="small"></el-input>
                </el-form-item>
                <el-form-item label="账号名称">
                    <el-input v-model="accountFrom.accountname" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="accountFrom.password" type="password" size="small"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="accountFrom.realname" size="small"></el-input>
                </el-form-item>
                 <el-form-item label="角色">
                    <el-select v-model="rolevalue" placeholder="请选择角色" size="small">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="accountFrom.iphone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="accountFrom.email" size="small"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {create_user,get_roles,get_userinfo} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
    data(){
        return{
            accountFrom:{
                account:'',
                accountname:'',
                password:'',
                realname:'',
                role:'',
                iphone:'',
                email:''
            },
            accountTitle:'添加账户',
            rolevalue:'',
            roleList:null
        }
    },
    mounted() {
        let This = this;
        let id = This.$route.query.id
        
        if(id){
            This.accountTitle ='修改账号'
            This.getAccountinfo(id)
        }

        This.getRoleList();
    },
    methods: {
        /*获取账号信息*/
        getAccountinfo(id){
            let This = this;
            let data={
                'token':getUser().user.token,
                'user_id':id
            }
            axios.get(get_userinfo,data).then((res)=>{

                if(res.code== '0'){

                    This.accountFrom.account= res.data.username
                    This.accountFrom.realname= res.data.realname
                    This.rolevalue= res.data.role_name
                    This.accountFrom.accountname= res.data.nickname
                    This.accountFrom.iphone= res.data.mobile
                    This.accountFrom.email= res.data.email

                }else{

                    This.$message.error(res.message);
                }
                
            })
        },
        /*获取角色列表*/
        getRoleList(){
            let This = this;
            let data={
                 'token':getUser().user.token
            }
            axios.get(get_roles,data).then((res)=>{
                if(res.code== '0'){
                    This.roleList = res.data.roles
                }else{
                    This.$message.error(res.message);
                }
            })
        },
        /*添加账号*/
        addAccountSubmit(){
            let This = this;
            let data={
                'user_id':This.$route.query.id,
                'token':getUser().user.token,
                'username':This.accountFrom.account,
                'nickname':This.accountFrom.accountname,
                'password':This.accountFrom.password,
                'realname':This.accountFrom.realname,
                'mobile':This.accountFrom.iphone,
                'email':This.accountFrom.email,
                'role':This.rolevalue
            }
            axios.post(create_user,data).then((res)=>{
                if(res.code== '0'){
                    This.$message.success('创建角色成功');
                }else{
                    This.$message.error(res.message);
                }
            })
        }
    }
}
</script>
<style scoped>
.add_account{
    background-color: #e4e7ed;
    padding: 20px 20px;
    height: 100%;
}
.add_account .account_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.add_account .account_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.add_account .account_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.add_account .account_from{
    background-color: #fff;
    padding: 30px 40px;
}
 .account_from .account_warp{
     width: 400px;
 }
</style>


