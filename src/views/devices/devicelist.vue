<template>
  <div class="device_list">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="device_refer">

        <h2 class="title">设备列表</h2>
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
            <el-button type="primary" size="small" @click='searchDevice'>搜索</el-button>
        </div>
        <!-- <el-form :inline="true" :model="deviceFrom" class="demo-form-inline">
            <span class="title">设备列表</span>
            <el-form-item label="">
                <el-input v-model="deviceFrom.uuid" placeholder="UUID" size="small"></el-input>
            </el-form-item>
             <el-form-item label="">
                <el-input v-model="deviceFrom.name" placeholder="名称" size="small"></el-input>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="deviceFrom.online" placeholder="在线状态" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item> 
                <el-form-item label="">
                <el-input v-model="deviceFrom.platform" placeholder="平台" size="small"></el-input>
            </el-form-item>
             <el-form-item label="">
                <el-input v-model="deviceFrom.userid" placeholder="用户ID" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="deviceRefer" size="small">查询</el-button>
            </el-form-item>
        </el-form> -->
    </div>
    <div class="device_table_warp">
        <el-table :data="deviceData" stripe style="width: 100%" class="device_table" stripe>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="order" label="序号" width="55"></el-table-column>
            <el-table-column prop="share_uid" label="UUID"></el-table-column>
            <el-table-column prop="mac_name" label="名称"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="pid" label="平台"></el-table-column>
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="deviceInfo(scope.row)" type="text" size="small">详情信息</el-button>
                    <el-button type="text" size="small">解绑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom_table">
            <div class="btn_list">
                <!-- <el-button size='small'>全选</el-button>
                <el-button size='small'>反选</el-button> -->
                <!-- <el-button size='small'>解绑</el-button>
                <el-button size='small'>重启</el-button> -->
            </div>
            <el-pagination class="device_page" :current-page.sync="currentPage" @current-change="currentChange" :page-size="10" layout="prev, pager, next, jumper" :total="totalPage"></el-pagination>
        </div>
    </div>
    
  </div>
</template>
<script>
import {device_list} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  name:'devicelist',
  data(){
      return {
        currentPage:1,
        totalPage:2,
        accountInfo:'',
        searchData:[
            {
                id:'uuid',
                type:'UUID'
            },
            {
                id:'mac_name',
                type:'名称'
            },
            {
                id:'mac_status',
                type:'状态'
            },
            {
                id:'pid',
                type:'平台'
            },
            {
                id:'user_id',
                type:'用户ID'
            }
        ],
        searchvalue:'',
        deviceData:[]
      }
  },
  mounted() {
    let This = this;
    let data={
            'token':getUser().user.token,
            'page':1
        }
    This.getDeviceList(data)  
  },
  methods:{
      /*设备数据列表*/
      getDeviceList(data){
        let This = this;  
        axios.get(device_list,data).then((res)=>{
          
            if(res.code== '0'){
                This.totalPage = res.data.count
                res.data.devices.forEach((item,index)=> {
                    item['order'] =(data.page-1)*10+index+1;
                    if(item.mac_status==1){
                        item['status'] ='在线'
                    }else if(item.mac_status==2){
                        item['status'] ='正在推流'
                    }else{
                        item['status'] ='离线'
                    }
                });
                This.deviceData = res.data.devices
             }else{

                This.$message.error(res.message);
            }
        })
      },
      /*分页*/
      currentChange(){
        let This =this;
        let data={
            'token':getUser().user.token,
            'page':val
        }
        // data[`${This.searchvalue}`]=This.accountInfo
        This.getDeviceList(data)
      },
      /*查询设备*/
      searchDevice(){
        let This =this;
        let data={
            'token':getUser().user.token,
            'page':1
        }
        data[`${This.searchvalue}`]=This.accountInfo
        This.getDeviceList(data)
      },
      /*设备详情*/
      deviceInfo(row){
        let This = this
        This.$router.push({ path: '/home/deviceInfo', query: { id:row.mac_id }})
      }
  }
}
</script>

<style scoped>
.device_list{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px 20px;
    overflow: auto;
}
.device_list .device_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.device_list .device_refer{
    background-color: #fff;
    padding: 15px 40px;
    margin-bottom: 20px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.device_refer .title{
    line-height: 40px;
    font-size:16px;
    font-weight:500;
     /* margin-left: 40px; */
    flex:1; 
    box-flex:1;
    -webkit-flex:1;
    color:rgba(48,49,51,1);
}
.device_refer .search_list{
     padding: 4px 0;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.device_refer .search_list li{
    margin: 0 20px;
}
.device_list .device_table_warp{
     background-color: #fff;
}
.device_table_warp .bottom_table{
    padding: 40px 40px 30px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.device_table_warp .bottom_table .btn_list{
    flex:1;
    box-flex:1;
    -webkit-flex:1;
}
.device_table_warp .device_page{
    text-align: right;
}
.device_refer .el-form--inline .el-form-item{
    margin-bottom: 0;
    margin-left: 20px;
}

</style>
<style>
    .device_table.el-table .cell{
        text-align: center;
    }
</style>
