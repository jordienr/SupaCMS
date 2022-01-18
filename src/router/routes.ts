import { NavigationGuardNext, RouteRecord } from "vue-router";
import config from "../../supacms.config";
import { supa } from "../supabase";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomeView.vue"),
    meta: {
      showSidebar: true,
      title: config.appName,
    },
  },
  {
    path: "/:table",
    name: "Table",
    meta: {
      showSidebar: true,
    },
    component: () => import("../components/TableView.vue"),
  },
  {
    path: "/login",
    name: "LogIn",
    meta: {
      public: true,
      publicOnly: true,
      showSidebar: false,
    },
    component: () => import("../components/LogInView.vue"),
  },
  {
    path: "/logout",
    name: "LogOut",
    meta: {
      public: true,
    },
    beforeEnter: (
      to: RouteRecord,
      from: RouteRecord,
      next: NavigationGuardNext
    ) => {
      console.log("signout");
      supa.auth.signOut().then((d) => {
        window.location.reload();
      });
    },
  },
  {
    path: "/settings",
    meta: {
      showSidebar: true,
    },
    name: "Settings",
    component: () => import("../components/SettingsView.vue"),
  },
];
