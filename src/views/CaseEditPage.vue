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

            // caseName: null,
            // caseBudget: null,
            // caseDeadline: null,
            // caseCategory: null,
            // caseLocation: null,
            // caseContent: null,
            // currentStatus: null,
		        // onShelf: null,
            
            caseName: null,
            caseBudget: null,
            caseDeadline: null,
            caseCategory: null,
            caseLocation: null,
            caseContent: null,
            currentStatus: null,
		        onShelf: true,

            locationSelected: null,
            categoryKey: null,

            responseLocal: null,
            localList: null,

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
            },
            

      };
    },
    computed: {
      //參數 1.資料庫 2.要取用的 state / getters
      ...mapState(dataStore, ["numTest", "caseEditId", "userInfo"]),
    },
    methods: {
        ...mapActions(dataStore, ['setCaseReceiveData', 'setCaseTemp']),
        pwdflagTrue() {
            this.pwdFlag = true;
        },
        pwdflagFalse() {
            this.pwdFlag = false;
        },
        registerRouterPush() {
            router.push("/register_page")
        },
        getOnSiteInfo(){
          axios.get('http://localhost:8080/location_api/get_onsite', {
            // responseType: 'blob', // important
            timeout: 20000,
          }).then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
              this.localList = this.responseLocal.data.locationList;
            }
          });
          
        },
        getRemoteInfo(){
          axios.get('http://localhost:8080/location_api/get_remote', {
            // responseType: 'blob', // important
            timeout: 20000,
          }).then((response) => {
            this.responseLocal = response;
            if(this.responseLocal.data.code === "200"){
              this.localList = this.responseLocal.data.locationList;
            }
          });
          
        },
        categoryChange(event) {
            if(event.target.value === "1") {
              this.getOnSiteInfo();
            } else {
              this.getRemoteInfo();
            }
            
        },
        categoryChangeNew(value) {
            if(value === "1") {
              this.getOnSiteInfo();
            } else {
              this.getRemoteInfo();
            }
            
        },
        locationChange(event) {
            const pattern = /1/;
            if(event.target.value.match(pattern)) {
              this.getOnSiteInfo();
              this.caseCategory = "1";
              this.caseLocation = event.target.value;
            } else {
              this.getRemoteInfo();
              this.caseCategory = "2";
              this.caseLocation = event.target.value;
            }
            
        },
        locationChangeNew(value) {
            const pattern = /1/;
            if(value.match(pattern)) {
              this.getOnSiteInfo();
              this.caseCategory = "1";
              this.caseLocation = value;
            } else {
              this.getRemoteInfo();
              this.caseCategory = "2";
              this.caseLocation = value;
            }
            
        },
        // checkAllValue(){
          
        //   console.log("caseName: "+this.caseName);
        //   console.log("caseBudget: "+this.caseBudget);
        //   console.log("caseDeadline: "+this.caseDeadline);
        //   console.log("caseCategory: "+this.caseCategory);
        //   console.log("caseLocation: "+this.caseLocation);
        //   console.log("caseContent: "+this.caseContent);
            
        // },
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
            this.postData.onShelf = this.onShelf;
            this.postData.initiator = this.uuid;
            // console.log("this.postData.id: "+this.postData.id);
            // console.log("this.postData.caseName: "+this.postData.caseName);
            // console.log("this.postData.budget: "+this.postData.budget);
            // console.log("this.postData.location: "+this.postData.location);
            // console.log("this.postData.content: "+this.postData.content);
            // console.log("this.postData.deadline: "+this.postData.deadline);
            // console.log("this.postData.initiator: "+this.postData.initiator);
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


        },
        onShelfChange(){
            // if(onShelf === true){
            //     onShelf = false;
            // } else{
                this.onShelf = !this.onShelf;
            // }
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
              // console.log("localList: "+this.localList);

              this.localList.forEach(item => {
                if(item.id === this.caseEditId){
                  this.setCaseTemp(item);
                  // console.log("id:"+item.id);
                  // console.log("caseName: "+item.caseName);
                  this.caseName = item.caseName;
                  // console.log("budget: "+item.budget);
                  this.caseBudget = item.budget;
                  // console.log("content: "+item.content);
                  this.caseContent = item.content;
                  // console.log("deadline: "+item.deadline.substring(0, 10));
                  this.caseDeadline = item.deadline.substring(0, 10);
                  // console.log("caseClass: "+item.caseClass);
                  this.categoryKey = item.caseClass;
                  if(this.categoryKey === "onsite"){
                    this.categoryKey = "1";
                    this.caseCategory = "1";
                  }
                  else{
                    this.categoryKey = "2";
                    this.caseCategory = "2";
                  }
                  this.categoryChangeNew(this.categoryKey);
                  // console.log("initiator: "+item.initiator);
                  // console.log("location: "+item.location);
                  this.caseLocation = item.location;
                  this.locationSelected = this.caseLocation;
                  this.locationChangeNew(this.locationSelected);
                  // console.log("onShelf: "+item.onShelf);
                  this.onShelf = item.onShelf;
                  // console.log("currentStatus: "+item.currentStatus);
                  this.currentStatus = item.currentStatus;
                  // console.log("caseRating: "+item.caseRating);
                
                }});
                

            }
          });
        },
        searchUserByCaseId(){
            // console.log("01");
        //   axios.get('http://localhost:8080/search_case/with_param?initiator=bdcd914c-43ce-42d3-983c-00acd5694fc4', {
          // axios.get('http://localhost:8080/edit_case_page/search_user_by_caseid?caseId='+this.caseEditId+'&isAccepted=false'
          axios.get('http://localhost:8080/edit_case_page/search_user_by_caseid?caseId='+this.caseEditId
            // responseType: 'blob', // important
          )
          .then((response) => {
            // console.log("02");
            // console.log("response: "+response);
            // console.log("response.data.userInfoList: "+response.data.userInfoList);
            this.responseLocal = response;
            // this.caseReceiveData = this.responseLocal;
            // console.log("code: "+this.responseLocal.data.code);
            // console.log("message: "+this.responseLocal.data.message);
            // console.log("userInfoList: "+this.responseLocal.data.userInfoList);
            this.setCaseReceiveData(this.responseLocal.data.userInfoList);
            
            if(this.responseLocal.data.code === "200"){
                
            // console.log("03");
              this.localList = this.responseLocal.data.userInfoList;
                // console.log("localList: "+this.localList);
                // this.localList.forEach(item => {
                //     console.log("userName: "+item.user_name);
                // });
            }
          });
        },
        backPage(){
          router.push("/case_edit_search_page");
        },

      },
      mounted() {
        // this.getLocationInfo();

        // console.log("id: "+this.caseEditId);

        // this.categoryChangeNew(this.categoryKey);
        // // 先給 假資料
        // this.caseName = "123";
        // this.caseBudget = 100;
        // this.caseDeadline = "2023-09-24";
        // // this.caseCategory = "onsite";
        // // this.caseCategory = "現場";
        // // this.caseCategory = 1;
        // this.categoryKey = "1";
        // this.categoryChangeNew(this.categoryKey);
        // // this.caseLocation = "1S";
        // // this.caseLocation = "1S";
        // this.locationSelected = "1S";
        // this.caseContent = "123";
        // this.currentStatus = "Not Started";
        // this.onShelf = true;


        this.uuid = this.userInfo.uuid;
        // console.log("this.uuid: "+this.uuid);

        this.findCaseWithInput();
        this.searchUserByCaseId();

      },
      
}

