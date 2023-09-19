<script>
import { mapActions } from 'pinia';
import  defineStore  from '../store/dataStore';
export default {
    // props:["data_list","data_page","data_pageNum"],
    data() {
        return {
            // 找到的資訊
            arrList: "",

            showPage:5,
            page: 1,      // 當前頁數
            allPage: 0,  // 總頁數
            pageNum: this.data_pageNum,   // 分頁數量
            // agrijrgae:this.,
        }
    },
    methods:{

        ...mapActions(defineStore,["setThisPage","getAllPageContent"]),

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

            for(let i=(this.page-1)*10;i<this.arrList.length;i++){
                if (pageArrList.length>=this.showPage) {
                    break;
                }
                pageArrList.push(arrList[i]);
            }
            this.$emit("pageArr",pageArrList);
        },
    },
    created(){
        const arr1 = this.getAllPageContent();

        this.arrList = arr1.arrList;
        this.showPage = arr1.showPage;
        this.page = arr1.page;
        this.allPage = arr1.allPage;
        this.pageNum = arr1.pageNum;
    },
    mounted(){
        this.content();
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
            return arr;
        },
    },
}
</script>
<template>
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
</template>

<style lang="scss" scoped>
    
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