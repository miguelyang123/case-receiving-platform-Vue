<script>
import { mapActions } from 'pinia';
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

            bgc:false,
            tackCaseWindow:false,  // 確認接案視窗
            tackCaseWindowCheck:false,  // 接案失敗
            pairStatus:{
                text:"",
                icon:"icon-park-solid:check-one",
                icon_style:"",
                tackCaseWindowMessage:""
            },
        }
    },
    methods:{
        ...mapActions(defineStore,["getCassUser"]),

        tackCase(){
            axios.get("http://localhost:8080/search_user/with_Input",{
                params:{
                    uuid:defineStore().userInfo.uuid
                }
            })
            .then(data =>{
                console.log(data.data);

                if(data.data.code === "200"){
                    if(!data.data.userInfoList[0].resumePdfPath){
                        alert("未上傳履歷書，請先上傳履歷書才能接案子");
                    }else{
                        this.tackCaseWindow=true;
                        this.bgc=true;
                    }
                }else{
                    alert("請先登入");
                    this.$router.push("/login_page");
                }
            })
            .catch(err =>{
                console.log(err);
            })
        },

        tackCasePair(){
            axios.post("http://localhost:8080/case_api/contractor_accept_case",{
                caseId:this.arrList.id,
                contractorUid:defineStore().userInfo.uuid
            })
            .then(data =>{
                console.log(data.data);
                this.tackCaseWindowCheck=true;
                this.tackCaseWindow=false;

                if(data.data.code==="200"){
                    this.pairStatus = {
                        text:"接案成功",
                        icon:"icon-park-solid:check-one",
                        icon_style:"text-[green]",
                        tackCaseWindowMessage:""
                    }

                    setTimeout(()=>{
                        this.tackCaseWindowCheck=false;
                        this.bgc=false;
                    },"2000");

                }else{
                    this.pairStatus = {
                        text:"接案失敗",
                        icon:"fluent-mdl2:status-error-full",
                        icon_style:"text-[red]",
                        tackCaseWindowMessage:data.data.message
                    }
                }
            })
            .catch(err =>{
                console.log(err);
            })
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
    <div class="w-[80%] mx-auto my-12 flex items-start">
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
                <div class=" text-center py-3">
                    <button type="button" class=" text-white rounded-lg bg-[#FF6E6E] py-3 px-6 text-2xl font-bold hover:scale-105 active:scale-95" @click="tackCase"> 我要接案</button>
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
                <p class="font-bold my-1 text-xl"><span class="bg-[#FF6E6E]">&nbsp;</span>案主評價</p>
                <div class="ratings">
                    <div class="empty_star">★★★★★</div>
                    <div :class="'full_star'" :style="'width:'+caseUser[0].rating*20+'%'">★★★★★</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 配對案子 -->   
    <div v-if="tackCaseWindow" class="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border py-6 rounded-2xl z-10">
        <h1 class="text-center text-3xl font-bold my-3 mx-32">是否要接案</h1>
        <div class="flex justify-evenly mt-6">
            <button type="button" class="py-3 px-6 bg-[#7e7e7e] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="bgc=false,tackCaseWindow=false">取消</button>
            <button type="button" class="py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="tackCasePair">確定</button>
        </div>
    </div>
    <!-- 配對案子失敗 -->
    <div v-if="tackCaseWindowCheck" class="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] border-[black] border py-6 px-32 rounded-2xl z-10">
        <h1 class="text-center text-3xl font-bold my-3">{{ pairStatus.text }}</h1>
        <p class="text-center text-3xl my-3 text-[red]">{{ pairStatus.tackCaseWindowMessage }}</p>
        <Icon :icon="pairStatus.icon" :class="'my-6 mx-auto '+ pairStatus.icon_style" width="120" />
        <button v-if="pairStatus.text==='接案失敗'" type="button" class="block mx-auto my-3 py-3 px-6 bg-[#FF6E6E] text-[#FFFFFF] font-bold rounded-lg hover:scale-105 active:scale-95" @click="tackCaseWindowCheck=false,bgc=false">確定</button>
    </div>
    <!-- 背景 -->
    <div v-if="bgc" class="fixed top-0 left-0 w-full h-[100vh] bg-[#00000083] z-0" @click="bgc=false,tackCaseWindowCheck=false,tackCaseWindow=false"></div>
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
</style>