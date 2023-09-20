<script>
// import PageVue from "../components/Page.vue";
import { mapActions } from 'pinia';
import  defineStore  from '../store/dataStore';
import { Icon } from '@iconify/vue';
export default {
    // components:{
    //     PageVue,
    // },
    components: {
		Icon,
	},
    data() {
        return {
            // contentPage:{
            //     allUsers:[],
            //     pageAllUsers:[],

            //     showPage:5,  // 顯示幾筆
            //     page: 1,      // 當前頁數
            //     allPage: 5,  // 總頁數
            //     pageNum: 5    // 分頁數量
            // },  

            dataUser:[],
            allUsers:[],
            pageAllUsers:[],

            showPage:10,  // 顯示幾筆
            page: 1,      // 當前頁數
            allPage: 5,  // 總頁數
            pageNum: 5,    // 分頁數量
            // 當 allPage = pageNum -1 || allPage = pageNum +1 會顯示異常，但功能正常運作

            search:{
                name:"",
                rating:"全部",
                administrator:false,
                lockedStatus:false
            },

            edit:{
                email:"",
                name:"",
                phone:"",
                rating:0,
                administrator:false,
                lockedStatus:false
            },
        }
    },
    methods:{

        ...mapActions(defineStore,["setAllPageContent","getThisPage"]),

        searchAll(){
            
            if(this.search.rating === "全部"){
                this.search.rating = "";
            }else{
                this.search.rating = parseInt(this.search.rating);
            }

            fetch("http://localhost:8080/search_user/with_Input?name=" + this.search.name + "&rating=" + this.search.rating + "&admin=" + this.search.administrator + "&locked=" + this.search.lockedStatus )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.code==="200"){
                    this.allUsers = [];

                    data.userInfoList.forEach((item,index) => {
                        this.allUsers.push({
                            "email":item.email,
                            "姓名":item.user_name,
                            "手機":item.phone,
                            "評價":item.rating,
                            "身分權限": (item.administrator ? "管理者":"使用者"),
                            "鎖定狀態":(item.lockedStatus ? "是":"否")
                        });
                    });

                    this.allPage = Math.ceil((this.allUsers.length)/this.showPage); 
                    this.content();
                }
            })
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
        
    },
    mounted(){
        
    },
    created(){
        fetch("http://localhost:8080/search_user/get_all")
        .then(response => {
            if(response.status === 200){
                return response.json();
            }else{
                console.log(response.json());
            }
        })
        .then( data => {
            console.log(data);
            this.dataUser = data.userInfoList;
            this.allUsers=[];
            
            data.userInfoList.forEach((item,index) => {
                this.allUsers.push({
                    "email":item.email,
                    "姓名":item.user_name,
                    "手機":item.phone,
                    "評價":item.rating,
                    "身分權限": (item.administrator ? "管理者":"使用者"),
                    "鎖定狀態":(item.lockedStatus ? "是":"否")
                });
            });

            this.allPage = Math.ceil((this.allUsers.length)/this.showPage); 
            this.content();
            // this.setAllPageContent(this.allUsers,this.showPage,this.page,this.allPage,this.pageNum); 
            // this.setAllPageContent(this.contentPage);
        })
        .catch(errorTest => {
            console.log(errorTest);
        })     
    },

    computed: {
        pageNumCheck() {

            let fistPage, endPage;  // 分頁開始, 分頁結束
            let arr = [];

            if (this.allPage <= this.pageNum) {  // 當總頁數小於設定頁數
                fistPage = 1;
                endPage = this.allPage;
            } else if (this.page <= Math.floor(this.pageNum / 2)+1) {   // 當前頁數 <= 設定頁數/2 +1
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
}
</script>
<template>
    <div class="w-[70%] mx-auto">
       <table class="border-2 border-black border-collapse w-full my-12">
        <thead>
            <tr>
                <th colspan="7">
                    <div class="flex items-center justify-evenly">
                        <div class="flex my-3">
                            <input type="text" class="py-3 px-6  border border-[#e2e2e2] bg-[#d7d7d7] outline-none rounded-l-lg placeholder:text-[#494949]" placeholder="搜尋姓名" v-model="search.name" @change="searchAll">
                            <div class="bg-[#9f9f9f] p-3 rounded-r-lg cursor-pointer hover:scale-105 active:scale-95">
                                <Icon icon="mingcute:search-2-fill" width="25" />
                            </div>                  
                        </div>
                        <div>
                            <label class="text-xl">評價: </label>
                            <select name="" id="" class="border border-[#dbdbdb] py-2 w-[5rem] rounded-lg bg-[#cccccc]" v-model="search.rating" @change="searchAll">
                                <option v-for="(item,index) in Object.keys({'全部':'','5':'5','4':'4','3':'3','2':'2','1':'1'}).reverse() " :key="item" :value="item" class="bg-[#FFFFFF] text-center" @change="searchAll">{{ item }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xl">身分: </label>
                            <select name="" id="" class="border border-[#dbdbdb] py-2 w-[5rem] rounded-lg bg-[#cccccc]" v-model="search.administrator" @change="searchAll">
                                <option v-for="(item,index) in {'全部':'', '使用者':'true', '管理者':'false'}" :value="item" class="bg-[#FFFFFF] text-center">{{ index }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xl">鎖定狀態: </label>
                            <select name="" id="" class="border border-[#dbdbdb] py-2 w-[5rem] rounded-lg bg-[#cccccc]" v-model="search.lockedStatus" @change="searchAll">
                                <option v-for="(item,index) in {'全部':'', 'T':'true', 'F':'false'}" :value="item" class="bg-[#FFFFFF] text-center">{{ index }}</option>
                            </select>
                        </div>
                    </div> 
                </th>
            </tr>
            <tr>
                <th class="border-2 border-black whitespace-pre" v-for="(item,index) in ['','E-Mail','姓名','手機','評價','身分權限 \n (管理者)','鎖定狀態']">{{ item }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item1,index1) in pageAllUsers">
                <td class="border-2 border-black text-center py-2">
                    <button type="button" class="editBtn">修改</button>
                </td>
                <td class="border-2 border-black text-center text-lg" v-for="(item2,index2) in item1">{{ item2 }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="7" class="py-3 pr-3">
                    <!-- <PageVue @pageArr="pageArr1"></PageVue> -->
                    <div v-if="page !== 0" class="flex justify-end items-end">
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
                </td>
            </tr>
        </tfoot>
       </table>
    </div>
</template>
<style lang="scss" scoped>
    .editBtn{
        background-color: #FF6E6E;
        color: white;
        padding: 0.75rem;
        font-size: 1.125rem/* 18px */; line-height: 1.75rem/* 28px */;
        border-radius: 0.5rem;
        font-weight: 700;

        &:hover{
            scale: 1.05;
            background-color: blue;
        }
        &:active{
            scale: 0.95;
            background-color: #FF6E6E;
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