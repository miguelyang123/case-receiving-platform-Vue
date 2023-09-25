<script>
import { mapActions } from 'pinia';
import  defineStore  from '../store/dataStore'
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import axios from 'axios';
// import PageVue from "../components/Page.vue";
export default {
    components: {
        RouterLink,Icon,
    },

    data() {
        return {
            thisType: ["text-red-600", ""],

            mapSelect:{
                mapShow: false,
                showAllMap: [],
                thisMap: "地區不限",
                thisMapId:"",

                onsite:"",
                remote:""
            },
            
            // priceShow: false,
            // price: ["案件金額不限", "5千以下", "5001 ~ 1萬", "1萬 ~ 5萬"],
            // thisPrice: "案件金額",

            price:{
                minPrice:'',
                maxPrice:''
            },

            thisKeyWord: "",  // 關鍵字

            // 找到的資訊
            allUsers: [],
            pageAllUsers:[],

            showPage:10,  // 顯示幾筆
            page: 1,      // 當前頁數
            allPage: 2,  // 總頁數
            pageNum: 5    // 分頁數量
        }
    },
    methods: {

        ...mapActions(defineStore,["setCassUser"]),

        thisCase(item){
            axios.get("http://localhost:8080/search_user/with_Input",{
                params:{
                    uuid:item.initiator
                }
            })
            .then(data =>{
                console.log(data);

                if(data.data.code==="200"){

                    // this.$router.push({
                    //     path:'tackcasedetailspage',
                    //     query:{
                    //         thisList:JSON.stringify(item),
                    //         thisUser:JSON.stringify(data.data.userInfoList)
                    //     }
                    // })

                    this.setCassUser(data.data.userInfoList,item);
                    this.$router.push("/tackcasedetailspage");
                }
            })
            // this.setCaseThisData(JSON.stringify(item));
        },

        // 顯示點選哪個類別
        thisType1(index) {
            if (index === 0) {
                if (this.thisType[1] === 'onsite') { 
                    this.thisType[1] = '';
                    this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(this.mapSelect.onsite.concat(this.mapSelect.remote));
                } else { 
                    this.thisType[1] = 'onsite'; 
                    this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(this.mapSelect.onsite);
                }
            } else {
                if (this.thisType[1] === 'remote') { 
                    this.thisType[1] = '' ;
                    this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(this.mapSelect.onsite.concat(this.mapSelect.remote));
                } else { 
                    this.thisType[1] = 'remote' ;
                    this.mapSelect.showAllMap = [{locationId:"",locationName:"地區不限"}].concat(this.mapSelect.remote);
                }
            }
        },

        changeMap(index1) {
            this.mapSelect.thisMap = index1.locationName;
            this.mapSelect.mapShow = false;
            this.searchAllData(index1.locationId);
        },

        changePrice(index1) {
            this.thisPrice = index1;
            this.priceShow = false;
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
        searchAllData(lo_id){
            this.mapSelect.thisMapId=lo_id;
            // 所有案子變例
            axios.get("http://localhost:8080/search_case/with_param",{
                params:{
                    searchKeyword:this.thisKeyWord,  // 搜尋名稱與內文關鍵字
                    minBudget:this.price.minPrice,   // 最小(等於)預算
                    maxBudget:this.price.maxPrice,  // 最大(等於)預算
                    location:lo_id,   //  地點(location_id)
                    deadlineFrom:"", // 結案日從輸入日期
                    deadlineTo:"",  // 結案日到輸入日期
                    caseClass:this.thisType[1],  // onsite (現場)| remote (遠端) 
                    initiator:"",  // 搜尋發案者(id)
                    onShelf:"",  // 搜尋上下架
                    currentStatus:null,  // 目前案子狀態
                    caseRating:null  // 案子完成評價
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
        }
    },

    computed: {
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

        this.searchAllData("");
    }
}
</script>
<template>
    <div class="w-[85%] mx-auto py-6 mb-[10rem]">
        <h1 class="text-3xl font-bold">找案件</h1>
        <div class="flex my-6">
            <button class="findCaseType group" @click="thisType1(0)">
                <Icon icon="fluent-mdl2:join-online-meeting" :class="{ 'group-hover:text-red-600 ':true,  'text-red-600': thisType[1] === 'onsite' }"
                    width="65"></Icon>
                <p :class="{ 'group-hover:text-red-600 ':true, 'text-red-600': thisType[1] === 'onsite' }">遠端</p>
            </button>
            <button class="findCaseType group" @click="thisType1(1)">
                <Icon icon="healthicons:domestic-worker" :class="{ 'group-hover:text-red-600 ':true,  'text-red-600': thisType[1] === 'remote' }"
                    width="65"></Icon>
                <p :class="{ 'group-hover:text-red-600 ':true,  'text-red-600': thisType[1] === 'remote' }">線場</p>
            </button>
        </div>
        <div class="flex ">
            <div class=" relative w-[225px]" @mouseover="mapSelect.mapShow = true" @mouseleave="mapSelect.mapShow = false">
                <div class=" filter">
                    <p>{{ mapSelect.thisMap }}</p>
                    <p class="text-lg ml-3">V</p>
                </div>
                <div v-if="mapSelect.mapShow" class="mapAndPriceSelect shadow-xl">
                    <div v-for="(item, index) in mapSelect.showAllMap"
                        class=" text-[1rem] font-bold py-3 pl-6 cursor-pointer hover:bg-blue-300 hover:text-white"
                        @click="changeMap(item)">
                        <input type="radio" :id="'showMap' + index" name="thismap" class="mr-3 cursor-pointer" :value="item.locationId"
                            :checked="mapSelect.thisMap === item.locationName">
                        <label :for="'showMap' + index" class="cursor-pointer">{{ item.locationName }}</label>
                    </div>
                </div>
            </div>

            <!-- <div class=" relative" @mouseover="priceShow = true" @mouseleave="priceShow = false">
                <div class=" filter" style="width: 210px;">
                    <p>{{ thisPrice }}</p>
                    <p class="text-lg ml-3">V</p>
                </div>
                <div v-if="priceShow" class="mapAndPriceSelect shadow-xl">
                    <div v-for="(item, index) in price"
                        class="text-[1rem] font-bold py-3 pl-6 pr-10 cursor-pointer hover:bg-blue-300 hover:text-white"
                        @click="changePrice(item)">
                        <input type="radio" :id="'price' + index" name="thisPrice" class="mr-3 cursor-pointer" :value="item"
                            :checked="thisPrice === item">
                        <label :for="'price' + index" class="cursor-pointer">{{ item }}</label>
                    </div>
                </div>
            </div> -->

            <div class="flex items-center mx-6">
                <input type="number" placeholder="請輸入最小預算" v-model="price.minPrice" oninput="if(value<0)value='';if(value>100000000)value=100000000" class="searchPrice" @change="searchAllData(mapSelect.thisMapId)">
                <p>~</p>
                <input type="number" placeholder="請輸入最大預算" v-model="price.maxPrice" oninput="if(value<0)value='';if(value>100000000)value=100000000" class="searchPrice" @change="searchAllData(mapSelect.thisMapId)">
            </div>
            
            <div class=" flex">
                <input type="text" placeholder="請輸入關鍵字" v-model="thisKeyWord"  class="searchKeyWords" @change="searchAllData(mapSelect.thisMapId)">
                <div class="icon" @click="searchAllData(mapSelect.thisMapId)">
                    <Icon icon="tabler:search" width="30" />
                </div>
            </div>
        </div>

        <hr class="mt-6 mb-12 border-[#aaa9a9]">

        <!-- <RouterLink :to="{ name: 'TackCaseDetailsPage', params: { thisList: JSON.stringify(item) } }" class=" relative" -->
        <div class=" relative cursor-pointer" @click="thisCase(item)"
            v-for="(item, index) in pageAllUsers">
            <h1 class=" font-bold text-xl">{{ item.caseName }}</h1>
            <div class="flex">
                <p class="text-red-600 font-bold text-lg">{{ item.budget }}</p>
                <div class="flex items-center ml-4">
                    <img src="../assets/img/TackCaseImg/location.png" alt="" width="15" class="h-[15px]">
                    <p class="text-[#7F7F7F] ml-2 font-bold text-lg">{{ item.location }}</p>
                </div>
                <div class="flex items-center ml-4">
                    <img src="../assets/img/TackCaseImg/date.png" alt="" width="15" class="h-[15px]">
                    <p class="text-[#7F7F7F] ml-2 font-bold text-lg">{{  item.deadline.split("T")[0]}}</p> 
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
                    <button type="button" class=" text-white rounded-lg bg-[#FF6E6E] py-3 px-6 mr-12 text-2xl font-bold hover:scale-105 active:scale-95"> 我要接案</button>
                </RouterLink>
            </div>
            <hr class="my-6 border-[#cecece]">
        </div>

        <div v-if="pageAllUsers.length<=0" class="text-center">
            <h1 class="text-2xl font-bold my-6">未搜尋到你想找的案子</h1>
            <p class="text-xl">你可以嘗試更換你的篩選條件或關鍵字</p>
        </div>

        <div v-if="pageAllUsers.length>0" class="flex justify-end items-end">
            <button v-if="page !== 1" type="button" class="pageBtn" @click="pageBlank()">上一頁</button>

            <button v-if="page > Math.floor(this.pageNum / 2) + 1" type="button" class="pageBtn" @click="page = 1">1</button>
            <div v-if="page > Math.floor(this.pageNum / 2) + 2" type="button" class="mx-3 text-lg font-bold">...</div>

            <button type="button" :class="{ 'pageBtn': true, 'bg-[#ffc8d1] text-[#E12D4A]': index === page }"
                v-for="(index) in pageNumCheck" @click="page = index">{{ index }}</button>

            <div v-if="page + Math.floor(this.pageNum / 2) + 1 < allPage" type="button" class="mx-3 text-[1.125rem] font-bold">
                ...</div>
            <button v-if="page + Math.floor(this.pageNum / 2) < allPage" type="button" class="pageBtn"
                @click="page = allPage">{{ allPage }}</button>

            <button v-if="page !== allPage" type="button" class="pageBtn" @click="pageNext()">下一頁</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 遠端 現場
.findCaseType {
    text-align: center;
    color: #7F7F7F;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    margin: 0 1.5rem;

    &:hover {
        scale: 1.05;
    }

    &:active {
        scale: 0.95;
    }
}

// 案件金額 地區 選擇框
.filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    margin-right: 0.75rem;
    border: 2px #454545 solid;
    border-radius: 0.5rem;
    
    color: #454545;
    font-weight: bold;
    cursor: pointer;
}

// 關鍵字與金額
.searchKeyWords,.searchPrice {
    outline: none;
    border: 2px #454545 solid;
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.5rem 1rem;
    color: #454545;
    font-weight: bolder;
    cursor: pointer;

    &::placeholder {
        color: #454545;
    }

    &+.icon {
        background-color: #7F7F7F;
        padding: 0.75rem;
        border-radius: 0 0.5rem 0.5rem 0;
        cursor: pointer;

        &:hover {
            scale: 1.05;
        }

        &:active {
            scale: 0.95;
        }
    }
}
.searchPrice{
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    width: 10vw;
    &::-webkit-inner-spin-button,&::-webkit-outer-spin-button{
        display: none;
    }

    &+p{
        margin: 0 1rem;
        font-weight: 700;
        font-size: 2rem;
    }
}

// 下拉選單
.mapAndPriceSelect {
    // padding: 0.75rem 2rem 0.75rem 1.5rem;
    width: inherit;
    position: absolute;
    background: white;
    max-height: 200px;
    overflow: auto;
    border: 2px rgb(200, 200, 200) solid;
    border-radius: 0.75rem;
    z-index: 50;

    &::-webkit-scrollbar-thumb {
        background: #9b9b9b;
        border-radius: 9999px;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }
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
</style>