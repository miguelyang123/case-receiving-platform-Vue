<script>
import router from '../router';
import axios from 'axios';
// pinia 全域資料庫
import { mapState, mapActions } from "pinia";
// 匯入資料庫
import dataStore from "../store/dataStore";
import { Icon } from '@iconify/vue';

export default {
	components: {
		Icon,
	},
	data() {
		return {

			mapSelect:{
                mapShow: false,
                showAllMap: [],
                thisMap: "地區不限",
                thisMapId:"",

                onsite:"",
                remote:""
            },

			// 找到的資訊
			allUsers: [],
			pageAllUsers: [],

			showPage: 10,  // 顯示幾筆
			page: 1,      // 當前頁數
			allPage: 2,  // 總頁數
			pageNum: 5    // 分頁數量
		};
	},
	methods: {
		...mapActions(dataStore, ["setCassUser"]),

		thisCase(item) {
			axios.get("http://localhost:8080/search_user/with_Input", {
				params: {
					uuid: item.initiator
				}
			})
			.then(data => {
				console.log(data);

				if (data.data.code === "200") {

					// this.$router.push({
					//     path:'tackcasedetailspage',
					//     query:{
					//         thisList:JSON.stringify(item),
					//         thisUser:JSON.stringify(data.data.userInfoList)
					//     }
					// })

					this.setCassUser(data.data.userInfoList, item);
					this.$router.push("/case_only_search_page/case_only_search_details_page");
				}
			})
			// this.setCaseThisData(JSON.stringify(item));
		},

		// 上一頁
        pageBlank() {
            if (this.page !== 1) {
                this.page -= 1;
                this.content();
            }
        },
        //下一頁
        pageNext() {
            if (this.page !== this.allPage) {
                this.page += 1;
                this.content();
            }
        },

        // 製作分頁內容
        content(){
            let pageArrList = [];
            
            for(let i=(this.page-1)*this.showPage;i<this.allUsers.length;i++){
                if (pageArrList.length>=this.showPage) {
                    break;
                }
                pageArrList.push(this.allUsers[i]);
            }
            // this.$emit("pageArr",pageArrList);
            this.pageAllUsers = pageArrList;
        },

		// 抓取篩選與全部內容
        searchAllData(){
            // 所有案子變例
            axios.get("http://localhost:8080/search_case/with_user_id",{
                params:{
                    userId:dataStore().userInfo.uuid
                }
            })
            .then(data =>{
                this.allUsers = data.data.caseList;

                // Object.values(this.allUsers).forEach(item1 =>{
                //     Object.values(this.mapSelect.showAllMap).forEach(item2 =>{
                //         if(item1.location === item2.locationId){
                //             item1.location=item2.locationName;
                //         }
                //     })
                // })

                this.allUsers.map(item1 =>{
                    Object.values(this.mapSelect.showAllMap).forEach(item2 =>{
                        if(item1.location === item2.locationId){
                           return item1.location=item2.locationName;
                        }
                    })
                })

                console.log(data.data.caseList);
                console.log(this.mapSelect.showAllMap);

                this.allPage = Math.ceil((this.allUsers.length)/this.showPage); 
                this.content();
                
            })
            .catch(err =>{
                console.log(err);
            })
        },

		backPage(){
			router.push("/personal_info");
		},
	},

	computed:{
		pageNumCheck() {

			let fistPage, endPage;  // 分頁開始, 分頁結束
			let arr = [];

			if (this.allPage <= this.pageNum) {  // 當總頁數小於設定頁數
				fistPage = 1;
				endPage = this.allPage;
			} else if (this.page <= Math.floor(this.pageNum / 2) + 1) {   // 當前頁數 <= 設定頁數/2 +1
				fistPage = 1;
				endPage = this.pageNum;
			} else if (this.page + Math.floor(this.pageNum / 2) >= this.allPage) {  // 當前頁數 + 設定頁數/2 >= 總頁數
				endPage = this.allPage;
				fistPage = this.allPage - this.pageNum + 1;
			} else {
				fistPage = this.page - Math.floor(this.pageNum / 2);
				endPage = this.page + Math.floor(this.pageNum / 2);
			}

			for (let i = fistPage; i <= endPage; i++) {
				arr.push(i);
			}

			this.content();

			return arr;
		},
	},

	created(){
		// 所有城市變例
        let locationAPI = ["onsite","remote"];
        
        locationAPI.forEach(item =>{
            axios.get("http://localhost:8080/location_api/get_"+item)
            .then(data =>{
                let arr=[];
                if(data.data.code==="200"){

                    Object.values(data.data.locationList).forEach(item => {
                        arr.push(item);
                    })

                    if(item==="onsite"){
                        this.mapSelect.onsite =arr;
                        this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(this.mapSelect.onsite);
                    }else{
                        this.mapSelect.remote = arr;
                        this.mapSelect.showAllMap = this.mapSelect.showAllMap.concat(this.mapSelect.remote);
                    }

                    console.log(arr);
                }
            })
            .catch(err =>{
                console.log(err);
            })
        });

		this.searchAllData();
	},
}
</script>

