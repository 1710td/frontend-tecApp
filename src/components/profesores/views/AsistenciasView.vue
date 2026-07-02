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
            <option v-for="c in todosCursos" :key="c" :value="c">{{ c }}</option>
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
        <div v-for="alumno in listaAlumnos" :key="alumno.nombre" class="alumno-row" :class="alumno.estado">
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
import { ref } from "vue";

const todosCursos = ["1° Primera", "2° Segunda", "3° Primera", "4° Programación"];
const asistCurso = ref("");
const asistFecha = ref(new Date().toISOString().split("T")[0]);
const mostrarAsistencia = ref(false);
const listaAlumnos = ref([]);
const historialAsistencias = ref([]);

const alumnosEjemplo = ["Acosta, Lucas", "Benitez, Sofía", "Cabrera, Tomás"];

const onAsistCursoChange = () => {
  mostrarAsistencia.value = false;
  listaAlumnos.value = [];
};

const tomarAsistencia = () => {
  listaAlumnos.value = alumnosEjemplo.map((nombre) => ({ nombre, estado: "presente" }));
  mostrarAsistencia.value = true;
};

const guardarAsistencia = () => {
  if (!asistFecha.value) return alert("Selecciona una fecha");

  historialAsistencias.value.unshift({
    fecha: asistFecha.value,
    curso: asistCurso.value,
    presentes: listaAlumnos.value.filter((a) => a.estado === "presente").length,
    ausentes: listaAlumnos.value.filter((a) => a.estado === "ausente").length,
    tardanzas: listaAlumnos.value.filter((a) => a.estado === "tardanza").length,
  });

  mostrarAsistencia.value = false;
  listaAlumnos.value = [];
};
</script>

<style scoped src="../profesores.css"></style>
