import { createWebHistory, createRouter } from "vue-router";
import { supa } from "../supabase";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = supa.auth.user();

  let nextPath = to.path;

  if (!isLoggedIn) {
    nextPath = "/login";
  }

  console.log(nextPath);
  if (nextPath === to.path) {
    next();
  } else {
    next(nextPath);
  }
});
