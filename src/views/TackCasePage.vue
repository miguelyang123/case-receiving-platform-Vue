<script>
import { RouterLink, RouterView } from 'vue-router';
export default {
    comments: {
        RouterLink
    },

    data() {
        return {

            thisType: ["text-red-600", ""],

            mapShow: false,
            map: ["地區不限",
                "臺北", "新北", "基隆", "桃園", "新竹", "宜蘭",
                "苗栗", "臺中", "彰化", "南投", "雲林",
                "嘉義", "臺南", "高雄", "屏東", "澎湖",
                "花蓮", "臺東",
                "金門", "連江"
            ],
            thisMap: "地區不限",

            priceShow: false,
            price: ["案件金額不限", "5千以下", "5001 ~ 1萬", "1萬 ~ 5萬"],
            thisPrice: "案件金額",

            thisKeyWord: "",  // 關鍵字

            arrList: [{
                'title': '照片編輯', 'price': 50000, 'location': '台南', 'caseDate': '2023/09/30', 'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.             Totam tempora aut soluta dolor nisi recusandae   \n   \n  dolorum aperiam, repellat doloremque placeat, sunt dignissimos quasi quos pariatur impedit itaque. Praesentium quod cumque ratione nobis iusto aliquam repudiandae dolor sapiente enim doloremque minima ad officiis placeat aspernatur illum reiciendis modi, itaque quo? Nemo?'
            }, {
                'title': '影片編輯', 'price': 30000, 'location': '新北', 'caseDate': '2023/10/20', 'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.             Totam tempora aut soluta dolor nisi recusandae   \n   \n   doloremque placeat, sunt dignissimos quasi quos pariatur impedit itaque. Praesentium quod cumque ratione nobis iusto aliquam repudiandae dolor sapiente enim doloremque minima ad officiis placeat aspernatur illum reiciendis modi, itaque quo? Nemo?'
            }],

            page: 1,      // 當前頁數
            allPage: 15,  // 總頁數
            pageNum: 5    // 分頁數量
        }
    },
    methods: {

        // 顯示點選哪個類別
        thisType1(index) {
            if (index === 0) {
                if (this.thisType[1] === '線上') { this.thisType[1] = '' } else { this.thisType[1] = '線上' }
            } else {
                if (this.thisType[1] === '線下') { this.thisType[1] = '' } else { this.thisType[1] = '線下' }
            }
        },

        changeMap(index1) {
            this.thisMap = index1;
            this.mapShow = false;
        },
        changePrice(index1) {
            this.thisPrice = index1;
            this.priceShow = false;
        },

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
    }
}
</script>
<template>
    <div class="w-[85%] mx-auto py-6 mb-[10rem]">
        <h1 class="text-3xl font-bold">找案件</h1>
        <div class="flex my-6">
            <button class="findCaseType" @click="thisType1(0)">
                <iconify-icon icon="fluent-mdl2:join-online-meeting" :class="{ 'text-red-600': thisType[1] === '線上' }"
                    width="65"></iconify-icon>
                <p :class="{ 'text-red-600': thisType[1] === '線上' }">遠端</p>
            </button>
            <button class="findCaseType" @click="thisType1(1)">
                <iconify-icon icon="healthicons:domestic-worker" :class="{ 'text-red-600': thisType[1] === '線下' }"
                    width="65"></iconify-icon>
                <p :class="{ 'text-red-600': thisType[1] === '線下' }">線場</p>
            </button>
        </div>
        <div class="flex">
            <div class=" relative" @mouseover="mapShow = true" @mouseleave="mapShow = false">
                <div class=" filter">
                    <p>{{ thisMap }}</p>
                    <p class="text-lg ml-3">V</p>
                </div>
                <div v-if="mapShow" class="mapAndPriceSelect shadow-xl">
                    <div v-for="(item, index) in map"
                        class=" text-[1rem] font-bold py-3 pl-6 pr-10 cursor-pointer hover:bg-blue-300 hover:text-white"
                        @click="changeMap(item)">
                        <input type="radio" :id="'map' + index" name="thismap" class="mr-3 cursor-pointer" :value="item"
                            :checked="thisMap === item">
                        <label :for="'map' + index" class="cursor-pointer">{{ item }}</label>
                    </div>
                </div>
            </div>

            <div class=" relative" @mouseover="priceShow = true" @mouseleave="priceShow = false">
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
            </div>

            <div class=" flex ">
                <input type="text" placeholder="請輸入關鍵字" v-model="thisKeyWord" class="searchKeyWords">
                <img src="../assets/img/TackCaseImg/search.png" width="50" alt="">
            </div>
        </div>

        <hr class="mt-6 mb-12 border-[#aaa9a9]">

        <RouterLink :to="{ name: 'TackCaseDetailsPage', params: { thisList: JSON.stringify(item) } }" class=" relative"
            v-for="(item, index) in arrList">
            <h1 class=" font-bold text-xl">{{ item.title }}</h1>
            <div class="flex">
                <p class="text-red-600 font-bold text-lg">{{ item.price }}</p>
                <div class="flex items-center ml-4">
                    <img src="../assets/img/TackCaseImg/location.png" alt="" width="15" class="h-[15px]">
                    <p class="text-[#7F7F7F] ml-2 font-bold text-lg">{{ item.location }}</p>
                </div>
                <div class="flex items-center ml-4">
                    <img src="../assets/img/TackCaseImg/date.png" alt="" width="15" class="h-[15px]">
                    <p class="text-[#7F7F7F] ml-2 font-bold text-lg">{{ item.caseDate }}</p>
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
        </RouterLink>

        <div v-if="page === 0" class="text-center">
            <h1 class="text-2xl font-bold my-6">未搜尋到你想找的案子</h1>
            <p class="text-xl">你可以嘗試更換你的篩選條件或關鍵字</p>
        </div>

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

    &:hover>iconify-icon,
    &:hover>iconify-icon+p {
        color: rgb(220, 38, 38);
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
    width: 175px;
    color: #454545;
    font-weight: bold;
    cursor: pointer;
}

// 關鍵字
.searchKeyWords {
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

    &+img {
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

// 下拉選單
.mapAndPriceSelect {
    // padding: 0.75rem 2rem 0.75rem 1.5rem;
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
}</style>