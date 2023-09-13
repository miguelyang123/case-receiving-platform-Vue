<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="flex justify-center mt-[50px]  h-screen w-screen">
    <div class="border-2 border-black rounded-[30px] w-[1150px] h-[600px]">
      <div class="flex  h-[100px] justify-center items-center">
        <p class="text-[40px] font-bold">會員註冊</p>
      </div>
      <div class="flex">
        <div class="w-6/12  h-[350px]">
          <div class="relative">
            <input type="text" value="輸入您的真實姓名"
              class="border-2 border-black ml-[50px] mt-[80px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/icon-park-twotone_edit-name.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
          <div class="relative">
            <input type="text" value="輸入您的手機門號"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
              <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/ph_phone-duotone.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
        </div>
        <div class="w-6/12  h-[350px]">
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
          <div class="relative">
            <input type="text" value="確認密碼"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
              <div
              class="absolute w-[35px] h-[35px] bg-[url('../../Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
 
          </div>
        </div>
      </div>
      <div class=" h-[100px] flex justify-center items-center">
         <button type="button" class="w-[250px] h-[60px]  text-[26px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95">註冊</button>
      </div>
      <div class=" h-[50px] flex justify-center ">
         <button type="button" class="w-[180px] h-[35px]  text-[22px] rounded-lg  font-bold hover:scale-105 active:scale-95">已有帳號?登入</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped ></style>
