<template>
    <div class="device_info">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
            <el-breadcrumb-item>设备管理</el-breadcrumb-item>
            <el-breadcrumb-item>设备列表</el-breadcrumb-item>
            <el-breadcrumb-item>设备详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="device_top">
            <div class="left">设备信息</div>
            <div class="right">
                <el-button size="small">刷新</el-button>
                <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <div class="base_info">
            <div class="left">
                <h2>基本信息</h2>
                <ul>
                    <li><span>设备类型</span><span>{{deviceInfo.mac_type}}</span></li>
                    <li><span>设备型号</span><span>{{deviceInfo.mac_model}}</span></li>
                    <li><span>IP地址</span><span>{{deviceInfo.ip_addr}}</span></li>
                    <li><span>MAC地址</span><span>{{deviceInfo.mac_addr}}</span></li>
                    <li><span>当前WiFi</span><span>{{deviceInfo.wifi_name}}</span></li>
                    <li><span>充电状态</span><span>{{deviceInfo.charging_name}}</span></li>
                    <li><span>电量</span><span>{{deviceInfo.elect}}</span></li>
                    <li><span>视频清晰度</span><span>{{deviceInfo.encode_name}}</span></li>
                    <li><span>时区</span><span>{{deviceInfo.zone}}</span></li>
                    <li><span>翻转状态</span><span>{{deviceInfo.flip_name}}</span><el-button type="text">切换</el-button></li>
                    <li><span>设备在线状态</span><span>{{deviceInfo.status_name}}</span><el-button type="text">修改</el-button></li>
                    <li><span>设备名称</span><span>{{deviceInfo.mac_name}}</span><el-button type="text">重启</el-button></li>
                    <li><span>固件版本</span><span>{{deviceInfo.system_version}}</span><el-button type="text">升级</el-button></li>
                    <li><span>最后登录时间</span><span>{{deviceInfo.build_date}}</span></li>
                </ul>
                
            </div>
            <div class="right">
                <h2>云储存</h2>
                <ul>
                    <li><span>云服务</span><span>{{deviceInfo.build_date}}</span></li>
                    <li><span>云警告状态</span><span>040</span><el-button type="text">重启</el-button></li>
                    <li><span>云回放状态</span><span>V1.0</span><el-button type="text">修改</el-button></li>
                    <li><span>云回放类型</span><span>文字</span><el-button type="text">升级</el-button></li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
import {get_device} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
    name:'deviceInfo',
    data(){
        return{
            deviceInfo:{}
        }
    },
    mounted() {
       let This = this;
       This.getDeviceInfo() 
    },
    methods:{
        getDeviceInfo(){
            let This = this;
            let data={
                'token':getUser().user.token,
                'mac_id':2000789960022277
            }
            axios.get(get_device,data).then((res)=>{

                if(res.code=='0'){
                    if(res.data['charging']==0){
                        res.data['charging_name'] ='没有充电'
                    }else if(res.data['charging']==1){
                         res.data['charging_name'] ='正在充电'
                    }else{
                         res.data['charging_name'] ='充满'
                    }
                    if(res.data['encode_mode']==1){
                        res.data['encode_name'] ='高清 '
                    }else if(res.data['encode_mode']==2){
                         res.data['encode_name'] ='标清'
                    }else{
                         res.data['encode_name'] ='流畅'
                    }
                    if(res.data['status']==0){
                        res.data['status_name'] ='不在线 '
                    }else if(res.data['status']==1){
                         res.data['status_name'] ='在线'
                    }else{
                         res.data['status_name'] ='推流'
                    }
                    if(res.data['flip_type']==0){
                        res.data['flip_name'] ='未翻转'
                    }else{
                         res.data['flip_name'] ='翻转'
                    }
                    This.deviceInfo = res.data;

                }


            }) 

        }
    }
}
</script>
<style scoped>

.device_info{
    background-color: #e4e7ed;
    padding: 20px;
}
.device_info .device_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.device_info .device_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.device_info .device_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.device_info .base_info{
    width: 100%;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.device_info .base_info .left{
    margin-right: 40px;
}
.device_info .base_info .left,
.device_info .base_info .right{
    background-color: #fff;
     flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
    padding: 30px 40px 30px 40px;
}
.base_info .left h2,
.base_info .right h2{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    margin-bottom: 20px;
}
.base_info .left li,
.base_info .right li{
    height: 40px;
    line-height: 40px;
    font-size:14px;
    font-weight:500;
    color:rgba(144,147,153,1);
}
.base_info .right li span:nth-of-type(1),
.base_info .left li span:nth-of-type(1){
    display: inline-block;
    width: 100px;
}
.base_info .left li span:nth-of-type(2),
.base_info .right li span:nth-of-type(2){
    margin:  0 82px;
}

</style>

