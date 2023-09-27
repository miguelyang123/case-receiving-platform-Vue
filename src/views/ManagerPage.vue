<script>
// import PageVue from "../components/Page.vue";
import { mapActions } from 'pinia';
import  defineStore  from '../store/dataStore';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import router from '../router';
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

            dataUser:[], // 所有資料
            allUsers:[],  // 篩選欄位的資料
            pageAllUsers:[], // 限定頁數資料

            showPage:10,  // 顯示幾筆
            page: 1,      // 當前頁數
            allPage: 5,  // 總頁數
            pageNum: 5,    // 分頁數量
            // 當 allPage = pageNum -1 || allPage = pageNum +1 會顯示異常，但功能正常運作

            // 查詢條件
            search:{
                name:"",
                rating:"全部",
                administrator:"",
                lockedStatus:""
            },

            bgc:false,  // 背景圖
            //修改資料
            edit:{
                uuid:"",
                email:"",
                user_name:"",
                phone:"",
                rating:0,
                resumePdfPath:"null",
                administrator:[],
                lockedStatus:[]
            },

            editPage:false,  // 修改狀態
            editPageCheck:false,
            editStatus:{
                text:"",
                icon:"icon-park-solid:check-one",
                icon_style:"",
                meesage:""
            }

        }
    },
    methods:{

        ...mapActions(defineStore,["setAllPageContent","getThisPage","getUserInfo"]),

        // 篩選條件
        searchAll(){
            let searchRat;
            if(this.search.rating === "全部"){
                searchRat = "";
            }else{
                searchRat = parseInt(this.search.rating);
            }

            fetch("http://localhost:8080/search_user/with_Input?name=" + this.search.name + "&rating=" + searchRat + "&admin=" + this.search.administrator + "&locked=" + this.search.lockedStatus )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.code==="200"){
                    this.showContent(data);
                }
            })
        },

        // 顯示內容
        showContent(data){
            this.allUsers = [];

            data.userInfoList.forEach((item,index) => {
                this.allUsers.push({
                    // "uuid":item.uuid,
                    "email":item.email,
                    "姓名":item.user_name,
                    "手機":item.phone,
                    "評價":item.rating,
                    // "pdf":item.resume_pdf_path,
                    "身分權限": (item.administrator ? "管理者":"使用者"),
                    "鎖定狀態":(item.lockedStatus ? "是":"否")
                });
            });

            this.allPage = Math.ceil((this.allUsers.length)/this.showPage); 
            this.content();
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

        // 修改頁面
        editNum(data){
            this.bgc = true;
            this.editPage = true;

            let uuidAndPdf={
                uuid:"",
                resumePdfPath:""
            }
            this.dataUser.forEach((item)=>{
                if(item.email===data.email){
                    uuidAndPdf = {
                        uuid:item.uuid,
                        resumePdfPath:item.resumePdfPath
                        // pdf:(item.resumePdfPath === null ? "null":item.resumePdfPath)
                    }
                    return;
                }
            })

            this.edit = {
                uuid:uuidAndPdf.uuid,
                email:data.email,
                user_name:data.姓名,
                phone:data.手機,
                rating:data.評價,
                resumePdfPath:uuidAndPdf.pdf,
                administrator:(data.身分權限 === "管理者" ? "true":"false"),
                lockedStatus:(data.鎖定狀態 === "是" ? "true":"false")
            }
        },

        //修改檢查
        editCheck(){
            axios.post("http://localhost:8080/api/edit_user",this.edit)
            .then((data) => {
                console.log(data);
                this.editPage=false;
                this.editPageCheck=true;

                if(data.data.code==="200"){
                    this.editStatus.text="修改成功";
                    this.editStatus.icon="icon-park-solid:check-one";
                    this.editStatus.icon_style="text-[green]";
                    this.editStatus.meesage="";

                    setTimeout(()=>{
                        this.editPageCheck=false;
                        this.bgc=false;
                        this.searchAll();
                    },"2000");

                }else{
                    this.editStatus.text="修改失敗";
                    this.editStatus.icon="fluent-mdl2:status-error-full";
                    this.editStatus.icon_style="text-[red]";
                    this.editStatus.meesage="人員帳號: "+ this.edit.email + " " + data.message;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        
    },
    mounted(){
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
            
            if(data.code==="200"){
                this.showContent(data);   
            }
            // this.setAllPageContent(this.allUsers,this.showPage,this.page,this.allPage,this.pageNum); 
            // this.setAllPageContent(this.contentPage);
        })
        .catch(errorTest => {
            console.log(errorTest);
        })  
    },
    created(){
        // 檢測登入狀態
        axios.get("http://localhost:8080/api/get_balance",{ withCredentials: true })
        .then(res => {
            console.log(res);
            if(res.data.code==="200"){
                if(!res.data.userInfo.administrator){
                    alert("檢測到非管理者身分，無法進入該網頁");
                    router.push("/");
                }
            }else{
                router.push("/login_page");
            }
        })
        .catch(err => {
            console.log(err);
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
    <!-- 顯示 -->
    <div class="w-[70%] mx-auto">
       <table class="border-2 border-black border-collapse w-full my-12">
        <thead>
            <tr>
                <th colspan="7">
                    <div class="flex items-center justify-evenly">
                        <div class="flex my-3">
                            <input type="text" class="py-3 px-6  border border-[#e2e2e2] bg-[#d7d7d7] outline-none rounded-l-lg placeholder:text-[#494949]" placeholder="搜尋姓名" v-model="search.name" @change="searchAll">
                            <div class="bg-[#9f9f9f] p-3 rounded-r-lg cursor-pointer hover:scale-105 active:scale-95" @click="searchAll">
                                <Icon icon="mingcute:search-2-fill" width="25" />
                            </div>                  
                        </div>
                        <div>
                            <label class="text-xl">評價: </label>
                            <select name="" id="" class="border border-[#dbdbdb] py-2 w-[5rem] rounded-lg bg-[#cccccc]" v-model="search.rating" @change="searchAll">
                                <option v-for="(item,index) in Object.keys({'全部':'','5':'5','4':'4','3':'3','2':'2','1':'1'}).reverse()" :key="item" :value="item" class="bg-[#FFFFFF] text-center" @change="searchAll">{{ item }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xl">身分: </label>
                            <select name="" id="" class="border border-[#dbdbdb] py-2 w-[5rem] rounded-lg bg-[#cccccc]" v-model="search.administrator" @change="searchAll">
                                <option v-for="(item,index) in {'全部':'', '使用者':'false', '管理者':'true'}" :value="item" class="bg-[#FFFFFF] text-center">{{ index }}</option>
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
            <tr v-if="pageAllUsers.length>0" v-for="(item1,index1) in pageAllUsers">
                <td class="border-2 border-black text-center py-2">
                    <button type="button" class="editBtn" @click="editNum(item1)">修改</button>
                </td>
                <td class="border-2 border-black text-center text-lg" v-for="(item2,index2) in item1" >{{ item2 }}</td>
            </tr>
            <tr v-if="pageAllUsers.length<=0">
                <td colspan="7" class="py-3 pl-6 text-2xl">
                    查無資料
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="7" class="py-3 pr-3">
                    <!-- <PageVue @pageArr="pageArr1"></PageVue> -->
                    <div v-if="pageAllUsers.length>0" class="flex justify-end items-end">
                        <button v-if="page !== 1" type="button" class="pageBtn" @click="pageBlank()">上一頁</button>

                        <button v-if="page > Math.floor(this.pageNum / 2) + 1 && allPage!==pageNum" type="button" class="pageBtn" @click="page = 1">1</button>
                        <div v-if="page > Math.floor(this.pageNum / 2) + 2  && allPage!==pageNum && allPage!==(pageNum+1)" type="button" class="mx-3 text-lg font-bold">...</div>

                        <button type="button" :class="{ 'pageBtn': true, 'bg-[#ffc8d1] text-[#E12D4A]': index === page }"
                            v-for="(index) in pageNumCheck" @click="page = index">{{ index }}</button>

                        <div v-if="page + Math.floor(this.pageNum / 2) + 1 < allPage  && allPage!==pageNum && allPage!==(pageNum+1)" type="button" class="mx-3 text-[1.125rem] font-bold">
                            ...</div>
                        <button v-if="page + Math.floor(this.pageNum / 2) < allPage && allPage!==pageNum" type="button" class="pageBtn"
                            @click="page = allPage">{{ allPage }}</button>

                        <button v-if="page !== allPage" type="button" class="pageBtn" @click="pageNext()">下一頁</button>
                    </div>
                </td>
            </tr>
        </tfoot>
       </table>
    </div>

    <!-- 修改 -->
    <div v-if="editPage" class=" fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border p-6 rounded-2xl z-10">
        <h1 class="text-center text-3xl font-bold my-3">修改人員資料</h1>
        <ul class=" editContent">
            <li>E-mail: &nbsp;{{ edit.email }}</li>
            <li>姓名: &nbsp;{{ edit.user_name }}</li>
            <li>手機: &nbsp;{{ edit.phone }}</li>
            <li>評價: &nbsp;{{ edit.rating }}</li>
            <li class="flex ">
                <p>身分: </p>
                <input type="radio" name="adm" id="adm0" v-model="edit.administrator" value="true">
                <label for="adm0">管理者</label>
                <input type="radio" name="adm" id="adm1" v-model="edit.administrator" value="false">
                <label for="adm1">使用者</label>
            </li>
            <li class="flex ">
                <p>鎖定狀態: </p>
                <input type="radio" name="lockedSta" id="lockedSta1" v-model="edit.lockedStatus" value="true">
                <label for="lockedSta1">是</label>
                <input type="radio" name="lockedSta" id="lockedSta0" v-model="edit.lockedStatus" value="false">
                <label for="lockedSta0">否</label>
            </li>
        </ul>
        <div class="flex justify-evenly">
            <button type="button" class="py-3 px-6 bg-[#7e7e7e] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="bgc=false,editPage=false">取消</button>
            <button type="button" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="editCheck">修改</button>
        </div>
    </div>

    <!-- 修改成功 -->
    <div v-if="editPageCheck" class="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border py-6 px-32 rounded-2xl z-10">
        <h1 class="text-center text-3xl font-bold my-3">{{ editStatus.text }}</h1>
        <p class="text-center text-3xl my-3 text-[red]">{{ editStatus.meesage }}</p>
        <Icon :icon="editStatus.icon" :class="'my-6 mx-auto '+ editStatus.icon_style" width="120" />
        <button v-if="editStatus.text==='修改失敗'" type="button" class="block mx-auto my-3 py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="editPageCheck=false,bgc=false">確定</button>
    </div>

    <!-- 背景 -->
    <div v-if="bgc" class="fixed top-0 left-0 w-full h-[100vh] bg-[#00000083] z-0" @click="bgc=false,editPage=false,editPageCheck=false"></div>
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

    // 修改內容
    .editContent{
        margin: 2.5rem 5rem;
        li{
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.5rem;

            p{
                margin-right: 0.75rem;
            }
            input[type="radio"]{
                margin: 0 0.5rem;
            }
        }
    }
</style>