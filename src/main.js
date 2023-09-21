import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import Vue from 'vue'
// import uploader from 'vue-simple-uploader'
// Vue.use(uploader)

// Vue
const app = createApp(App);
// Pinia
const pinia = createPinia();

// Vue 套用 Router 資料
app.use(router);
// 套用 pinia 資料
app.use(pinia);

app.mount("#app");
