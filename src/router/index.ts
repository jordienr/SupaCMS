import { createWebHistory, createRouter } from "vue-router";
import { supa } from "../supabase";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const isLoggedIn = supa.auth.user();

  if (isPublic) {
    console.log("isPublic");
    next();
  } else {
    console.log("notPublic");
    if (!isLoggedIn) {
      console.log("GoToLogin");
      next("/login");
    } else {
      console.log("Next");
      next();
    }
  }
});
