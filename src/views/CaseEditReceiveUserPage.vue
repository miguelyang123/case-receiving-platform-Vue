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
            // postData: {
            //     // email: "",//email
            //     // password: "",//密碼
            //     uuid: "bdcd914c-43ce-42d3-983c-00acd5694fc4",//找pdf用
            //     pdf: null,//pdf
            // },
            // pdf: null,//pdf
            // pdfNew: null,//pdf

            // formData: new FormData() //因為我這邊沒有使用form，所以就自行new了一個FormData
      
            "caseId": -1,
            "userIdList": [

            ],
            "isAccepted": true,

            "postData": {
              "caseId": null,
              "userIdList": [

              ],
              "isAccepted": true,
            },
            
            "postData02": {
              
              id: null,
              caseName: null,
              budget: null,
              location: null,
              content: null,
              deadline: null,
		          createdDate: null,
		          caseClass: null,
              initiator: null,
		          onShelf: null,
              currentStatus: null,
            },

            "alreadyChoose": false,
            "receiveCount": false,

      };
    },
    computed: {
      //參數 1.資料庫 2.要取用的 state / getters
      ...mapState(dataStore, ["numTest", "caseEditId", "caseReceiveData", "caseTemp"]),
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
        searchUserByCaseId(){
          axios.get('http://localhost:8080/edit_case_page/search_user_by_caseid?caseId='+this.caseEditId
          )
          .then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
              this.localList = this.responseLocal.data.userInfoList;
            }
          });
        },
        searchUserByCaseIdTrue(){
          axios.get('http://localhost:8080/edit_case_page/search_user_by_caseid?caseId='+this.caseEditId+'&isAccepted=true'
          )
          .then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
              this.localList = this.responseLocal.data.userInfoList;
              // console.log("this.localList: "+this.localList);
              this.localList.forEach(item => {
                // console.log("item.uuid: "+item.uuid);
                if(item.uuid != null){
                  this.alreadyChoose = true;
                }
                // console.log("this.alreadyChoose: "+this.alreadyChoose);
                if(!this.alreadyChoose){
                  this.searchUserByCaseId();
                }
              });
            }
          });
        },
        searchUserByCaseIdCheck(){
          axios.get('http://localhost:8080/edit_case_page/search_user_by_caseid?caseId='+this.caseEditId
          )
          .then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
              this.localList = this.responseLocal.data.userInfoList;
              
              console.log("localList!");
              this.localList.forEach(item => {
                if(item != null){
                  this.receiveCount = true;
                }
              });

            }
          });
        },
        pdfDownload(uuid){
        // let uuid = this.uuid;
        let param = new FormData(); //创建form对象
        param.append('uuid',uuid);//通过append向form对象添加数据
        axios.post('http://localhost:8080/api/pdf_download',param, {
            responseType: 'blob', // important
            timeout: 20000,
        }).then((response) => {
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
            //制作a标签并点击下载
            const url = window.URL.createObjectURL(new Blob([response.data],
                { type: 'application/octet-stream' }));
            const link = document.createElement('a');
            link.href = url;
            // link.setAttribute('download', fileName);
            link.setAttribute('download', uuid+".pdf");
            document.body.appendChild(link);
            link.click();
        })
        .catch(function (e) {
          console.log(e); // "oh, no!"
          alert("pdf未上傳!");
        });
        },
        addContractors(uuid){
          if(!this.userIdList.includes(uuid)){
            this.userIdList.push(uuid);
          }
          this.chooseContractors();
        },
        chooseContractors(){
          this.postData.caseId =  this.caseEditId;
          this.postData.userIdList = this.userIdList;
          axios.post('http://localhost:8080/edit_case_page/choose_contractors', this.postData
          )
          .then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
                
                  this.postData02.id = this.caseEditId;
                  this.postData02.caseName = this.caseTemp.caseName;
                  this.postData02.budget = this.caseTemp.budget;
                  this.postData02.location = this.caseTemp.location;
                  this.postData02.content = this.caseTemp.content;
                  // this.postData.deadline = this.caseDeadline+"-00-00-00.00";
                  this.postData02.deadline = this.caseTemp.deadline;
                  // console.log("this.postData.deadline: "+this.postData.deadline);
                  // this.postData.deadline = null;
                  this.postData02.onShelf = this.caseTemp.onShelf;
                  this.postData02.initiator = this.caseTemp.initiator;
                  this.postData02.caseClass = this.caseTemp.caseClass;
                  this.postData02.currentStatus = "In Progress";
                  console.log("this.postData.id: "+this.postData02.id);
                  console.log("this.postData.caseName: "+this.postData02.caseName);
                  console.log("this.postData.budget: "+this.postData02.budget);
                  console.log("this.postData.location: "+this.postData02.location);
                  console.log("this.postData.content: "+this.postData02.content);
                  console.log("this.postData.deadline: "+this.postData02.deadline+"T00:00:00");
                  console.log("this.postData.initiator: "+this.postData02.initiator);
                  console.log("this.postData.caseClass: "+this.postData02.caseClass);
                  axios.post('http://localhost:8080/case_api/edit_case', this.postData02)
                  .then((response) => {
                    this.responseLocal = response;
                    if(this.responseLocal.data.code === "200"){
                      // console.log("add case successed!");
                      // this.localList = this.responseLocal.data.locationList;
                      alert("案件編輯成功!");
                      router.push("/");
                    }
                    else{
                      console.log("edit case failed!");
                      alert(this.responseLocal.data.message);
                    }
                  });

              router.push("/case_edit_page");

            }
          });
        },
        backPage(){
          router.push("/case_edit_page");
        },

      },
      mounted() {

        this.searchUserByCaseIdTrue();

        this.searchUserByCaseIdCheck();

      },
      
}

