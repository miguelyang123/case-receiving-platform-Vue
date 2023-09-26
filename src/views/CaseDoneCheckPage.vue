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
      
            uuid: null,
            // initiator: "bdcd914c-43ce-42d3-983c-00acd5694fc4",

            caseName: null,
            caseBudget: null,
            caseDeadline: null,
            createdDate: null,
            caseCategory: null,
            caseLocation: null,
            caseContent: null,
            currentStatus: null,
		        onShelf: null,

            caseRating: null,

            responseLocal: null,
            localList: null,
            categoryKey: null,

            postData: {
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
              caseRating: null, // 預定加入此參數
            },
            

      };
    },
    computed: {
      //參數 1.資料庫 2.要取用的 state / getters
      ...mapState(dataStore, ["numTest", "caseEditId", "userInfo"]),
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
        findCaseWithInput(){
          console.log("========================");
          console.log("this.caseEditId: "+this.caseEditId);
          axios.get('http://localhost:8080/search_case/with_param?initiator='+this.uuid
            // responseType: 'blob', // important
          )
          .then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
              this.localList = this.responseLocal.data.caseList;
              console.log("localList: "+this.localList);
              console.log("this.caseEditId: "+this.caseEditId);
              this.localList.forEach(item => {
                if(item.id === this.caseEditId){
                  // console.log("id:"+item.id);
                  console.log("caseName: "+item.caseName);
                  this.caseName = item.caseName;
                  console.log("budget: "+item.budget);
                  this.caseBudget = item.budget;
                  console.log("content: "+item.content);
                  this.caseContent = item.content;
                  console.log("deadline: "+item.deadline.substring(0, 10));
                  this.caseDeadline = item.deadline.substring(0, 10);
                  console.log("caseClass: "+item.caseClass);
                  this.categoryKey = item.caseClass;
                  if(this.categoryKey === "onsite"){
                    this.categoryKey = "1";
                    this.caseCategory = "1";
                  }
                  else{
                    this.categoryKey = "2";
                    this.caseCategory = "2";
                  }
                  // this.categoryChangeNew(this.categoryKey);
                  // console.log("initiator: "+item.initiator);
                  console.log("location: "+item.location);
                  this.caseLocation = item.location;
                  this.locationSelected = this.caseLocation;
                  // this.locationChangeNew(this.locationSelected);
                  console.log("onShelf: "+item.onShelf);
                  this.onShelf = item.onShelf;
                  console.log("currentStatus: "+item.currentStatus);
                  this.currentStatus = item.currentStatus;
                  // this.createdDate = item.createdDate;
                  console.log("caseRating: "+item.caseRating);
                
                }});
                

            }
          });
        },
        editCase(){
          
            // this.postData.id = 0;
            this.postData.id = this.caseEditId;
            this.postData.caseName = this.caseName;
            this.postData.budget = this.caseBudget;
            this.postData.location = this.caseLocation;
            this.postData.content = this.caseContent;
            // this.postData.deadline = this.caseDeadline+"-00-00-00.00";
            this.postData.deadline = this.caseDeadline+"T00:00:00";
            // console.log("this.postData.deadline: "+this.postData.deadline);
            // this.postData.deadline = null;
            if(this.caseRating > 5){
              alert("輸入不能超過5!");
              // router.push("/case_done_check_page");
            }
            else{
              this.postData.caseRating = this.caseRating;
              this.postData.onShelf = this.onShelf;
              this.postData.initiator = this.uuid;
              console.log("this.postData.id: "+this.postData.id);
              console.log("this.postData.caseName: "+this.postData.caseName);
              console.log("this.postData.budget: "+this.postData.budget);
              console.log("this.postData.location: "+this.postData.location);
              console.log("this.postData.content: "+this.postData.content);
              console.log("this.postData.deadline: "+this.postData.deadline);
              console.log("this.postData.initiator: "+this.postData.initiator);
              axios.post('http://localhost:8080/case_api/edit_case', this.postData)
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
              
              router.push("/case_edit_search_page");
              
            }


        },
        finishCase(){
          
          this.findCaseWithInput();
		      this.onShelf = false;
          // this.postData.caseRating = this.caseRating; 預定加入此參數

          this.editCase();

        },
        backPage(){
          router.push("/case_edit_search_page");
        },

      },
      mounted() {
        // this.getLocationInfo();

        this.uuid = this.userInfo.uuid;

        console.log("id: "+this.caseEditId);

        this.findCaseWithInput();

        // 先給 假資料
        // this.caseName = "123";
        // this.caseBudget = 100;
        // this.caseDeadline = "2023-09-24";
        // this.categoryKey = "1";
        // // this.categoryChangeNew(this.categoryKey);
        // this.locationSelected = "1S";
        // this.caseContent = "123";
        // this.currentStatus = "Not Started";
        // this.onShelf = true;
        // this.caseRating = 0;

      },
      
}

</script>

<template>
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
  <!-- <h1>Speed接案網</h1> -->
  <!-- <p>Personal Info</p> -->
  
  <p class="text-4xl w-96">案子完成的確認畫面</p>
  <button class="custom-btn btn-5" @click="backPage">返回</button>
  
  案子評價:<input class="border-2 border-black" type="number" v-model="caseRating">
  <button class="custom-btn btn-5 relative left-1/3" @click="finishCase">提交</button>
    


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
