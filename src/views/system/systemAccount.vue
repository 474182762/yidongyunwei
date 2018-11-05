<template>
  <div class="developer">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="developer_refer">
        <h2 class="title">账户列表</h2>
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
        <div class="developer_btn">
            <el-button type="primary" size="small" @click="searchAccount">搜索</el-button>
            <router-link to='/system/addaccount'><el-button type="primary" size="small">新增账号</el-button></router-link>
        </div>
    </div>
    <div class="developer_table_warp">
        <el-table :data="systemData" stripe style="width: 100%" class="developer_table"  ref="accountTable"  @selection-change="selectionAccount">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="order" label="序号" width="105"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="role_name" label="所属角色"></el-table-column>
            <el-table-column prop="register_time" label="创建时间"></el-table-column>
            <el-table-column prop="disabled_name" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="editAccount(scope.row)" type="text" size="small">修改信息</el-button>
                    <el-button @click="startOrStopAccount(scope.row)" v-if="!scope.row.disabled" type="text" size="small">禁用</el-button>
                    <el-button @click="startOrStopAccount(scope.row)" v-else type="text" size="small">启用</el-button>
                    <el-button @click="delAccount(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom_table">
            <div class="btn_list">
                <el-button size='small' @click="delAccounts">批量删除</el-button>
            </div>
            <el-pagination class="developer_page" :current-page.sync="currentPage"  @current-change="currentChange" :page-size="10" layout="prev, pager, next, jumper" :total="totalPage"></el-pagination>
        </div>
    </div>
    <!-- 添加账号弹框 -->
     <el-dialog title="添加账户" class="develope_dialog" :visible.sync="accountDialogVisible" center width='30%'>
        <el-form :model="accountForm" >
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="accountForm.username" auto-complete="off" size='small'></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="accountForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" :label-width="formLabelWidth">
                <el-input v-model="accountForm.company" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
                <el-input v-model="accountForm.realname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="accountForm.iphone" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="accountDialogVisible = false" size='small'>取 消</el-button>
            <el-button type="primary" @click="accountDialogVisible = false" size='small'>确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import { get_users,del_user,disable_user} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  data(){
      return {
        currentPage:1,
        accountInfo:'',
        accountForm:{
            username:'',
            email:'',
            company:'',
            realname:'',
            iphone:''
        },
        selectAccountList:[],
        totalPage:0,
        searchData:[
            {
                id:'username',
                type:'账号'
            },
            {
                id:'nickname',
                type:'昵称'
            },
            {
                id:'role_name',
                type:'所属角色'
            },
        ],
        searchvalue:'',
        formLabelWidth: '70px',
        accountDialogVisible:false,
        systemData:[
            // {order:'1',uuid:'1342142',name:'值得看',online:'在线',platform:'云平台',userid:'111'},
            // {order:'1',uuid:'1342142',name:'值得看',online:'在线',platform:'云平台',userid:'111'},
            // {order:'1',uuid:'1342142',name:'值得看',online:'在线',platform:'云平台',userid:'111'}

        ]
      }
  },
  mounted() {
        let This = this;
        let data={
            'token':getUser().user.token,
            'page':1
        }
        This.getUser(data)
  },
  methods:{
    /*获取/查询账号*/
    getUser(data){
        let This = this;
        axios.get(get_users,data).then((res)=>{
          
            if(res.code== '0'){
                This.totalPage = res.data.count
                res.data.users.forEach((item,index)=> {
                    item['order'] =(data.page-1)*10+index+1;
                });
                This.systemData = res.data.users
             }else{

                This.$message.error(res.message);
            }
        })
    },
    /*分页获取数据*/
    currentChange(val){
        let This =this;
        let data={
            'token':getUser().user.token,
            'page':val
        }
        data[`${This.searchvalue}`]=This.accountInfo
        This.getUser(data)
    },
    searchAccount(){
         let This =this;
        let data={
            'token':getUser().user.token,
            'page':1
        }
        if(!This.searchvalue){
            This.$message.error('请选择搜索类别');
            return
        }
        data[`${This.searchvalue}`]=This.accountInfo

        This.getUser(data)
    },
    /*删除账号*/
    delAccount(val){
        let This = this;
        let data={
             'token':getUser().user.token,
             'user_id':val.user_id
        }
        This.$confirm(`是否继续删除账号：${val.nickname} ?`, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.post(del_user,data).then((res)=>{
                if(res.code== '0'){
                    This.systemData = This.systemData.filter((ele)=>{
                        return ele.user_id != val.user_id
                    })
                    This.$message.success('删除账号成功');
                }else{
                    This.$message.error(res.message);
                }
            })
        })  
    },
    selectionAccount(val){
        let This = this;
        This.selectAccountList = val
    },
    /*批量删除*/
    delAccounts(){
        let This = this;
        let data={
             'token':getUser().user.token,
             'user_id':[]
        }
        This.selectAccountList.forEach((item,index)=>{
            data['user_id'].push(item.user_id)
        })
        if(!data['user_id'].length){
             This.$message.error('请选择需删除的账号');
             return
        }
        This.$confirm('是否继续批量删除多个账号?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
               
                axios.post(del_user,data).then((res)=>{
                    if(res.code== '0'){

                        This.selectAccountList.forEach((item,index)=>{

                            This.systemData = This.systemData.filter((ele)=>{

                                return ele.user_id != item.user_id
                            })
                        })

                        This.$message.success('删除账号成功');
                    }else{
                        This.$message.error(res.message);
                    }
                })
        })  
    },
    /*禁止与启用*/
    startOrStopAccount(val){
        let This = this;
        let data={

             'token':getUser().user.token,
             'user_id':val.user_id,
             'disable':val.disabled?0:1
        }
        let start= val.disabled?'启用':'禁用'
        This.$confirm(`是否继续${start}账号：${val.nickname} ?`, '温馨提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'

        }).then(() => {

            axios.post(disable_user,data).then((res)=>{

                if(res.code== '0'){

                    if(val.disabled){
                        val.disabled_name='启用'
                        val.disabled = 0
                    }else{

                        val.disabled_name='禁用'
                        val.disabled = 1
                    }

                    This.$message.success(`账号${start}成功`);
                }else{

                    This.$message.error(res.message);
                }
            })
        })  
    },
    /*编辑修改信息*/
    editAccount(val){
        
        let This = this;
        This.$router.push({
            path:'/system/addaccount',
            query:{
                id:val.user_id
            }
        })
    }

  }
}
</script>
<style scoped>
.developer{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px 20px;
}
.developer .device_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.developer .developer_refer{
    background-color: #fff;
    padding:15px 40px;
    margin-bottom: 20px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.developer_refer .title{
    line-height: 40px;
    font-size:16px;
    font-weight:500;
    flex:1;
    box-flex:1;
    -webkit-flex:1; 
    color:rgba(48,49,51,1);
}
.developer_refer .search_list{
     padding: 4px 0;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.developer_refer .search_list li{
    margin: 0 20px;
}
.developer_refer .developerform{
    flex:1;
    box-flex:1;
    -webkit-flex:1; 
}
.developerform .el-form-item{
    margin-bottom: 0;
}
.developer_refer .developer_btn{
    line-height: 40px;
}
.developer .developer_table_warp{
     background-color: #fff;
}
.developer_table_warp .bottom_table{
    padding: 40px 40px 30px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.developer_table_warp .bottom_table .btn_list{
    flex:1;
    box-flex:1;
    -webkit-flex:1;
}
.developer_table_warp .device_page{
    text-align: right;
}
.developer_refer .el-form--inline .el-form-item{
    margin-bottom: 0;
    margin-left: 20px;
}
</style>
<style>
    .developer_table.el-table .cell{
        text-align: center;
    }
    .develope_dialog .el-dialog__body {
        text-align: initial;
        padding: 25px 97px 30px;
    }
</style>




