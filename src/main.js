import { createApp, provide } from "vue";
import "./style/style.css";
import App from "./App.vue";
import store from "./store";
import router from "./routes";

const app = createApp(App);

app.provide("store", store);

app.use(router);

app.mount("#app");
