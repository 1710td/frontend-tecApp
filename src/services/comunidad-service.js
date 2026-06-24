import axios from "axios";
import { useAuthStore } from "../stores/auth.js";

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
    // 1. Crear el objeto FormData
    const formData = new FormData();

    // 2. Agregar los campos de texto
    formData.append("titulo", noticiaData.titulo);
    formData.append("contenido", noticiaData.contenido);
    formData.append("autor_id", noticiaData.autor_id);

    // 3. Agregar el archivo
    // IMPORTANTE: 'imagen' debe ser exactamente igual al nombre que usas
    // en tu backend en el middleware 'upload.single("imagen")'
    if (noticiaData.file) {
      formData.append("imagen", noticiaData.file);
    }

    // 4. Enviar el FormData.
    // Nota: NO se pasan los headers, Axios los gestiona solo.
    console.log(Object.fromEntries(formData));
    const response = await axios.post(
      "http://localhost:9000/api/comunidad/noticias",
      formData,
    );

    console.log("Respuesta:", response.data);
    return response;
  } catch (error) {
    // Es mejor imprimir el error completo para debuguear en consola
    console.error(
      "Error al subir noticia:",
      error.response?.data || error.message,
    );
    throw error; // Lanza el error para que el componente que llama a esta función pueda manejarlo
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
