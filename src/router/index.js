import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PersonalInfo from "../views/PersonalInfo.vue";
import PersonalInfoUpload from "../views/PersonalInfoUpload.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import IdentityAuthentication from "../views/IdentityAuthentication.vue";
import ResetPassword from "../views/ResetPassword.vue";
import FinishResetPassword from "../views/FinishResetPassword.vue";
import axios from 'axios';

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
      meta: {
        isAuth: true,
      },
      beforeEnter: (to, from, next) => {
        if (to.meta.isAuth) {
          axios.get('http://localhost:8080/api/get_balance', { withCredentials: true })
            .then(response => {
              const logoutResponseData = response;
              const logoutResponseDataCode = logoutResponseData.data.code;
              if (logoutResponseDataCode === "200") {
                next();
              } else {
                alert("請先登入!");
                next("/login_page");
              }
            })
            .catch(error => {
              alert(error);
            });
        }
      }
    },
    {
      path: "/personal_info_upload",
      name: "personalInfoUpload",
      component: PersonalInfoUpload,
      meta: {
        isAuth: true,
      },
      beforeEnter: (to, from, next) => {
        if (to.meta.isAuth) {
          axios.get('http://localhost:8080/api/get_balance', { withCredentials: true })
            .then(response => {
              const logoutResponseData = response;
              const logoutResponseDataCode = logoutResponseData.data.code;
              if (logoutResponseDataCode === "200") {
                next();
              } else {
                alert("請先登入!");
                next("/login_page");
              }
            })
            .catch(error => {
              alert(error);
            });
        }
      }
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
      props: true,
    },
    {
      path: "/personalinfoedit",
      name: "PersonalInfoEdit",
      component: () => import("../views/PersonalInfoEdit.vue"),
      meta: {
        isAuth: true,
      },
      beforeEnter: (to, from, next) => {
        if (to.meta.isAuth) {
          axios.get('http://localhost:8080/api/get_balance', { withCredentials: true })
            .then(response => {
              const logoutResponseData = response;
              const logoutResponseDataCode = logoutResponseData.data.code;
              if (logoutResponseDataCode === "200") {
                next();
              } else {
                alert("請先登入!");
                next("/login_page");
              }
            })
            .catch(error => {
              alert(error);
            });
        }
      }
    },
    {
      path: "/managerpage",
      name: "ManagerPage",
      component: () => import("../views/ManagerPage.vue"),
      meta: {
        isAuth: true,
      },
      beforeEnter: (to, from, next) => {
        if (to.meta.isAuth) {
          axios.get('http://localhost:8080/api/get_balance', { withCredentials: true })
            .then(response => {
              const logoutResponseData = response;
              const logoutResponseDataCode = logoutResponseData.data.code;
              if (logoutResponseDataCode === "200") {
                const logoutResponseDataAdministrator = logoutResponseData.data.userInfo.administrator;
                if (!logoutResponseDataAdministrator) {
                  alert("檢測到非管理者身分，無法進入該網頁!");
                  next("/personal_info");
                }

              } else {
                alert("請先登入!");
                next("/login_page");
              }
            })
            .catch(error => {
              alert(error);
            });
        }
      }
    },
    {
      path: "/case_upload_page",
      name: "CaseUploadPage",
      component: () => import("../views/CaseUploadPage.vue"),
    },
    {
      path: "/case_edit_search_page",
      name: "CaseEditSearchPage",
      component: () => import("../views/CaseEditSearchPage.vue"),
    },
    {
      path: "/case_edit_page",
      name: "CaseEditPage",
      component: () => import("../views/CaseEditPage.vue"),
    },
    {
      path: "/case_edit_receive_user_page",
      name: "CaseEditReceiveUserPage",
      component: () => import("../views/CaseEditReceiveUserPage.vue"),
    },
    {
      path: "/case_done_check_page",
      name: "CaseDoneCheckPage",
      component: () => import("../views/CaseDoneCheckPage.vue"),
    },
  ],
});

export default router;
