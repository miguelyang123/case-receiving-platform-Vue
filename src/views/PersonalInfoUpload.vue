<script>
import router from '../router';
import { RouterLink, RouterView} from 'vue-router';
import axios from 'axios';
// pinia 全域資料庫
import { mapState, mapActions } from "pinia";
// 匯入資料庫
import dataStore from "../store/dataStore";

export default { 
    components:{
        RouterLink,
    },
    data() {
        return {
            // pwdFlag: false, //密碼明碼
            // code: "",
            // message: "",
            // //json
            postData: {
                // email: "",//email
                // password: "",//密碼
                uuid: "bdcd914c-43ce-42d3-983c-00acd5694fc4",//找pdf用
                pdf: null,//pdf
            },
            // pdf: null,//pdf
            // pdfNew: null,//pdf

            // formData: new FormData() //因為我這邊沒有使用form，所以就自行new了一個FormData
      
              uuid: null,

              code: 0,
              path: "pdfs",

              // pdfName: '',
              // pdfUrl: '',
              successFlag: false,

      };
    },
    computed: {
      //參數 1.資料庫 2.要取用的 state / getters
      ...mapState(dataStore, ["userInfo"]),
    },
    methods: {
        pwdflagTrue() {
            this.pwdFlag = true;
        },
        pwdflagFalse() {
            this.pwdFlag = false;
        },
        registerRouterPush() {
            router.push("/register_page")
        },

    // // 上传pdf
    // uploadPdf (event) {
    //   console.log(event)
    //   if (event.target.files[0].type != 'application/pdf') {
    //     return this.$message.warning('请选择上传pdf文件')
    //   }
    //   // if (ie9()) {
    //   //   this.$message.warning('iE9及以下版本IE浏览器暂不支持该功能，请升级IE浏览器或者用其他浏览器操作。')
    //   //   retrun
    //   // }
    //   //iE9及以下版本IE浏览器暂不支持该功能，请升级IE浏览器或者用其他浏览器操作。
    //   let inputDOM = event.target
    //   let _this = this
    //   var reader = new FileReader()
    //   reader.readAsDataURL(event.target.files[0])//读取文件
    //   reader.onload = function (e) {
    //     _this.getPdfUrl(event.target.files[0])//将得到的blob传出读取
    //     _this.pdfName = event.target.files[0].name
    //     inputDOM.value = null //将input置空 否则上传相同文件无反应 (不过置空后28行的打印 就看不到 event.target.files 文件数据（可以先注释此行看下数据--就是pdf文件）   )
    //   }
    // },
    // //通过读取pdf得到url
    // getPdfUrl (file) {
    //   let url = URL.createObjectURL(file) //将blob文件转化成url
    //   this.pdfUrl = url  //赋值给url
    //   console.log(url)  // blob:http://localhost:8080/f2049a9d-31a6-4bd9-8a94-23dee457218f
    //   return url
    // },
    // // 打开pdf
    // gotoPdf (pdfUrl) {
    //   // window.location.href = pdfUrl
    //   window.open(pdfUrl)
    // },
    // // 删除pdf
    // delPdf () {
    //   this.pdfName = ''
    //   this.pdfUrl = ''
    // }
    // // 上传文件返回函数，为了得到后端返回的下载url，保存到数据库中
    //   uploadFileSuccess(response, file, fileList) {
    //       let filePath = response.data;
    //       // 上传文件成功后的response参数已经是返回报文中的data部分，不需要使用response.data.data
    //       alert(response.data);
    //       // 回调函数中的this指针就是当前页面vue对象
    //       this.attachForm.downloadUrl = filePath;
    //   },
      update(e){
        let file = e.target.files[0];
        let uuid = this.uuid;
        let param = new FormData(); //创建form对象
        param.append('uuid',uuid);//通过append向form对象添加数据
        param.append('file',file);//通过append向form对象添加数据
        // console.log(param.get('uuid')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        // this.$http.post('http://localhost:8080/api/pdf_upload',param,config)
        // axios.post('http://localhost:8080/api/pdf_upload',param,config)
        axios.post('http://localhost:8080/api/pdf_upload',param,config)
          // .then(response=>{
          //   console.log(response.data);
          // })
      },
      download(){
        this.successFlag = false;
        let uuid = this.uuid;
        let param = new FormData(); //创建form对象
        param.append('uuid',uuid);//通过append向form对象添加数据
        
        // try {
        axios.post('http://localhost:8080/api/pdf_download',param, {
            responseType: 'blob', // important
            timeout: 20000,
        })
        .then((response) => {
          // fetch("http://localhost:8080/api/pdf_download",param,
          // {
          //     headers: {
          //       'Accept': 'application/json',
          //       'Content-Type': 'application/json'
          //     },
          //     method: "POST",
          //     // body: JSON.stringify({uuid: "6f6fc182-7a40-4637-aa20-3e3d7bb38ce9"})
          // }).then((response) => {
          // console.log("response(1)");
            // //返回的是一个错误
            // if(response.headers['content-type']==='application/json'){
            //     //提取错误的json消息并转换(此时json消息依旧在response.data中，这是一个blob数据)
            //     let reader = new FileReader();
            //     reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
            //     reader.readAsText(response.data);
            //     console.log("response(2)");
            //     return false;
            // }
            // //接收的是文件,fileName是一个property,设置了默认值(比如"文件模版.xls")
            // let fileName = this.fileName;
            // //服务器返回的请求头中包含了文件名信息,提取出来
            // //可能出现的BUG:如果在响应头中能看到"content-disposition",axios拿到的response却没有,
            // //这不怪axios，你需要去服务器设置一个叫Access-Control-Expose-Headers的东西
            // //让它包含"content-disposition"
            // console.log("response(3)");
            // if(response.headers["content-disposition"]){
            //     const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
            //     const result = patt.exec(response.headers["content-disposition"]);
                
            //     console.log("response(4)");
            //     if(result.length>1){
                  
            //         console.log("response(5)");
            //         //中文解码
            //         fileName = decodeURI(result[1]);
            //     }
            // }
            // console.log("response(6)");
              this.successFlag = true;
              console.log("this.successFlag: "+this.successFlag);
              //制作a标签并点击下载
              const url = window.URL.createObjectURL(new Blob([response.data],
                  { type: 'application/octet-stream' }));
              const link = document.createElement('a');
              link.href = url;
              // link.setAttribute('download', fileName);
              link.setAttribute('download', this.uuid+".pdf");
              document.body.appendChild(link);
              link.click();
        })
        .catch(function (e) {
          console.log(e); // "oh, no!"
          alert("pdf未上傳!");
        });
        
      },
      downloadCheck(){
        this.successFlag = false;
        let uuid = this.uuid;
        let param = new FormData(); //创建form对象
        param.append('uuid',uuid);//通过append向form对象添加数据
        
        // try {
        axios.post('http://localhost:8080/api/pdf_download',param, {
            responseType: 'blob', // important
            timeout: 20000,
        })
        .then((response) => {
        })
        .catch(function (e) {
          console.log(e); // "oh, no!"
          alert("pdf未上傳!");
        });
        
      },
      backPage(){
        router.push("/personal_info");
      },

    },
    mounted() {
    
      this.uuid = this.userInfo.uuid;

      this.downloadCheck();

    },
}

