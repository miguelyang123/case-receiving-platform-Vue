<script >

</script>

<template>
    <div class="flex justify-center mt-[50px]  h-screen w-screen">
        <div class="border-2 border-black rounded-[30px] w-[500px] h-[500px]">
            <div class="flex  h-[100px] justify-center items-center ">
                <p class="text-[40px] font-bold">會員登入</p>
            </div>
            <div class="h-[220px] ">
                <div class="relative">
                    <input type="text" value="輸入Email"
                        class="border-2 border-black ml-[50px] mt-[40px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
                    <div
                        class="absolute w-[35px] h-[35px] bg-[url('../../public/Account_icon.png')] bg-cover bottom-[9px] left-[60px]">
                    </div>
                </div>
                <div class="relative">
                    <input type="text" value="輸入密碼"
                        class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
                    <div
                        class="absolute w-[35px] h-[35px] bg-[url('../../Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
                    </div>

                </div>
            </div>
            <div class="h-[50px]  flex  justify-between px-[60px]" >
                <button type="button" class="text-[22px] font-bold hover:scale-105 active:scale-95 ">會員註冊</button>
                <button type="button" class="text-[22px] font-bold hover:scale-105 active:scale-95 ">忘記密碼</button>
            </div>
            <div class="flex  h-[120px] justify-center items-center ">
                <button type="button" class="w-[220px] h-[60px]  text-[26px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95">登入</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>