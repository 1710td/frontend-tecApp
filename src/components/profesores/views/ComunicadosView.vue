<template>
  <section class="comunicados-wrapper">
    <div class="page-header">
      <div>
        <h2 class="section-title"><i class="fas fa-bullhorn"></i> Comunicados</h2>
        <p>Publicá avisos dirigidos a los cursos o asignaciones que tengas a cargo.</p>
      </div>
      <button class="tb-btn primary sm" @click="mostrarForm = !mostrarForm">
        <i class="fas fa-plus"></i>
        {{ mostrarForm ? "Ocultar formulario" : "Nuevo Comunicado" }}
      </button>
    </div>

    <div v-if="mostrarForm" class="card form-card">
      <form @submit.prevent="guardarComunicado">
        <div class="form-row">
          <div class="form-group">
            <label>Título</label>
            <input type="text" v-model="form.titulo" placeholder="Ej: Evaluación final" required />
          </div>
          <div class="form-group">
            <label>Importancia</label>
            <select v-model="form.importancia" required>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label>Mensaje</label>
            <textarea v-model="form.mensaje" rows="5" placeholder="Escribí el comunicado aquí..." required></textarea>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label>Curso / Asignación</label>
            <select v-model="form.id_asignacion" @change="onAsignacionChange" required>
              <option value="" disabled>Seleccioná un curso o asignación</option>
              <option v-for="asig in asignaciones" :key="asig.id_asignacion" :value="asig.id_asignacion">
                {{ asig.cursoAsignacion?.nombre_curso || 'Sin curso' }} — {{ asig.materiaAsignacion?.nombre_materia || 'Sin materia' }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-row actions-row">
          <button type="button" class="tb-btn outline" @click="cancelarForm">Cancelar</button>
          <button type="submit" class="tb-btn primary" :disabled="guardando">
            <span v-if="guardando" class="loader"></span>
            {{ guardando ? 'Guardando...' : 'Publicar comunicado' }}
          </button>
        </div>

        <div v-if="errorGuardar" class="form-error">{{ errorGuardar }}</div>
        <div v-if="exitoGuardar" class="form-success">{{ exitoGuardar }}</div>
      </form>
    </div>

    <div class="card list-card">
      <div class="card-header">
        <div>
          <h3>Comunicados disponibles</h3>
          <p class="subtext">Solo se muestran los comunicados creados para tus cursos/asignaciones.</p>
        </div>
      </div>

      <div v-if="cargando" class="empty-state centered">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Cargando comunicados...</p>
      </div>

      <div v-else-if="comunicados.length === 0" class="empty-state centered">
        <i class="fas fa-bullhorn" style="font-size: 2rem"></i>
        <p>No hay comunicados publicados todavía.</p>
      </div>

      <div v-else class="comunicados-grid">
        <div v-for="comunicado in comunicados" :key="comunicado.id_comunicado" class="comunicado-card">
          <div class="comunicado-header">
            <div>
              <h4>{{ comunicado.titulo }}</h4>
              <span class="comunicado-meta">{{ formatoFecha(comunicado.fecha_publicacion) }}</span>
            </div>
            <span :class="['badge', badgeImportancia(comunicado.importancia)]">{{ comunicado.importancia }}</span>
          </div>
          <p class="comunicado-body">{{ comunicado.mensaje }}</p>
          <div class="comunicado-footer">
            <small>
              Dirigido a: <strong>{{ destinoComunicado(comunicado) }}</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { resolverIdProfesor } from "@/composables/useProfesor.js";
import { obtenerAsignacionesProfesor } from "@/services/academico-service.js";
import { obtenerTodosComunicados, crearComunicado } from "@/services/comunidad-service.js";

const authStore = useAuthStore();
const comunicados = ref([]);
const asignaciones = ref([]);
const mostrarForm = ref(false);
const cargando = ref(true);
const guardando = ref(false);
const errorGuardar = ref("");
const exitoGuardar = ref("");

const form = reactive({
  titulo: "",
  mensaje: "",
  importancia: "media",
  id_asignacion: null,
  id_curso: null,
  curso_destino: null,
});

const cargarAsignaciones = async () => {
  const idProfesor = await resolverIdProfesor();
  if (!idProfesor) return;
  const res = await obtenerAsignacionesProfesor(idProfesor);
  if (res.success && Array.isArray(res.data)) {
    asignaciones.value = res.data;
  }
};

const cargarComunicados = async () => {
  cargando.value = true;
  try {
    const data = await obtenerTodosComunicados();
    if (data?.data) {
      comunicados.value = Array.isArray(data.data) ? data.data : [];
    } else if (Array.isArray(data)) {
      comunicados.value = data;
    } else {
      comunicados.value = [];
    }
  } catch (error) {
    console.error("Error al cargar comunicados:", error);
    comunicados.value = [];
  } finally {
    cargando.value = false;
  }
};

const formatoFecha = (fecha) => {
  if (!fecha) return "Sin fecha";
  return new Date(fecha).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const badgeImportancia = (importancia) => {
  if (importancia === "alta") return "badge-alta";
  if (importancia === "media") return "badge-media";
  return "badge-baja";
};

const destinoComunicado = (comunicado) => {
  if (comunicado.id_asignacion && comunicado.cursoAsignacion?.nombre_curso) {
    return `${comunicado.cursoAsignacion?.nombre_curso} — ${comunicado.materiaAsignacion?.nombre_materia || "Asignación"}`;
  }
  if (comunicado.destino) {
    return comunicado.destino;
  }
  return "General";
};

const onAsignacionChange = () => {
  const seleccionada = asignaciones.value.find((a) => a.id_asignacion === form.id_asignacion);
  form.id_curso = seleccionada?.cursoAsignacion?.id_curso || null;
  form.curso_destino = seleccionada?.cursoAsignacion?.nombre_curso || null;
};

const limpiarForm = () => {
  form.titulo = "";
  form.mensaje = "";
  form.importancia = "media";
  form.id_asignacion = null;
  form.id_curso = null;
  form.curso_destino = null;
};

const guardarComunicado = async () => {
  if (!form.titulo.trim() || !form.mensaje.trim() || !form.id_asignacion) {
    errorGuardar.value = "Completa todos los campos obligatorios.";
    return;
  }
  guardando.value = true;
  errorGuardar.value = "";
  exitoGuardar.value = "";

  try {
    const payload = {
      titulo: form.titulo.trim(),
      mensaje: form.mensaje.trim(),
      importancia: form.importancia,
      destino: "curso",
      curso_destino: form.curso_destino,
      id_asignacion: form.id_asignacion,
      id_curso: form.id_curso,
      autor_id: authStore.usuario?.id || null,
    };

    await crearComunicado(payload);
    exitoGuardar.value = "Comunicado publicado correctamente.";
    await cargarComunicados();
    limpiarForm();
    mostrarForm.value = false;
  } catch (error) {
    errorGuardar.value = error?.message || "No se pudo publicar el comunicado.";
  } finally {
    guardando.value = false;
  }
};

const cancelarForm = () => {
  mostrarForm.value = false;
  limpiarForm();
  errorGuardar.value = "";
  exitoGuardar.value = "";
};

onMounted(async () => {
  await Promise.all([cargarAsignaciones(), cargarComunicados()]);
});
</script>

<style scoped>
.comunicados-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.form-card,
.list-card {
  background: var(--surface, #fff);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: var(--radius-lg, 16px);
  padding: 24px;
  box-shadow: var(--elev-1, 0 6px 18px rgba(2,6,23,0.06));
  transition: box-shadow 0.2s;
}
.form-card:hover, .list-card:hover {
  box-shadow: var(--elev-2, 0 12px 40px rgba(2,6,23,0.10));
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.subtext {
  margin-top: 6px;
  color: var(--muted, #6b7280);
  font-size: 0.95rem;
}
.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group.full-width {
  grid-column: 1 / -1;
}
.form-group label {
  font-weight: 700;
  color: var(--text, #334155);
}
.form-group input,
.form-group textarea,
.form-group select {
  border: 1px solid #d1d5db;
  border-radius: var(--radius-sm, 10px);
  padding: 12px 14px;
  background: var(--surface-2, #f8fafc);
  color: var(--text, #0f172a);
  font-family: inherit;
  transition: all 0.2s;
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--primary, #c0152a);
  box-shadow: 0 0 0 3px var(--primary-soft, rgba(192, 21, 42, 0.15));
  outline: none;
}
.actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 24px;
}
.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-top-color: #fff;
  border-radius: 50%;
  margin-right: 8px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.form-error {
  margin-top: 16px;
  color: var(--danger, #dc2626);
  background: #fef2f2;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #fecaca;
  font-size: 0.95rem;
}
.form-success {
  margin-top: 16px;
  color: var(--success, #16a34a);
  background: #f0fdf4;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  font-size: 0.95rem;
}
.comunicados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.comunicado-card {
  background: var(--surface-2, #f8fafc);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: var(--radius-lg, 16px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.comunicado-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}
.comunicado-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}
.comunicado-header h4 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text, #1e293b);
  line-height: 1.3;
}
.comunicado-meta {
  display: block;
  margin-top: 6px;
  color: var(--muted, #64748b);
  font-size: 0.85rem;
}
.badge {
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}
.badge-alta {
  background: #fee2e2;
  color: var(--danger, #dc2626);
}
.badge-media {
  background: #fef3c7;
  color: var(--warning, #d97706);
}
.badge-baja {
  background: #d1fae5;
  color: var(--success, #16a34a);
}
.comunicado-body {
  margin: 0;
  color: var(--text, #334155);
  min-height: 80px;
  line-height: 1.5;
  font-size: 0.95rem;
}
.comunicado-footer {
  margin-top: auto;
  color: var(--muted, #64748b);
  font-size: 0.9rem;
  padding-top: 14px;
  border-top: 1px dashed var(--line, #e2e8f0);
}
.empty-state.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 0;
  color: var(--muted, #64748b);
}
.empty-state.centered i {
  font-size: 2.5rem;
  opacity: 0.5;
}
</style>
<style scoped src="../profesores.css"></style>
