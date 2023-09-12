// 狀態資料庫
import { defineStore } from "pinia";

// 參數 1.資料庫名稱 2.資料庫內容
export default defineStore("dataStore", {
  //state 類似 vue data
  state: () => ({
    numTest: 1,
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
  },
});
