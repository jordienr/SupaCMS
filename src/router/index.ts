import { createWebHistory, createRouter } from "vue-router";
import { supa } from "../supabase";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to, from, next) => {
  console.log("beforeEach");
  const isLoggedIn = supa.auth.user();

  let nextPath = to.path;

  if (!isLoggedIn) {
    nextPath = "/login";
  }

  if (nextPath === to.path) {
    next();
  } else {
    next(nextPath);
  }
});
