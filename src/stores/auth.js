import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // 1. Estado inicial leyendo de localStorage
  const token = ref(localStorage.getItem("token") || null);
  // Leemos el usuario, recordando convertir el string JSON de vuelta a un objeto
  const usuario = ref(JSON.parse(localStorage.getItem("usuario")) || null);

  // 2. Getters (computed)
  const estaAutenticado = computed(() => !!token.value);
  // Exponemos el rol para que el router.beforeEach lo pueda leer
  const rol = computed(() => usuario.value?.nombre_rol || null);
  // Exponemos los permisos para usarlos en los componentes (ej. ocultar botones)
  const permisos = computed(() => usuario.value?.permisos || []);

  // 3. Acciones
  // Cambiamos 'setToken' por 'login' para guardar ambas cosas a la vez
  const login = (nuevoToken, datosUsuario) => {
    token.value = nuevoToken;
    usuario.value = datosUsuario;

    localStorage.setItem("token", nuevoToken);
    // localStorage solo guarda strings, así que convertimos el objeto
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  const logout = () => {
    token.value = null;
    usuario.value = null;

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  // Extra: Un helper muy útil para usar con v-if en tus componentes Vue
  const tienePermiso = (permiso) => permisos.value.includes(permiso);

  return {
    token,
    usuario,
    estaAutenticado,
    rol,
    permisos,
    login,
    logout,
    tienePermiso,
  };
});
