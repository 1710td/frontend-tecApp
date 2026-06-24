<template>
    <div class="calificaciones-wrapper">
        <!-- MÉTRICAS -->
        <div class="metrics animate-fade-in">
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-chart-bar" aria-hidden="true"></i>Promedio General
                </div>
                <div class="metric-value">8.4</div>
                <span class="metric-badge badge-green">
                    <i class="ti ti-arrow-up"></i>Destacado
                </span>
            </div>
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-discount-check" aria-hidden="true"></i>Materias Aprobadas
                </div>
                <div class="metric-value">6 / 6</div>
                <span class="metric-badge badge-green">100% de efectividad</span>
            </div>
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-award" aria-hidden="true"></i>Condición Académica
                </div>
                <div class="metric-value" style="font-size: 24px;">Regular</div>
                <span class="metric-badge badge-gray">Sin previas</span>
            </div>
        </div>

        <!-- BOLETÍN DIGITAL -->
        <div class="card animate-fade-in" style="margin-top: 12px">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-report-analytics" aria-hidden="true"></i>
                    Boletín de Calificaciones Digital — Ciclo Lectivo 2026
                </div>
            </div>

            <div class="table-responsive">
                <table class="mini" aria-label="Boletín de calificaciones">
                    <thead>
                        <tr>
                            <th>Asignatura</th>
                            <th class="grade-col">1° Trim.</th>
                            <th class="grade-col">2° Trim.</th>
                            <th class="grade-col">3° Trim.</th>
                            <th class="grade-col">Promedio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="nota in boletin" :key="nota.materia" class="table-row">
                            <td>
                                <strong>{{ nota.materia }}</strong>
                            </td>
                            <td class="grade-col mono" :class="getColorClass(nota.t1)">
                                {{ nota.t1 || '-' }}
                            </td>
                            <td class="grade-col mono" :class="getColorClass(nota.t2)">
                                {{ nota.t2 || '-' }}
                            </td>
                            <td class="grade-col mono" :class="getColorClass(nota.t3)">
                                {{ nota.t3 || '-' }}
                            </td>
                            <td class="grade-col mono bold" :class="getColorClass(nota.promedio)">
                                <strong>{{ nota.promedio }}</strong>
                            </td>
                            <td>
                                <span :class="['status-pill', nota.promedio >= 7 ? 'sp-aprobado' : 'sp-proceso']">
                                    {{ nota.promedio >= 7 ? 'Aprobada' : 'En proceso' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="boletin-legend" style="padding: 16px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; gap: 16px; font-size: 11px; color: #64748b;">
                    <span style="display: inline-flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; background: #16a34a; border-radius: 50%;"></span> Nota sobresaliente (8-10)</span>
                    <span style="display: inline-flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; background: #2563eb; border-radius: 50%;"></span> Nota aprobada (7)</span>
                    <span style="display: inline-flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; background: #dc2626; border-radius: 50%;"></span> Desaprobada (< 7)</span>
                </div>
                <div style="font-size: 11px; font-style: italic; color: #94a3b8;">
                    * Calificación mínima para aprobar: 7 (siete) puntos.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const boletin = ref([
    { materia: "Programación Web", t1: 9, t2: 8, t3: 9, promedio: 8.7 },
    { materia: "Análisis Matemático", t1: 7, t2: 8, t3: 7, promedio: 7.3 },
    { materia: "Física Aplicada", t1: 8, t2: 7, t3: 9, promedio: 8.0 },
    { materia: "Sistemas Operativos", t1: 10, t2: 9, t3: 9, promedio: 9.3 },
    { materia: "Química General", t1: 7, t2: 7, t3: 8, promedio: 7.3 },
    { materia: "Base de Datos", t1: 9, t2: 10, t3: 10, promedio: 9.7 },
]);

const getColorClass = (nota) => {
    if (!nota) return "";
    if (nota >= 8) return "text-green";
    if (nota >= 7) return "text-blue";
    return "text-red";
};
</script>

<style scoped>
.calificaciones-wrapper {
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

/* Tabla de Boletin */
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

.grade-col {
    text-align: center !important;
    width: 100px;
}

.mono {
    font-family: monospace;
    font-size: 14px;
}

.bold {
    font-weight: 700;
}

/* Text Colors dynamically */
.text-green {
    color: #16a34a;
}

.text-blue {
    color: #2563eb;
}

.text-red {
    color: #dc2626;
}

/* Status Pill */
.status-pill {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    border-radius: 9999px;
}

.sp-aprobado {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.sp-proceso {
    background: #fffbeb;
    color: #d97706;
    border: 1px solid #fef3c7;
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
