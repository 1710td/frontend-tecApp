<template>
  <section class="tab-panel active">
    <div class="tab-toolbar">
      <div class="tab-toolbar-left">
        <h2 class="section-title"><i class="fas fa-clipboard-check"></i> Registro de asistencias</h2>
      </div>
      <div class="asist-toolbar-right">
        <div class="filter-group">
          <span class="courses-title">Curso:</span>
          <select v-model="asistCurso" @change="onAsistCursoChange">
            <option value="" disabled>Seleccionar curso…</option>
            <option v-for="c in todosCursos" :key="c.id || c" :value="c.id || c">{{ c.nombre || c }}</option>
          </select>
        </div>
        <input type="date" v-model="asistFecha" class="date-input" />
        <button class="btn-add-subject" :disabled="!asistCurso" @click="tomarAsistencia">
          <i class="fas fa-clipboard-check"></i> Tomar asistencia
        </button>
      </div>
    </div>

    <div v-if="mostrarAsistencia" class="asist-lista-wrap">
      <div class="asist-lista">
        <div v-for="alumno in listaAlumnos" :key="alumno.id_alumno" class="alumno-row" :class="alumno.estado">
          <span class="alumno-nombre">{{ alumno.nombre }}</span>
          <div class="asist-btns">
            <button class="asist-btn btn-presente" :class="{ selected: alumno.estado === 'presente' }" @click="alumno.estado = 'presente'">
              <i class="fas fa-check"></i>
            </button>
            <button class="asist-btn btn-ausente" :class="{ selected: alumno.estado === 'ausente' }" @click="alumno.estado = 'ausente'">
              <i class="fas fa-times"></i>
            </button>
            <button class="asist-btn btn-tardanza" :class="{ selected: alumno.estado === 'tardanza' }" @click="alumno.estado = 'tardanza'">
              <i class="fas fa-clock"></i>
            </button>
          </div>
        </div>
      </div>
      <div style="margin-top: 20px; text-align: right">
        <button class="btn-guardar-asist" @click="guardarAsistencia">Guardar asistencia</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { obtenerAsignacionesProfesor, obtenerAlumnosCurso, guardarAsistenciasLote } from "@/services/academico-service.js";

const authStore = useAuthStore();

const todosCursos = ref([]);
const asignaciones = ref([]);
const asistCurso = ref("");
const asistFecha = ref(new Date().toISOString().split("T")[0]);
const mostrarAsistencia = ref(false);
const listaAlumnos = ref([]);
const historialAsistencias = ref([]);
const cargando = ref(false);

onMounted(async () => {
  try {
    const profesorRaw = localStorage.getItem("alumno"); // recordá que en auth-service.js guardamos con guardarInfo que escribe 'alumno'
    if (!profesorRaw) return;
    const profesor = JSON.parse(profesorRaw);
    const idProfesor = profesor.data?.id_profesor || profesor.id_profesor;

    if (idProfesor) {
      const res = await obtenerAsignacionesProfesor(idProfesor);
      if (res.success && res.data) {
        asignaciones.value = res.data;
        // Filtrar cursos únicos
        const cursosMap = new Map();
        res.data.forEach((asig) => {
          if (asig.cursoAsignacion) {
            cursosMap.set(asig.cursoAsignacion.id_curso, asig.cursoAsignacion.nombre_curso);
          }
        });
        todosCursos.value = Array.from(cursosMap.entries()).map(([id, nombre]) => ({ id, nombre }));
      }
    }
  } catch (error) {
    console.error("Error cargando asignaciones del profesor:", error);
  }
});

const onAsistCursoChange = () => {
  mostrarAsistencia.value = false;
  listaAlumnos.value = [];
};

const tomarAsistencia = async () => {
  if (!asistCurso.value) return;
  cargando.value = true;
  try {
    const res = await obtenerAlumnosCurso(asistCurso.value);
    if (res.success && res.data) {
      listaAlumnos.value = res.data.map((a) => ({
        id_alumno: a.id_alumno,
        nombre: `${a.apellido}, ${a.nombre}`,
        estado: "presente",
      }));
      mostrarAsistencia.value = true;
    } else {
      listaAlumnos.value = [];
      alert("No se encontraron alumnos en este curso.");
    }
  } catch (error) {
    console.error("Error al obtener alumnos del curso:", error);
    alert("Error de conexión al cargar alumnos.");
  } finally {
    cargando.value = false;
  }
};

const guardarAsistencia = async () => {
  if (!asistFecha.value) return alert("Selecciona una fecha");
  if (!asistCurso.value) return alert("Selecciona un curso");

  try {
    const payload = listaAlumnos.value.map((a) => ({
      id_alumno: a.id_alumno,
      id_curso: asistCurso.value,
      fecha: asistFecha.value,
      estado: a.estado,
    }));

    const res = await guardarAsistenciasLote(payload);
    if (res.success) {
      alert("Asistencias guardadas correctamente.");

      historialAsistencias.value.unshift({
        fecha: asistFecha.value,
        curso: todosCursos.value.find((c) => c.id === asistCurso.value)?.nombre || asistCurso.value,
        presentes: listaAlumnos.value.filter((a) => a.estado === "presente").length,
        ausentes: listaAlumnos.value.filter((a) => a.estado === "ausente").length,
        tardanzas: listaAlumnos.value.filter((a) => a.estado === "tardanza").length,
      });

      mostrarAsistencia.value = false;
      listaAlumnos.value = [];
    } else {
      alert("Error al guardar asistencias: " + (res.message || "Error del servidor"));
    }
  } catch (error) {
    console.error("Error al guardar asistencia:", error);
    alert("Error de conexión al guardar asistencias.");
  }
};
</script>

<style scoped src="../profesores.css"></style>
