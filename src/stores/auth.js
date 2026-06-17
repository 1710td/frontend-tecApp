import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useAuthStore = defineStore("auth", () => {
  // Inicializamos el token leyendo el localStorage por si el usuario recargó la página
  const token = ref(localStorage.getItem("token") || null);
  const usuario = ref(null);

  // Un "getter" para saber si hay sesión activa
  const estaAutenticado = computed(() => !!token.value);

  // Acciones
  const setToken = (nuevoToken) => {
    token.value = nuevoToken;
    localStorage.setItem("token", nuevoToken); // Lo guardamos físicamente
  };

  const logout = () => {
    token.value = null;
    usuario.value = null;
    localStorage.removeItem("token"); // Lo borramos físicamente
  };

  return { token, usuario, estaAutenticado, setToken, logout };
});

export default useAuthStore;
