<template>
    <div class="cursos-wrapper">
        <div class="card animate-fade-in">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-book" aria-hidden="true"></i> Mi Curso
                </div>
            </div>

            <div class="card-body details-view">
                <div v-if="cargandoCurso" class="empty-state">
                    <i
                        class="ti ti-loader animate-spin"
                        style="font-size: 24px; color: #cd322c"
                    ></i>
                    <p>Cargando información de tu curso...</p>
                </div>

                <div
                    v-else-if="errorCurso"
                    class="error-banner"
                    style="margin-bottom: 16px"
                >
                    <i class="ti ti-alert-circle"></i> {{ errorCurso }}
                    <button
                        class="tb-btn sm outline"
                        @click="fetchMiCurso"
                        style="margin-left: auto"
                    >
                        Reintentar
                    </button>
                </div>

                <div v-else-if="miCurso">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Curso</span>
                            <span class="detail-value" style="font-weight: 600">
                                {{ miCurso.nombre_curso }} ({{
                                    miCurso.ciclo_lectivo
                                }})
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Nivel</span>
                            <span class="detail-value">{{
                                miCurso.nivel
                            }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Estado</span>
                            <span
                                class="detail-value"
                                style="text-transform: capitalize"
                            >
                                <span
                                    :class="['estado-dot', miCurso.estado]"
                                    style="margin-right: 4px"
                                ></span>
                                {{ miCurso.estado }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Aula asignada</span>
                            <span class="detail-value">{{ miCurso.aula }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Turno</span>
                            <span :class="['badge', badgeClass(miCurso.turno)]">
                                {{ miCurso.turno }}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Profesor Titular</span>
                            <span class="detail-value">
                                {{
                                    miCurso.profesorTitular?.apellido ||
                                    "No asignado"
                                }}
                                {{ miCurso.profesorTitular?.nombre || "" }}
                            </span>
                        </div>
                    </div>

                    <div class="alumnos-section" style="margin-top: 32px">
                        <h4
                            class="section-subtitle"
                            style="
                                margin-bottom: 12px;
                                font-size: 14px;
                                font-weight: 600;
                                color: #374151;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            "
                        >
                            <i class="ti ti-users"></i> Mis Compañeros
                        </h4>

                        <div
                            v-if="cargandoAlumnos"
                            class="empty-state"
                            style="padding: 20px"
                        >
                            <i
                                class="ti ti-loader animate-spin"
                                style="font-size: 24px; color: #cd322c"
                            ></i>
                            <p>Cargando lista de compañeros...</p>
                        </div>

                        <div
                            v-else-if="errorAlumnos"
                            class="error-banner"
                            style="margin-top: 10px"
                        >
                            <i class="ti ti-alert-circle"></i>
                            {{ errorAlumnos }}
                            <button
                                class="tb-btn sm outline"
                                @click="fetchAlumnos(miCurso.id_curso)"
                                style="margin-left: auto"
                            >
                                Reintentar
                            </button>
                        </div>

                        <table
                            v-else-if="alumnosCurso.length > 0"
                            class="mini"
                            style="margin-top: 10px"
                        >
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Contacto / Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="alumno in alumnosCurso"
                                    :key="alumno.id_alumno"
                                    class="table-row"
                                >
                                    <td>
                                        <div
                                            style="
                                                font-weight: 500;
                                                color: #111827;
                                            "
                                        >
                                            {{ alumno.nombre }}
                                            {{ alumno.apellido }}
                                        </div>
                                    </td>
                                    <td>
                                        {{
                                            alumno.telefono_tutor ||
                                            "Sin registro"
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div
                            v-else
                            class="empty-state"
                            style="
                                padding: 20px;
                                background: #f9fafb;
                                border-radius: 8px;
                                margin-top: 10px;
                            "
                        >
                            <i
                                class="ti ti-user-off"
                                style="font-size: 24px; opacity: 0.4"
                            ></i>
                            <p>
                                Aún no hay compañeros registrados en este curso.
                            </p>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <i
                        class="ti ti-inbox"
                        style="font-size: 28px; opacity: 0.4"
                    ></i>
                    <p>Actualmente no estás asignado a ningún curso.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
    obtenerMiCurso,
    obtenerAlumnosCurso, // Descomentado: ahora sí lo vamos a usar
} from "../../../services/academico-service.js";

import { useAuthStore } from "../../../stores/auth.js";

// ── Store ───────────────────────────────────────────────────────────────────
const authStore = useAuthStore(); // Inicializamos el store de Pinia

// ── Estado ──────────────────────────────────────────────────────────────────
const miCurso = ref(null);
const cargandoCurso = ref(false);
const errorCurso = ref("");

const alumnosCurso = ref([]);
const cargandoAlumnos = ref(false);
const errorAlumnos = ref("");

// ── Helpers ─────────────────────────────────────────────────────────────────
const badgeClass = (turno = "") => {
    const hora = parseInt(turno.trim().split(":")[0], 10);
    if (isNaN(hora)) return "noche";
    if (hora < 12) return "manana";
    return "tarde";
};

// ── Fetch Data ──────────────────────────────────────────────────────────────
const fetchMiCurso = async () => {
    cargandoCurso.value = true;
    errorCurso.value = "";
    try {
        // Usamos el ID del alumno desde el store en lugar del '1' hardcodeado
        const idAlumno = authStore.usuario?.id_alumno || 1;

        const res = await obtenerMiCurso(idAlumno);
        const data = res?.data || res;

        console.log(JSON.stringify(res));

        miCurso.value = data; // Guardamos en la variable correcta

        // Si trajimos el curso con éxito, disparamos la búsqueda de compañeros
        if (miCurso.value && miCurso.value.id_curso) {
            await fetchAlumnos(miCurso.value.id_curso);
        }
    } catch (error) {
        errorCurso.value =
            error?.response?.data?.message ||
            error?.response?.data?.mensaje ||
            error?.message ||
            "Error crítico de red al listar tu curso.";
    } finally {
        cargandoCurso.value = false;
    }
};

const fetchAlumnos = async (idCurso) => {
    cargandoAlumnos.value = true;
    errorAlumnos.value = "";

    try {
        // Usamos el endpoint correcto para los alumnos del curso
        const res = await obtenerAlumnosCurso(idCurso);
        const data = res?.data || res;

        alumnosCurso.value = Array.isArray(data) ? data : [];
    } catch (error) {
        errorAlumnos.value =
            error?.response?.data?.message ||
            error?.response?.data?.mensaje ||
            "Error al cargar los compañeros.";
        alumnosCurso.value = [];
    } finally {
        cargandoAlumnos.value = false;
    }
};

// ── Inicialización ──────────────────────────────────────────────────────────
onMounted(() => {
    fetchMiCurso();
});
</script>
<style scoped>
/* Indicador visual de estado del curso */
.estado-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
.estado-dot.activo {
    background-color: #10b981;
}
.estado-dot.finalizado {
    background-color: #6b7280;
}
.estado-dot.cancelado {
    background-color: #ef4444;
}

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
    margin: 0 auto;
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

.detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}
.detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.detail-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #6b7280;
    font-weight: 600;
}
.detail-value {
    font-size: 14px;
    color: #111827;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    color: #6b7280;
    gap: 12px;
}

.error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    color: #b91c1c;
    font-size: 13px;
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
.tb-btn.sm {
    padding: 6px 12px;
    font-size: 12px;
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
</style>
