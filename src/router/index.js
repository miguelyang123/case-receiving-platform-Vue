import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PersonalInfo from "../views/PersonalInfo.vue";
import PersonalInfoUpload from "../views/PersonalInfoUpload.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import IdentityAuthentication from "../views/IdentityAuthentication.vue";
import ResetPassword from "../views/ResetPassword.vue";
import FinishResetPassword from "../views/FinishResetPassword.vue";

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
      path: "/identity_authentication",
      name: "IdentityAuthentication",
      component: IdentityAuthentication,
    },
    {
      path: "/reset_password",
      name: "ResetPassword",
      component: ResetPassword,
    },
    {
      path: "/finish_reset_password",
      name: "FinishResetPassword",
      component: FinishResetPassword,
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
    {
      path: "/managerpage",
      name: "ManagerPage",
      component: () => import("../views/ManagerPage.vue"),
    },
    {
      path: "/case_upload_page",
      name: "CaseUploadPage",
      component: () => import("../views/CaseUploadPage.vue"),
    },
  ],
});

export default router;
