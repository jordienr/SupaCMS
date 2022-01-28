import { supa } from "../supabase";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomeView.vue"),
    meta: {
      showSidebar: true,
    },
  },
  {
    path: "/content/:table",
    name: "Table",
    meta: {
      showSidebar: true,
    },
    component: () => import("../components/TableView.vue"),
  },
  {
    path: "/files/:bucket",
    name: "Files",
    meta: {
      showSidebar: true,
    },
    component: () => import("../components/BucketView.vue"),
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
    beforeEnter: () => {
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
