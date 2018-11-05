<template>
  <div class="system_log">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="system_breadcrumb">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统日志</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="system_refer">
        <h2>系统日志</h2>
        <ul class="search_list">
            <li><el-input size="small" v-model="searchInfo" placeholder="请输入搜索内容"></el-input></li>
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
           <li>
                <el-date-picker
                    v-model="start_time"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间">
                </el-date-picker>
           </li>
           <li>
                <el-date-picker
                    v-model="end_time"
                    type="date"
                    size="small"
                    value-format="yyyy-MM-dd"
                    placeholder="结束时间">
                </el-date-picker>
           </li>
           
        </ul>   
         <div class="system_btn">
             <el-button size='small' @click="searchLog">搜索</el-button>
        </div> 
    </div>
    <div class="system_table_warp">
        <el-table :data="logData" stripe style="width: 100%" class="device_table">
             <!-- <el-table-column type="selection" width="55"></el-table-column>  -->
            <el-table-column prop="order" label="序号" width="110"></el-table-column>
            <el-table-column prop="operator_name" label="账号"></el-table-column>
            <el-table-column prop="operator_nickname" label="账户名称"></el-table-column>
            <el-table-column prop="role_name" label="所属角色"></el-table-column>
            <el-table-column prop="create_time" label="操作时间"></el-table-column>
            <el-table-column prop="msg"label="操作"></el-table-column>
        </el-table>
        <div class="bottom_table">
             <div class="btn_list">
                <!-- <el-button size='small'>批量删除</el-button> -->
            </div> 
            <el-pagination class="system_page" :current-page.sync="currentPage"  @current-change="currentChange" :page-size="10" layout="prev, pager, next, jumper" :total="totalPage"></el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
    import { get_logs} from '@/utils/url'
    import axios from '@/utils/axios'
    import { getUser } from '@/utils/user'

    export default {
        data(){
            return{
                currentPage:1,
                searchInfo:'',
                start_time:'',
                end_time:'',
                searchData:[
                    {
                        id:'username',
                        type:'账号'
                    },
                    {
                        id:'nickname',
                        type:'账号名称'
                    },
                    {
                        id:'role_name',
                        type:'所属角色'
                    },
                ],
                searchvalue:'',
                totalPage:null,
                logData:[]
            }
        },
        mounted() {
            let This = this;
            let data={
                    'token':getUser().user.token,
                    'page':1
                }
            This.getSystemLog(data)
        },
        methods:{
            /*分页获取数据*/
            currentChange(val){
                let This =this;
                let data={
                    'token':getUser().user.token,
                    'page':val,
                    'start_time':This.start_time,
                    'end_time':This.end_time,
                }
                data[`${This.searchvalue}`]=This.searchInfo
                This.getSystemLog(data)
            },
            getSystemLog(data){
                let This = this;
                axios.get(get_logs,data).then((res)=>{

                    if(res.code== '0'){
                        This.totalPage = res.data.count
                        res.data.logs.forEach((item,index)=> {
                            item['order'] =(data['page']-1)*10+index+1;
                        });
                        This.logData = res.data.logs
                    }else{

                        This.$message.error(res.message);
                    }
                })

            },
            searchLog(){
                let This =this;
                let data={
                    'token':getUser().user.token,
                    'page':1,
                    'start_time':This.start_time,
                    'end_time':This.end_time,

                }
                data[`${This.searchvalue}`]=This.searchInfo
                console.log(This.start_time,This.end_time,This.searchvalue)
                This.getSystemLog(data)
            }

        }
    }
</script>
<style scoped>
.system_log{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px 20px; 
}
.system_log .system_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.system_log .system_refer{
    background-color: #fff;
    padding:15px 40px;
    margin-bottom: 20px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.system_log .system_refer h2{
    line-height: 40px;
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.system_refer .search_list{
    padding: 4px 0;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.system_refer .search_list li{
    margin: 0 20px;
}
.system_refer .system_btn{
    margin-left: 40px;
    padding: 4px 0;
}
.system_log .system_table_warp{
     background-color: #fff;
}
.system_table_warp .bottom_table{
    padding: 40px 40px 30px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.system_table_warp .bottom_table .btn_list{
    flex:1;
    box-flex:1;
    -webkit-flex:1;
}
.system_table_warp .device_page{
    text-align: right;
}
.system_refer .el-form--inline .el-form-item{
    margin-bottom: 0;
    margin-left: 20px;
}
</style>
<style>
.system_table_warp .el-table .cell{
    text-align: center;
}
</style>