</script>

<template>
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
  <!-- <h1>Speed接案網</h1> -->
  <!-- <p>Personal Info</p> -->
  
  <!-- <h1>上傳履歷</h1> -->
  <!-- <div class="frame"> -->
  
    <!-- <iframe style="width: 100%; height: 100%;" src="docment.pdf"></iframe> -->

    <!-- <div class="content">
      <input type="file" class="box-orc-input" @change="uploadPdf($event)" />

      <span  v-if="pdfName" @click="gotoPdf(pdfUrl)">{{pdfName}} <span @click.stop.prevent="delPdf()">❌</span></span>
    </div> -->

  <!-- </div> -->

  <h1 class="text-5xl">上傳履歷</h1>

  <button class="custom-btn btn-5" @click="backPage">返回</button><br/>
  
  <p class="ml-48 text-2xl">請選擇想上傳的履歷表</p>
  <input class="file ml-48" name="file" type="file" accept=".pdf" @change="update"/>

  <button class="custom-btn btn-4" @click="download">下載</button>

  <!-- <button @click="preview">預覽</button>

  <div class="content">
    <span  v-if="pdfName" @click="gotoPdf(pdfUrl)">{{pdfName}} <span @click.stop.prevent="delPdf()">❌</span></span>
  </div> -->

</template>

<style lang="scss" scoped>
  body {
  background: #e0e5ec;
}

.frame {
  width: 90%;
  margin: 4px auto;
  text-align: center;
  // display: flex;
}
button {
  // margin: 20px;
  margin: 4px;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}

/* 4 */
.btn-4 {
  background-color: #4dccc6;
background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-4:hover{
  background-color: #89d8d3;
background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
}
.btn-4 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-4:before,
.btn-4:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
   box-shadow:  4px 4px 6px 0 rgba(255,255,255,.9),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}
.btn-4:before {
  height: 0%;
  width: .1px;
}
.btn-4:after {
  width: 0%;
  height: .1px;
}
.btn-4:hover:before {
  height: 100%;
}
.btn-4:hover:after {
  width: 100%;
}
.btn-4 span:before,
.btn-4 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.9),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}
.btn-4 span:before {
  width: .1px;
  height: 0%;
}
.btn-4 span:after {
  width: 0%;
  height: .1px;
}
.btn-4 span:hover:before {
  height: 100%;
}
.btn-4 span:hover:after {
  width: 100%;
}

/* 5 */
.btn-5 {
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  background: rgb(255,27,0);
background: linear-gradient(0deg, rgba(255,27,0,1) 0%, rgba(251,75,2,1) 100%);
}
.btn-5:hover {
  color: #f0094a;
  background: transparent;
   box-shadow:none;
}
.btn-5:before,
.btn-5:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #f0094a;
  box-shadow:
   -1px -1px 5px 0px #fff,
   7px 7px 20px 0px #0003,
   4px 4px 5px 0px #0002;
  transition:400ms ease all;
}
.btn-5:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.btn-5:hover:before,
.btn-5:hover:after{
  width:100%;
  transition:800ms ease all;
}

.uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .currentPage {
    cursor: pointer;
    color: #8c8e92;
  }
  .arrow{
    position:fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    width: 100%;
    background-color: #191919;
    padding: 12px 0;
    margin: 0;
    text-align: center;
  }

</style>
