import axios from "axios";
import { useAuthStore } from "../stores/auth.js";

export const obtenerCursos = async () => {
  // 1. Ejecutamos el hook para instanciar el store
  const authStore = useAuthStore();

  // Opcional: Podés loguearlo para confirmar que el token existe antes de la petición
  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/academico/cursos",
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
    console.log("Cursos obtenidos:", data);

    return response;
  } catch (error) {
    // 4. Usamos comillas invertidas para concatenar el string correctamente
    //alert(`No se encontraron cursos: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};

export const crearCurso = async (cursoData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(
      "http://localhost:9000/api/academico/cursos",
      {
        nombre_curso: cursoData.nombre_curso,
        nivel: cursoData.nivel,
        ciclo_lectivo: cursoData.ciclo_lectivo,
        capacidad_maxima: cursoData.capacidad_maxima,
        aula: cursoData.aula,
        turno: cursoData.turno,
        id_profesor_titular: cursoData.id_profesor_titular,
        estado: cursoData.estado,
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
  }
};

export const eliminarCurso = async (id) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.delete(
      `http://localhost:9000/api/academico/cursos/${id}`,
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

export const modificarCurso = async (cursoData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.patch(
      "http://localhost:9000/api/academico/cursos",
      {
        id_curso: cursoData.id_curso,
        nombre_curso: cursoData.nombre_curso,
        nivel: cursoData.nivel,
        ciclo_lectivo: cursoData.ciclo_lectivo,
        capacidad_maxima: cursoData.capacidad_maxima,
        aula: cursoData.aula,
        turno: cursoData.turno,
        id_profesor_titular: cursoData.id_profesor_titular,
        estado: cursoData.estado,
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
  }
};

//  =========== PROFESORES   ===========
export const obtenerProfesores = async () => {
  const authStore = useAuthStore();

  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/academico/profesores",
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;
    console.log("Profesores obtenidos:", data);

    return response;
  } catch (error) {
    //alert(`No se encontraron profesores: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};

export const crearProfesor = async (profesorData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(
      "http://localhost:9000/api/academico/profesores",
      {
        nombre: profesorData.nombre,
        apellido: profesorData.apellido,
        dni: profesorData.dni,
        email: profesorData.email,
        telefono: profesorData.telefono,
        fecha_nacimiento: profesorData.fecha_nacimiento,
        domicilio: profesorData.domicilio,
        fecha_contratacion: profesorData.fecha_contratacion,
        estado: profesorData.estado,
        titulo_habilitante: profesorData.titulo_habilitante,
        especialidad: profesorData.especialidad,
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
    alert(error);
  }
};

export const eliminarProfesor = async (id) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.delete(
      `http://localhost:9000/api/academico/profesores/${id}`,
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
          "No se puede eliminar el Profesor. Verificá que no tenga cursos asignados e intentá de nuevo.",
      };
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor.",
    };
  }
};

export const modificarProfesor = async (profesorData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.patch(
      "http://localhost:9000/api/academico/profesores",
      {
        id_profesor: profesorData.id_profesor,
        nombre: profesorData.nombre,
        apellido: profesorData.apellido,
        dni: profesorData.dni,
        email: profesorData.email,
        telefono: profesorData.telefono,
        fecha_nacimiento: profesorData.fecha_nacimiento,
        domicilio: profesorData.domicilio,
        fecha_contratacion: profesorData.fecha_contratacion,
        estado: profesorData.estado,
        titulo_habilitante: profesorData.titulo_habilitante,
        especialidad: profesorData.especialidad,
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
  }
};

//  =========== ALUMNOS   ===========
export const obtenerAlumnos = async () => {
  const authStore = useAuthStore();

  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/academico/alumnos",
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;
    console.log("Alumnos obtenidos:", data);

    return response;
  } catch (error) {
    //alert(`No se encontraron alumnos: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};

export const obtenerAlumnosCurso = async (id) => {
  const authStore = useAuthStore();

  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      `http://localhost:9000/api/academico/alumnos/curso/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;
    console.log("Alumnos obtenidos:", data);

    return response;
  } catch (error) {
    //alert(`No se encontraron alumnos: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};

export const crearAlumno = async (alumnoData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(
      "http://localhost:9000/api/academico/alumnos",
      {
        nombre: alumnoData.nombre,
        apellido: alumnoData.apellido,
        dni: alumnoData.dni,
        fecha_nacimiento: alumnoData.fecha_nacimiento,
        nombre_tutor: alumnoData.nombre_tutor,
        telefono_tutor: alumnoData.telefono_tutor,
        domicilio: alumnoData.domicilio,
        id_curso: alumnoData.id_curso,
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
  }
};

export const eliminarAlumno = async (id) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.delete(
      `http://localhost:9000/api/academico/alumnos/${id}`,
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
          "No se puede eliminar el alumno. Intentá de nuevo?",
      };
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor.",
    };
  }
};

export const modificarAlumno = async (alumnoData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.patch(
      "http://localhost:9000/api/academico/alumnos",
      {
        id_alumno: alumnoData.id_alumno,
        nombre: alumnoData.nombre,
        apellido: alumnoData.apellido,
        dni: alumnoData.dni,
        fecha_nacimiento: alumnoData.fecha_nacimiento,
        nombre_tutor: alumnoData.nombre_tutor,
        telefono_tutor: alumnoData.telefono_tutor,
        domicilio: alumnoData.domicilio,
        id_curso: alumnoData.id_curso,
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
    alert(error);
  }
};

//  =========== ASIGNACIONES DE MATERIAS   ===========

export const obtenerAsignaciones = async () => {
  // 1. Ejecutamos el hook para instanciar el store
  const authStore = useAuthStore();

  // Opcional: Podés loguearlo para confirmar que el token existe antes de la petición
  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/academico/asignaciones",
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
    console.log("Asignaciones obtenidas:", data);

    return response;
  } catch (error) {
    // 4. Usamos comillas invertidas para concatenar el string correctamente
    //alert(`No se encontraron asignaciones: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};

export const crearAsignacion = async (asignacionData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(
      "http://localhost:9000/api/academico/asignaciones",
      {
        id_curso: asignacionData.id_curso,
        id_materia: asignacionData.id_materia,
        id_profesor: asignacionData.id_profesor,
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
  }
};

export const eliminarAsignacion = async (id) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.delete(
      `http://localhost:9000/api/academico/asignaciones/${id}`,
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
          error.response.data?.message || "No se puede eliminar la asignacion.",
      };
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor.",
    };
  }
};

export const modificarAsignacion = async (asignacionData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.patch(
      "http://localhost:9000/api/academico/asignaciones",
      {
        id_asignacion: asignacionData.id_asignacion,
        id_curso: asignacionData.id_curso,
        id_materia: asignacionData.id_materia,
        id_profesor: asignacionData.id_profesor,
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
  }
};

//  =========== MATERIAS   ===========

export const obtenerMaterias = async () => {
  // 1. Ejecutamos el hook para instanciar el store
  const authStore = useAuthStore();

  // Opcional: Podés loguearlo para confirmar que el token existe antes de la petición
  console.log("Token actual:", authStore.token);

  try {
    const response = await axios.get(
      "http://localhost:9000/api/academico/materias",
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
    console.log("Materias obtenidas:", data);

    return response;
  } catch (error) {
    // 4. Usamos comillas invertidas para concatenar el string correctamente
    //alert(`No se encontraron materias: ${error.message}`);
    console.error("Detalle del error:", error);
  }
};

export const crearMateria = async (materiaData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(
      "http://localhost:9000/api/academico/materias",
      {
        nombre_materia: materiaData.nombre_materia,
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
  }
};

export const eliminarMateria = async (id) => {
  const authStore = useAuthStore();

  try {
    const response = await axios.delete(
      `http://localhost:9000/api/academico/materias/${id}`,
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
          error.response.data?.message || "No se puede eliminar la materia.",
      };
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor.",
    };
  }
};

export const modificarMateria = async (materiaData) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.patch(
      "http://localhost:9000/api/academico/materias",
      {
        id_materia: materiaData.id_materia,
        nombre_materia: materiaData.nombre_materia,
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
  }
};
