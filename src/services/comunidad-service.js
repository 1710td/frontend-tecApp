import axios from "axios";
import useAuthStore from "../stores/auth.js";

// ========== FALTA IMPLEMENTAR EL ENVIO TOKENS EN LAS REQUEST ==========
export const obtenerNoticias = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/api/comunidad/noticias",
    );

    const data = response.data;

    return data.noticias;
  } catch (error) {
    console.error("Detalle del error:", error);
  }
};

export const crearNoticia = async (noticiaData) => {
  try {
    const response = axios.post(
      "http://localhost:9000/api/comunidad/noticias",
      noticiaData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Opcional, pero a veces necesario si falla
        },
      },
    );

    const data = response.data;
    console.log("Respuesta:", data);

    return response;
  } catch (error) {
    console.error("Error al subir:", error);
  }
};

export const eliminarNoticia = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:9000/api/comunidad/noticias/${id}`,
    );

    const data = response.data;
    console.log("Respuesta:", data);

    return response;
  } catch (error) {
    console.error("Error al subir:", error);
  }
};
