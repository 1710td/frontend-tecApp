import axios from "axios";
import { useAuthStore } from "../stores/auth.js";

// ==========================================
//      CONFIGURACIÓN Y HELPERS
// ==========================================

// Usamos la URL base general. Ajustá si comunicados/noticias usan /academico u otro prefijo.
const API_URL = "http://localhost:9000/api";

/**
 * Genera dinámicamente los headers con el token actualizado de Pinia.
 * @param {boolean} isMultipart - True si se envía FormData (archivos), omite el Content-Type JSON.
 */
const getConfig = (isMultipart = false) => {
  const authStore = useAuthStore();
  const headers = {
    Authorization: `Bearer ${authStore.token}`,
  };

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  return { headers };
};

/**
 * Estandariza la respuesta de errores para todo el servicio
 */
const manejarErrorApi = (error, mensajePorDefecto) => {
  console.error(`[API Error] ${mensajePorDefecto}:`, error);

  if (error.response) {
    return {
      success: false,
      status: error.response.status,
      message:
        error.response.data?.message ||
        error.response.data?.error ||
        error.response.data?.mensaje || // Soporte para las respuestas de tu backend
        mensajePorDefecto,
    };
  }

  return {
    success: false,
    message: "No se pudo conectar con el servidor. Revisá tu conexión.",
  };
};

// ==========================================
//      SERVICIOS DE NOTICIAS
// ==========================================

export const obtenerNoticias = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/comunidad/noticias`,
      getConfig(),
    );
    return response.data.noticias;
  } catch (error) {
    throw manejarErrorApi(error, "Error al obtener las noticias");
  }
};

export const crearNoticia = async (noticiaData) => {
  try {
    const formData = new FormData();
    formData.append("titulo", noticiaData.titulo);
    formData.append("contenido", noticiaData.contenido);
    formData.append("autor_id", noticiaData.autor_id);

    if (noticiaData.file) {
      formData.append("imagen", noticiaData.file);
    }

    // Le pasamos true a getConfig para que no pise el Content-Type necesario para archivos
    const response = await axios.post(
      `${API_URL}/comunidad/noticias`,
      formData,
      getConfig(true),
    );
    return response.data;
  } catch (error) {
    throw manejarErrorApi(error, "Error al crear la noticia");
  }
};

export const eliminarNoticia = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/comunidad/noticias/${id}`,
      getConfig(),
    );
    return response.data;
  } catch (error) {
    throw manejarErrorApi(error, "Error al eliminar la noticia");
  }
};

// ==========================================
//      SERVICIOS DE COMUNICADOS
// ==========================================

export const obtenerTodosComunicados = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/comunidad/comunicados`,
      getConfig(),
    );
    console.log("COMUNICADOS:", response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    throw manejarErrorApi(error, "Error al obtener los comunicados");
  }
};

export const obtenerComunicado = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/comunidad/comunicados/${id}`,
      getConfig(),
    );
    return response.data;
  } catch (error) {
    throw manejarErrorApi(error, `Error al obtener el comunicado ${id}`);
  }
};

export const crearComunicado = async (comunicadoData) => {
  try {
    const response = await axios.post(
      `${API_URL}/comunidad/comunicados`,
      comunicadoData,
      getConfig(),
    );
    return response.data;
  } catch (error) {
    throw manejarErrorApi(error, "Error al crear el comunicado");
  }
};

export const actualizarComunicado = async (id, comunicadoData) => {
  try {
    const response = await axios.put(
      `${API_URL}/comunidad/comunicados/${id}`,
      comunicadoData,
      getConfig(),
    );
    return response.data;
  } catch (error) {
    throw manejarErrorApi(error, `Error al actualizar el comunicado ${id}`);
  }
};

export const eliminarComunicado = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/comunidad/comunicados/${id}`,
      getConfig(),
    );
    return response.data;
  } catch (error) {
    throw manejarErrorApi(error, `Error al eliminar el comunicado ${id}`);
  }
};
