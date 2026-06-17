import axios from "axios";
import useAuthStore from "../stores/auth";
import router from "../router/router.js";

export const login = async (loginData) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.post("http://localhost:9000/api/auth/login", {
      email: loginData.email,
      contrasena: loginData.contrasena,
    });

    authStore.setToken(response.data.token);
    router.push("/dashboard-administrador");

    return { success: true };
  } catch (error) {
    let errorMessage =
      "Ocurrió un error inesperado al conectar con el servidor.";

    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      const status = error.response.status;
      const data = error.response.data;

      errorMessage = data?.message || `Error del servidor (${status})`;

      if (status === 401) errorMessage = "Credenciales incorrectas.";
      if (status === 404) errorMessage = "El usuario no existe.";
      if (status === 429)
        errorMessage = "Demasiados intentos. Intenta más tarde.";
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta (servidor caído)
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu internet.";
    }

    // Aquí lanzamos el error o lo retornamos para que el componente de la UI lo maneje
    console.error("Error de login:", error);
    return { success: false, message: errorMessage };
  }
};

export const registro = async (registroData) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.post(
      "http://localhost:9000/api/auth/registro",
      {
        nombre: registroData.nombre,
        apellido: registroData.apellido,
        email: registroData.email,
        contrasena: registroData.contrasena,
        id_rol: registroData.id_rol,
      },
    );

    authStore.setToken(response.data.token);
    router.push("/dashboard-administrador");

    return {
      success: true,
    };
  } catch (error) {
    let errorMessage =
      "Ocurrió un error inesperado al conectar con el servidor.";

    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      const status = error.response.status;
      const data = error.response.data;

      errorMessage = data?.message || `Error del servidor (${status})`;

      if (status === 400)
        errorMessage = "El correo electronico ya esta registrado";
      if (status === 401) errorMessage = "Credenciales incorrectas.";
      if (status === 404) errorMessage = "El usuario no existe.";
      if (status === 429)
        errorMessage = "Demasiados intentos. Intenta más tarde.";
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta (servidor caído)
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu internet.";
    }

    // Aquí lanzamos el error o lo retornamos para que el componente de la UI lo maneje
    console.error("Error de registro:", error);
    return {
      success: false,
      message: errorMessage,
    };
  }
};
