import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./styles/styles.css";
import { supa } from "./supabase";
import "easymde/dist/easymde.min.css";
import config from "@/config";

const app = createApp(App).use(router);

app.mount("#app");
supa.auth.onAuthStateChange((event, session) => {
  if (session) {
    const isLoginRoute = window.location.href.includes("/login");
    if (isLoginRoute) {
      router.push("/");
    }
  } else {
    router.push("/login");
  }
});

document.title = config.appName;
