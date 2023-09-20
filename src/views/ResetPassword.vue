<script>
import router from '../router';
import axios from 'axios';
export default {
    data() {
        return {
            pwdFlag: false, //密碼明碼
            repeatpwdFlag: false, //repeat 密碼明碼
            password:"",
            repeatPassword:"",
        }
    },
    methods: {
        pwdflagTrue() {
            this.pwdFlag = true;
        },
        pwdflagFalse() {
            this.pwdFlag = false;
        },
        repeatpwdflagTrue() {
            this.repeatpwdFlag = true;
        },
        repeatpwdflagFalse() {
            this.repeatpwdFlag = false;
        },
        finishResetPassword(){
            router.push("/finish_reset_password");
        }
    },
}
</script>

<template>
    <div class="flex justify-center mt-[50px]  h-screen w-screen">
        <div class="border-2 border-black  rounded-xl w-[700px] h-[400px]">
            <div class=" h-[100px] justify-center items-center flex ">
                <div>
                    <p class="text-[32px] ">密碼重置</p>
                </div>
            </div>
            <div class=" h-[200px]   justify-center flex">
                <div>
                    <div class="relative">
                        <input :type="pwdFlag ? 'text' : 'password'" v-model="password" placeholder="輸入新密碼(長度8字元以上)"
                            class="border-2 border-black w-[450px] h-[50px] block mt-[30px] text-[24px] rounded-lg pl-[50px]">
                        <div
                            class="absolute w-[35px] h-[35px] bg-[url('../../Password_icon.png')] bg-cover bottom-[6px] left-[10px]">
                        </div>
                        <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye fa-2xl" @click="pwdflagTrue"
                            v-if="this.pwdFlag === false"></i>
                        <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye-slash fa-2xl" @click="pwdflagFalse"
                            v-if="this.pwdFlag === true"></i>
                    </div>
                    <div class="relative">
                        <input :type="repeatpwdFlag ? 'text' : 'password'" v-model="repeatPassword" placeholder="重新輸入新密碼"
                            class="border-2 border-black w-[450px] h-[50px] block mt-[40px] text-[24px] rounded-lg pl-[50px]">
                        <div
                            class="absolute w-[35px] h-[35px] bg-[url('../../Password_icon.png')] bg-cover bottom-[6px] left-[10px]">
                        </div>
                        <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye fa-2xl" @click="repeatpwdflagTrue"
                            v-if="this.repeatpwdFlag === false"></i>
                        <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye-slash fa-2xl"
                            @click="repeatpwdflagFalse" v-if="this.repeatpwdFlag === true"></i>
                    </div>
                </div>
            </div>
            <div class="  h-[100px] flex justify-center items-center">
                <button type="button"
                    class="w-[100px] h-[40px]  text-[20px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95 mr-[30px]"
                    @click="finishResetPassword">下一步</button>
                <button type="button"
                    class="w-[100px] h-[40px]  text-[20px] rounded-lg border-2 border-black text-black hover:scale-105 active:scale-95">重置</button>
            </div>
        </div>
    </div>
</template>

<style lang ="scss" scoped></style>