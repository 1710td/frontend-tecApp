import { createApp } from "vue";
import App from "./app.vue"; // Ensure component name is capitalized (App vs app)
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

// 1. Install Pinia FIRST
app.use(pinia);

// 2. Install Router SECOND (so guards can access stores)
app.use(router);

// 3. Mount
app.mount("#app");
