<script>
import router from '../router';
import axios from 'axios';
// Pinia方法
import { mapState, mapActions } from 'pinia';
// 自己的資料庫(預設匯入)
import dataStore from '../store/dataStore';
export default {
    data() {
        return {
            //取得email認證碼 後端回傳的資料
            geteMailTokenResponseData: null,
            geteMailTokenCode: "",
            geteMailTokenMessage: "",
            //確認驗證碼 後端回傳的資料
            checkEmailTokenResponseData: null,
            checkEmailTokenCode: "",
            checkEmailTokenMessage: "",
            isAble: false, //按鈕disable
            content: "取得Email驗證碼",   // 按鈕顯示內容
            totalTime: 60,  //倒數時間
            clock: Number,
            postEmail: {
                email: "",
            },
            postToken: {
                resetPwdToken: "",
            },
        }
    },
    computed: {
        ...mapState(dataStore, ["userInfo"])
    },
    methods: {
        checkEmailToken() {
            //確認驗證碼 
            axios.post('http://localhost:8080/api/check_reset_pwd_token', this.postToken, { withCredentials: true })
                .then(response => {
                    this.checkEmailTokenResponseData = response;
                    this.checkEmailTokenCode = this.checkEmailTokenResponseData.data.code;
                    this.checkEmailTokenMessage = this.checkEmailTokenResponseData.data.message;
                    if (this.checkEmailTokenCode === "200") {
                        alert(this.checkEmailTokenMessage);
                        router.push("/reset_password");
                    } else {
                        alert(this.checkEmailTokenMessage);
                    }
                })
                .catch(error => {
                    alert(error);
                });

        },
        geteMailToken() {
            //取得email認證碼
            this.isAble = true;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(this.postEmail.email)) {
                alert("請輸入有效的email!");
                this.isAble = false;
                return;
            }
            axios.post('http://localhost:8080/api/forgot_pwd', this.postEmail, { withCredentials: true })
                .then(response => {  
                    this.geteMailTokenResponseData = response;
                    this.geteMailTokenCode = this.geteMailTokenResponseData.data.code;
                    this.geteMailTokenMessage = this.geteMailTokenResponseData.data.message;
                    if (this.geteMailTokenCode === "200") {     
                        alert(this.geteMailTokenMessage);
                        this.content = this.totalTime + '秒後重新發送'
                        this.clock = window.setInterval(() => {
                            this.totalTime--
                            this.content = this.totalTime + '秒後重新發送'
                            if (this.totalTime < 0) {
                                window.clearInterval(this.clock);
                                this.content = '重新發送驗證碼'
                                this.totalTime = 60
                                this.isAble = false;
                            }
                        }, 1000)

                    } else {
                        this.isAble = false;
                        alert(this.geteMailTokenMessage);
                    }
                })
                .catch(error => {
                    this.isAble = false;
                    alert(error);
                });
        },
        reset() {
            //重置按鈕
            if (this.clock) {
                window.clearInterval(this.clock);
            }
            this.totalTime = 60;
            this.postEmail.email = "";
            this.postToken.resetPwdToken = "";
            this.isAble = false;
            this.content = '取得Email驗證碼';

        }
    }
}
</script>

<template>
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="flex justify-center mt-[50px]  ">
        <div class="border-2 border-black  rounded-xl w-[900px] h-[400px]">
            <div class=" h-[100px] justify-center items-center flex ">
                <div>
                    <p class="text-[32px] ">身分驗證</p>
                </div>
            </div>
            <div class=" h-[200px]   justify-center flex">
                <div>
                    <div class="relative">
                        <input type="text" placeholder="輸入Email" v-model="postEmail.email"
                            class="border-2 border-black w-[550px] h-[50px] block mt-[30px] text-[24px] rounded-lg pl-[50px]">
                            <i class="fa-solid fa-envelope fa-2xl absolute bottom-[23px] left-[10px]"></i>
                    </div>
                    <div class="relative">
                        <input type="text" placeholder="輸入Email驗證碼" v-model="postToken.resetPwdToken"
                            class="border-2 border-black w-[550px] h-[50px] block mt-[40px] text-[24px] rounded-lg pl-[50px]">
                        <i class="fa-solid fa-envelope-open-text fa-2xl relative bottom-[37px] left-[10px]"></i>
                        <button type="button" class="relative bottom-[37px] left-[380px]    bg-[#D9D9D9] rounded"
                            :disabled="isAble" @click="geteMailToken">{{ content }}</button>
                    </div>
                </div>
            </div>
            <div class="  h-[100px] flex justify-center items-center">
                <button type="button"
                    class="w-[100px] h-[40px]  text-[20px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95 mr-[30px]"
                    @click="checkEmailToken">下一步</button>
                <button type="button"
                    class="w-[100px] h-[40px]  text-[20px] rounded-lg border-2 border-black text-black hover:scale-105 active:scale-95"
                    @click="reset">重置</button>
            </div>
        </div>
    </div>
</template>

<style lang ="scss" scoped></style>