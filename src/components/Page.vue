<script>
export default {
    props:["data_list","data_page","data_allPage","data_pageNum"],
    data() {
        return {
            // 找到的資訊
            arrList: JSON.parse(this.data_list),

            page: this.data_page,      // 當前頁數
            allPage: this.data_allPage,  // 總頁數
            pageNum: this.data_pageNum,   // 分頁數量
            // agrijrgae:this.,
        }
    },
    methods:{
        // 上一頁
        pageBlank() {
            if (this.page !== 1) {
                this.page -= 1;
            }
        },
        //下一頁
        pageNext() {
            if (this.page !== this.allPage) {
                this.page += 1;
            }
        },
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