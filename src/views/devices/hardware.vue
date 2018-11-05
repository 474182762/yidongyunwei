<template>
  <div class="hard_manage">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>固件管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hard_type">
      <div class="hard_left">
        <h2>固件列表<router-link to='/devices/addhardware'><i class="el-icon-plus addhard"></i></router-link></h2>
        <ul>
          <li v-for="(item,index) in versions" :class="{active:item.active}" :key = 'item.id'>
            <span @click="hardwareTab(item)">{{item.name}}</span>
            <i class="el-icon-close remove" @click="removeHard(item)"></i>
          </li>
        </ul>
      </div>
      <div class="hard_right">
        <div class="top">
            <div class="left">{{hardInfo.name}}</div>
            <div class="right">
              <router-link :to="'/devices/addhardware?id='+hardInfo.id+'&type=alter'"> <el-button size="small">修改</el-button></router-link>
              <router-link :to="'/devices/addhardware?id='+hardInfo.id+'&type=update'"> <el-button size="small">更新</el-button></router-link>
            </div>
        </div>
        <div class="hard_info">
            <div class="left">
                <div class="left_list">
                  <div class="product"><img :src="hard_image_url" alt="" width="100%" height="100%"></div>
                  <ul>
                    <li><span>固件名称</span><span>{{hardInfo.name}}</span></li>
                    <li><span>内部号版本</span><span>{{hardInfo.internal_number}}</span></li>
                    <li><span>外部号版本</span><span>{{hardInfo.version_number}}</span></li>
                    <li><span>更新时间</span><span>{{hardInfo.create_time}}</span></li>
                  </ul>
                </div>
                <dl>
                  <dt>更新说明</dt>
                  <dd>{{hardInfo.description}}</dd>
                </dl>
            </div>
            <div class="right">
              <h2>支持语言</h2>
              <el-collapse v-model="activeNames">
                 <el-collapse-item v-for="(item,index) in hardInfo.update_state" :title="item.title" :name="index+1" :key='index'>
                  <div>{{item.conment}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
        </div>
        <div class="hard_history">
            <el-table :data="hardData" stripe style="width: 100%" class="device_table">
                <el-table-column prop="order" label="序号" width="80"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="internal_number" label="内部版本号"></el-table-column>
                <el-table-column prop="version_number" label="外部版本号"></el-table-column>
                <el-table-column prop="create_time" label="更新日期"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="delVersion(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { version_list,get_version,get_type_versions,del_version} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  name:'hardware',
  data(){
      return {
        activeNames: ['2'],
        hard_image_url:require('../../assets/hard.png'),
        versions:[],
        hardInfo:{},
        hardData:[]
      }
  },
  mounted() {
      let This= this;
      This.getVersionTypeList();
  },
  methods:{
    /*获取固件类型列表*/
    getVersionTypeList(){
      let This = this;
      let data = {
            'token':getUser().user.token
          }
          axios.get(version_list,data).then((res)=>{

            if(res.code== '0'){

               res.data.versions.forEach((item,index)=>{

                    item['active']=false;

              })
              res.data.versions[0]['active']=true
              This.getversionInfo(res.data.versions[0].id)
              This.getHardWareList(res.data.versions[0].id)
              This.versions = res.data.versions

            }else{

              This.$message.error(res.message);
            }

          })
    },
    /*固件类型选择*/
    hardwareTab(value){
       let This = this;
        This.versions.forEach((item,index)=>{

            item['active']=false;
        })
        value['active']=true;
        This.getversionInfo(value.id)
        This.getHardWareList(value.id)
    },
    /*获取固件详情*/
    getversionInfo(id){
        let This = this;
        let data = {
            'token':getUser().user.token,
            'id':id
          }
           axios.get(get_version,data).then((res)=>{

            if(res.code== '0'){

                This.hardInfo = res.data

            }else{

              This.$message.error(res.message);
            }

          })

    },
    /*获取固件历史版本*/
    getHardWareList(id){
        let This = this;
        let data = {
            'token':getUser().user.token,
            'id':id,
            'page':1
          }
           axios.get(get_type_versions,data).then((res)=>{

            if(res.code== '0'){
               res.data.versions.forEach((item,index)=> {
                    item['order'] =(data.page-1)*10+index+1;
                });
                This.hardData = res.data.versions
            }else{

              This.$message.error(res.message);
            }

          })
    },
    /*移除固件*/
    removeHard(item){
        let This = this;
        let data = {
              'token':getUser().user.token,
              'id':item.id
          }
        This.$confirm(`是否继续删除该固件?`, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             axios.post(del_version,data).then((res)=>{

              if(res.code== '0'){

                  This.versions = This.versions.filter((ele)=>{
                      return ele.id != item.id
                  })
                  This.$message.success('固件删除成功');

              }else{

                This.$message.error(res.message);
              }

            })
        })  
          
    },
    delVersion(row){
      let This = this;
      let data = {
            'token':getUser().user.token,
            'id':row.id
          }
      This.$confirm(`是否继续删除该版本固件?`, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             axios.post(del_version,data).then((res)=>{

              if(res.code== '0'){

                  This.hardData = This.hardData.filter((ele)=>{
                      return ele.id != row.id
                  })
                  This.$message.success('固件成功');

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
.hard_manage{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px;
}
.hard_manage .device_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.hard_manage .hard_type{
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-box;
}
.hard_type .hard_left{
  width: 220px;
  /* height: 100%; */
  background-color: #fff;
}
.hard_type .hard_left h2{
  font-size:16px;
  font-weight:500;
  color:rgba(48,49,51,1);
  padding: 29px 0 29px 40px;
  border-bottom: 1px solid #DCDFE6;
}
.hard_type .hard_left .addhard{
  margin-left: 70px;
  color:#606266;
  font-size: 16px;
  cursor: pointer;
}
.hard_type .hard_left ul{
  padding: 0 20px 0 40px;;
  overflow: hidden;
}
.hard_type .hard_left ul li{
  font-size:14px;
  font-weight:500;
  color:rgba(144,147,153,1);
  margin-top: 29px;
  cursor: pointer;
}
.hard_type .hard_left ul li{
    display: flex;
    display: -webkit-box;
}
.hard_type .hard_left ul li span{
  display: block;
  flex: 1;
  -webkit-flex:1;
  height: 100%;
}
.hard_type .hard_left .remove{
   opacity: 0; 
}
.hard_type .hard_left ul li:hover .remove{
    opacity:1;
}
.hard_type .hard_left ul  .active{
   color:#409EFF;
}
.hard_type .hard_right{
   flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex:1;
  margin-left: 20px;
}
.hard_type .hard_right .top{
  padding: 0 40px;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  height: 70px;
  line-height: 70px;
  background-color: #fff;
  margin-bottom: 20px;
}
.hard_type .hard_right .top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.hard_type .hard_info{
  padding: 30px 40px;
  background-color: #fff;
  margin-bottom: 20px;
   display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.hard_info .left_list{
   display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.hard_info .left_list .product{
  width: 150px;
  height: 150px;
  background-color: #A1A1A1;
}
.hard_info .left_list ul li{
  font-size:14px;
  font-weight:500;
  color:rgba(144,147,153,1);
  margin-bottom: 26px;
  padding-left: 40px;
}
.hard_info .left_list ul li span:nth-of-type(2){
  color:#606266;
  margin-left: 118px;
}
.hard_info .left dl{
  font-size:14px;
  font-weight:500;
  color:rgba(96,98,102,1);
}
.hard_info .left dl dt,
.hard_info .left dl dd{
  margin-bottom: 19px;
}
.hard_info .right{
  padding: 0 20%;
  flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex:1;
}
.hard_info .right h2{
  font-size:16px;
  font-weight:500;
  color:rgba(48,49,51,1);
  margin-bottom: 30px;
}
</style>
<style>
.device_table.el-table .cell{
        text-align: center;
    }
</style>