</script>

<template>
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
  <!-- <h1>Speed接案網</h1> -->
  <!-- <p>Personal Info</p> -->
  
  <p class="text-5xl">案子的接案者編輯畫面</p>

  <button class="custom-btn btn-5" @click="backPage">返回</button>

  <p v-if="receiveCount == false" class="text-5xl text-red-600 ml-40">目前無人接案</p>

  <div v-if="alreadyChoose == false && receiveCount == true">
  <button class="custom-btn btn-4" @click="chooseContractors">確認</button>

  <table class="table ml-10">
        <thead>
        </thead>
        <tbody>
        <tr>
            <td class="border-2 border-black">接案者評價</td>
            <td class="border-2 border-black">接案者姓名</td>
            <td class="border-2 border-black">履歷書下載</td>
            <!-- <td class="border-2 border-black">接案邀請</td> -->
            <td class="border-2 border-black">選擇接案者</td>
        </tr>
        <tr v-for="(item, key) in caseReceiveData" :key="key">
            <td class="border-2 border-black">{{ item.rating }}</td>
            <td class="border-2 border-black">{{ item.user_name }}</td>
            <td class="border-2 border-black"><button class="border-2 border-black px-2 py-1 rounded-lg bg-blue-700 text-white" @click="pdfDownload(item.uuid)">下載</button></td>
            <!-- <td class="border-2 border-black"><button @click="sendReceiveInvite(item.uuid)">未發送</button></td> -->
            <td class="border-2 border-black"><button @click="addContractors(item.uuid)">點擊以選擇</button></td>
        </tr>
        </tbody>
    </table>
  </div>
  <div v-if="alreadyChoose == true">

  <table class="table ml-10">
        <thead>
        </thead>
        <tbody>
        <tr>
            <td class="border-2 border-black">接案者評價</td>
            <td class="border-2 border-black">接案者姓名</td>
            <td class="border-2 border-black">信箱</td>
            <td class="border-2 border-black">手機</td>
            <td class="border-2 border-black">履歷書下載</td>
            <!-- <td class="border-2 border-black">接案邀請</td> -->
            <!-- <td class="border-2 border-black">選擇接案者</td> -->
        </tr>
        <tr v-for="(item, key) in localList" :key="key">
            <td class="border-2 border-black">{{ item.rating }}</td>
            <td class="border-2 border-black">{{ item.user_name }}</td>
            <td class="border-2 border-black">{{ item.email }}</td>
            <td class="border-2 border-black">{{ item.phone }}</td>
            <td class="border-2 border-black"><button class="border-2 border-black px-2 py-1 rounded-lg bg-blue-700 text-white" @click="pdfDownload(item.uuid)">下載</button></td>
            <!-- <td class="border-2 border-black"><button @click="sendReceiveInvite(item.uuid)">未發送</button></td> -->
            <!-- <td class="border-2 border-black"><button @click="addContractors(item.uuid)">點擊以選擇</button></td> -->
        </tr>
        </tbody>
    </table>
  </div>

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
