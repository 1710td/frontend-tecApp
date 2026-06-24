<template>
    <div class="metrics animate-fade-in">
        <div class="metric-card">
            <div class="metric-label">
                <i class="ti ti-star" aria-hidden="true"></i>Promedio General
            </div>
            <div class="metric-value">8.4</div>
            <span class="metric-badge badge-green">
                <i class="ti ti-arrow-up"></i>Buen rendimiento acad.
            </span>
        </div>
        <div class="metric-card">
            <div class="metric-label">
                <i class="ti ti-calendar-event" aria-hidden="true"></i>Asistencia
            </div>
            <div class="metric-value">92%</div>
            <span class="metric-badge badge-green">Dentro del límite (85%)</span>
        </div>
        <div class="metric-card">
            <div class="metric-label">
                <i class="ti ti-book-2" aria-hidden="true"></i>Materias Cursando
            </div>
            <div class="metric-value">9</div>
            <span class="metric-badge badge-gray">Ciclo Lectivo 2026</span>
        </div>
        <div class="metric-card">
            <div class="metric-label">
                <i class="ti ti-clock" aria-hidden="true"></i>Tardanzas
            </div>
            <div class="metric-value">2</div>
            <span class="metric-badge badge-red">
                <i class="ti ti-alert-circle"></i>Límite: 15
            </span>
        </div>
    </div>

    <div class="row3 animate-fade-in">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-bell-ringing" aria-hidden="true"></i>
                    Avisos Recientes del Curso
                </div>
            </div>
            <div class="activity-list">
                <div
                    v-for="aviso in avisos"
                    :key="aviso.id"
                    class="activity-item"
                >
                    <div class="act-icon" :style="{ background: aviso.iconBg }">
                        <i
                            :class="`ti ${aviso.icon}`"
                            :style="{
                                color: aviso.iconColor,
                                fontSize: '13px',
                            }"
                        ></i>
                    </div>
                    <div>
                        <div class="act-text">
                            <strong>{{ aviso.titulo }}</strong>
                            — {{ aviso.descripcion }}
                        </div>
                        <div class="act-time">{{ aviso.tiempo }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="ti ti-calendar" aria-hidden="true"></i>
                        Horario de Hoy
                    </div>
                </div>
                <div class="progress-row">
                    <div
                        v-for="clase in clasesHoy"
                        :key="clase.materia"
                        class="list-item-clean"
                    >
                        <div class="hora-badge">{{ clase.hora }}</div>
                        <div class="clase-info">
                            <span class="clase-name">{{ clase.materia }}</span>
                            <span class="clase-sub">{{ clase.aula }} • Prof. {{ clase.profesor }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row2 animate-fade-in">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-school" aria-hidden="true"></i>
                    Próximas Evaluaciones
                </div>
            </div>
            <table class="mini" aria-label="Próximas evaluaciones">
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Fecha</th>
                        <th>Tipo / Tema</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="evaluacion in evaluaciones" :key="evaluacion.materia">
                        <td><strong>{{ evaluacion.materia }}</strong></td>
                        <td class="mono">{{ evaluacion.fecha }}</td>
                        <td>{{ evaluacion.tema }}</td>
                        <td>
                            <span :class="`badge-status ${evaluacion.estadoClass}`">
                                {{ evaluacion.estado }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-bulb" aria-hidden="true"></i>
                    Consejos del Tutor / Pixelina
                </div>
            </div>
            <div class="consejo-box">
                <div class="consejo-avatar">🤖</div>
                <div class="consejo-text">
                    <p class="consejo-title">¡Hola! Soy Pixelina</p>
                    <p class="consejo-desc">
                        Recuerda que esta semana tienes la entrega del proyecto de Programación. 
                        ¡Revisa las pautas en el boletín y sigue esforzándote! Vas super bien.
                    </p>
                </div>
            </div>
            <div class="consejo-footer">
                <span class="footer-quote">"El esfuerzo de hoy es el éxito del mañana"</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const avisos = [
    {
        id: 1,
        iconBg: "#e0f2fe",
        icon: "ti-speakerphone",
        iconColor: "#0369a1",
        titulo: "Reunión de Delegados",
        descripcion: "Mañana a las 10:00 hs en la biblioteca escolar.",
        tiempo: "Hace 2 horas",
    },
    {
        id: 2,
        iconBg: "#fef3c7",
        icon: "ti-alert-triangle",
        iconColor: "#b45309",
        titulo: "Cambio de Aula - Física",
        descripcion: "La clase de Física de hoy se dictará en el Laboratorio 2.",
        tiempo: "Hace 4 horas",
    },
    {
        id: 3,
        iconBg: "#f3e8ff",
        icon: "ti-trophy",
        iconColor: "#7e22ce",
        titulo: "Olimpíadas de Programación",
        descripcion: "¡Felicitaciones a los ganadores de la etapa regional!",
        tiempo: "Hace 1 día",
    },
];

const clasesHoy = [
    { hora: "07:30 - 09:30", materia: "Programación Web", aula: "Lab 3", profesor: "Gomez" },
    { hora: "09:40 - 11:40", materia: "Matemática", aula: "Aula 12", profesor: "Pérez" },
    { hora: "11:50 - 13:10", materia: "Física", aula: "Lab Física", profesor: "Sánchez" },
];

const evaluaciones = [
    {
        materia: "Historia",
        fecha: "26 Jun 2026",
        tema: "Revolución de Mayo",
        estado: "Confirmado",
        estadoClass: "status-orange",
    },
    {
        materia: "Química",
        fecha: "30 Jun 2026",
        tema: "Tabla periódica y enlaces",
        estado: "Pendiente",
        estadoClass: "status-gray",
    },
    {
        materia: "Programación Web",
        fecha: "03 Jul 2026",
        tema: "Defensa Proyecto Integrador",
        estado: "Urgente",
        estadoClass: "status-red",
    },
];
</script>

<style scoped>
/* Grid de Métricas */
.metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 12px;
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

.badge-red {
    background: #fef2f2;
    color: #991b1b;
}

/* Grids / Rows */
.row3 {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
}

.row2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

@media (max-width: 900px) {
    .row3, .row2 {
        grid-template-columns: 1fr;
    }
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

/* Items */
.activity-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.activity-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 8px 0;
}

.act-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.act-text {
    font-size: 13px;
    color: #334155;
    line-height: 1.4;
}

.act-time {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 4px;
}

/* Horarios de hoy clean */
.list-item-clean {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    background: #f8fafc;
    border: 1px solid #f1f5f9;
    margin-bottom: 8px;
}

.hora-badge {
    font-size: 11px;
    font-weight: 600;
    color: #0284c7;
    background: #e0f2fe;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
}

.clase-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.clase-name {
    font-weight: 600;
    font-size: 13px;
    color: #1e293b;
}

.clase-sub {
    font-size: 11px;
    color: #64748b;
}

/* Tabla de Evaluaciones */
table.mini {
    width: 100%;
    border-collapse: collapse;
}

table.mini th {
    text-align: left;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    border-bottom: 1.5px solid #e2e8f0;
}

table.mini td {
    padding: 10px 12px;
    font-size: 12.5px;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
}

.mono {
    font-family: monospace;
    font-size: 12px;
}

/* Badges de Estado */
.badge-status {
    font-weight: 600;
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 9999px;
}

.status-orange {
    background: #fffbeb;
    color: #d97706;
}

.status-gray {
    background: #f1f5f9;
    color: #475569;
}

.status-red {
    background: #fef2f2;
    color: #ef4444;
}

/* Consejo Box */
.consejo-box {
    display: flex;
    gap: 16px;
    background: #f0f9ff;
    border: 1px dashed #bae6fd;
    padding: 16px;
    border-radius: 12px;
}

.consejo-avatar {
    font-size: 28px;
}

.consejo-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.consejo-title {
    font-weight: 600;
    font-size: 14px;
    color: #0369a1;
}

.consejo-desc {
    font-size: 13px;
    color: #334155;
    line-height: 1.5;
}

.consejo-footer {
    display: flex;
    justify-content: center;
    border-top: 1px solid #f1f5f9;
    padding-top: 12px;
}

.footer-quote {
    font-style: italic;
    font-size: 12px;
    color: #64748b;
}

/* Animaciones */
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
