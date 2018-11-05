<template>
  <div class="developer">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
        <el-breadcrumb-item>后台开发</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="developer_refer">
        <h2 class="title">账号列表</h2>
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
            <el-button type="primary" size="small" @click='searchAccount'>搜索</el-button>
            <el-button type="primary" size="small" @click="addAcount">添加账号</el-button>
        </div>
    </div>
    <div class="developer_table_warp">
        <el-table :data="developerData" stripe style="width: 100%" class="developer_table">
            <el-table-column prop="order" label="序号" width="105"></el-table-column>
            <el-table-column prop="account" label="用户名称"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="company" label="公司名称"></el-table-column>
            <el-table-column prop="realname" label="真实姓名"></el-table-column>
            <el-table-column prop="mobile" label="联系电话"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="editDeveloper(scope.row)" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom_table">
            <div class="btn_list">
                <!-- <el-button size='small'>全选</el-button>
                <el-button size='small'>反选</el-button>
                <el-button size='small'>解绑</el-button>
                <el-button size='small'>重启</el-button> -->
            </div>
            <el-pagination class="developer_page" :current-page.sync="currentPage" @current-change="currentChange" :page-size="10" layout="prev, pager, next, jumper" :total="totalPage"></el-pagination>
        </div>
    </div>
    <!-- 添加账号弹框 -->
     <el-dialog :title="accountDialogTitle" class="develope_dialog" :visible.sync="accountDialogVisible" center width='30%'>
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
            <el-button type="primary" @click="addDeveloperAccount" size='small'>确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import {get_accounts, save_account} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  data(){
      return {
        currentPage:1,
        totalPage:0,
        accountInfo:'',
        formLabelWidth:'90px',
        accountForm:{
            username:'',
            email:'',
            company:'',
            realname:'',
            iphone:''
        },
        searchData:[
            {
                id:'account',
                type:'用户名称'
            },
            {
                id:'email',
                type:'邮箱'
            },
            {
                id:'company',
                type:'公司名称'
            },
            {
                id:'realname',
                type:'真实姓名'
            },
            {
                id:'mobile',
                type:'联系电话'
            }
        ],
         searchvalue:'',
        accountDialogVisible:false,
        accountDialogTitle:'添加账户',
        developerData:[]
      }
  },
  mounted() {
    let This = this;
     let data={
            'token':getUser().user.token,
            'page':1
        }
    This.getDeveloperList(data)

  },
  methods:{
    /*获取开发者账号列表*/
    getDeveloperList(data){
        let This = this;
        axios.get(get_accounts,data).then((res)=>{
          
            if(res.code== '0'){
                This.totalPage = res.data.count
                res.data.users.forEach((item,index)=> {
                    item['order'] =(data.page-1)*10+index+1;
                });
                This.developerData = res.data.users
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
        This.getDeveloperList(data)
    },
    searchAccount(){
         let This =this;
        let data={
            'token':getUser().user.token,
            'page':1
        }
        data[`${This.searchvalue}`]=This.accountInfo
        This.getDeveloperList(data)
    },
    /*编辑账号*/
    editDeveloper(row){
        let This = this;
        This.accountDialogTitle='编辑账户'
        This.accountDialogVisible=true
        This.accountForm.username = row.account
        This.accountForm.email = row.email
        This.accountForm.company = row.company
        This.accountForm.realname = row.realname
        This.accountForm.iphone = row.mobile
    },
    addAcount(){
        let This = this;
        This.accountDialogVisible=true
        This.accountDialogTitle='添加账户'
        This.accountForm.username='';
        This.accountForm.email=''
        This.accountForm.company=''
        This.accountForm.realname=''
        This.accountForm.iphone=''
    },
    /*新增或者修改开发者账号*/
    addDeveloperAccount(){
        let This = this;
        let data={
            'token':getUser().user.token,
            'account':This.accountForm.username,
            'email':This.accountForm.email,
            'company':This.accountForm.company,
            'realname':This.accountForm.realname,
            'mobile':This.accountForm.iphone,
            'password':123456
        }
        axios.post(save_account,data).then((res)=>{
          
            if(res.code== '0'){
                  
                This.accountDialogVisible=false
                This.developerData.unshift(res.data)
                if( This.developerData.length>10){
                    This.developerData.pop()
                }
                

                This.developerData.forEach((item,index)=> {

                    item['order'] =index+1;

                });
                This.$message.success('开发者账号添加成功');

             }else{

                This.$message.error(res.message);
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

