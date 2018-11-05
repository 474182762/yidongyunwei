<template>
  <div class="apply_info">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="apply_breadcrumb">
        <el-breadcrumb-item>开发后台</el-breadcrumb-item>
        <el-breadcrumb-item>应用管理</el-breadcrumb-item>
        <el-breadcrumb-item>应用详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="apply_top">
        <div class="left">应用详情</div>
        <div class="right">
            <el-button size="small" @click="$router.go(-1)">返回</el-button>
            <el-button size="small" @click="reLoadData">刷新</el-button>
        </div>
    </div>
    <div class="apply_base_info">
        <dl>
            <dt>基本信息</dt>
            <dd><span>应用名称</span><span>{{appInfo.name}}</span></dd>
            <dd><span>应用描述</span><span>{{appInfo.description}}</span></dd>
        </dl>
         <dl>
            <dt>云服务</dt>
            <dd><span>云服务</span><span>{{appInfo.cloud}}</span></dd>
            <dd><span>域名节点</span><span>{{appInfo.region}}</span><el-button @click="editRegion"  type="text" size="small">修改</el-button></dd>
            <dd><span>云回放Bucket</span><span>{{appInfo.playback_bucket}}</span><el-button @click="editCloudBack"  type="text" size="small">修改</el-button></dd>
            <dd><span>云告警Bucket</span><span>{{appInfo.alarm_bucket}}</span><el-button @click="editCloudBack"  type="text" size="small">修改</el-button></dd>
        </dl>
         <dl>
            <dt>回调设置</dt>
            <dd><span>告警回调URL</span><span>{{appInfo.alarm_callback_url}}</span><el-button @click="editCloudWarnUrl"  type="text" size="small">修改</el-button></dd>
            <dd><span>设备离线回调URL</span><span>{{appInfo.device_offline_url}}</span><el-button @click="editDeviceOffline"  type="text" size="small">修改</el-button></dd>
            <dd><span>APPID</span><span>{{appInfo.appid}}</span></dd>
            <dd><span>AccessKey</span><span>{{appInfo.access_key}}</span></dd>
            <dd><span>SecretKey</span><span>{{appInfo.secret_key}}</span><el-button  type="text" size="small" @click="changeSecretkey">更换</el-button></dd>
        </dl>
    </div>
    <!-- 修改模块弹窗 -->
     <el-dialog :title="appTitle" :visible.sync="dialogAppVisible" width='450px'>
        <el-form :model="appForm">
            <el-form-item :label="appType" label-width="80px">
                <el-input v-model="appForm.info" size="small" autocomplete="off"></el-input>
            </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size='small' @click="dialogAppVisible = false">取 消</el-button>
            <el-button size='small' type="primary" @click="editAppInfo">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import {update_app,get_app,reset_secret} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
    data(){
        return{
            appInfo:{},
            appForm:{
                info:''
            },
            appTitle:'域名节点修改',
            appParameter:'region',
            appType:'域名节点',
            dialogAppVisible:false
        }
    },
    mounted() {
        let This = this;
        This.getAppInfo()
    },
    methods:{
        getAppInfo(){
            let This =this;
            let data = {
                'token':getUser().user.token,
                'id':This.$route.query.id
            }
            axios.get(get_app,data).then((res)=>{
          
                if(res.code== '0'){

                    This.appInfo = res.data
                }else{

                    This.$message.error(res.message);
                }
            })

        },
        /*刷新*/
        reLoadData(){
            let This = this;
            This.getAppInfo() 
        },
        /*域名节点修改*/
        editRegion(){
            let This = this;
            This.appForm.info='';
            This.dialogAppVisible = true;
        },
        /*云回放Bucket*/
        editCloudBack(){
            let This = this;
            This.dialogAppVisible = true;
            This.appForm.info='';
            This.appTitle = '云回放Bucket修改'
            This.appParameter='playback_bucket'
            This.appType='云回放'
        },
         /*云警告Bucket*/
        editCloudWarn(){
            let This = this;
            This.dialogAppVisible = true;
            This.appForm.info='';
            This.appTitle = '云警告Bucket修改'
            This.appParameter='alarm_bucket'
            This.appType='云警告'
        },
        /*告警回调URL*/
        editCloudWarnUrl(){
            let This = this;
            This.dialogAppVisible = true;
            This.appForm.info='';
            This.appTitle = '告警回调URL修改'
            This.appParameter='alarm_callback_url'
            This.appType='告警回调'
        },
        editDeviceOffline(){
            let This = this;
            This.dialogAppVisible = true;
            This.appForm.info='';
            This.appTitle = '设备离线回调URL修改'
            This.appParameter='device_offline_url'
            This.appType='离线回调'
        },
        editAppInfo(){
            let This = this;
            let data = {
                'token':getUser().user.token,
                'id':This.$route.query.id
            }
            data[`${This.appParameter}`] = This.appForm.info
            axios.post(update_app,data).then((res)=>{
          
                if(res.code== '0'){
                    This.appInfo[`${This.appParameter}`] = This.appForm.info
                    This.dialogAppVisible = false
                }else{

                    This.$message.error(res.message);
                }
            })
        },
        /*更换Secretkey*/
        changeSecretkey(){
            let This = this;
            let data = {
                'token':getUser().user.token,
                'id':This.$route.query.id
            }
            This.$confirm(`是否继续更换该应用Secretkey?`, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios.post(reset_secret,data).then((res)=>{
                        if(res.code== '0'){
                            This.appInfo.secret_key = res.data.secret_key
                            This.$message.success('Secretkey更换成功');
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
.apply_info{
    background-color: #e4e7ed;
    padding: 20px 20px;
}
.apply_info .apply_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.apply_info .apply_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.apply_info .apply_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.apply_info .apply_base_info{
     width: 100%;
     background-color: #fff;
     padding: 30px;
}
.apply_info .apply_base_info dl{
    margin-bottom: 40px;
}
.apply_info .apply_base_info dt{
    font-size:18px;
    color:#303133;
    height: 40px;
    line-height: 40px; 
}
.apply_info .apply_base_info dd{
    font-size:16px;
    color:rgba(144,147,153,1);
    height: 40px;
    line-height: 40px;
}
.apply_info .apply_base_info dd span{
   display: inline-block;
}
.apply_info .apply_base_info dd span:nth-of-type(1){
    width: 180px;
}
.apply_info .apply_base_info dd span:nth-of-type(2){
    color:#606266;
    width: 300px;
}
</style>


