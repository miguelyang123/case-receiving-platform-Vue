<script>
import { RouterLink, RouterView } from 'vue-router';
export default {
    comments: {
        RouterLink
    },
    props:["thisList"],
    data() {
        return {
            arrList:JSON.parse(this.thisList)
        }
    },
    computed:{
        newArrList(){
            let arr = {};

            Object.entries(this.arrList).forEach((item,index) =>{
                if(['price','location','caseDate'].includes(item[0])){
                    arr[item[0]]=item[1];
                }
            })

            return arr;
        }
    }
}
</script>
<template>
    <div class="w-[70%] mx-auto my-12">
        <div class="border border-[#aaa9a9] px-12 py-6 rounded-xl">
            <h1 class="text-2xl font-bold px-6 py-3 border-b-2 border-b-black">{{ arrList.title }}</h1>
            <div class="flex text-2xl"> 
                <div class="mr-12">
                    <div v-for="(item,index) in ['預算金額','執行地點','案子到期日']" class=" my-6">
                        <p class="font-bold">{{ item }}</p>
                    </div>
                </div>
                <div>
                    <div v-for="(item,index,arr) in newArrList" class="flex items-center my-6">
                        <img width="15" class="mr-3" v-if=" arr !== 0" :src="'/src/assets/img/TackCaseImg/' + ( arr===1 ? 'location.png' : 'date.png') " alt="">
                        <p>{{ item }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="border border-[#aaa9a9] px-12 py-6 rounded-xl my-6">
            <h1 class="text-2xl font-bold px-6 py-3 border-b-2 border-b-black">服務內容</h1>
            <div class=" whitespace-pre-wrap mt-6 mb-12">
                {{ arrList.content }}
            </div>
            <div class=" text-center py-3">
                <RouterLink to="/"
                    id="tackCase" class=" tackCase">
                    我要接案
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tackCase{
        color: white;
        border-radius: 0.5rem;
        background: #FF6E6E;
        padding: 0.75rem 1.5rem;
        font-size: 1.5rem; line-height: 2rem;
        font-weight: 700;

        
    }
    #tackCase{
        &:hover{
            scale: 1.05;
        }
        &:active{
            scale: 0.95;
        }
    }
</style>