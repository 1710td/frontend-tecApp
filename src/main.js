import { createApp } from "vue";
import App from "./app.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Eliminamos 'next' de los parámetros
router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.estaAutenticado) {
      // Retornamos directamente el string de la ruta o el objeto
      return { path: "/login" };
    }

    console.log("PERMISO DASHBOARD:", to.meta.role);
    console.log("PERMISO ACTUAL:", authStore.rol);
    if (to.meta.role && authStore.rol !== to.meta.role) {
      return {
        path: "/unauthorized",
      };
    }
  }

  // Si pasamos todos los filtros (o si es una ruta pública),
  // retornamos 'true' (o nada) para permitir la navegación.
  return;
});

app.use(router);
app.mount("#app");
