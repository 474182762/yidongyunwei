<template>
  <div class="sdk_list">
         <el-breadcrumb separator-class="el-icon-arrow-right" class="sdk_breadcrumb">
            <el-breadcrumb-item>后台开发</el-breadcrumb-item>
            <el-breadcrumb-item>SDK管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="sdk_top">
            <div class="left">SDK管理</div>
            <div class="right">
                <!-- <el-button size="small">刷新</el-button> -->
                <el-button size="small" @click="addSdk">新增SDK</el-button>
            </div>
        </div>
        <ul class="list">
            <li v-for='(item,index) in sdkList' :key="index">
                <div class="info_warp">
                    <div class="sdk_info">
                        <img :src="item.img_url" alt="图片">
                        <div class="sdk_des">
                            <p>名称  {{item.name}}</p>
                            <p>版本 {{item.versions}}</p>
                            <p>更新日期  {{item.create_time}}</p>
                        </div>
                    </div>
                    <div class="sdk_btn">
                        <el-button size="small" @click="dwonSdk(item)">下架</el-button>
                        <el-button size="small" @click="updateSdk(item)">更新</el-button>
                    </div>
                </div>
            </li>
            
        </ul>
        <!-- 添加/更新sdk弹框 -->
     <el-dialog title="发布SDK" class="sdk_dialog" :visible.sync="sdkDialogVisible" center>
        <el-form :model="sdkForm" class="sdkForm" >
            <el-form-item label="SDK名称" :label-width="formLabelWidth">
                <el-input v-model="sdkForm.sdkname" class="sdk_name" auto-complete="off" size='small'></el-input>
            </el-form-item>
            <el-form-item label="版本" class="sdk_name" :label-width="formLabelWidth">
                <el-input v-model="sdkForm.versions" auto-complete="off" size='small'></el-input>
            </el-form-item>
            <el-form-item label="更新说明" :label-width="formLabelWidth">
                <el-input v-model="sdkForm.des" type="textarea" auto-complete="off" size='small'></el-input>
            </el-form-item>
            <el-form-item label="上传Sdk" :label-width="formLabelWidth">
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
                    <el-button class="upFileBtn"  size="small" type="success" @click="submitUpload">上传到服务器</el-button>							  
                </el-upload> 
            </el-form-item>
            <el-upload
                class="avatar-uploader"
                action="http://upload.qiniu.com/"
                :show-file-list="false"
                :data="upToken"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form>
       
        <div slot="footer" class="dialog-footer">
            <el-button @click="sdkDialogVisible = false" size='small'>取 消</el-button>
            <el-button type="primary" @click="addSdkSubmit" size='small'>确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { sdk_list,get_token,add_sdk,del_sdk} from '@/utils/url'
