<script>
import { RouterLink, RouterView } from 'vue-router';
import router from '../router';
import axios from 'axios';
// Pinia方法
import { mapState, mapActions } from 'pinia';
// 自己的資料庫(預設匯入)
import dataStore from '../store/dataStore';
export default {
    data() {
        return {
            //登出 後端回傳資料
            logoutResponseData: null,
            logoutResponseDataCode: "",
            logoutResponseDataMessage: "",
        }
    },
    comments: {
        RouterLink
    },
    computed: {
        ...mapState(dataStore, ["isLogin", "userName"]),
    },
    methods: {
        ...mapActions(dataStore, ["setIsLoginTrue", "setIsLoginFalse", "clearPersist"]),
        login() {
            router.push("/login_page");
        },
        logout() {
            axios.get('http://localhost:8080/api/logout', { withCredentials: true })
                .then(response => {
                    this.logoutResponseData = response;
                    this.logoutResponseDataCode = this.logoutResponseData.data.code;
                    this.logoutResponseDataMessage = this.logoutResponseData.data.message;
                    if (this.logoutResponseDataCode === "200") {
                        alert(this.logoutResponseDataMessage);
                        this.setIsLoginFalse();
                        this.clearPersist();
                        router.push("/");
                    } else {
                        alert(this.logoutResponseDataMessage);
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },
        myAccount() {
            router.push("/personal_info");
        },
        register() {
            router.push("/register_page");
        }
    },
}
</script>

<template >
    <header class="w-100">
        <div class="flex justify-between items-center py-6 px-14 bg-[#D9D9D9]">
            <div class=" flex items-baseline">
                <h1 class="text-4xl font-bold">Speed接案網</h1>
                <h2 class="mx-6 font-bold">你的專案，我的專長</h2>
            </div>
            <RouterLink class="headerBtn" to="/">我要發案</RouterLink>
        </div>
        <div class="flex px-16 py-3 bg-[#FF6E6E] justify-between">
            <div class="flex">
                <RouterLink class="navBtn" to="/">首頁</RouterLink>
                <RouterLink class="navBtn" to="/tackcasepage">我要接案</RouterLink>
            </div>
            <div class="flex">
                <p class="font-bold text-2xl mx-[1rem]" v-if="this.isLogin === true">您好，{{ this.userName }}!</p>
                <button type="button" class="navBtn" @click="myAccount" v-if="this.isLogin === true">我的帳號</button>
                <button type="button"
                    class="font-bold text-2xl hover:scale-105 hover:text-[#FF0000] active:scale-95 active:text-[#0000FF] "
                    @click="login" v-if="this.isLogin === false">登入</button>
                <button type="button"
                    class="font-bold mx-[1.5rem] text-2xl hover:scale-105 hover:text-[#FF0000] active:scale-95 active:text-[#0000FF] "
                    @click="register" v-if="this.isLogin === false">註冊</button>
                <button type="button"
                    class="font-bold text-2xl hover:scale-105 hover:text-[#FF0000] active:scale-95 active:text-[#0000FF] "
                    @click="logout" v-if="this.isLogin === true">登出</button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.headerBtn {
    background-color: #FF6E6E;
    padding: 0.75rem 1.5rem;
    font-size: 1.5rem;
    line-height: 2rem;
    border-radius: 0.5rem;
    font-weight: 700;

    &:hover {
        scale: 1.05;
    }

    &:active {
        scale: 0.95;
    }
}

.navBtn {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    margin: 0 1.5rem;

    &:hover {
        scale: 1.05;
        color: red;
    }

    &:active {
        scale: 0.95;
        color: blue;
    }
}
</style>