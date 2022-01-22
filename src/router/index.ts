import { createWebHistory, createRouter } from "vue-router";
import { supa } from "../supabase";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = supa.auth.user();
  const routeIsPublic = to.meta.public || false;

  let nextPath = to.path;

  if (!isLoggedIn && !routeIsPublic) {
    nextPath = "/login";
  }

  if (nextPath === to.path) {
    next();
  } else {
    next(nextPath);
  }
});
