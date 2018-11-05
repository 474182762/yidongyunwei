<template>
  <div class="system_role">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="role_breadcrumb">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="role_type">
      <div class="role_left">
        <h2>角色列表 <router-link to='/system/addrole'><i class="el-icon-plus addhard"></i></router-link></h2>
        <ul>
          <li v-for="(item,index) in roleList" :key='index' @click="roleTab(item)" :class="{active:item.active}">
            <span>{{item.name}}</span>
            <router-link :to="'/system/addrole?id='+item.id"><i class="el-icon-setting addhard"></i></router-link>  
          </li>
        </ul>
      </div>
      <div class="role_right">
        <div class="top">
            <h2 class="title">{{roleName}}</h2>
            <ul class="search_list">
                <li>
                    <el-input v-model="accountInfo" placeholder="请输入" size="small"></el-input>
                </li>
                <li>
                    <el-select v-model="searchvalue" placeholder="请选择搜索方式" size="small">
                        <el-option
                            v-for="item in searchData"
                            :key="item.id"
                            :label="item.type"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="btn_list">
                <el-button size="small" @click="searchRole">搜索</el-button>
                <el-button size="small" @click="addNewRole">新增用户</el-button>
            </div>
        </div>
        <div class="role_table">
           <el-table :data="roleData" stripe style="width: 100%" class="device_table" @selection-change="selectionRole">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="order" label="序号" width="80"></el-table-column>
                <el-table-column prop="username" label="账号"></el-table-column>
                <el-table-column prop="nickname" label="账号名称"></el-table-column>
                <el-table-column prop="register_time" label="添加时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="delRole(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="bottom_table">
              <div class="btn_list">
                  <el-button size='small' @click="delRoles">批量删除</el-button>
              </div>
              <el-pagination class="device_page" :current-page.sync="currentPage" @current-change="currentChange" :page-size="10" layout="prev, pager, next, jumper" :total="totalPage"></el-pagination>
          </div>
        </div>
      </div>
    </div>
     <!-- 添加成员 -->
    <el-dialog title="添加成员" :visible.sync="roleDialogVisible" center width='560px'>
       <el-transfer v-model="roleValue" :titles="['账号列表', '管理员账号列表']" :data="roleListData">

       </el-transfer>

       <div slot="footer" class="dialog-footer">
            <el-button @click="roleDialogVisible = false" size='small'>取 消</el-button>
            <el-button type="primary" size='small'>确 定</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>
<script>
import {get_roles,get_users_by_role,del_role,del_user,get_users_role_or} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
    data(){
        return{
            roleListData:[],
            roleValue:[],
            accountInfo:'',
            currentPage:1,
            totalPage:0,
            roleDialogVisible:false,
            roleData:[],
            roleList:[],
            selectRoleList:[],
            searchData:[
                {
                    id:'username',
                    type:'账号'
                },
                {
                    id:'nickname',
                    type:'账号名称'
                }
            ],
            searchvalue:'',
            roleName:'',
            roleId:''

        }
    },
    mounted() {
            let This = this;
            This.getRoleList()
            This.getUserOrRole()
            
    },
    methods:{
        /*角色切换*/
        roleTab(value){
            let This = this;
            This.roleList.forEach((item,index)=>{

                item['active']=false;
            })
            value['active']=true;
            This.roleName = value.name
            This.roleId = value.id
            This.getUsersByRole(1,value.id)
        },
        /*获取角色列表*/
        getRoleList(){
            let This = this;
            let data={
                'token':getUser().user.token,
                'page':1
            }
            axios.get(get_roles,data).then((res)=>{

                if(res.code=='0'){
                
                    res.data.roles.forEach((item,index)=>{

                        item['active']=false;

                    })
                    
                    res.data.roles[0]['active']=true
                    This.roleList = res.data.roles
                    This.roleName = res.data.roles[0].name
                    This.roleId = res.data.roles[0].id
                    This.getUsersByRole(1,res.data.roles[0].id)

                }else{

                    This.$message.error(res.message); 

                }
            })
        },
        /*角色查询*/
        searchRole(){
            let This = this;
            This.getUsersByRole(1,This.roleId,This.searchvalue,This.accountInfo)
        },
        getUsersByRole(page,roleid,searchvalue,accountInfo){
            let This = this;
            let data={
                'token':getUser().user.token,
                // 'username':username||'',
                'page':page,
                'role_id':roleid
            }
            data[`${This.searchvalue}`]=This.accountInfo
            axios.get(get_users_by_role,data).then((res)=>{

                if(res.code=='0'){
                    This.totalPage = res.data.count
                    res.data.users.forEach((item,index)=> {
                        item['order'] =(data.page-1)*10+index+1;
                    });
                    This.roleData = res.data.users

                }else{

                    This.$message.error(res.message);
                }

            })
        },
        /*分页*/
        currentChange(val){
            let This =this;
            let data={
                'token':getUser().user.token,
                'page':val
            }
            data[`${This.searchvalue}`]=This.accountInfo
            This.getUsersByRole(val,This.roleId,This.searchvalue,This.accountInfo)
        },
        /*删除角色账号*/
        delRole(val){
            let This = this;
            console.log(val)
            let data={
                'token':getUser().user.token,
                'user_id':val.user_id
            }
            This.$confirm(`是否继续删除角色账号：${val.nickname} ?`, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                axios.post(del_user,data).then((res)=>{
                    if(res.code== '0'){
                        This.roleData = This.roleData.filter((ele)=>{
                            return ele.user_id != val.user_id
                        })
                        This.$message.success('删除该角色账号成功');
                    }else{
                        This.$message.error(res.message);
                    }
                })
            })  
        },
        selectionRole(val){
            let This = this;
            This.selectRoleList = val
            console.log( This.selectRoleList)
        },
        /*批量删除账号*/
        delRoles(){

            let This = this;
            let data={
                'token':getUser().user.token,
                'user_id':[]
            }
            This.selectRoleList.forEach((item,index)=>{

                data['user_id'].push(item.user_id)
            })
            
            This.$confirm('是否继续批量删除多个账号?', '温馨提示', {

                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                
                    axios.post(del_user,data).then((res)=>{
                        if(res.code== '0'){

                            This.selectRoleList.forEach((item,index)=>{

                                This.roleData = This.roleData.filter((ele)=>{

                                    return ele.user_id != item.user_id
                                })
                            })

                            This.$message.success('删除该角色账号成功');
                        }else{

                            This.$message.error(res.message);
                        }
                    })
            })  
        },
        /*添加成员*/
        addNewRole(){
            let This = this;
            This.roleDialogVisible = true;
        },
        getUserOrRole(){
            let This = this;
            let data ={
                'token':getUser().user.token,
                'role_id':1
            }
            axios.get(get_users_role_or,data).then((res)=>{

                if(res.code== '0'){
                    res.data.except_roles.forEach((item)=>{
                        item.users.forEach((ele,index)=>{
                            ele['key'] =index
                            ele['label'] =item.nickname
                            ele['disabled'] =false
                        })
                    })
                    
                    res.data.users.forEach((item,index)=>{
                        item['key'] =index
                        item['label'] =item.nickname
                        item['disabled'] =false
                        This.roleValue.push(index)
                    })
                    This.roleListData = res.data.users

                }else{

                    This.$message.error(res.message);
                }
            })
        }
    }
}
</script>
<style scoped>
.system_role{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px 20px;
}
.system_role .role_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.system_role .role_type{
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-box;
}
.role_type .role_left{
  width: 220px;
  height: 100%;
  background-color: #fff;
}
.role_type .role_left h2{
  font-size:16px;
  font-weight:500;
  color:rgba(48,49,51,1);
  padding: 29px 0 29px 40px;
  border-bottom: 1px solid #DCDFE6;
}
.role_type .role_left .addhard{
  margin-left: 70px;
  color:#606266;
  font-size: 16px;
  cursor: pointer;
}
.role_type .role_left ul{
  padding-left: 40px;
  overflow: hidden;
}
.role_type .role_left ul li{
  font-size:14px;
  font-weight:500;
  color:rgba(144,147,153,1);
  margin-top: 29px;
  cursor: pointer;
  display: flex;
  display: -webkit-box;
}
.role_type .role_left ul li span{
    display: block;
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.role_type .role_left ul li i{
    margin-right: 20px;
    opacity: 0;
    transition: 0.4s;
}
.role_type .role_left ul li:hover i{
    opacity: 1;
}
.role_type .role_left ul .active{
     color:#409EFF; 
}
.role_type .role_right{
   flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex:1;
  margin-left: 20px;
}
.role_type .role_right .top{
    background-color: #fff;
    padding: 15px 40px;
    margin-bottom: 20px;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.role_type .role_right .top .title {
    line-height: 40px;
    font-size: 16px;
    font-weight: 500;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    color: rgba(48,49,51,1);
}
.role_type .role_right .top .search_list{
    padding: 4px 0;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.role_right .top .search_list li{
    margin: 0 20px;
}
.role_right .top .btn_list {
    line-height: 40px;
}
.system_role .role_table{
     background-color: #fff;
}
.role_table .bottom_table{
    padding: 40px 40px 30px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.role_table .bottom_table .btn_list{
    flex:1;
    box-flex:1;
    -webkit-flex:1;
}
.role_table .device_page{
    text-align: right;
}

</style>
<style>
.role_type .role_from .el-input__inner{
    width: 134px;
}
.device_table.el-table .cell{
    text-align: center;
}
</style>



