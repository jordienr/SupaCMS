import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./styles/styles.css";
import { supa } from "./supabase";
import "easymde/dist/easymde.min.css";
import config from "../supacms.config";

const app = createApp(App).use(router);

app.mount("#app");

document.title = config.appName;

if (!supa.auth.user()) {
  // router.push("/login");
}