<template>
	<div class="w-[85%] mx-auto py-6 mb-[10rem]">

		<button class="custom-btn btn-5" @click="backPage">返回</button>

		<h1 class="text-3xl font-bold" style="margin-block: 2rem 3rem;writing-mode: horizontal-tb;">已接的案子</h1>
		<div class=" relative cursor-pointer" @click="thisCase(item)" v-for="(item, index) in pageAllUsers">
			<h1 class=" font-bold text-xl">{{ item.caseName }}</h1>
			<div class="flex">
				<p class="text-red-600 font-bold text-lg">{{ item.budget }}</p>
				<div class="flex items-center ml-4">
					<Icon width="25" icon="mdi:map-marker" class="text-[#EF879A]" />
					<p class="text-[#7F7F7F] ml-2 font-bold text-lg">{{ item.location }}</p>
				</div>
				<div class="flex items-center ml-4">
					<Icon width="25" icon="material-symbols:date-range" class="text-[#545454]" />
					<p class="text-[#7F7F7F] ml-2 font-bold text-lg">{{ item.deadline.split("T")[0] }}</p>
					<!-- item.deadline.toLocaleDateString() -->
				</div>
			</div>

			<!-- truncate 多行文本溢出省略顯示 -->
			<!-- CSS
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
          -->
			<p class=" text-xl font-bold py-6 pl-6 pr-12 whitespace-nowrap truncate">{{ item.content }}</p>

			<div class=" text-end py-3">
				<RouterLink to="/">
					<button type="button"
						class=" text-white rounded-lg bg-[#FF6E6E] py-3 px-6 mr-12 text-2xl font-bold hover:scale-105 active:scale-95">詳細資訊</button>
				</RouterLink>
			</div>
			<hr class="my-6 border-[#cecece]">
		</div>

		<div v-if="pageAllUsers.length <= 0" class="text-center">
			<h1 class="text-2xl font-bold my-6">未搜尋到你想找的案子</h1>
			<p class="text-xl">你可以嘗試更換你的篩選條件或關鍵字</p>
		</div>

		<div v-if="pageAllUsers.length > 0" class="flex justify-end items-end">
			<button v-if="page !== 1" type="button" class="pageBtn" @click="pageBlank()">上一頁</button>

			<button v-if="page > Math.floor(this.pageNum / 2) + 1" type="button" class="pageBtn"
				@click="page = 1">1</button>
			<div v-if="page > Math.floor(this.pageNum / 2) + 2" type="button" class="mx-3 text-lg font-bold">...</div>

			<button type="button" :class="{ 'pageBtn': true, 'bg-[#ffc8d1] text-[#E12D4A]': index === page }"
				v-for="(index) in pageNumCheck" @click="page = index">{{ index }}</button>

			<div v-if="page + Math.floor(this.pageNum / 2) + 1 < allPage" type="button"
				class="mx-3 text-[1.125rem] font-bold">
				...</div>
			<button v-if="page + Math.floor(this.pageNum / 2) < allPage" type="button" class="pageBtn"
				@click="page = allPage">{{ allPage }}</button>

			<button v-if="page !== allPage" type="button" class="pageBtn" @click="pageNext()">下一頁</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
body {
	background: #e0e5ec;
}

// 分頁
.pageBtn {
    border: gray 2px solid;
    padding: 0.75rem;
    margin: 0 0.25rem;
    font-size: 1.125rem;
    line-height: 1.125rem;
    font-weight: bold;

    &:hover {
        background: #ffc8d1;
    }
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
</style>
