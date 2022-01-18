import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./styles/styles.css";
import { supa } from "./supabase";

const app = createApp(App).use(router);

app.mount("#app");

if (!supa.auth.user()) {
  // router.push("/login");
}
