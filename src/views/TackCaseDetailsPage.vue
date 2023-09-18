<script>
import { mapActions } from 'pinia';
import  defineStore  from '../store/dataStore';
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
export default {
    components: {
        RouterLink,Icon
    },
    props:["thisList"],
    data() {
        return {
            arrList:JSON.parse(this.$route.query.thisList),
            // arrList:""
        }
    },
    methods:{
        ...mapActions(defineStore,["setCaseThisData","getCaseThisData"]),
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
    },
    // mounted(){
    //     this.arrList = JSON.parse(this.getCaseThisData());
    // }
}
</script>
<template>
    <div class="w-[80%] mx-auto my-12 flex items-start">
        <div class="w-full">
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
                    <RouterLink to="/">
                        <button type="button" class=" text-white rounded-lg bg-[#FF6E6E] py-3 px-6 text-2xl font-bold hover:scale-105 active:scale-95"> 我要接案</button>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class=" min-w-fit w-[30%] p-6 ml-12 border border-[#d7d7d7] border-t-8 border-t-[#FF6E6E] shadow-lg rounded-xl">
            <h1 class="text-center text-2xl font-bold pb-6 border-b-4 border-b-black">案主資訊</h1>
            <div class="flex mt-6 items-center">
                <Icon icon="bi:person-circle" width="30"></Icon>
                <p class="text-xl ml-3">{{ arrList.user_name }}</p>
            </div>
            <div v-for="(item,index) in {'手機':arrList.phone, 'E-mail':arrList.email}" class="text-xl my-6">
                <p class="font-bold my-1"> <span class="bg-[#FF6E6E]">&nbsp;</span>  {{ index }}</p>
                <p>{{ item }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
    
</style>