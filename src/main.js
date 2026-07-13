import { createApp } from "vue";
import App from "./app.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";
import axios from "axios";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Configuración global de Axios para inyectar Token y reescribir URLs locales dinámicamente
axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    // 1. Inyectar Bearer token automáticamente si el usuario está autenticado y no se definió manualmente
    if (authStore.token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    // 2. Reescribir URL del servidor en base a las variables de entorno para producción/despliegue
    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
    if (config.url && config.url.startsWith("http://localhost:9000/api")) {
      config.url = config.url.replace("http://localhost:9000/api", apiURL);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Eliminamos 'next' de los parámetros
router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.estaAutenticado) {
      return {
        path: "/inicio",
      };
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
