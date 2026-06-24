<template>
    <div class="profesores-wrapper">
        <!-- MÉTRICAS -->
        <div v-if="vistaActiva === 'lista'" class="metrics animate-fade-in">
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-users" aria-hidden="true"></i>Docentes a Cargo
                </div>
                <div class="metric-value">{{ profesores.length }}</div>
                <span class="metric-badge badge-green">
                    <i class="ti ti-check"></i>Ciclo lectivo activo
                </span>
            </div>
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-message-2" aria-hidden="true"></i>Consultas Disponibles
                </div>
                <div class="metric-value">Vía Email</div>
                <span class="metric-badge badge-gray">Canal Institucional</span>
            </div>
        </div>

        <div v-if="vistaActiva === 'lista'" class="card animate-fade-in" style="margin-top: 12px">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-chalkboard" aria-hidden="true"></i>
                    Mis Profesores
                </div>
            </div>

            <div class="table-responsive">
                <div v-if="cargando" class="empty-state">
                    <i
                        class="ti ti-loader animate-spin"
                        style="font-size: 24px; color: #007bff"
                    ></i>
                    <p>Cargando docentes del curso...</p>
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
                            <th>Materia / Especialidad</th>
                            <th>Email Institucional</th>
                            <th class="action-cell">Contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="prof in profesores"
                            :key="prof.id_profesor"
                            class="table-row"
                        >
                            <td>
                                <strong>{{ prof.apellido }}</strong>, {{ prof.nombre }}
                            </td>
                            <td>
                                {{ prof.especialidad || "Profesor de Curso" }}
                            </td>
                            <td class="email-cell mono">{{ prof.email }}</td>
                            <td class="action-cell">
                                <div class="action-buttons">
                                    <button
                                        @click="cambiarVista('detalles', prof)"
                                        class="icon-btn view"
                                        title="Ver legajo de contacto"
                                        aria-label="Ver detalles"
                                    >
                                        <i class="ti ti-eye"></i>
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
                    <p>No se encontraron docentes registrados en tu curso.</p>
                </div>
            </div>
        </div>

        <!-- DETALLES DEL DOCENTE -->
        <div
            v-if="vistaActiva === 'detalles' && profesorSeleccionado"
            class="card animate-fade-in"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-info-circle"></i>
                    Contacto Docente — Prof. {{ profesorSeleccionado.nombre }} {{ profesorSeleccionado.apellido }}
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
                        <span class="detail-value"
                            >{{ profesorSeleccionado.apellido }}, {{ profesorSeleccionado.nombre }}</span
                        >
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Materia / Especialidad</span>
                        <span class="detail-value">{{ profesorSeleccionado.especialidad || "Docente de la Institución" }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email Institucional</span>
                        <span class="detail-value mono">{{ profesorSeleccionado.email }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Horario de Consultas</span>
                        <span class="detail-value">Lunes a Viernes (En horario escolar)</span>
                    </div>
                </div>

                <div class="contact-box" style="margin-top: 24px; padding: 16px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; display: flex; gap: 12px; align-items: center;">
                    <i class="ti ti-mail-forward" style="font-size: 24px; color: #0284c7;"></i>
                    <div>
                        <h4 style="font-size: 13px; font-weight: 600; color: #0369a1; margin-bottom: 2px;">¿Necesitás realizar una consulta académica?</h4>
                        <p style="font-size: 12px; color: #475569;">Podés escribirle a su correo institucional agregando tu nombre, apellido y división.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerProfesores } from "../../../services/academico-service.js";

const profesores = ref([]);
const cargando = ref(true);
const errorCarga = ref("");

const vistaActiva = ref("lista");
const profesorSeleccionado = ref(null);

const cambiarVista = (vista, prof = null) => {
    vistaActiva.value = vista;
    if (prof) {
        profesorSeleccionado.value = prof;
    }
};

const fetchProfesores = async () => {
    cargando.value = true;
    errorCarga.value = "";
    try {
        const response = await obtenerProfesores();
        if (response && response.data) {
            profesores.value = response.data;
        } else {
            // Fallback mock data
            profesores.value = [
                { id_profesor: 1, nombre: "Juan", apellido: "Gomez", email: "jgomez@tecnica2.edu.ar", especialidad: "Programación Web" },
                { id_profesor: 2, nombre: "María", apellido: "Pérez", email: "mperez@tecnica2.edu.ar", especialidad: "Análisis Matemático" },
                { id_profesor: 3, nombre: "Carlos", apellido: "Sánchez", email: "csanchez@tecnica2.edu.ar", especialidad: "Física Aplicada" },
                { id_profesor: 4, nombre: "Laura", apellido: "Rojas", email: "lrojas@tecnica2.edu.ar", especialidad: "Sistemas Operativos" },
                { id_profesor: 5, nombre: "Gabriel", apellido: "Díaz", email: "gdiaz@tecnica2.edu.ar", especialidad: "Base de Datos" },
            ];
        }
    } catch (err) {
        console.error("Error al cargar profesores:", err);
        errorCarga.value = "No se pudieron obtener los profesores del servidor.";
    } finally {
        cargando.value = false;
    }
};

onMounted(() => {
    fetchProfesores();
});
</script>

<style scoped>
.profesores-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Grid de Métricas */
.metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
}

.metric-card {
    background: #ffffff;
    border: 1.5px solid #f1f5f9;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.metric-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
}

.metric-label i {
    font-size: 18px;
    color: #007bff;
}

.metric-value {
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.1;
}

.metric-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 9999px;
    width: fit-content;
}

.badge-green {
    background: #f0fdf4;
    color: #166534;
}

.badge-gray {
    background: #f8fafc;
    color: #475569;
}

/* Cards */
.card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 12px;
}

.card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
}

.card-title i {
    font-size: 20px;
    color: #007bff;
}

/* Tabla de Profesores */
.table-responsive {
    overflow-x: auto;
}

table.mini {
    width: 100%;
    border-collapse: collapse;
}

table.mini th {
    text-align: left;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    border-bottom: 1.5px solid #e2e8f0;
    background: #f8fafc;
}

table.mini td {
    padding: 12px 14px;
    font-size: 13px;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
}

.table-row:hover {
    background-color: #f8fafc;
}

.email-cell {
    color: #0369a1 !important;
}

.mono {
    font-family: monospace;
    font-size: 12px;
}

/* Acciones */
.action-cell {
    text-align: right !important;
    width: 80px;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.icon-btn {
    background: transparent;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s;
}

.icon-btn:hover {
    border-color: #cbd5e1;
    color: #0f172a;
    background: #f1f5f9;
}

.icon-btn.view:hover {
    color: #0284c7;
    background: #e0f2fe;
    border-color: #bae6fd;
}

/* Detalles */
.details-view {
    padding: 8px 4px;
}

.detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail-label {
    font-size: 11px;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.detail-value {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
}

/* Estados auxiliares */
.empty-state {
    padding: 40px;
    text-align: center;
    color: #64748b;
}

.empty-state i {
    color: #94a3b8;
    margin-bottom: 12px;
}

.error-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fef2f2;
    border: 1px solid #fca5a5;
    color: #991b1b;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
