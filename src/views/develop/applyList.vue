<template>
  <div class="developer">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
        <el-breadcrumb-item>后台开发</el-breadcrumb-item>
        <el-breadcrumb-item>应用管理</el-breadcrumb-item>
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
            <el-button type="primary" size="small" @click='searchApps'>搜索</el-button>
            <el-button type="primary" size="small" @click="accountDialogVisible=true">添加应用</el-button>
        </div>
    </div>
    <div class="developer_table_warp">
        <el-table :data="appsData" stripe style="width: 100%" class="developer_table">
            <el-table-column prop="order" label="序号" width="105"></el-table-column>
            <el-table-column prop="name" label="应用名称"></el-table-column>
            <el-table-column prop="disabled_name" label="应用状态"></el-table-column>
            <el-table-column prop="account_name" label="所属账号" width="260"></el-table-column>
            <el-table-column prop="appid" label="APPID"></el-table-column>
            <el-table-column prop="access_key" label="AccseeKey" width="300"></el-table-column>
            <el-table-column prop="cloud" label="云储存"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="enterApplyInfo(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="disableApp(scope.row)" v-if="!scope.row.disabled" type="text" size="small">禁用</el-button>
                    <el-button @click="disableApp(scope.row)" v-else type="text" size="small">启用</el-button>
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
     <el-dialog title="新增应用" class="develope_dialog" :visible.sync="accountDialogVisible" center width='30%'>
        <el-form :model="appForm" >
            <el-form-item label="应用名称" :label-width="formLabelWidth">
                <el-input v-model="appForm.name" auto-complete="off" size='small'></el-input>
            </el-form-item>
            <el-form-item label="应用描述" :label-width="formLabelWidth">
                <el-input v-model="appForm.description" size='small' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="云服务" :label-width="formLabelWidth">
                <el-input v-model="appForm.cloud" size='small' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地域节点" :label-width="formLabelWidth">
                <el-input v-model="appForm.region" size='small' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="云回放Bucket" :label-width="formLabelWidth">
                <el-input v-model="appForm.playback_bucket" size='small' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="云告警Bucket" :label-width="formLabelWidth">
                <el-input v-model="appForm.alarm_bucket" size='small' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="云告警回调地址" :label-width="formLabelWidth">
                <el-input v-model="appForm.alarm_callback_url" size='small' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="设备离线回调地址" :label-width="formLabelWidth">
                <el-input v-model="appForm.device_offline_url" size='small' auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="accountDialogVisible = false" size='small'>取 消</el-button>
            <el-button type="primary" @click="AppdtaSubmit" size='small'>确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>
<script>
import { get_apps,disabled_app,del_app,create_app} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  data(){
      return {
        currentPage:1,
        accountInfo:'',
        totalPage:0,
        appForm:{
            name:'',
            description:'',
            cloud:'',
            region:'',
            playback_bucket:'',
            alarm_bucket:'',
            alarm_callback_url:'',
            device_offline_url:''

        },
        searchData:[
            {
                id:'name',
                type:'应用名称'
            },
            {
                id:'disabled',
                type:'应用状态'
            },
            {
                id:'uid',
                type:'所属账号'
            },
            {
                id:'appid',
                type:'APPID'
            },
            {
                id:'access_key',
                type:'AccessKey'
            },
             {
                id:'cloud',
                type:'云存储'
            }
        ],
        searchvalue:'',
        formLabelWidth: '130px',
        accountDialogVisible:false,
        appsData:[]
      }
  },
  mounted() {
    let This = this;
    let data={
        'token':getUser().user.token,
        'page':1
    }
    This.getAppsList(data)
  },
  methods:{
    /*获取应用列表*/
    getAppsList(data){

        let This = this;
        axios.get(get_apps,data).then((res)=>{
          
            if(res.code== '0'){
                This.totalPage = res.data.count
                res.data.apps.forEach((item,index)=> {
                    item['order'] =(data.page-1)*10+index+1;
                });
                This.appsData = res.data.apps
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
        This.getAppsList(data)
    },
    searchApps(){
         let This =this;
        let data={
            'token':getUser().user.token,
            'page':1
        }
        data[`${This.searchvalue}`]=This.accountInfo
        This.getAppsList(data)
    },
    /*新增应用*/
    AppdtaSubmit(){
        let This = this;
        let data={
            'token':getUser().user.token,
            'uid':'2',
            'name':This.appForm.name,
            'description':This.appForm.description,
            'cloud':This.appForm.cloud,
            'region':This.appForm.region,
            'playback_bucket':This.appForm.playback_bucket,
            'alarm_bucket':This.appForm.alarm_bucket,
            'alarm_callback_url':This.appForm.alarm_callback_url,
            'device_offline_url':This.appForm.device_offline_url
        }
        axios.post(create_app,data).then((res)=>{
          
            if(res.code== '0'){

                // This.accountDialogVisible=false
                This.appsData.unshift(res.data)
                if( This.appsData.length>10){

                    This.appsData.pop()

                }
                This.appsData.forEach((item,index)=> {

                    item['order'] =index+1;

                });

                This.$message.success('应用添加成功');

             }else{

                This.$message.error(res.message);
            }
        })
    },
    /*禁用与启用*/
    disableApp(val){
        let This = this
        let data={
             'token':getUser().user.token,
             'id':val.id,
             'disable':val.disabled?0:1
        }
        let start= val.disabled?'启用':'禁用'

        This.$confirm(`是否继续${start}应用：${val.name} ?`, '温馨提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'

        }).then(() => {

            axios.post(disabled_app,data).then((res)=>{

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
    /*进入应用详情*/
    enterApplyInfo(row){
        let This = this;
        This.$router.push({ path: 'applyInfo', query: { id: row.id}});
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

