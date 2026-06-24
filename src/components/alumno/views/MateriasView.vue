<template>
    <div class="alumnos-wrapper">
        <!-- MÉTRICAS -->
        <div v-if="vistaActiva === 'lista'" class="metrics animate-fade-in">
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-books" aria-hidden="true"></i>Mis Materias
                </div>
                <div class="metric-value">{{ materias.length }}</div>
                <span class="metric-badge badge-green">
                    <i class="ti ti-check"></i>Cursando actualmente
                </span>
            </div>
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-clock" aria-hidden="true"></i>Carga Horaria Semanal
                </div>
                <div class="metric-value">32 hs</div>
                <span class="metric-badge badge-gray">Plan Técnico 2026</span>
            </div>
        </div>

        <!-- LISTADO DE MATERIAS -->
        <div
            v-if="vistaActiva === 'lista'"
            class="card animate-fade-in"
            style="margin-top: 12px"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-book" aria-hidden="true"></i>
                    Mis Materias Cursadas
                </div>
            </div>

            <div class="table-responsive">
                <div v-if="cargando" class="empty-state">
                    <i
                        class="ti ti-loader animate-spin"
                        style="font-size: 24px; color: #007bff"
                    ></i>
                    <p>Cargando materias académicas...</p>
                </div>

                <div
                    v-else-if="errorCarga"
                    class="error-banner"
                    style="margin: 16px"
                >
                    <i class="ti ti-alert-circle"></i> {{ errorCarga }}
                    <button
                        class="tb-btn sm outline"
                        @click="fetchMaterias"
                        style="margin-left: auto"
                    >
                        Reintentar
                    </button>
                </div>

                <table
                    v-else-if="materias.length > 0"
                    class="mini"
                    aria-label="Listado de materias"
                >
                    <thead>
                        <tr>
                            <th>Nombre de la Materia</th>
                            <th>Área / Departamento</th>
                            <th>Carga Horaria</th>
                            <th class="action-cell">Programa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="materia in materias"
                            :key="materia.id_materia"
                            class="table-row"
                        >
                            <td>
                                <strong>{{ materia.nombre_materia }}</strong>
                            </td>
                            <td>
                                {{ materia.departamento || "Tecnología / Ciencias" }}
                            </td>
                            <td>
                                {{
                                    materia.carga_horaria
                                        ? `${materia.carga_horaria} hs/sem`
                                        : "4 hs/sem"
                                }}
                            </td>

                            <td class="action-cell">
                                <div class="action-buttons">
                                    <button
                                        @click="
                                            cambiarVista('detalles', materia)
                                        "
                                        class="icon-btn view"
                                        title="Ver programa completo"
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
                        class="ti ti-file-x"
                        style="font-size: 28px; opacity: 0.4"
                    ></i>
                    <p>No se encontraron materias asignadas para tu curso.</p>
                </div>
            </div>
        </div>

        <!-- VISTA DE DETALLES -->
        <div
            v-if="vistaActiva === 'detalles' && materiaSeleccionada"
            class="card animate-fade-in"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-clipboard-list"></i>
                    Información Académica —
                    {{ materiaSeleccionada.nombre_materia }}
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
                        <span class="detail-label">Nombre de la Materia</span>
                        <span class="detail-value">{{
                            materiaSeleccionada.nombre_materia
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Departamento Académico</span>
                        <span class="detail-value">{{
                            materiaSeleccionada.departamento || "Tecnología / Informática"
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Carga Horaria Semanal</span>
                        <span class="detail-value">{{
                            materiaSeleccionada.carga_horaria || "4 hs/sem"
                        }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Correlatividad</span>
                        <span class="detail-value">Ninguna (Materia regular)</span>
                    </div>
                </div>

                <div class="program-content" style="margin-top: 24px;">
                    <h3 style="font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 12px;">
                        Contenidos Generales del Programa
                    </h3>
                    <div class="program-box" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                        <ul style="list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #475569;">
                            <li>Eje Temático 1: Introducción a los conceptos fundamentales de la materia.</li>
                            <li>Eje Temático 2: Aplicación práctica y resolución de problemas metodológicos.</li>
                            <li>Eje Temático 3: Integración de contenidos y desarrollo del proyecto final.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerMaterias } from "../../../services/academico-service.js";

const materias = ref([]);
const cargando = ref(true);
const errorCarga = ref("");

const vistaActiva = ref("lista");
const materiaSeleccionada = ref(null);

const cambiarVista = (vista, materia = null) => {
    vistaActiva.value = vista;
    if (materia) {
        materiaSeleccionada.value = materia;
    }
};

const fetchMaterias = async () => {
    cargando.value = true;
    errorCarga.value = "";
    try {
        const response = await obtenerMaterias();
        if (response && response.data) {
            materias.value = response.data;
        } else {
            // Fallback mock data if server is down or empty
            materias.value = [
                { id_materia: 1, nombre_materia: "Programación Web", departamento: "Informática", carga_horaria: "6" },
                { id_materia: 2, nombre_materia: "Análisis Matemático", departamento: "Exactas", carga_horaria: "4" },
                { id_materia: 3, nombre_materia: "Física Aplicada", departamento: "Exactas", carga_horaria: "4" },
                { id_materia: 4, nombre_materia: "Sistemas Operativos", departamento: "Informática", carga_horaria: "4" },
                { id_materia: 5, nombre_materia: "Química General", departamento: "Ciencias Naturales", carga_horaria: "4" },
                { id_materia: 6, nombre_materia: "Base de Datos", departamento: "Informática", carga_horaria: "4" },
            ];
        }
    } catch (err) {
        console.error("Error al cargar materias:", err);
        errorCarga.value = "No se pudieron obtener las materias del servidor.";
    } finally {
        cargando.value = false;
    }
};

onMounted(() => {
    fetchMaterias();
});
</script>

<style scoped>
.alumnos-wrapper {
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

/* Tabla de Materias */
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
