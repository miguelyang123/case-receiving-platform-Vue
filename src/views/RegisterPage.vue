<script>
import router from '../router';
export default {
  data() {
    return {
      pwdFlag: false, //密碼明碼
      repeatpwdFlag: false, //repeat 密碼明碼
      //json
      formData: {
        name: "",//姓名
        phone: "",//電話
        email: "",//email
        password: "",//密碼
        repeatPassword: "",//確認密碼
      }
    }
  },
  computed:{
    formDataJSON() {
      return JSON.stringify(this.formData);
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
    loginRouterPush() {
      router.push("/login_page")
    },
    register() {
      console.log(this.formDataJSON);
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
    <div class="border-2 border-black rounded-[30px] w-[1150px] h-[600px]">
      <div class="flex  h-[100px] justify-center items-center">
        <p class="text-[40px] font-bold">會員註冊</p>
      </div>
      <div class="flex">
        <div class="w-6/12  h-[350px]">
          <div class="relative">
            <input type="text" placeholder="輸入您的真實姓名" v-model="formData.name"
              class="border-2 border-black ml-[50px] mt-[80px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/icon-park-twotone_edit-name.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
          <div class="relative">
            <input type="text" placeholder="輸入您的手機門號" v-model="formData.phone"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/ph_phone-duotone.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
        </div>
        <div class="w-6/12  h-[350px]">
          <div class="relative">
            <input type="text" placeholder="輸入Email" v-model="formData.email"
              class="border-2 border-black ml-[50px] mt-[40px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('../../public/Account_icon.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
          <div class="relative">
            <input placeholder="輸入密碼" :type="pwdFlag ? 'text' : 'password'" v-model="formData.password"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg px-[60px]">
            <div class="absolute w-[35px] h-[35px] bg-[url('../../Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
            <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye fa-2xl" @click="pwdflagTrue"
              v-if="this.pwdFlag === false"></i>
            <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye-slash fa-2xl" @click="pwdflagFalse"
              v-if="this.pwdFlag === true"></i>
          </div>
          <div class="relative ">
            <input placeholder="確認密碼" :type="repeatpwdFlag ? 'text' : 'password'" v-model="formData.repeatPassword"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg px-[60px] ">
            <div class="absolute w-[35px] h-[35px] bg-[url('../../Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
            <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye fa-2xl" @click="repeatpwdflagTrue"
              v-if="this.repeatpwdFlag === false"></i>
            <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye-slash fa-2xl" @click="repeatpwdflagFalse"
              v-if="this.repeatpwdFlag === true"></i>
          </div>
        </div>
      </div>
      <div class=" h-[100px] flex justify-center items-center">
        <button type="button"
          class="w-[250px] h-[60px]  text-[26px] rounded-lg bg-[#2B4BF0] text-white hover:scale-105 active:scale-95"
          @click="register">註冊</button>
      </div>
      <div class=" h-[50px] flex justify-center ">
        <button type="button"
          class="w-[180px] h-[35px]  text-[22px] rounded-lg  font-bold hover:scale-105 active:scale-95"
          @click="loginRouterPush">已有帳號?登入</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped ></style>
