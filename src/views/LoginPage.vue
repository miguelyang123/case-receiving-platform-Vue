<script >
import router from '../router';
import axios from 'axios';
// Pinia方法
import { mapState, mapActions } from 'pinia';
// 自己的資料庫(預設匯入)
import dataStore from '../store/dataStore';
export default {
    data() {
        return {
            pwdFlag: false, //密碼明碼
            code: "",
            message: "",
            responseData:"",
            //json
            postData: {
                email: "",//email
                password: "",//密碼
            }
        }
    },
    computed: {
        ...mapState(dataStore, ["userInfo"])
    },
    methods: {
        ...mapActions(dataStore, ["setUserInfo"]),
        pwdflagTrue() {
            this.pwdFlag = true;
        },
        pwdflagFalse() {
            this.pwdFlag = false;
        },
        registerRouterPush() {
            router.push("/register_page")
        },
        login() {
            axios.post('http://localhost:8080/api/login', this.postData,{ withCredentials: true })
                .then(response => {
                    this.responseData = response;
                    this.code = this.responseData.data.code;
                    this.message = this.responseData.data.message;
                    const userInfo =this.responseData.data.userInfo;
                    if (this.code === "200") {
                        alert(this.message);
                        this.setUserInfo(userInfo);  //設置 userInfo
                        router.push("/personal_info");
                    } else {
                        alert(this.message);
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },
        forgottenPassword(){
            router.push("/identity_authentication");
        }
    },
}
</script>

<template>
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="flex justify-center mt-[50px]  h-screen w-screen">
        <div class="border-2 border-black rounded-[30px] w-[500px] h-[500px]">
            <div class="flex  h-[100px] justify-center items-center ">
                <p class="text-[40px] font-bold">會員登入</p>
            </div>
            <div class="h-[220px] ">
                <div class="relative">
                    <input type="text" placeholder="輸入Email" v-model="postData.email"
                        class="border-2 border-black ml-[50px] mt-[40px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
                    <div
                        class="absolute w-[35px] h-[35px] bg-[url('/src/assets/img/RegisterPageImg/Account_icon.png')] bg-cover bottom-[9px] left-[60px]">
                    </div>
                </div>
                <div class="relative">
                    <input placeholder="輸入密碼" :type="pwdFlag ? 'text' : 'password'" v-model="postData.password"
                        class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg px-[60px]">
                    <div
                        class="absolute w-[35px] h-[35px] bg-[url('/src/assets/img/RegisterPageImg/Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
                    </div>
                    <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye fa-2xl" @click="pwdflagTrue"
                        v-if="this.pwdFlag === false"></i>
                    <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye-slash fa-2xl" @click="pwdflagFalse"
                        v-if="this.pwdFlag === true"></i>
                </div>
            </div>
            <div class="h-[50px]  flex  justify-between px-[60px]">
                <button type="button" class="text-[22px] font-bold hover:scale-105 active:scale-95 "
                    @click="registerRouterPush">會員註冊</button>
                <button type="button" class="text-[22px] font-bold hover:scale-105 active:scale-95 " @click="forgottenPassword">忘記密碼</button>
            </div>
            <div class="flex  h-[120px] justify-center items-center ">
                <button type="button"
                    class="w-[220px] h-[60px]  text-[26px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95"
                    @click="login">登入</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>