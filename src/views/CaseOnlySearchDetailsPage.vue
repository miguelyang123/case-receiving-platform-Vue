<script>
import { mapActions } from 'pinia';
import router from '../router';
import  defineStore  from '../store/dataStore';
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';
import axios from 'axios';
export default {
    components: {
        RouterLink,Icon
    },
    props:["thisList","thisUser"],
    data() {
        return {
            // arrList:JSON.parse(this.$route.query.thisList),
            // cassUser:JSON.parse(this.$route.query.thisUser),

            arrList:defineStore().thisCase,
            caseUser:defineStore().caseUser,

        }
    },
    methods:{
        backPage(){
			router.push("/case_only_search_page");
		},
    },
    computed:{
         newArrList(){
            let arr = {};

            Object.entries(this.arrList).forEach((item,index) =>{
                if(['budget','location','deadline'].includes(item[0])){
                    arr[item[0]]=item[1];
                }
            })
            console.log(this.caseUser);

            return arr;
        }
    },
    // mounted(){
    //     this.arrList = JSON.parse(this.getCaseThisData());
    // }
}
</script>
<template>
    <div class="w-[80%] mx-auto my-12">

        <button class="custom-btn btn-5" @click="backPage">返回</button>

        <div class="flex items-start">
            <div class="w-full">
                <div class="border border-[#aaa9a9] px-12 py-6 rounded-xl">
                    <h1 class="text-2xl font-bold px-6 py-3 border-b-2 border-b-black">{{ arrList.caseName }}</h1>
                    <div class="flex text-2xl"> 
                        <div class="mr-12">
                            <div v-for="(item,index) in ['預算金額','執行地點','案子到期日']" class=" my-6">
                                <p class="font-bold">{{ item }}</p>
                            </div>
                        </div>
                        <div>
                            <div v-for="(item,index,arr) in newArrList" class="flex items-center my-6">
                                <Icon width="30" v-if="arr != 0" :icon="arr===1 ? 'mdi:map-marker' : 'material-symbols:date-range'" :class="'mr-3 '+(arr===1 ? 'text-[#EF879A]' : 'text-[#545454]')" />
                                <p>{{ index==="deadline" ? item.split('T')[0]+'　'+item.split('T')[1] : item }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border border-[#aaa9a9] px-12 py-6 rounded-xl my-6">
                    <h1 class="text-2xl font-bold px-6 py-3 border-b-2 border-b-black">服務內容</h1>
                    <div class=" whitespace-pre-wrap mt-6 mb-12">
                        {{ arrList.content }}
                    </div>
                </div>
            </div>
            <div class=" min-w-fit w-[30%] p-6 ml-12 border border-[#d7d7d7] border-t-8 border-t-[#FF6E6E] shadow-lg rounded-xl">
                <h1 class="text-center text-2xl font-bold pb-6 border-b-4 border-b-black">案主資訊</h1>
                <div class="flex mt-6 items-center">
                    <Icon icon="bi:person-circle" width="30"></Icon>
                    <p class="text-xl ml-3">{{ caseUser[0].user_name }}</p>
                </div>
                <div v-for="(item,index) in {'手機':caseUser[0].phone, 'E-mail':caseUser[0].email}" class="text-xl my-6">
                    <p class="font-bold my-1"> <span class="bg-[#FF6E6E]">&nbsp;</span>  {{ index }}</p>
                    <p>{{ item }}</p>
                </div>
                <div>
                    <p class="font-bold my-1 text-xl"><span class="bg-[#FF6E6E]">&nbsp;</span> 案主評價</p>
                    <div class="flex items-center">
                        <div class="ratings">
                            <div class="empty_star">★★★★★</div>
                            <div :class="'full_star'" :style="'width:'+caseUser[0].rating*20+'%'">★★★★★</div>
                        </div>
                        <p class="text-2xl mx-3 font-bold">{{ caseUser[0].rating }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ratings {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        color: #a2a2a2; /*背景星星顏色*/
        overflow: hidden;
        font-size: 2.5rem; /*調整字體大小可放大縮小星星*/
        text-shadow: 0px 1px 0 #999;
    }
    
    .full_star {
         /*調整寬度可變更星等*/
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        overflow: hidden;
        color: #ff7300; /*前景星星顏色*/
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
        margin-block:1rem 3rem;
        writing-mode: horizontal-tb;
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