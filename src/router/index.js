import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/registerPage",
      name: "RegisterPage",
      component: RegisterPage,
    },
    {
      path: "/personal_info",
      name: "personalInfo",
      component: PersonalInfo,
    },
    {
      path: "/personal_info_upload",
      name: "personalInfoUpload",
      component: PersonalInfoUpload,
    },
  ],
});

export default router;
