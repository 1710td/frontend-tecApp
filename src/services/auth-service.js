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

    const { token, usuario } = response.data;

    // Guardar sesión
    authStore.login(token, usuario);

    // Redireccionar según el rol
    switch (usuario.nombre_rol?.toLowerCase()) {
      case "root":
        router.push("/dashboard-administrador");
        break;

      case "preceptor":
        router.push("/dashboard-preceptor");
        break;

      case "profesor":
        router.push("/dashboard-administrador");
        break;

      case "alumno":
        router.push("/dashboard-alumno");
        break;

      default:
        router.push("/");
        break;
    }

    return {
      success: true,
      token,
      usuario,
    };
  } catch (error) {
    let errorMessage = "Ocurrió un error inesperado.";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "Faltan datos.";
          break;

        case 401:
          errorMessage = "Correo o contraseña incorrectos.";
          break;

        case 404:
          errorMessage = "El usuario no existe.";
          break;

        case 429:
          errorMessage = "Demasiados intentos.";
          break;

        default:
          errorMessage =
            error.response.data?.error ||
            error.response.data?.message ||
            "Error del servidor.";
      }
    } else if (error.request) {
      errorMessage = "No fue posible conectar con el servidor.";
    }

    console.error(error);

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/*
export const registro = async (registroData) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.post(`${API_URL}/registro`, {
      dni: registroData.dni,
      email: registroData.email,
      fecha_nacimiento: registro.fecha_nacimiento,
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
*/

export const registro = async (registroData) => {
  try {
    const response = await axios.post(`${API_URL}/iniciar-registro`, {
      dni: registroData.dni,
      nacimiento: registroData.fecha_nacimiento,
      email: registroData.email,
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    let errorMessage = "Ocurrió un error inesperado.";

    if (error.response) {
      const status = error.response.status;

      errorMessage = error.response.data?.message || errorMessage;

      if (status === 400) errorMessage = "Los datos ingresados son inválidos.";

      if (status === 401) errorMessage = "No fue posible validar tu identidad.";

      if (status === 409) errorMessage = "Ese correo ya está registrado.";

      if (status === 429)
        errorMessage = "Demasiados intentos. Intentá nuevamente más tarde.";
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const verificarCodigo = async (info) => {
  try {
    const response = await axios.post(`${API_URL}/verificar-codigo`, info);

    return {
      success: true,
      token: response.data.token,
      usuario: response.data.usuario,
      message: response.data.mensaje,
    };
  } catch (error) {
    let errorMessage = "No fue posible verificar el código.";

    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        errorMessage;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
