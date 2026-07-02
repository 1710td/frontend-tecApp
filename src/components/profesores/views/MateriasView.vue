<template>
  <section class="tab-panel active">
    <div class="tab-toolbar">
      <div class="tab-toolbar-left">
        <h2 class="section-title"><i class="fas fa-chalkboard-teacher"></i> Materias que enseño</h2>
      </div>
      <button class="btn-add-subject" @click="abrirModalMateria"><i class="fas fa-plus"></i> Agregar Materia</button>
    </div>

    <div class="materias-grid">
      <div v-if="materiasProfesor.length === 0" class="noticia-empty" style="grid-column: 1/-1">
        <i class="fas fa-chalkboard-teacher" style="font-size: 2rem; color: #cbd5e1"></i>
        <p>Todavía no agregaste materias. Usá el botón <strong>Agregar Materia</strong>.</p>
      </div>

      <div v-for="(mat, idx) in materiasProfesor" :key="idx" class="materia-card">
        <button class="btn-eliminar-materia" title="Eliminar materia" @click="eliminarMateria(idx)">
          <i class="fas fa-trash"></i>
        </button>
        <div class="materia-icon"><i class="fas fa-book"></i></div>
        <div class="materia-nombre">{{ mat.nombre }}</div>
        <div class="materia-cursos-tag">{{ mat.cursos.length > 0 ? mat.cursos.join(" · ") : "Sin cursos asignados" }}</div>
      </div>
    </div>

    <div v-if="modalMateria" class="modal-overlay active" @click.self="modalMateria = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Agregar materia</h3>
          <button class="close-modal" @click="modalMateria = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nombre de la materia</label>
            <input type="text" v-model="materiaForm.nombre" placeholder="Ej: Matemática Discreta" />
          </div>
          <div class="form-group" style="margin-top: 14px">
            <label>Cursos en que la enseñás</label>
            <div class="cursos-checkboxes">
              <label v-for="curso in todosCursos" :key="curso" :class="{ checked: materiaForm.cursos.includes(curso) }">
                <input type="checkbox" :value="curso" v-model="materiaForm.cursos" />
                <span class="curso-check-label">{{ curso }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="modalMateria = false">Cancelar</button>
          <button class="btn-submit" @click="guardarMateria"><i class="fas fa-check"></i>&nbsp;Guardar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const materiasProfesor = ref([]);
const modalMateria = ref(false);
const todosCursos = ["1° Primera", "2° Segunda", "3° Primera", "4° Programación"]; // Mock

const materiaForm = reactive({ nombre: "", cursos: [] });

const abrirModalMateria = () => {
  materiaForm.nombre = "";
  materiaForm.cursos = [];
  modalMateria.value = true;
};

const guardarMateria = () => {
  if (!materiaForm.nombre.trim()) return;
  materiasProfesor.value.push({
    nombre: materiaForm.nombre.trim(),
    cursos: [...materiaForm.cursos],
  });
  modalMateria.value = false;
};

const eliminarMateria = (idx) => {
  materiasProfesor.value.splice(idx, 1);
};
</script>

<style scoped src="../profesores.css"></style>
