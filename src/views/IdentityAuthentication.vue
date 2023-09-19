<script>
import router from '../router';
import axios from 'axios';
export default {
    data() {
        return {

        }
    },
    methods: {
        resetPassword(){
            router.push("/reset_password");
        }
    }
}
</script>

<template>
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="flex justify-center mt-[50px]  h-screen w-screen">
        <div class="border-2 border-black  rounded-xl w-[700px] h-[400px]">
            <div class=" h-[100px] justify-center items-center flex ">
                <div>
                    <p class="text-[32px] ">身分驗證</p>
                </div>
            </div>
            <div class=" h-[200px]   justify-center flex">
                <div>
                    <div class="relative">
                        <input type="text" placeholder="輸入Email"
                            class="border-2 border-black w-[450px] h-[50px] block mt-[30px] text-[24px] rounded-lg pl-[50px]">
                        <div
                            class="absolute w-[35px] h-[35px] bg-[url('../../public/Account_icon.png')] bg-cover bottom-[8px] left-[8px]">
                        </div>
                    </div>
                    <div class="relative">
                        <input type="text" placeholder="輸入Email驗證碼"
                            class="border-2 border-black w-[450px] h-[50px] block mt-[40px] text-[24px] rounded-lg pl-[50px]">
                        <i class="fa-solid fa-envelope fa-2xl relative bottom-[37px] left-[10px]"></i>
                        <button type="button"
                            class="relative bottom-[37px] left-[280px] hover:scale-105 active:scale-95 bg-[#D9D9D9] rounded">取得Email驗證碼</button>
                    </div>
                </div>
            </div>
            <div class="  h-[100px] flex justify-center items-center">
                <button type="button"
                    class="w-[100px] h-[40px]  text-[20px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95 mr-[30px]" @click="resetPassword">下一步</button>
                <button type="button"
                    class="w-[100px] h-[40px]  text-[20px] rounded-lg border-2 border-black text-black hover:scale-105 active:scale-95">重置</button>
            </div>
        </div>
    </div>
</template>

<style lang ="scss" scoped></style>