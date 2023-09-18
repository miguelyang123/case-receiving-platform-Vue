import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PersonalInfo from "../views/PersonalInfo.vue";
import PersonalInfoUpload from "../views/PersonalInfoUpload.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/register_page",
      name: "RegisterPage",
      component: RegisterPage,
    },
    {
      path: "/login_page",
      name: "LoginPage",
      component: LoginPage,
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
    {
      path: "/tackcasepage",
      name: "TackCasePage",
      component: () => import("../views/TackCasePage.vue"),
    },
    {
      path: "/tackcasedetailspage",
      name: "TackCaseDetailsPage",
      component: () => import("../views/TackCaseDetailsPage.vue"),
      props:true,
    },
    {
      path: "/personalinfoedit",
      name: "PersonalInfoEdit",
      component: () => import("../views/PersonalInfoEdit.vue"),
    },
  ],
});

export default router;
