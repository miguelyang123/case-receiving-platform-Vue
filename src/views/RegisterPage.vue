<script>
import router from '../router';
import axios from 'axios';
export default {
  data() {
    return {
      pwdFlag: false, //密碼明碼
      repeatpwdFlag: false, //repeat 密碼明碼
      responseData: null,
      repeatPassword: "",
      code: "",
      message: "",
      //json
      postData: {
        email: "",//email
        password: "",//密碼
        user_name: "",//姓名
        phone: "",//電話  
      }
    }
  },
  computed: {
    
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
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const pwdPattern = /^.{8,30}$/;
      const namePattern = /^.{2,30}$/;
      const phonePattern = /^(?:0|\d{3}-?)(9|2)\d{2}-?\d{6}$/;
      if (!emailPattern.test(this.postData.email)) {
        alert("請輸入有效的email!");
        return;
      }
      if (!pwdPattern.test(this.postData.password)) {
        alert("請輸入有效的密碼(長度須介於8個字元跟30字元之間)!");
        return;
      }
      if (!namePattern.test(this.postData.name)) {
        alert("請輸入有效的名字!");
        return;
      }
      if (!phonePattern.test(this.postData.phone)) {
        alert("請輸入有效的手機門號!");
        return;
      }
      if (this.postData.password !== this.repeatPassword) {
        alert("輸入密碼與確認密碼不一致!");
        return;
      }
      axios.post('http://localhost:8080/api/signup', this.postData)
        .then(response => {
          this.responseData = response;
          this.code = this.responseData.data.code;
          this.message = this.responseData.data.message;
          if (this.code === "200") {
            alert(this.message);
            router.push("/login_page");
          } else {
            alert(this.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  },
}
</script>

<template>
  <!-- font-awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <div class="flex justify-center mt-[50px]  ">
    <div class="border-2 border-black rounded-[30px] w-[1150px] h-[600px]">
      <div class="flex  h-[100px] justify-center items-center">
        <p class="text-[40px] font-bold">會員註冊</p>
      </div>
      <div class="flex">
        <div class="w-6/12  h-[350px]">
          <div class="relative">
            <input type="text" placeholder="輸入您的真實姓名" v-model="postData.user_name"
              class="border-2 border-black ml-[50px] mt-[80px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('/src/assets/img/RegisterPageImg/icon-park-twotone_edit-name.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
          <div class="relative">
            <input type="text" placeholder="輸入您的手機門號" v-model="postData.phone"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
            <div
              class="absolute w-[35px] h-[35px] bg-[url('/src/assets/img/RegisterPageImg/ph_phone-duotone.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
          </div>
        </div>
        <div class="w-6/12  h-[350px]">
          <div class="relative">
            <input type="text" placeholder="輸入Email" v-model="postData.email"
              class="border-2 border-black ml-[50px] mt-[40px] w-[400px] h-[55px] text-[24px] rounded-lg pl-[60px]">
              <i class="fa-solid fa-envelope fa-2xl absolute bottom-[25px] left-[62px]"></i>
          </div>
          <div class="relative">
            <input placeholder="輸入密碼(長度8字元以上)" :type="pwdFlag ? 'text' : 'password'" v-model="postData.password"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg px-[60px]">
            <div class="absolute w-[35px] h-[35px] bg-[url('/src/assets/img/RegisterPageImg/Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
            </div>
            <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye fa-2xl" @click="pwdflagTrue"
              v-if="this.pwdFlag === false"></i>
            <i class="absolute bottom-[25px] left-[400px] fa-regular fa-eye-slash fa-2xl" @click="pwdflagFalse"
              v-if="this.pwdFlag === true"></i>
          </div>
          <div class="relative ">
            <input placeholder="確認密碼" :type="repeatpwdFlag ? 'text' : 'password'" v-model="repeatPassword"
              class="border-2 border-black ml-[50px] mt-[50px] w-[400px] h-[55px] text-[24px] rounded-lg px-[60px] ">
            <div class="absolute w-[35px] h-[35px] bg-[url('/src/assets/img/RegisterPageImg/Password_icon.png')] bg-cover bottom-[9px] left-[60px]">
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
