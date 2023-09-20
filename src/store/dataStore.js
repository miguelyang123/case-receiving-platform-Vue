// 狀態資料庫
import { defineStore } from "pinia";

// 參數 1.資料庫名稱 2.資料庫內容
export default defineStore("dataStore", {
  //state 類似 vue data
  state: () => ({
    numTest: 1,
    
    // 分頁處理(暫時停用)
    // pageContent:{
    //   arrList:"",  // 所有資料
    //   showPage:5,
    //   page:1, // 當前頁面
    //   allPage:1,  // 總數
    //   pageNum:5, // 分頁數
    // }
    userInfo:null, //登入畫面後端回傳的userInfo(object)
  }),
  //getters 類似 computed
  //沒有this
  getters: {
    //本身就是一個變數
    // locationInfo: (state) => {
    //   return `現在的位置是: ${state.location}`;
    // },
  },
  //actions 類似 methods
  //有this
  actions: {
    // getLocation() {
    //   console.log(this.location);
    // },
    // setLocation(num) {
    //   this.location = num;
    // },

    // 分頁處理 (暫時停用)
    // getThisPage(){
    //   return this.pageContent.thisPage;
    // },
    // setThisPage(thisPage1){
    //   this.pageContent.thisPage = thisPage1;
    // },
    // getAllPageContent(){
    //   return this.pageContent;
    // },
    // setAllPageContent(thisallData){
    //   this.pageContent.arrList = thisallData.allUsers;
    //   this.pageContent.showPage = thisallData.showPage;
    //   this.pageContent.page = thisallData.page;
    //   this.pageContent.allPage = thisallData.allPage;
    //   this.pageContent.pageNum = thisallData.pageNum;
    // }
    setUserInfo(userInfo) {
      //設置 userInfo
      this.userInfo = userInfo;
    },
  },
  persist:[
    // persist:true, // 默認全部持久化配置
    {
      paths:["numTest"],  // 要持久化的值(可多個)
      storage:localStorage  // 用 localStorage 儲存
    },
    {
      paths:["userInfo"],  // 要持久化的值(可多個)
      storage:localStorage  // 用 localStorage 儲存
    },
  ]
});
