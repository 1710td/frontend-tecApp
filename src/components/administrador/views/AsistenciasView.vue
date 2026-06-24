<template>
    <div class="asistencias-wrapper">
        <div class="card animate-fade-in">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-calendar-check" aria-hidden="true"></i>
                    Control de Asistencias
                </div>
            </div>

            <div class="card-body">
                <div class="form-row">
                    <div class="form-group">
                        <label for="id_curso">Curso / División</label>
                        <select id="id_curso" v-model="cursoSeleccionado">
                            <option value="" disabled>
                                Seleccionar curso...
                            </option>
                            <option
                                v-for="curso in cursosDisponibles"
                                :key="curso.id_curso"
                                :value="curso.id_curso"
                            >
                                {{ curso.nombre_curso }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="fecha">Fecha de Registro</label>
                        <input id="fecha" type="date" v-model="fecha" />
                    </div>
                </div>
            </div>

            <div class="card-footer" style="padding: 14px 20px">
                <div
                    v-if="errorFiltros"
                    class="error-banner"
                    style="margin-right: auto; margin-bottom: 0"
                >
                    <i class="ti ti-alert-circle"></i> {{ errorFiltros }}
                </div>
                <button
                    @click="cargarPlanilla"
                    class="tb-btn primary"
                    :disabled="cargando || !cursoSeleccionado"
                >
                    <i class="ti ti-loader animate-spin" v-if="cargando"></i>
                    {{ cargando ? "Cargando nómina..." : "Cargar Planilla" }}
                </button>
            </div>
        </div>

        <div
            v-if="planillaVisible"
            class="card animate-fade-in"
            style="margin-top: 14px"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-users" aria-hidden="true"></i>
                    Nómina del Curso
                </div>
                <span class="metric-badge badge-gray">
                    {{ alumnos.length }} alumnos listados
                </span>
            </div>

            <div class="table-responsive">
                <div v-if="alumnos.length === 0" class="empty-state">
                    <i
                        class="ti ti-user-off"
                        style="font-size: 28px; opacity: 0.4"
                    ></i>
                    <p>
                        No hay alumnos registrados en este curso para la fecha
                        seleccionada.
                    </p>
                </div>

                <table
                    v-else
                    class="mini"
                    aria-label="Planilla de toma de asistencia"
                >
                    <thead>
                        <tr>
                            <th>Alumno</th>
                            <th>DNI</th>
                            <th style="width: 160px; text-align: center">
                                Estado
                            </th>
                            <th>Observaciones (Opcional)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="alumno in alumnos"
                            :key="alumno.id_alumno"
                            class="table-row"
                        >
                            <td>
                                <strong>{{ alumno.apellido }}</strong
                                >, {{ alumno.nombre }}
                            </td>
                            <td class="mono">{{ alumno.dni }}</td>

                            <td style="text-align: center">
                                <div class="attendance-toggles">
                                    <button
                                        type="button"
                                        :class="[
                                            'toggle-btn present',
                                            alumno.asistencia.estado ===
                                            'presente'
                                                ? 'active'
                                                : '',
                                        ]"
                                        @click="
                                            alumno.asistencia.estado =
                                                'presente'
                                        "
                                        title="Presente"
                                    >
                                        P
                                    </button>
                                    <button
                                        type="button"
                                        :class="[
                                            'toggle-btn absent',
                                            alumno.asistencia.estado ===
                                            'ausente'
                                                ? 'active'
                                                : '',
                                        ]"
                                        @click="
                                            alumno.asistencia.estado = 'ausente'
                                        "
                                        title="Ausente"
                                    >
                                        A
                                    </button>
                                    <button
                                        type="button"
                                        :class="[
                                            'toggle-btn late',
                                            alumno.asistencia.estado === 'tarde'
                                                ? 'active'
                                                : '',
                                        ]"
                                        @click="
                                            alumno.asistencia.estado = 'tarde'
                                        "
                                        title="Llegada Tarde"
                                    >
                                        T
                                    </button>
                                </div>
                            </td>

                            <td>
                                <input
                                    type="text"
                                    class="row-input"
                                    v-model="alumno.asistencia.observaciones"
                                    placeholder="Ej: Retirado antes de hora..."
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card-footer flex-footer">
                <div v-if="errorGuardar" class="error-banner">
                    <i class="ti ti-alert-circle"></i> {{ errorGuardar }}
                </div>
                <div v-if="exitoGuardar" class="exito-banner">
                    <i class="ti ti-check"></i> Asistencias guardadas
                    correctamente.
                </div>

                <div class="footer-actions">
                    <button
                        @click="ocultarPlanilla"
                        class="tb-btn outline"
                        :disabled="guardando"
                    >
                        Cancelar
                    </button>
                    <button
                        @click="confirmarGuardado"
                        class="tb-btn primary"
                        :disabled="guardando || alumnos.length === 0"
                    >
                        <i
                            class="ti ti-loader animate-spin"
                            v-if="guardando"
                        ></i>
                        <i class="ti ti-device-floppy" v-else></i>
                        {{
                            guardando
                                ? "Guardando en lote..."
                                : "Guardar Registro Completo"
                        }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// Ajusta la ruta de tus servicios según corresponda en tu árbol de carpetas
import {
    obtenerCursos,
    obtenerAlumnosCurso,
    guardarAsistenciasLote,
} from "../../../services/academico-service.js";
import { useAuthStore } from "../../../stores/auth.js";

// ── Estado Reactivo ──────────────────────────────────────────────────────────
const cursosDisponibles = ref([]);
const cursoSeleccionado = ref("");
const fecha = ref(new Date().toISOString().split("T")[0]); // Fecha de hoy por defecto
const alumnos = ref([]);
const authStore = useAuthStore();

const cargando = ref(false);
const guardando = ref(false);
const planillaVisible = ref(false);

const errorFiltros = ref("");
const errorGuardar = ref("");
const exitoGuardar = ref(false);

// ── Controladores ────────────────────────────────────────────────────────────
const fetchCursos = async () => {
    try {
        const res = await obtenerCursos();
        cursosDisponibles.value = Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("No se pudieron cargar los cursos:", error);
    }
};

const cargarPlanilla = async () => {
    errorFiltros.value = "";
    exitoGuardar.value = false;

    if (!cursoSeleccionado.value || !fecha.value) {
        errorFiltros.value = "Seleccioná un curso y una fecha válida.";
        return;
    }

    cargando.value = true;
    try {
        const res = await obtenerAlumnosCurso(
            cursoSeleccionado.value,
            fecha.value,
        );
        const dataAlumnos = Array.isArray(res.data) ? res.data : [];

        // Mapeamos los alumnos para inyectarles el estado local de asistencia
        alumnos.value = dataAlumnos.map((alumno) => ({
            ...alumno,
            asistencia: {
                // Si el backend te devuelve un estado previo para esta fecha, lo usás.
                // Si no, por defecto todos "presente" para agilizar la carga.
                estado: alumno.estado_previo || "presente",
                observaciones: alumno.observaciones_previas || "",
            },
        }));

        planillaVisible.value = true;
    } catch (e) {
        errorFiltros.value = "Ocurrió un error al cargar la nómina de alumnos.";
    } finally {
        cargando.value = false;
    }
};

const ocultarPlanilla = () => {
    planillaVisible.value = false;
    alumnos.value = [];
    exitoGuardar.value = false;
    errorGuardar.value = "";
};

const confirmarGuardado = async () => {
    errorGuardar.value = "";
    exitoGuardar.value = false;
    guardando.value = true;

    // Armamos el payload estructurado para el endpoint de lote
    const payload = {
        registrado_por: authStore.usuario.id,
        id_curso: cursoSeleccionado.value,
        fecha: fecha.value,
        registros: alumnos.value.map((al) => ({
            id_alumno: al.id_alumno,
            estado: al.asistencia.estado,
            //observaciones: al.asistencia.observaciones,
        })),
    };

    try {
        await guardarAsistenciasLote(payload);
        exitoGuardar.value = true;
        // Opcional: ocultar la planilla después de unos segundos
        // setTimeout(() => ocultarPlanilla(), 2500);
    } catch (e) {
        errorGuardar.value =
            e?.response?.data?.mensaje || "Error al registrar las asistencias.";
    } finally {
        guardando.value = false;
    }
};

// ── Hooks de entrada ─────────────────────────────────────────────────────────
onMounted(() => {
    fetchCursos();
});
</script>

<style scoped>
/* Reutilizamos exactamente la misma base CSS que en tu vista de Alumnos
  para garantizar la cohesión visual del proyecto.
*/

/* Transiciones y Microanimaciones */
.animate-fade-in {
    animation: fadeIn 0.22s ease-in-out;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(3px);
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
    animation: spin 0.85s linear infinite;
    display: inline-block;
}

.asistencias-wrapper {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 950px;
    width: 100%;
}

/* UI Container Card */
.card {
    background: var(--color-background-primary, #fff);
    border: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
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
.flex-footer {
    justify-content: space-between;
}
.footer-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
}
.card-title {
    font-size: 13.5px;
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

/* Formularios */
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.form-group label {
    font-size: 11.5px;
    font-weight: 600;
    color: #4b5563;
}
.form-group input,
.form-group select {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 12.5px;
    outline: none;
    transition:
        border-color 0.15s,
        box-shadow 0.15s;
    background: #fff;
}
.form-group input:focus,
.form-group select:focus {
    border-color: #cd322c;
    box-shadow: 0 0 0 2px rgba(205, 50, 44, 0.08);
}

/* Botonería Semántica */
.tb-btn {
    padding: 7px 14px;
    border-radius: 6px;
    border: 1px solid transparent;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.12s;
}
.tb-btn.primary {
    background: #cd322c;
    color: #fff;
    border-color: #cd322c;
}
.tb-btn.primary:hover:not(:disabled) {
    background: #a52420;
}
.tb-btn.outline {
    background: white;
    color: #4b5563;
    border-color: #d1d5db;
}
.tb-btn.outline:hover:not(:disabled) {
    background: #f9fafb;
    color: #111827;
}
.tb-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Tabla Estilo Compacto */
.table-responsive {
    width: 100%;
    overflow-x: auto;
    padding: 12px;
}
.mini {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
}
.mini th {
    text-align: left;
    padding: 8px 10px;
    color: var(--color-text-tertiary, #6b7280);
    font-weight: 500;
    font-size: 11.5px;
    border-bottom: 1px solid #e5e7eb;
}
.mini td {
    padding: 9px 10px;
    border-bottom: 0.5px solid #e5e7eb;
    color: var(--color-text-primary, #111827);
    vertical-align: middle;
}
.table-row:hover {
    background: var(--color-background-secondary, #f9fafb);
}
.mono {
    font-family: monospace;
    font-size: 11.5px;
    color: #4b5563;
}

/* Badges y Banners */
.metric-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
}
.badge-gray {
    background: #f3f4f6;
    color: #4b5563;
}

.error-banner {
    display: inline-flex;
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
    display: inline-flex;
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
    padding: 36px 16px;
    text-align: center;
    color: #9ca3af;
    font-size: 12.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

/* ESTILOS ESPECÍFICOS DE ESTA VISTA
   Botones de P/A/T (Presente, Ausente, Tarde) y Observaciones
*/
.attendance-toggles {
    display: inline-flex;
    background: #f3f4f6;
    border-radius: 6px;
    padding: 2px;
    gap: 2px;
    border: 1px solid #e5e7eb;
}
.toggle-btn {
    width: 28px;
    height: 26px;
    border: none;
    background: transparent;
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.toggle-btn:hover {
    background: #e5e7eb;
}

/* Estados activos */
.toggle-btn.present.active {
    background: #eaf3de;
    color: #3b6d11;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.toggle-btn.absent.active {
    background: #fef2f2;
    color: #991b1b;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.toggle-btn.late.active {
    background: #fef08a;
    color: #a16207;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.row-input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 11.5px;
    background: #f9fafb;
    transition: all 0.15s;
    outline: none;
}
.row-input:focus,
.row-input:hover {
    border-color: #d1d5db;
    background: #fff;
}
.row-input:focus {
    border-color: #cd322c;
}
</style>