import axios from '@/utils/axios'
import { getUser } from '@/utils/user'
export default {
  data(){
      return{
        formLabelWidth: '70px',
        sdkForm:{
            sdkname:'',
            versions:'',
            des:''
        },
        sdkList:[],
        upToken:{},
        addFile:'',
        fileList:[],
        addFileSize:'',
        imageUrl:'',
        isDisableUpload: false,/*是否禁用上传*/
        sdkDialogVisible:false,
        sdkDialogTitle:'新增SDK'
      }
  },
  mounted() {
     let This = this 
     This.getSdkList()
     This.getQiNiuToken()
  },
  methods:{
    getSdkList(){
        let This = this
        let data={
            'token':getUser().user.token  
        } 
  
        axios.get(sdk_list,data).then((res)=>{
          
            if(res.code== '0'){

                This.sdkList = res.data.sdks

             }else{

                This.$message.error(res.message);
            }
        })

    },
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
    addSdk(){
        let This = this;
        This.sdkDialogVisible = true;
        This.sdkDialogTitle ='新增SDK'
    },
    /*新增sdk数据提交*/
    addSdkSubmit(){
        let This = this
        let data = {
            'token':getUser().user.token,
            'name':This.sdkForm.sdkname,
            'versions': This.sdkForm.versions,
            'updated_instructions': This.sdkForm.des,
            'download_url': This.addFile,
            'img_url':This.imageUrl
        }
        axios.post(add_sdk,data).then((res)=>{

            if(res.code=='0'){
               This.sdkDialogVisible = false;
                This.sdkList.push(res.data)
                This.$message.success('发布成功!');

            }else{
                 This.$message.error(res.message); 
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
     /*图片上传检测*/
     beforeAvatarUpload(file) {
        let This = this;
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          This.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          This.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
   
    /*图片上传成功回调*/
    handleAvatarSuccess(res, file){
        let This = this;
        console.log(res, file)
        // This.imageUrl = URL.createObjectURL(file.raw);
        This.imageUrl ="http://img1.jingchang.tv/"+res.key;
        console.log( This.imageUrl)
    },
    /*上传文件成功返回*/
    handleSuccess(res) {
        let This = this;
        console.log(res)
        This.addFile ="http://img1.jingchang.tv/"+res.key;
    },
    /*下架SDK*/
    dwonSdk(item){
        let This = this;
        let data = {
            'token':getUser().user.token,
            'id':item.id
        }
        This.$confirm(' 是否下架该SDK?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(del_sdk,data).then((res)=>{
            if(res.code=='0'){
            
               This.sdkList = This.sdkList.filter((ele)=>{
                        return ele.id != item.id
                    })  
              This.$message.success('sdk下架成功!');

            }else{
              This.$message.error(res.message);
            }
            
          })
          
        }).catch(() => { 
        
        });
    },
    updateSdk(item){
        let This = this; 
        This.sdkDialogVisible = true;
        This.sdkDialogTitle ='更新SDK'
        This.sdkForm.sdkname=item.name
        This.sdkForm.versions=item.versions
        This.sdkForm.des=item.updated_instructions
        This.imageUrl=item.img_url
    }
  }
}
</script>
<style scoped>
.sdk_list{
    background-color: #e4e7ed;
    padding: 20px 20px;
    height: 100%;
}
.sdk_list .sdk_breadcrumb{
    font-size:16px;
    font-weight:500;
    color:rgba(96,98,102,1);
    margin-bottom: 20px;
}
.sdk_list .sdk_top{
    padding: 0 40px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    margin-bottom: 20px;
}
.sdk_list .sdk_top .left{
    font-size:16px;
    font-weight:500;
    color:rgba(48,49,51,1);
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex:1;
}
.sdk_list .list{
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    flex-wrap:wrap;
}
.sdk_list .list li{
    width: 33.3%;
   
}
.sdk_list .list .info_warp{
    border:1px solid #DCDFE6;
    padding: 30px 20px 20px 30px;
    margin: 20px;
}
.sdk_list .list .sdk_info{
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.sdk_list .list .sdk_info img{
    width: 124px;
    height: 124px;
    background-color: #666;
}
.sdk_list .list .sdk_des{
    padding-left: 20px;

}
.sdk_list .list .sdk_des p{
    font-size:18px;
    font-weight:500;
    color:rgba(96,98,102,1);
    line-height: 36px;
}
.sdk_list .list  .sdk_btn{
    padding-top: 50px;
    text-align: center;
}


/*弹框样式*/
.sdk_dialog .sdkForm{
    width: 400px;
    margin: 0 auto;
    position: relative;
}
.sdk_dialog .upFileBtn{
    float: right;
    margin-top: 8px;
}
</style>
<style>
.sdk_name .el-input__inner{
    width:186px;
}

.sdk_dialog .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 84px;
    height: 84px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.sdk_dialog .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.sdk_dialog .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
.sdk_dialog .avatar{
    width: 84px;
    height: 84px;
    display: block;
}
.sdk_dialog .avatar-uploader {
    width: 84px;
    height: 84px;
    display: block;
    position: absolute;
    top:10px;
    right: 18px;
  }
</style>

