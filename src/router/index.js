import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PersonalInfo from "../views/PersonalInfo.vue";
import PersonalInfoUpload from "../views/PersonalInfoUpload.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
  ],
});

export default router;
