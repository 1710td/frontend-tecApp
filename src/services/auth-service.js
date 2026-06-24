import axios from "axios";
import { useAuthStore } from "../stores/auth";
import router from "../router/router.js";

const API_URL = "http://localhost:9000/api/auth";

export const login = async (loginData) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: loginData.email,
      contrasena: loginData.contrasena,
    });

    // FIX 1: Guardamos en Pinia el TOKEN y el USUARIO REAL que devuelve el backend
    // (con su id, nombre_rol y array de permisos)
    const { token, usuario } = response.data;
    authStore.login(token, usuario);

    // FIX 3: Redirección dinámica basada en el rol para evitar bloqueos del Router
    //alert(authStore.rol);
    if (authStore.rol === "root") {
      router.push("/dashboard-administrador");
      return {
        success: true,
      };
    } else {
      router.push("/login/administrador"); // Alumnos, preceptores, etc.
      return {
        success: false,
      };
    }

    if (authStore.rol === "alumno") {
      router.push("/dashboard-alumno");
      return {
        success: false,
        message: "No tienes permisos para acceder a esta sección.",
      };
    } else {
      router.push("/inicio");
      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    let errorMessage =
      "Ocurrió un error inesperado al conectar con el servidor.";

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      errorMessage = data?.message || `Error del servidor (${status})`;

      if (status === 401) errorMessage = "Credenciales incorrectas.";
      if (status === 404) errorMessage = "El usuario no existe.";
      if (status === 429)
        errorMessage = "Demasiados intentos. Intenta más tarde.";
    } else if (error.request) {
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu internet.";
    }

    console.error("Error de login:", error);
    return { success: false, message: errorMessage };
  }
};

export const registro = async (registroData) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.post(`${API_URL}/registro`, {
      nombre: registroData.nombre,
      apellido: registroData.apellido,
      email: registroData.email,
      contrasena: registroData.contrasena,
      id_rol: registroData.id_rol,
    });

    // FIX 2: Usamos la nueva acción unificada 'login' de Pinia
    // y guardamos también los datos del usuario recién registrado
    const { token, usuario } = response.data;
    authStore.login(token, usuario);

    // FIX 3 (Repetido): Redirección inteligente post-registro
    if (authStore.rol === "root") {
      router.push("/dashboard-administrador");
    } else {
      router.push("/inicio");
    }

    if (authStore.rol === "alumno") {
      router.push("/dashboard-alumno");
    } else {
      router.push("/inicio");
    }

    return {
      success: true,
    };
  } catch (error) {
    let errorMessage =
      "Ocurrió un error inesperado al conectar con el servidor.";

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      errorMessage = data?.message || `Error del servidor (${status})`;

      if (status === 400)
        errorMessage = "El correo electrónico ya está registrado.";
      if (status === 401) errorMessage = "Credenciales incorrectas.";
      if (status === 404) errorMessage = "El usuario no existe.";
      if (status === 429)
        errorMessage = "Demasiados intentos. Intenta más tarde.";
    } else if (error.request) {
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu internet.";
    }

    console.error("Error de registro:", error);
    return {
      success: false,
      message: errorMessage,
    };
  }
};
