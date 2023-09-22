<script>
import router from '../router';
export default {
  data() {
    return {
        
    }
  },
  methods: {
    returnLoginPage(){
        router.push("/login_page");
    }
  },
}
</script>

<template>
    <div class="flex justify-center mt-[50px]  ">
        <div class="border-2 border-black  rounded-xl w-[700px] h-[400px]">
            <div class=" h-[100px] justify-center items-center flex ">
                <div>
                    <p class="text-[32px] ">重置完成</p>
                </div>
            </div>
            <div class=" h-[150px]   justify-center flex">
              <p  class="text-[24px] mt-[30px]">新登入密碼重置成功，請重新登入!</p>
            </div>
            <div class=" h-[100px]   justify-center flex">
                <button type="button"
                    class="w-[120px] h-[40px]  text-[20px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95 mr-[30px]"
                    @click="returnLoginPage">重新登入</button>
            </div>
        </div>
    </div>
</template>

<style lang ="scss" scoped></style>