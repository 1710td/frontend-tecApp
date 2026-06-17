import { createApp } from "vue";
import App from "./app.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import useAuthStore from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore;
  if (to.meta.requiresAuth) {
    if (!authStore.estaAutenticado) {
      return next({
        path: "/login",
      });
    }

    // 2. ¿El usuario tiene el rol necesario?
    if (to.meta.role && authStore.userRole !== to.meta.role) {
      return next({
        path: "/unauthorized",
      }); // O al Dashboard principal
    }
  }
});

app.use(pinia);

app.use(router);

// 3. Mount
app.mount("#app");
