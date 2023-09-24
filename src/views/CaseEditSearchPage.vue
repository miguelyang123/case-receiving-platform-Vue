<script>
import router from '../router';
import axios from 'axios';
// pinia 全域資料庫
import { mapState, mapActions } from "pinia";
// 匯入資料庫
import dataStore from "../store/dataStore";

export default {  
    data() {
        return {

            uuid: "bdcd914c-43ce-42d3-983c-00acd5694fc4",
            initiator: "bdcd914c-43ce-42d3-983c-00acd5694fc4",

            // data: [
            //     {
            //         receiveCaseCount: 0,
            //         caseName: "漆油漆",
            //         caseDeadLine: "2023-09-23 00:00:00",
            //         onShelf: true,
            //         receiveCaseStatus: 0
            //     },
            //     {
            //         receiveCaseCount: 2,
            //         caseName: "寫程式",
            //         caseDeadLine: "2023-09-23 00:00:00",
            //         onShelf: true,
            //         receiveCaseStatus: 0
            //     },
            // ],
            localList: null,
            receiveAccountList: [
              {
                id: "bdcd914d-43ce-42d3-983c-00acd5694fc4",
              },
              {
                id: "bdcd914e-43ce-42d3-983c-00acd5694fc4",
              },
            ]
      };
    },
    computed: {
      //參數 1.資料庫 2.要取用的 state / getters
      ...mapState(dataStore, ["numTest", "caseEditId"]),
    },
    methods: {
        ...mapActions(dataStore, ['setCaseEditId']),
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
            console.log("01");
        //   axios.get('http://localhost:8080/search_case/with_param?initiator=bdcd914c-43ce-42d3-983c-00acd5694fc4', {
          axios.get('http://localhost:8080/search_case/with_param'
            // responseType: 'blob', // important
          )
          .then((response) => {
            console.log("02");
            console.log("response: "+response);
            console.log("response.data.caseList: "+response.data.caseList);
            this.responseLocal = response;
            console.log("code: "+this.responseLocal.data.code);
            console.log("message: "+this.responseLocal.data.message);
            console.log("caseList: "+this.responseLocal.data.caseList);
            
            if(this.responseLocal.data.code === "200"){
                
            console.log("03");
              this.localList = this.responseLocal.data.caseList;
                console.log("localList: "+this.localList);
            }
          });
        },
        // countReceiveAccount(){

        //   this.localList.

        // },
        toEdit(id){

          // console.log("id: "+id);
          // 用pinia存?(變數不能在這改(請用 pinia的方法帶變數(做回傳)))
          // this.caseEditId = id;
          // console.log("this.caseEditId: "+this.caseEditId);
          this.setCaseEditId(id);
          router.push("/case_edit_page");

        },

      },
      mounted() {
        // this.getLocationInfo();

        this.findCaseWithInput();

        // this.countReceiveAccount();

      },
      
}

</script>

<template>
<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
  <!-- <h1>Speed接案網</h1> -->
  <!-- <p>Personal Info</p> -->

  <p>Case Edit Page</p>

  <div id="app">
    <table class="table ml-10">
        <thead>
        </thead>
        <tbody>
        <tr>
            <td class="border-2 border-black">操作</td>
            <td class="border-2 border-black">接案人數</td>
            <td class="border-2 border-black">案子名稱</td>
            <td class="border-2 border-black">案子到期日</td>
            <td class="border-2 border-black">上/下架</td>
            <td class="border-2 border-black">接案狀態</td>
        </tr>
        <tr v-for="(item, key) in localList" :key="key">
            <td class="border-2 border-black"><button @click="toEdit(item.id)">編輯</button></td>
            <td class="border-2 border-black">?</td>
            <td class="border-2 border-black">{{ item.caseName }}</td>
            <td class="border-2 border-black">{{ item.deadline }}</td>
            <td class="border-2 border-black">{{ item.onShelf }}</td>
            <td class="border-2 border-black">{{ item.currentStatus }}</td>
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
