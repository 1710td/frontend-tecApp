<template>
    <div class="profesores-wrapper">
        <div v-if="vistaActiva === 'lista'" class="card animate-fade-in">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-chalkboard" aria-hidden="true"></i>
                    Gestión de docentes
                </div>
                <button
                    @click="cambiarVista('crear')"
                    class="tb-btn primary sm"
                >
                    <i class="ti ti-plus" aria-hidden="true"></i> Nuevo
                </button>
            </div>

            <div class="table-responsive">
                <div v-if="cargando" class="empty-state">
                    <i
                        class="ti ti-loader animate-spin"
                        style="font-size: 24px; color: #cd322c"
                    ></i>
                    <p>Cargando docentes...</p>
                </div>

                <div
                    v-else-if="errorCarga"
                    class="error-banner"
                    style="margin: 16px"
                >
                    <i class="ti ti-alert-circle"></i> {{ errorCarga }}
                    <button
                        class="tb-btn sm outline"
                        @click="fetchProfesores"
                        style="margin-left: auto"
                    >
                        Reintentar
                    </button>
                </div>

                <table
                    v-else-if="profesores.length > 0"
                    class="mini"
                    aria-label="Listado de docentes"
                >
                    <thead>
                        <tr>
                            <th>Docente</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th class="action-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="prof in profesores"
                            :key="prof.id_profesor"
                            class="table-row"
                        >
                            <td>
                                <strong>{{ prof.apellido }}</strong
                                >, {{ prof.nombre }}
                            </td>
                            <td class="email-cell">{{ prof.email }}</td>
                            <td>
                                <span
                                    :class="[
                                        'status-pill',
                                        `sp-${prof.estado}`,
                                    ]"
                                >
                                    {{
                                        etiquetaEstado[prof.estado] ||
                                        prof.estado
                                    }}
                                </span>
                            </td>
                            <td class="action-cell">
                                <div class="action-buttons">
                                    <button
                                        @click="cambiarVista('detalles', prof)"
                                        class="icon-btn view"
                                        title="Ver detalles"
                                        aria-label="Ver detalles"
                                    >
                                        <i class="ti ti-eye"></i>
                                    </button>
                                    <button
                                        @click="cambiarVista('editar', prof)"
                                        class="icon-btn edit"
                                        title="Editar"
                                        aria-label="Editar"
                                    >
                                        <i class="ti ti-edit"></i>
                                    </button>
                                    <button
                                        @click="pedirConfirmacion(prof)"
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

                <div v-else class="empty-state">
                    <i
                        class="ti ti-users"
                        style="font-size: 28px; opacity: 0.4"
                    ></i>
                    <p>No hay docentes registrados todavía.</p>
                </div>
            </div>
        </div>

        <div
            v-slot-if
            v-if="vistaActiva === 'detalles' && profesorSeleccionado"
            class="card animate-fade-in"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-info-circle"></i>
                    {{ profesorSeleccionado.nombre }}
                    {{ profesorSeleccionado.apellido }}
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
                        <span class="detail-label">Nombre completo</span>
                        <span class="detail-value">
                            {{ profesorSeleccionado.nombre }}
                            {{ profesorSeleccionado.apellido }}
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.email
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">DNI</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.dni
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Teléfono</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.telefono
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Domicilio</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.domicilio
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Fecha de nacimiento</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.fecha_nacimiento
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Fecha de contratación</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.fecha_contratacion
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Especialidad</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.especialidad || "-"
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Título</span>
                        <span class="detail-value">{{
                            profesorSeleccionado.titulo_habilitante || "-"
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Estado</span>
                        <span class="detail-value">
                            {{
                                etiquetaEstado[profesorSeleccionado.estado] ||
                                profesorSeleccionado.estado
                            }}
                        </span>
                    </div>
                </div>

                <div class="asignaciones-section">
                    <h4 class="section-title">Asignaciones Actuales</h4>

                    <div
                        v-if="cargandoAsignaciones"
                        class="empty-state"
                        style="padding: 20px"
                    >
                        <i
                            class="ti ti-loader animate-spin"
                            style="font-size: 24px; color: #cd322c"
                        ></i>
                        <p>Cargando asignaciones...</p>
                    </div>

                    <div v-else-if="errorAsignaciones" class="error-banner">
                        <i class="ti ti-alert-circle"></i>
                        {{ errorAsignaciones }}
                        <button
                            class="tb-btn sm outline"
                            @click="
                                fetchAsignaciones(
                                    profesorSeleccionado.id_profesor,
                                )
                            "
                            style="margin-left: auto"
                        >
                            Reintentar
                        </button>
                    </div>

                    <table
                        v-else-if="asignacionesProfesor.length > 0"
                        class="mini"
                    >
                        <thead>
                            <tr>
                                <th>Materia</th>
                                <th>Curso / Nivel</th>
                                <th>Horas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="asig in asignacionesProfesor"
                                :key="asig.id_asignacion"
                                class="table-row"
                            >
                                <td>
                                    <strong>{{
                                        asig.materiaAsignacion
                                            ?.nombre_materia || "-"
                                    }}</strong>
                                </td>
                                <td>
                                    {{
                                        asig.cursoAsignacion?.nombre_curso || ""
                                    }}
                                </td>
                                <td>
                                    {{
                                        asig.carga_horaria || asig.horas || "-"
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="info-box">
                        <i class="ti ti-info-circle"></i>
                        <p>
                            Este docente no tiene materias ni cursos asignados
                            en el ciclo lectivo actual.
                        </p>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <button @click="cambiarVista('lista')" class="tb-btn outline">
                    Cerrar
                </button>
                <button
                    @click="cambiarVista('editar', profesorSeleccionado)"
                    class="tb-btn primary"
                >
                    <i class="ti ti-edit"></i> Editar
                </button>
            </div>
        </div>
    </div>

    <div
        v-if="['crear', 'editar'].includes(vistaActiva)"
        class="card animate-fade-in"
        style="max-width: 900px; margin-top: 16px"
    >
        <div class="card-header">
            <div class="card-title">
                <i
                    :class="
                        vistaActiva === 'crear' ? 'ti ti-plus' : 'ti ti-edit'
                    "
                ></i>
                {{
                    vistaActiva === "crear" ? "Nuevo docente" : "Editar docente"
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

        <form @submit.prevent="guardarProfesor" class="form-body">
            <div class="form-row">
                <div class="form-group">
                    <label>Nombre</label>
                    <input v-model="form.nombre" required />
                </div>
                <div class="form-group">
                    <label>Apellido</label>
                    <input v-model="form.apellido" required />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>DNI</label>
                    <input v-model="form.dni" required />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="email" required />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Teléfono</label>
                    <input v-model="form.telefono" type="tel" required />
                </div>
                <div class="form-group">
                    <label>Domicilio</label>
                    <input v-model="form.domicilio" required />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Nacimiento</label>
                    <input
                        v-model="form.fecha_nacimiento"
                        type="date"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Contratación</label>
                    <input
                        v-model="form.fecha_contratacion"
                        type="date"
                        required
                    />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Título</label>
                    <input v-model="form.titulo_habilitante" />
                </div>
                <div class="form-group">
                    <label>Especialidad</label>
                    <input v-model="form.especialidad" />
                </div>
            </div>
            <div class="form-group">
                <label>Estado</label>
                <select v-model="form.estado" required>
                    <option value="activo">Activo</option>
                    <option value="licencia">Licencia</option>
                    <option value="baja">Baja</option>
                </select>
            </div>

            <div
                class="card-footer"
                style="
                    padding: 14px 0 0 0;
                    border: none;
                    background: transparent;
                "
            >
                <div v-if="errorGuardar" class="error-banner">
                    <i class="ti ti-alert-circle"></i> {{ errorGuardar }}
                </div>
                <div v-if="exitoGuardar" class="exito-banner">
                    <i class="ti ti-check"></i> Docente guardado correctamente.
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
                    <i class="ti ti-loader animate-spin" v-if="guardando"></i>
                    {{
                        guardando
                            ? "Guardando..."
                            : vistaActiva === "crear"
                              ? "Registrar docente"
                              : "Actualizar docente"
                    }}
                </button>
            </div>
        </form>
    </div>

    <div
        v-if="profesorAEliminar"
        class="modal-overlay"
        @click.self="profesorAEliminar = null"
    >
        <div class="modal-card animate-fade-in">
            <div class="modal-header">
                <i
                    class="ti ti-alert-triangle"
                    style="color: #cd322c; font-size: 20px"
                ></i>
                <h3>Eliminar docente</h3>
            </div>

            <p class="modal-body">
                ¿Seguro que querés eliminar a
                <strong
                    >{{ profesorAEliminar.nombre }}
                    {{ profesorAEliminar.apellido }}</strong
                >? Esta acción no se puede deshacer.
            </p>

            <div
                v-if="errorEliminar"
                class="error-banner"
                style="margin-bottom: 16px; width: 100%; box-sizing: border-box"
            >
                <i class="ti ti-alert-circle"></i> {{ errorEliminar }}
            </div>

            <div class="modal-footer">
                <button
                    class="tb-btn outline"
                    @click="profesorAEliminar = null"
                >
                    Cancelar
                </button>
                <button
                    class="tb-btn danger"
                    @click="confirmarEliminar"
                    :disabled="eliminando"
                >
                    <i class="ti ti-loader animate-spin" v-if="eliminando"></i>
                    {{ eliminando ? "Eliminando..." : "Sí, eliminar" }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
    obtenerProfesores,
    crearProfesor,
    modificarProfesor,
    eliminarProfesor,
    obtenerAsignacionesProfesor,
} from "../../../services/academico-service.js";

// ── Estado ──────────────────────────────────────────────────────────────────
const profesores = ref([]);
const cargando = ref(false);
const guardando = ref(false);
const eliminando = ref(false);
const vistaActiva = ref("lista"); // 'lista' | 'crear' | 'editar' | 'detalles'
const profesorSeleccionado = ref(null);
const profesorAEliminar = ref(null);
const errorEliminar = ref("");

const errorCarga = ref("");
const errorGuardar = ref("");
const exitoGuardar = ref(false);

const asignacionesProfesor = ref([]);
const cargandoAsignaciones = ref(false);
const errorAsignaciones = ref("");

const etiquetaEstado = {
    activo: "Activo",
    licencia: "Licencia",
    baja: "Baja",
};

const formVacio = () => ({
    id_profesor: null,
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    fecha_nacimiento: "",
    domicilio: "",
    fecha_contratacion: "",
    estado: "activo",
    titulo_habilitante: "",
    especialidad: "",
});

const form = ref(formVacio());

// ── Navegación entre vistas ──────────────────────────────────────────────────
const cambiarVista = (nuevaVista, prof = null) => {
    vistaActiva.value = nuevaVista;
    errorGuardar.value = "";
    exitoGuardar.value = false;

    if (nuevaVista === "editar" && prof) {
        form.value = { ...prof };
    } else if (nuevaVista === "crear") {
        form.value = formVacio();
    } else if (nuevaVista === "detalles" && prof) {
        profesorSeleccionado.value = prof;
        fetchAsignaciones(prof.id_profesor);
    }
};

// ── CRUD ─────────────────────────────────────────────────────────────────────
const fetchAsignaciones = async (idProfesor) => {
    cargandoAsignaciones.value = true;
    errorAsignaciones.value = "";
    asignacionesProfesor.value = [];

    try {
        const res = await obtenerAsignacionesProfesor(idProfesor);
        const data = res.data || res;
        asignacionesProfesor.value = Array.isArray(data) ? data : [];
    } catch (e) {
        errorAsignaciones.value = "No se pudo cargar la lista de asignaciones.";
    } finally {
        cargandoAsignaciones.value = false;
    }
};

const fetchProfesores = async () => {
    cargando.value = true;
    errorCarga.value = "";
    try {
        const res = await obtenerProfesores();
        const data = res.data || res;
        profesores.value = Array.isArray(data) ? data : [];
    } catch {
        errorCarga.value = "No se pudo cargar la lista de profesores.";
    } finally {
        cargando.value = false;
    }
};

const guardarProfesor = async () => {
    errorGuardar.value = "";
    exitoGuardar.value = false;
    guardando.value = true;

    try {
        if (vistaActiva.value === "crear") {
            await crearProfesor(form.value);
        } else {
            await modificarProfesor(form.value);
        }
        exitoGuardar.value = true;
        await fetchProfesores();
        setTimeout(() => cambiarVista("lista"), 800);
    } catch (e) {
        errorGuardar.value =
            e?.response?.data?.mensaje || "Error al guardar el profesor.";
    } finally {
        guardando.value = false;
    }
};

const pedirConfirmacion = (prof) => {
    profesorAEliminar.value = prof;
    errorEliminar.value = "";
};

const confirmarEliminar = async () => {
    eliminando.value = true;
    errorEliminar.value = "";

    try {
        const respuesta = await eliminarProfesor(
            profesorAEliminar.value.id_profesor,
        );
        // Soporta tanto respuestas estructuradas { success: true } como respuestas directas del service
        if (
            respuesta &&
            (respuesta.success ||
                respuesta.data?.success ||
                respuesta.status === 200)
        ) {
            profesores.value = profesores.value.filter(
                (p) => p.id_profesor !== profesorAEliminar.value.id_profesor,
            );
            profesorAEliminar.value = null;
        } else {
            errorEliminar.value =
                respuesta?.message || "No se pudo eliminar el docente.";
        }
    } catch (e) {
        errorEliminar.value =
            "Ocurrió un error inesperado al eliminar el profesor.";
    } finally {
        eliminando.value = false;
    }
};

onMounted(fetchProfesores);
</script>

<style scoped>
/* (Mantenemos tus mismos estilos pero sumando el mapeo correcto de badges) */
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

.profesores-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 900px;
}

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
.email-cell {
    color: var(--color-text-tertiary, #6b7280);
}

/* Badges de estados corregidas según tus options */
.status-pill {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
    display: inline-block;
}
.sp-activo {
    background: #eaf3de;
    color: #3b6d11;
}
.sp-licencia {
    background: #fef08a;
    color: #a16207;
}
.sp-baja {
    background: #fef2f2;
    color: #991b1b;
}

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
}

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
}

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

.asignaciones-section {
    margin-top: 10px;
    border-top: 1px dashed #e5e7eb;
    padding-top: 20px;
}
.section-title {
    font-size: 13px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>
