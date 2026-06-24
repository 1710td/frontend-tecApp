import axios from "axios";
import { useAuthStore } from "../stores/auth.js";

export const obtenerUsuarios = async () => {
  const authStore = useAuthStore();

  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/usuarios/usuarios",
      {
        headers: {
          // 2. Usamos la instancia (authStore) y no la definición
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    // 3. Axios ya te entrega el objeto parseado directamente en response.data
    const data = response.data;
    console.log("Usuarios obtenidos:", data);

    return response;
  } catch (error) {
    console.error("Detalle del error:", error);
    throw error;
  }
};

export const crearUsuario = async (usuarioData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(
      "http://localhost:9000/api/usuarios/usuarios",
      {
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        email: usuarioData.email,
        contrasena: usuarioData.contrasena,
        id_rol: usuarioData.id_rol,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    console.log(data);
    return {
      success: true,
    };
  } catch (error) {
    //alert(error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.delete(
      `http://localhost:9000/api/usuarios/usuarios/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      console.error("ERROR RESPONSE->", error.response);

      return {
        success: false,
        status: error.response.status,
        message:
          error.response.data?.message ||
          "No se puede eliminar el curso. Verificá que no tenga alumnos asignados e intentá de nuevo.",
      };
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor.",
    };
  }
};

export const modificarUsuario = async (usuarioData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.patch(
      "http://localhost:9000/api/usuarios/usuarios",
      {
        id_usuario: usuarioData.id_usuario,
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        email: usuarioData.email,
        contrasena: usuarioData.contrasena,
        id_rol: usuarioData.id_rol,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    console.log(data);
    return {
      success: true,
    };
  } catch (error) {
    //alert(error);
    throw error;
  }
};

//  =========== ROLES  ===========

export const obtenerRoles = async () => {
  // 1. Ejecutamos el hook para instanciar el store
  const authStore = useAuthStore();

  // Opcional: Podés loguearlo para confirmar que el token existe antes de la petición
  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/usuarios/roles",
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;
    console.log("roles obtenidos:", data);

    return response;
  } catch (error) {
    //alert(`No se encontraron roles: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};
