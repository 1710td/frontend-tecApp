<template>
  <section class="tab-panel active">
    <div class="tab-toolbar">
      <div class="tab-toolbar-left">
        <h2 class="section-title"><i class="fas fa-graduation-cap"></i> Mis Cursos Asignados</h2>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Materia</th>
            <th>Aula</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asig in asignaciones" :key="asig.id_asignacion">
            <td>
              <strong>{{ asig.cursoAsignacion?.nombre_curso }}</strong>
            </td>
            <td>{{ asig.materiaAsignacion?.nombre_materia }}</td>
            <td>{{ asig.cursoAsignacion?.aula || "S/D" }}</td>
            <td>{{ asig.cursoAsignacion?.turno || "S/D" }}</td>
          </tr>
          <tr v-if="asignaciones.length === 0">
            <td colspan="4">
              <div class="empty-state">
                <i class="fas fa-users-slash empty-icon"></i>
                <p>No hay cursos asignados para este periodo lectivo.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerAsignacionesProfesor } from "@/services/academico-service.js";

const asignaciones = ref([]);

onMounted(async () => {
  try {
    const profesorRaw = localStorage.getItem("alumno");
    if (!profesorRaw) return;
    const profesor = JSON.parse(profesorRaw);
    const idProfesor = profesor.data?.id_profesor || profesor.id_profesor;

    if (idProfesor) {
      const res = await obtenerAsignacionesProfesor(idProfesor);
      if (res.success && res.data) {
        asignaciones.value = res.data;
      }
    }
  } catch (error) {
    console.error("Error al cargar cursos asignados:", error);
  }
});
</script>

<style scoped src="../profesores.css"></style>
