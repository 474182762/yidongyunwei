<template>
    <div class="uu_id">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
            <el-breadcrumb-item :to="{ path: '/devices'}">设备管理</el-breadcrumb-item>
            <el-breadcrumb-item>UUID管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="device_top">
            <div class="left">申请记录</div>
            <div class="right">
                <el-button size="small" type="primary" @click="uuidDialogVisible=true">申请</el-button>
            </div>
        </div>
        <div class="uuid_table">
            <el-table :data="uuidData" stripe style="width: 100%">
                <el-table-column prop="order" label="序号" width="80"></el-table-column>
                <el-table-column prop="create_time" label="申请时间"></el-table-column>
                <el-table-column prop="count" label="申请个数"></el-table-column>
                <el-table-column prop="comment" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="uuidInfo(scope.row,macIdPage)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="uuidExcl(scope.row)">导出表格</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="uuid_page" :current-page.sync="currentPage"  @current-change="currentChange" :page-size="10" layout="prev, pager, next, jumper" :total="totalPage"></el-pagination>
        </div>
        <!-- 申请弹窗 -->
        <el-dialog title="UUID申请" :visible.sync="uuidDialogVisible" center width='30%'>
            <el-form :model="uuidForm" >
                <el-form-item label="设备数量" :label-width="formLabelWidth">
                    <el-input v-model="uuidForm.number" auto-complete="off" size='small'></el-input>
                </el-form-item>
                <el-form-item label="申请说明" :label-width="formLabelWidth">
                     <el-input v-model="uuidForm.des"  type="textarea" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="uuidDialogVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="applyUuid" size='small'>确 定</el-button>
            </div>
        </el-dialog>
        <!-- 许可证列表 -->
        <el-dialog title="许可证列表" :visible.sync="macidDialogVisible" center width='400px'>
            <ul class="mac_list">
                <li v-for="(item,index) in macIdList" :key="item.id">{{item.mac_id}}</li>
            </ul>
             <div slot="footer" class="dialog-footer" style="text-align: right;">
                <el-button type="text" size='small' @click="prePage" :disabled="preDisabled">上一页</el-button>
                <el-button type="text" size='small' @click="nextPage" :disabled="nextDisabled">下一页</el-button>
            </div> 
        </el-dialog>
    </div> 
</template>
<script>
import {batch_list,get_batch,del_batch,batch_add,excel_output,mac_ids} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  name:'devicelist',
  data(){
      return{
        uuidForm:{
            number:'',
            des:''
        },
        totalPage:0,
        uuidDialogVisible:false,
        macidDialogVisible:false,
        preDisabled:true,
        nextDisabled:false,
        macIdPage:1,
        macIdCount:0,
        macIdRow:null,
        formLabelWidth: '120px',
        currentPage: 1,/*当前页数*/
        macIdList:[],
        uuidData:[]
      }
  },
  mounted() {
      let This = this;
        let data={
            'token':getUser().user.token,
            'page':1
        }
        This.getUuidList(data) 
  },
  methods:{
      /*获取uuid*/
    getUuidList(data){
        let This = this;
        axios.get(batch_list,data).then((res)=>{
        
            if(res.code== '0'){
                This.totalPage = res.data.count
                res.data.batchs.forEach((item,index)=> {
                    item['order'] =(data.page-1)*10+index+1;
                });
                This.uuidData = res.data.batchs
            }else{

                This.$message.error(res.message);
            }
        })
    },
    currentChange(val){
         let This =this;
        let data={
            'token':getUser().user.token,
            'page':val
        }
        This.getUuidList(data)
    },
    /*申请UUid*/
    applyUuid(){
         let This = this;
         let data={
             'token':getUser().user.token,
             'count':This.uuidForm.number,
             'comment':This.uuidForm.des
         }
        axios.post(batch_add,data).then((res)=>{
        
            if(res.code== '0'){

                This.uuidData.unshift(res.data)
                if( This.uuidData.length>10){

                    This.uuidData.pop()

                }
                This.uuidData.forEach((item,index)=> {

                    item['order'] =index+1;

                });
                This.uuidDialogVisible = false
                This.$message.success('申请成功'); 
            }else{

                This.$message.error(res.message);
            }
        })
    },
    /*导出表格*/
    uuidExcl(row){
        let This = this;
        
        window.location.href=`${excel_output}?token=${getUser().user.token}&batch_id=${row.id}`

    },
    /*查看UUid*/
    uuidInfo(row,page){
        
        let This = this;
        let data={};
        This.macIdRow = row
        data={
             'token':getUser().user.token,
             'batch_id':This.macIdRow.id,
             'limit':20,
             'page':page
        }
       
        This.macidDialogVisible = true
        axios.post(mac_ids,data).then((res)=>{

            if(res.code== '0'){
                
                This.macIdCount = Math.ceil(res.data.count/data['limit'])
                This.macIdList = res.data.mac_ids
                
            }else{

            }
        })
    },
    /*上一页*/
    prePage(){
        let This = this;
        This.macIdPage--
        This.nextDisabled=false
        if(This.macIdPage<=1){
             This.preDisabled=true
        }else{
            This.preDisabled=false
        }
        This.uuidInfo(This.macIdRow,This.macIdPage) 
    },
    /*下一页*/
    nextPage(){
        let This = this;
        This.macIdPage++
        This.preDisabled=false
        if(This.macIdPage>=This.macIdCount){
             This.nextDisabled=true
        }else{
            This.nextDisabled=false
        }
        This.uuidInfo(This.macIdRow,This.macIdPage) 
    }
  }
}
</script>
<style scoped>
.uu_id{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px;
}
.uu_id .device_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.uu_id .device_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.uu_id .device_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
     flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
   
}
.uu_id .device_top .right{
    
}
.uu_id .uuid_table{
    background-color: #fff;
    padding-bottom: 150px;
}
.uu_id .uuid_table .uuid_page{
    text-align: right;
    margin-top: 60px;
    padding-right: 5.82%;
     /* padding-right: 21.82%; */
}
.mac_list{
  width: 100%;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  flex-wrap: wrap;  
}
.mac_list li{
    width: 25%;
    text-align: center;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    color: #9f9f9f;
    /* flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1; */
}
</style>
<style>
    .uuid_table .el-table .cell{
        text-align: center;
    }
</style>



