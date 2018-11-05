<template>
  <div class="addhardware">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="device_breadcrumb">
            <el-breadcrumb-item :to="{ path: '/devices'}">设备管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/devices/hardware'}">固件管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{leftTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
         <div class="device_top">
            <div class="left">{{leftTitle}}</div>
            <div class="right">
                <el-button size="small">取消</el-button>
                <el-button size="small" @click="addHardware">发布</el-button>
            </div>
        </div>
          <div class="base_info">
            <div class="left">
                <h2>基本信息</h2>
                <el-form :model="hardwareFrom" class="hardware_from" label-width='120px'>
                    <el-form-item label="固件名称">
                        <el-input v-model="hardwareFrom.name" placeholder="" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="固件外部号版本">
                        <el-input v-model="hardwareFrom.version" placeholder="" size="small"></el-input>
                    </el-form-item>
                   <el-form-item label="更新说明">
                        <el-input v-model="hardwareFrom.des" @blur="addChineseDes" type="textarea" placeholder="" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="固件包">
                        <el-upload class="upload-demo"
                            ref="upload"
                            action="http://upload.qiniu.com/"
                            :on-remove="handleRemove"
                            :on-success ="handleSuccess"
                            :on-change ="handleChange"
                            :file-list="fileList"
                            :data="upToken"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary" @click = "fileUpload">选取文件</el-button>
                            <el-button class="upFileBtn" style="float:right; margin-top:4px"  size="small" type="success" @click="submitUpload">上传到服务器</el-button>							  
                        </el-upload> 
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <h2>国际化语言包<i class="el-icon-plus add_language" @click="dialogLanguageVisible = true"></i></h2>
                <el-collapse v-model="activeNames">
                 <!-- <el-collapse-item title="中文" name="1">
                     <h2 class="title">更新说明</h2>
                    <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="chinese">
                    </el-input>  
                    <div>1.Fixed a bug that was too sensitive</div>
                    <div>2.Repaired a too smooth BUG</div>
                </el-collapse-item> -->
                <el-collapse-item v-for="(item,index) in languageList" :title="item.title" :name="index+1" :key='index'>
                  <div>{{item.conment}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <el-dialog title="添加其他语言更新描述" :visible.sync="dialogLanguageVisible" width='450px'>
                <el-form :model="languageForm">
                    <el-form-item label="语言类型" label-width="80px">
                    <el-select v-model="languageForm.type" size='small' placeholder="请选择语言类型">
                        <el-option label="EN" value="EN"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="更新描述" label-width="80px">
                        <el-input type="textarea" :rows="2" v-model="languageForm.des" autocomplete="off"></el-input>
                    </el-form-item>
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size='small' @click="dialogLanguageVisible = false">取 消</el-button>
                    <el-button size='small' type="primary" @click="addLanguageList">确 定</el-button>
                </div>
            </el-dialog>
        </div>
  </div>
  
</template>
<script>
import {add_version,get_token,get_version,update_version} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
    data(){
        return{
            upToken:{},
            addFile:'',
            leftTitle:'添加新固件',
            fileList:[],
            addFileSize:'',
            isDisableUpload: false,/*是否禁用上传*/
            hardwareFrom:{
                name:'',
                version:'',
                des:''
            },
            languageForm:{
                type:'',
                des:''
            },
            languageList:[],
            dialogLanguageVisible:false,
            activeNames:'',
            chinese:''
        }
    },
    mounted() {
        let This = this;
        if(This.$route.query.type=='update'){
            This.leftTitle ='更新固件'
        }else if(This.$route.query.type=='alter'){
            This.leftTitle = '修改固件'
        }else{
            This.leftTitle = '添加新固件'
        }
        This.getQiNiuToken()
        This.getHardWareInfo();
    },
    methods:{
        /*获取token*/
        getQiNiuToken(){
            let This = this
            let data = {
                'token':getUser().user.token  
            }
            axios.get(get_token,data).then((res)=>{
                if(res.code=='0'){

                    This.upToken['token'] = res.data.token
                    This.addFile=res.data.bucket_url;
                }
            })
        },
        fileUpload() {
            let This = this
            if(This.isDisableUpload) {
                This.$notify({
                    title: '操作',
                    message: '只能上传一个SDK',
                    type: 'warning',
                    duration: 2000
                })
            }
        },
        /*移除上传的文件*/
        handleRemove(file, fileList) {
        },
        /*当有文件上传时*/
        handleChange(file) {
            let This = this;
            This.addFileSize = file.size;
        },
         /*提交文件*/
        submitUpload() {
            this.$refs.upload.submit();
        },
        /*上传文件成功返回*/
        handleSuccess(res) {
            let This = this;
            console.log(res)
            This.addFile ="http://img1.jingchang.tv/"+res.key;
        },
        /*新增中文更新语言描述*/
        addChineseDes(){
            let This = this;
            if(This.hardwareFrom.des){
                if(This.languageList.length){

                    This.languageList.forEach((item,index)=>{

                        if(item.type == 'ZH'){
                            item.conment=This.hardwareFrom.des
                        }
                    
                });
                }else{
                     This.languageList.push({
                        'title':'中文',
                        'type':'ZH',
                        'conment':This.hardwareFrom.des
                    })
                }
               
            }
            
        },
        /*新增语言列表*/
        addLanguageList(){
            let This = this;
            if(This.languageList.length){

                This.languageList.forEach((item,index)=>{
                    console.log(item)
                    if(item.type =='EN'){
                        item.conment=This.languageForm.des
                    }else{
                        This.languageList.push({
                            'title':'英文',
                            'type':This.languageForm.type,
                            'conment':This.languageForm.des
                        }) 
                    }
                });

            }else{
                 This.languageList.push({
                    'title':'英文',
                    'type':This.languageForm.type,
                    'conment':This.languageForm.des
                })
            }
            This.dialogLanguageVisible = false

        },
        /*添加新固件*/
        addHardware(){
             let This = this;
             let id=This.$route.query.id;
             let type=This.$route.query.type
             let data = {
                'token':getUser().user.token,
                'name':This.hardwareFrom.name,
                'version_number':This.hardwareFrom.version,
                'description':This.hardwareFrom.des,
                'download_url':This.addFile,
                'img_url':'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=313794692,2941073176&fm=173&app=25&f=JPEG?w=218&h=146&s=D1A8B9556A517ADC700548E70300F022',
                'update_state':This.languageList,
                'ac_type':type,
                'id':id
            }
            let url = id?update_version:add_version
            axios.post(url,data).then((res)=>{
                if(res.code=='0'){
                    if(type=='update'){
                         This.$message.success('固件更新成功!');
                    }else if(type=='alter '){
                         This.$message.success('固件修改成功!');
                    }else{
                         This.$message.success('固件发布成功!');
                    }
                   
                }else{
                    This.$message.error(res.message); 
                }
            })

        },
        getHardWareInfo(){
            let This = this;
            let id=This.$route.query.id
            let data = {
                'token':getUser().user.token,
                id:id
            }
            if(!id){

                return
            }
            axios.post(get_version,data).then((res)=>{
                if(res.code=='0'){

                    This.hardwareFrom.name=res.data.name
                    This.hardwareFrom.version=res.data.version_number
                    This.hardwareFrom.des=res.data.description
                    This.languageList = res.data.update_state
                }
            })
        }

    }
}
</script>
<style scoped>

.addhardware{
    height: 100%;
    background-color: #e4e7ed;
    padding: 20px 20px;
}
.addhardware .device_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.addhardware .device_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.addhardware .device_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.addhardware .base_info{
    width: 100%;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.addhardware .base_info .left{
    margin-right: 40px;
}
.addhardware .base_info .left,
.addhardware .base_info .right{
    background-color: #fff;
     flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
    padding: 30px 262px 30px 40px;
}
.base_info .left h2,
.base_info .right h2{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    margin-bottom: 20px;
}
.base_info .right .add_language{
    float: right;
    cursor: pointer;
    margin-right: 10px;
}

</style>
<style>
.base_info .hardware_from .el-form-item__label{
    text-align: left;
}
</style>

