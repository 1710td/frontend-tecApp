<template>
    <div class="cursos-wrapper">
        <!-- ── LISTA ──────────────────────────────────────────── -->
        <div v-if="vistaActiva === 'lista'" class="card animate-fade-in">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-book" aria-hidden="true"></i> Cursos activos
                </div>
                <button
                    @click="cambiarVista('crear')"
                    class="tb-btn primary sm"
                >
                    <i class="ti ti-plus" aria-hidden="true"></i> Nuevo
                </button>
            </div>

            <div class="table-responsive">
                <!-- Cargando -->
                <div v-if="cargando" class="empty-state">
                    <i
                        class="ti ti-loader animate-spin"
                        style="font-size: 24px; color: #cd322c"
                    ></i>
                    <p>Cargando cursos...</p>
                </div>

                <!-- Error de carga -->
                <div
                    v-else-if="errorCarga"
                    class="error-banner"
                    style="margin: 16px"
                >
                    <i class="ti ti-alert-circle"></i> {{ errorCarga }}
                    <button
                        class="tb-btn sm outline"
                        @click="fetchCursos"
                        style="margin-left: auto"
                    >
                        Reintentar
                    </button>
                </div>

                <!-- Tabla -->
                <table
                    v-else-if="cursos.length > 0"
                    class="mini"
                    aria-label="Cursos activos"
                >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Aula</th>
                            <th>Turno</th>
                            <th class="action-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="curso in cursos"
                            :key="curso.id_curso"
                            class="table-row"
                        >
                            <td>{{ curso.nombre_curso }}</td>
                            <td>{{ curso.aula }}</td>
                            <td>
                                <span
                                    :class="['badge', badgeClass(curso.turno)]"
                                >
                                    {{ curso.turno }}
                                </span>
                            </td>
                            <td class="action-cell">
                                <div class="action-buttons">
                                    <button
                                        @click="cambiarVista('detalles', curso)"
                                        class="icon-btn view"
                                        title="Ver detalles"
                                        aria-label="Ver detalles"
                                    >
                                        <i class="ti ti-eye"></i>
                                    </button>
                                    <button
                                        @click="cambiarVista('editar', curso)"
                                        class="icon-btn edit"
                                        title="Editar"
                                        aria-label="Editar"
                                    >
                                        <i class="ti ti-edit"></i>
                                    </button>
                                    <button
                                        @click="pedirConfirmacion(curso)"
                                        class="icon-btn delete"
                                        title="Eliminar"
                                        aria-label="Eliminar"
                                    >
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Sin datos -->
                <div v-else class="empty-state">
                    <i
                        class="ti ti-inbox"
                        style="font-size: 28px; opacity: 0.4"
                    ></i>
                    <p>No hay cursos registrados todavía.</p>
                </div>
            </div>
        </div>

        <!-- ── DETALLES ───────────────────────────────────────── -->
        <div
            v-if="vistaActiva === 'detalles' && cursoSeleccionado"
            class="card animate-fade-in"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-info-circle"></i>
                    {{ cursoSeleccionado.nombre_curso }}
                </div>
                <button
                    @click="cambiarVista('lista')"
                    class="icon-btn"
                    aria-label="Volver"
                >
                    <i class="ti ti-arrow-left"></i>
                </button>
            </div>

            <div class="card-body details-view">
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Aula asignada</span>
                        <span class="detail-value">{{
                            cursoSeleccionado.aula
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Turno</span>
                        <span
                            :class="[
                                'badge',
                                badgeClass(cursoSeleccionado.turno),
                            ]"
                        >
                            {{ cursoSeleccionado.turno }}
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Alumnos inscritos</span>
                        <span class="detail-value">{{
                            cursoSeleccionado.alumnos ?? "—"
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ID interno</span>
                        <span class="detail-value mono"
                            >#{{ cursoSeleccionado.id_curso }}</span
                        >
                    </div>
                </div>

                <div class="info-box">
                    <i class="ti ti-info-circle"></i>
                    <p>
                        Próximamente: listado de alumnos y docentes vinculados a
                        este curso.
                    </p>
                </div>
            </div>

            <div class="card-footer">
                <button @click="cambiarVista('lista')" class="tb-btn outline">
                    Cerrar
                </button>
                <button
                    @click="cambiarVista('editar', cursoSeleccionado)"
                    class="tb-btn primary"
                >
                    <i class="ti ti-edit"></i> Editar
                </button>
            </div>
        </div>

        <!-- ── CREAR / EDITAR ─────────────────────────────────── -->
        <div
            v-if="['crear', 'editar'].includes(vistaActiva)"
            class="card animate-fade-in"
        >
            <div class="card-header">
                <div class="card-title">
                    <i
                        :class="
                            vistaActiva === 'crear'
                                ? 'ti ti-plus'
                                : 'ti ti-edit'
                        "
                    ></i>
                    {{
                        vistaActiva === "crear" ? "Nuevo curso" : "Editar curso"
                    }}
                </div>
                <button
                    @click="cambiarVista('lista')"
                    class="icon-btn"
                    aria-label="Volver"
                >
                    <i class="ti ti-arrow-left"></i>
                </button>
            </div>

            <form @submit.prevent="guardarCurso" class="form-body">
                <div class="form-group">
                    <label for="nombre_curso">Nombre del curso</label>
                    <input
                        id="nombre_curso"
                        v-model="form.nombre_curso"
                        type="text"
                        placeholder="Ej: 1°A"
                        required
                    />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="aula">Aula</label>
                        <input
                            id="aula"
                            v-model="form.aula"
                            type="text"
                            placeholder="Ej: 101"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="turno">Turno</label>
                        <select id="turno" v-model="form.turno" required>
                            <option value="" disabled>Seleccionar...</option>
                            <option v-for="t in turnos" :key="t" :value="t">
                                {{ t }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="card-footer">
                    <div v-if="errorGuardar" class="error-banner">
                        <i class="ti ti-alert-circle"></i> {{ errorGuardar }}
                    </div>
                    <div v-if="exitoGuardar" class="exito-banner">
                        <i class="ti ti-check"></i> Curso guardado
                        correctamente.
                    </div>
                    <button
                        type="button"
                        @click="cambiarVista('lista')"
                        class="tb-btn outline"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        class="tb-btn primary"
                        :disabled="guardando"
                    >
                        <i
                            class="ti ti-loader animate-spin"
                            v-if="guardando"
                        ></i>
                        {{
                            guardando
                                ? "Guardando..."
                                : vistaActiva === "crear"
                                  ? "Guardar curso"
                                  : "Actualizar curso"
                        }}
                    </button>
                </div>
            </form>
        </div>

        <!-- ── MODAL DE CONFIRMACIÓN DE BORRADO ───────────────── -->
        <div
            v-if="cursoAEliminar"
            class="modal-overlay"
            @click.self="cursoAEliminar = null"
        >
            <div class="modal-card animate-fade-in">
                <div class="modal-header">
                    <i
                        class="ti ti-alert-triangle"
                        style="color: #cd322c; font-size: 20px"
                    ></i>
                    <h3>Eliminar curso</h3>
                </div>

                <p class="modal-body">
                    ¿Seguro que querés eliminar
                    <strong>{{ cursoAEliminar.nombre_curso }}</strong
                    >? Esta acción no se puede deshacer.
                </p>

                <div
                    v-if="errorEliminar"
                    class="error-banner"
                    style="
                        margin-bottom: 16px;
                        width: 100%;
                        box-sizing: border-box;
                    "
                >
                    <i class="ti ti-alert-circle"></i> {{ errorEliminar }}
                </div>

                <div class="modal-footer">
                    <button
                        class="tb-btn outline"
                        @click="cursoAEliminar = null"
                    >
                        Cancelar
                    </button>
                    <button
                        class="tb-btn danger"
                        @click="confirmarEliminar"
                        :disabled="eliminando"
                    >
                        <i
                            class="ti ti-loader animate-spin"
                            v-if="eliminando"
                        ></i>
                        {{ eliminando ? "Eliminando..." : "Sí, eliminar" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
    obtenerCursos,
    crearCurso,
    modificarCurso,
    eliminarCurso,
} from "../../../services/academico-service.js";

// ── Turnos disponibles ─────────────────────────────────────────────────────
const turnos = [
    "8:00 a 15:25",
    "12:00 a 19:00",
    "8:00 a 12:00",
    "13:15 a 17:45",
    "13:15 a 19:00",
];

// ── Estado ──────────────────────────────────────────────────────────────────
const cursos = ref([]);
const cargando = ref(false);
const guardando = ref(false);
const eliminando = ref(false);
const vistaActiva = ref("lista"); // 'lista' | 'crear' | 'editar' | 'detalles'
const cursoSeleccionado = ref(null);
const cursoAEliminar = ref(null); // reemplaza el confirm() nativo
const errorEliminar = ref("");

const errorCarga = ref("");
const errorGuardar = ref("");
const exitoGuardar = ref(false);

const formVacio = () => ({
    id_curso: null,
    nombre_curso: "",
    aula: "",
    turno: "",
});
const form = ref(formVacio());

// ── Helpers ─────────────────────────────────────────────────────────────────
// Clasifica el badge según la hora de inicio del turno.
// Valores reales del backend: "8:00 a 15:25", "12:00 a 3:25", "12:00 a 19:00",
// "13:15 a 17:45", "13:15 a 19:00". Cualquier otro cae en 'noche' (gris).
const badgeClass = (turno = "") => {
    const hora = parseInt(turno.trim().split(":")[0], 10);
    if (isNaN(hora)) return "noche";
    if (hora < 12) return "manana"; // 8:xx → azul
    return "tarde"; // 12:xx, 13:xx → amarillo
};

// ── Navegación entre vistas ──────────────────────────────────────────────────
const cambiarVista = (nuevaVista, curso = null) => {
    vistaActiva.value = nuevaVista;
    errorGuardar.value = "";
    exitoGuardar.value = false;

    if (nuevaVista === "editar" && curso) {
        form.value = { ...curso };
    } else if (nuevaVista === "crear") {
        form.value = formVacio();
    } else if (nuevaVista === "detalles" && curso) {
        cursoSeleccionado.value = curso;
    }
};

// ── CRUD ─────────────────────────────────────────────────────────────────────

// GET
// La API devuelve un array directo: [...] — no viene envuelto en { data: [...] }
const fetchCursos = async () => {
    cargando.value = true;
    errorCarga.value = "";
    try {
        const res = await obtenerCursos();
        // axios pone la respuesta en res.data
        // si el backend devuelve [] directo, res.data ya es el array
        const data = res.data;
        cursos.value = Array.isArray(data) ? data : [];
    } catch {
        errorCarga.value =
            "No se pudo cargar la lista de cursos. Verificá la conexión con el servidor.";
    } finally {
        cargando.value = false;
    }
};

// POST / PATCH — separados y usando el service
const guardarCurso = async () => {
    errorGuardar.value = "";
    exitoGuardar.value = false;
    guardando.value = true;

    try {
        if (vistaActiva.value === "crear") {
            await crearCurso(form.value);
        } else {
            // CORRECCIÓN: Usamos modificarCurso y le pasamos el form completo
            await modificarCurso(form.value);
        }
        exitoGuardar.value = true;
        await fetchCursos();
        setTimeout(() => cambiarVista("lista"), 800);
    } catch (e) {
        errorGuardar.value =
            e?.response?.data?.mensaje ||
            "Error al guardar el curso. Intentá de nuevo.";
    } finally {
        guardando.value = false;
    }
};

// DELETE — modal reactivo
const pedirConfirmacion = (curso) => {
    cursoAEliminar.value = curso;
    errorEliminar.value = ""; // Limpiamos errores de intentos anteriores
};

const confirmarEliminar = async () => {
    eliminando.value = true;
    errorEliminar.value = ""; // Limpiamos antes de la petición

    try {
        const respuesta = await eliminarCurso(cursoAEliminar.value.id_curso);

        if (respuesta.success) {
            // Si el borrado fue exitoso, actualizamos la tabla
            cursos.value = cursos.value.filter(
                (c) => c.id_curso !== cursoAEliminar.value.id_curso,
            );
            cursoAEliminar.value = null; // Cerramos el modal
        } else {
            // Si el backend rechazó el borrado (ej: error 1451), mostramos el mensaje
            errorEliminar.value = respuesta.message;
        }
    } catch (e) {
        // Fallback por si explota algo fuera del control de axios
        errorEliminar.value =
            "Ocurrió un error inesperado al eliminar el curso.";
    } finally {
        eliminando.value = false;
    }
};

// ── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(fetchCursos);
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.25s ease-in-out;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.animate-spin {
    animation: spin 0.8s linear infinite;
    display: inline-block;
}

.cursos-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 900px;
}

/* Card */
.card {
    background: var(--color-background-primary, #fff);
    border: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    overflow: hidden;
}
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid #e5e7eb;
    background: #fafafa;
}
.card-body {
    padding: 20px;
}
.card-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
}
.card-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary, #111827);
    display: flex;
    align-items: center;
    gap: 8px;
}
.card-title i {
    font-size: 16px;
    color: #cd322c;
}

/* Tabla */
.table-responsive {
    width: 100%;
    overflow-x: auto;
    padding: 16px;
}
.mini {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}
.mini th {
    text-align: left;
    padding: 8px 10px;
    color: var(--color-text-tertiary, #6b7280);
    font-weight: 500;
    font-size: 12px;
    border-bottom: 1px solid #e5e7eb;
}
.mini td {
    padding: 10px;
    border-bottom: 0.5px solid #e5e7eb;
    color: var(--color-text-primary, #111827);
    vertical-align: middle;
}
.table-row:hover {
    background: var(--color-background-secondary, #f9fafb);
}

/* Badges de turno */
.badge {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    display: inline-block;
}
.badge.manana {
    background: #e0f2fe;
    color: #0369a1;
}
.badge.tarde {
    background: #fef08a;
    color: #a16207;
}
.badge.noche {
    background: #e5e7eb;
    color: #374151;
}

/* Acciones tabla */
.action-cell {
    text-align: right;
    width: 110px;
    vertical-align: middle;
}
.action-buttons {
    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: flex-end;
    align-items: center;
}
.icon-btn {
    width: 30px;
    height: 30px;
    min-width: 30px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    color: #4b5563;
    font-size: 15px;
    line-height: 1;
    padding: 0;
}
.icon-btn i {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}
.icon-btn:hover {
    background: #f3f4f6;
}
.icon-btn.view:hover {
    background: #f0f9ff;
    border-color: #bae6fd;
    color: #0284c7;
}
.icon-btn.edit:hover {
    background: #f3f4f6;
    color: #111827;
}
.icon-btn.delete:hover {
    background: #fef2f2;
    border-color: #fca5a5;
    color: #ef4444;
} /* Botones */
.tb-btn {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid transparent;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.15s;
}
.tb-btn.primary {
    background: #cd322c;
    color: #fff;
    border-color: #cd322c;
}
.tb-btn.primary:hover {
    background: #a52420;
}
.tb-btn.outline {
    background: white;
    color: #4b5563;
    border-color: #d1d5db;
}
.tb-btn.outline:hover {
    background: #f9fafb;
    color: #111827;
}
.tb-btn.danger {
    background: #cd322c;
    color: white;
}
.tb-btn.danger:hover {
    background: #a52420;
}
.tb-btn.sm {
    padding: 6px 12px;
    font-size: 12px;
}
.tb-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Formulario */
.form-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
}
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.form-group label {
    font-size: 12px;
    font-weight: 600;
    color: #4b5563;
}
.form-group input,
.form-group select {
    padding: 9px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 13px;
    outline: none;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}
.form-group input:focus,
.form-group select:focus {
    border-color: #cd322c;
    box-shadow: 0 0 0 2px rgba(205, 50, 44, 0.1);
}

/* Detalles */
.details-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: #f9fafb;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #f3f4f6;
}
.detail-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #6b7280;
    font-weight: 600;
}
.detail-value {
    font-size: 14px;
    color: #111827;
    font-weight: 500;
}
.detail-value.mono {
    font-family: monospace;
    color: #6b7280;
}

/* Info box */
.info-box {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    padding: 12px;
    border-radius: 8px;
    color: #1e3a8a;
    font-size: 12px;
}
.info-box i {
    font-size: 16px;
    color: #3b82f6;
    margin-top: 1px;
}

/* Banners */
.error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fef2f2;
    border: 1px solid #fee2e2;
    color: #991b1b;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    margin-right: auto;
}
.exito-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #eaf3de;
    border: 1px solid #bbf7d0;
    color: #166534;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    margin-right: auto;
}

/* Empty state */
.empty-state {
    padding: 40px 20px;
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
}
.modal-card {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.modal-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}
.modal-header h3 {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
}
.modal-body {
    font-size: 13px;
    color: #4b5563;
    margin-bottom: 20px;
    line-height: 1.6;
}
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