</script>

<template>
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
  <!-- <h1>Speed接案網</h1> -->
  <!-- <p>Personal Info</p> -->
  <p class="text-5xl">案子修改畫面</p>
  <button class="custom-btn btn-5 relative left-3/4" @click="backPage">返回</button>
  <div class="flex m-4 absolute top-40 right-10">
    <div class="flex flex-col justify-center items-center text-center">
        <button class="custom-btn btn-5" @click="editCase">提交</button><br/>
        <!-- <button class="custom-btn btn-4"><a href="/case_edit_receive_user_page">接案人資訊</a></button><br/> -->
        <RouterLink class="custom-btn btn-4" to="/case_edit_receive_user_page"><span>接案人資訊</span></RouterLink>
        <p class="text-red-600">{{ currentStatus }}</p>
        <p class="mt-4">案子上/下架</p>
        <button v-if="onShelf === true" class="custom-btn btn-4" @click="onShelfChange" type="button">上架</button><br v-if="onShelf === true"/>
        <button v-if="onShelf === false" class="custom-btn btn-4" @click="onShelfChange" type="button">下架</button><br v-if="onShelf === false"/>
        <p class="">案子完成確認</p>
        <!-- <button class="custom-btn btn-4"><a href="/case_done_check_page">確認</a></button><br/> -->
        <RouterLink class="custom-btn btn-4" to="/case_done_check_page"><span>確認</span></RouterLink><br/>
    </div>
  </div>
  <div class="flex mx-4">
    <p class="mr-2">案子名稱 : </p>
    <div>
      <input type="text" class="border-2 border-black" v-model="caseName">
      <p v-if="caseName == ''" class="text-red-600">案子名稱格式錯誤</p>
      <p v-else class="text-white">ok</p>
    </div>
  </div>
  <div class="flex">
    <div class="flex flex-col">
        <div class="flex m-4">
            <p class="mr-2">案子預算 : </p>
            <div>
              <input type="number" class="border-2 border-black" v-model="caseBudget">
              <p v-if="!(caseBudget > 0)" class="text-red-600">案子預算格式錯誤</p>
              <p v-else class="text-white">ok</p>
            </div>
        </div>
        <div class="flex m-4">
            <p class="mr-2">案子期限 : </p>
            <div>
              <input type="date" class="border-2 border-black" v-model="caseDeadline">
              <p v-if="caseDeadline == null" class="text-red-600">案子期限格式錯誤</p>
              <p v-else class="text-white">ok</p>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <div class="flex m-4">
            <p class="mr-2">案子類型 : </p>
            <!-- <select v-model="caseCategory" name="" id=""> -->
            <!-- <select @change="categoryChange()"> -->
            <div>
              <select name="LeaveType" @change="categoryChange($event)" class="form-control border-2 border-black" v-model="categoryKey">
                <option value="1">現場</option>
                <option value="2">遠端</option>
              </select>
              <p v-if="categoryKey == null" class="text-red-600">案子類型格式錯誤</p>
              <p v-else class="text-white">ok</p>
            </div>
        </div>
        <div class="flex m-4">
            <p class="mr-2">案子地點 : </p>
            <div>
              <select class="border-2 border-black" v-model="locationSelected" @change="locationChange($event)">
                <option v-for="(item, index) in localList" :value=item.locationId :key="index">{{ item.locationName }}</option>
              </select>
              <p v-if="locationSelected == null" class="text-red-600">案子地點格式錯誤</p>
              <p v-else class="text-white">ok</p>
            </div>
          </div>
    </div>
  </div>
  <div class="m-4">
    <p>案子內文 : </p>
    <textarea class="w-2/3 h-screen border-2 border-black" v-model="caseContent" rows="1" cols="50" wrap="physical" name="comments">

    </textarea>
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
