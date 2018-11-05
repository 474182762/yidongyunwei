<template>
    <div class="add_role">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="role_breadcrumb">
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{topTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
         <div class="role_top">
            <div class="left">{{topTitle}}</div>
            <div class="right">
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
                <el-button v-if="this.$route.query.id" size="small" @click="delRole">删除角色</el-button>
                <el-button size="small" @click="saveRole">保存</el-button>
            </div>
        </div>
        <div class="role_from_warp">
            <h2>基本信息</h2>
             <el-form :model="roleFrom" class="role_from" label-width='80px'>
                <el-form-item label="角色名称">
                    <el-input v-model="roleFrom.name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="roleFrom.des" type="textarea" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div class="limits">
                <h2>权限管理</h2>
                <ul>
                    <li v-for="(item,index) in jurisdictionList" :key='item.id'>
                        <el-checkbox v-model="item.checkAll" :indeterminate="item.checkState"  @change="checkAllChange(item)">{{item.name}}</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="item.checkedRoleId">
                            <el-checkbox v-for="ele in item.children" :label="ele.id" @change="checkChange(item)" :key="ele.id">{{ele.name}}</el-checkbox>
                        </el-checkbox-group>
                    </li>    
                </ul>
            </div>
            
        </div>
    </div>
</template>
<script>
import {get_jurisdiction,save_role,get_role_rules,del_role} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
    data(){
        return{
            roleFrom:{
                name:'',
                des:''
            },
            topTitle:'新建角色',
            checkedRoleId: [],
            isIndeterminate: true,
            jurisdictionList:[]
        }
    },
    mounted() {
        let This = this;
        if(This.$route.query.id){
            This.getRoleInfo()
            This.topTitle = '设置角色'
        }else{
            This.getJurisdiction()
        }
        
    },
    methods:{
        /*获取角色信息*/
        getRoleInfo(){
            let This = this;
            let data={
                'token':getUser().user.token,
                'role_id':This.$route.query.id
            }
             axios.get(get_role_rules,data).then((res)=>{
                 if(res.code== '0'){
                    This.roleFrom.name=res.data.role.name
                    This.roleFrom.des=res.data.role.description

                    res.data.rules.forEach((item,index)=>{
                        if(item.check){

                            item['checkedRoleId']=[];
                            item['checkAll'] = true;
                            
                            item.children.forEach((ele,index)=>{
                                item['checkedRoleId'].push(ele.id)
                            })
                            console.log(item['checkedRoleId'])
                        }else{

                            item['checkedRoleId']=[];
                            item['checkAll'] = false;

                            item.children.forEach((ele,index)=>{
                                if(ele.check){
                                    item['checkedRoleId'].push(ele.id)
                                }
                                
                            })

                        }

                    })

                    This.jurisdictionList = res.data.rules

                 }else{
                     This.$message.error(res.message); 
                 }
            })
        },
        /*获取权限列表*/
        getJurisdiction(){
            let This = this;
            let data={
                'token':getUser().user.token
            }
            axios.get(get_jurisdiction,data).then((res)=>{
                 if(res.code== '0'){
                      res.data.forEach((item,index)=>{
                          item['checkAll'] = false;
                          item['checkState'] = false
                          item['checkedRoleId'] =[]
                      });
                     This.jurisdictionList = res.data
                     console.log(This.jurisdictionList)

                 }else{
                     This.$message.error(res.message); 
                 }
            })
        },
        /*全选权限*/
        checkAllChange(val){
            let This = this;
            if(val.checkAll){

                val.children.forEach((item,index)=>{

                     val.checkedRoleId.push(item.id)
                })
               
            }else{
                val.checkedRoleId=[]

            }
            val.checkState=false
            // console.log(val)
        },
        /*单选*/
        checkChange(ele){
            let This = this;
            if(!ele.checkedRoleId.length){

                ele.checkState=false
                ele.checkAll = false

            }else{

                ele.checkState=true
            }
            if(ele.children.length==ele.checkedRoleId.length){

                ele.checkAll=true
                ele.checkState=false

            }
        },
        /*新增角色*/
        saveRole(){
            let This = this;
            let roleId=[]
            let data={
                'token':getUser().user.token,
                'name':This.roleFrom.name,
                'des':This.roleFrom.des,
                'id':This.$route.query.id
            }
            This.jurisdictionList.forEach((item,index)=>{

                if(item.checkedRoleId.length){

                    item.checkedRoleId.forEach((ele,index)=>{
                        roleId.push(ele)
                    })
                }
            })
            data['rule'] = roleId
            axios.post(save_role,data).then((res)=>{
                if(res.code== '0'){
                    
                    This.$message.success('角色添加成功');
                }else{
                   This.$message.error(res.message);
                }
            })
        },
        /*删除角色*/
        delRole(){
            let This = this;
            let data={
                'token':getUser().user.token,
                'id':This.$route.query.id
            }
            This.$confirm(`是否继续删除该角色?`, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post(del_role,data).then((res)=>{
                    if(res.code== '0'){
                        This.$message.success('删除该角色成功');
                    }else{
                        This.$message.error(res.message);
                    }
                })
            })  

        }
    }
}
</script>
<style scoped>
.add_role{
    background-color: #e4e7ed;
    padding: 20px 20px;
    height: 100%;
}
.add_role .role_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.add_role .role_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.add_role .role_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.add_role .role_from_warp{
    background-color: #fff;
    padding: 30px 40px;
}
.add_role .role_from_warp h2{
    font-size:18px;
    font-weight:500;
    color:rgba(48,49,51,1);
    margin-bottom: 20px;
}
 .role_from_warp .role_from{
     width: 400px;
 }
 .role_from_warp .limits ul li{
     margin-bottom: 30px;
 }
</style>


