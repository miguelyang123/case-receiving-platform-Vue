<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="flex justify-center mt-[50px]  h-screen w-screen">
    <div class="border-2 border-black rounded-[30px] w-[1100px] h-[600px]">
      <div class="flex  h-[100px] justify-center items-center">
        <p class="text-[40px] font-bold">會員註冊</p>
      </div>
      <div class="flex">
        <div class="w-6/12 border-2 border-black h-[350px]">
          <div class="relative">
            <input type="text" value="輸入您的真實姓名"
              class="border-2 border-black ml-[50px] mt-[80px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[50px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/icon-park-twotone_edit-name.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
          <div class="relative">
            <input type="text" value="輸入您的手機門號"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[50px]">
              <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/ph_phone-duotone.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
        </div>
        <div class="w-6/12 border-2 border-black h-[350px]">

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped ></style>
