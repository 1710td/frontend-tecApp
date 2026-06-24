<template>
    <div class="noticias-wrapper">
        <div v-if="vistaActiva === 'lista'" class="metrics animate-fade-in">
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-article" aria-hidden="true"></i>Total Anuncios
                </div>
                <div class="metric-value">{{ noticias.length }}</div>
                <span class="metric-badge badge-green">
                    <i class="ti ti-check"></i>Al día
                </span>
            </div>
            <div class="metric-card">
                <div class="metric-label">
                    <i class="ti ti-broadcast" aria-hidden="true"></i>Canal Oficial
                </div>
                <div class="metric-value">Institucional</div>
                <span class="metric-badge badge-gray">Información confiable</span>
            </div>
        </div>

        <!-- LISTA -->
        <div
            v-if="vistaActiva === 'lista'"
            class="card animate-fade-in"
            style="margin-top: 12px"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-news" aria-hidden="true"></i>
                    Anuncios de la Comunidad
                </div>
            </div>

            <div class="table-responsive">
                <div v-if="cargando" class="empty-state">
                    <i
                        class="ti ti-loader animate-spin"
                        style="font-size: 24px; color: #007bff"
                    ></i>
                    <p>Cargando comunicados...</p>
                </div>

                <div
                    v-else-if="errorCarga"
                    class="error-banner"
                    style="margin: 16px"
                >
                    <i class="ti ti-alert-circle"></i> {{ errorCarga }}
                    <button
                        class="tb-btn sm outline"
                        @click="fetchNoticias"
                        style="margin-left: auto"
                    >
                        Reintentar
                    </button>
                </div>

                <table
                    v-else-if="noticias.length > 0"
                    class="mini"
                    aria-label="Listado de noticias"
                >
                    <thead>
                        <tr>
                            <th>Título del Comunicado</th>
                            <th>Fecha</th>
                            <th class="action-cell">Leer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="noticia in noticias"
                            :key="noticia.id_noticia"
                            class="table-row"
                        >
                            <td>
                                <div class="noticia-titulo-cell">
                                    <div class="thumb fallback-thumb">
                                        <i class="ti ti-news"></i>
                                    </div>
                                    <strong>{{ noticia.titulo }}</strong>
                                </div>
                            </td>
                            <td class="mono">
                                {{ formatearFecha(noticia.fecha) }}
                            </td>
                            <td class="action-cell">
                                <div class="action-buttons">
                                    <button
                                        @click="
                                            cambiarVista('detalles', noticia)
                                        "
                                        class="icon-btn view"
                                        title="Leer noticia completa"
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
                    <p>No se encontraron comunicados recientes.</p>
                </div>
            </div>
        </div>

        <!-- VISTA DE DETALLES -->
        <div
            v-if="vistaActiva === 'detalles' && noticiaSeleccionada"
            class="card animate-fade-in"
        >
            <div class="card-header">
                <div class="card-title">
                    <i class="ti ti-book-open"></i>
                    {{ noticiaSeleccionada.titulo }}
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
                <div class="noticia-meta" style="margin-bottom: 16px; font-size: 12px; color: #64748b; display: flex; gap: 16px;">
                    <span><i class="ti ti-calendar" style="margin-right: 4px;"></i> {{ formatearFecha(noticiaSeleccionada.fecha) }}</span>
                    <span><i class="ti ti-user" style="margin-right: 4px;"></i> Dirección Escolar</span>
                </div>

                <div class="noticia-contenido" style="line-height: 1.6; font-size: 14.5px; color: #334155; background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
                    {{ noticiaSeleccionada.contenido }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerNoticias } from "../../../services/comunidad-service.js";

const noticias = ref([]);
const cargando = ref(true);
const errorCarga = ref("");

const vistaActiva = ref("lista");
const noticiaSeleccionada = ref(null);

const cambiarVista = (vista, noticia = null) => {
    vistaActiva.value = vista;
    if (noticia) {
        noticiaSeleccionada.value = noticia;
    }
};

const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    try {
        const d = new Date(fechaStr);
        if (isNaN(d.getTime())) return fechaStr;
        return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
        return fechaStr;
    }
};

const fetchNoticias = async () => {
    cargando.value = true;
    errorCarga.value = "";
    try {
        const data = await obtenerNoticias();
        if (data && data.length > 0) {
            noticias.value = data;
        } else {
            // Fallback mock data
            noticias.value = [
                { id_noticia: 1, titulo: "Inicio de inscripciones para Talleres Técnicos 2026", contenido: "Se encuentran abiertas las inscripciones para los talleres extracurriculares de robótica, programación de videojuegos y diseño 3D. Los interesados deben acercarse a preceptoría en el turno contraturno. Cupos limitados.", fecha: "2026-06-15T12:00:00Z" },
                { id_noticia: 2, titulo: "Cronograma de Exámenes de Julio 2026", contenido: "Ya se encuentra disponible en las carteleras oficiales y en este portal el cronograma detallado de las mesas examinadoras de materias previas, libres y equivalentes correspondientes al turno de Julio 2026. Recuerden inscribirse con un mínimo de 48 horas hábiles de anticipación.", fecha: "2026-06-10T08:30:00Z" },
                { id_noticia: 3, titulo: "Feria de Ciencias y Tecnología T2", contenido: "Nuestra tradicional Feria de Ciencias se llevará a cabo el próximo 12 de Julio de 09:00 a 16:00 hs. Toda la comunidad de la Escuela Técnica N° 2 está cordialmente invitada a recorrer los stands y conocer los increíbles proyectos integrados de nuestros estudiantes.", fecha: "2026-06-05T14:15:00Z" },
            ];
        }
    } catch (err) {
        console.error("Error al cargar noticias:", err);
        errorCarga.value = "No se pudieron obtener las noticias.";
    } finally {
        cargando.value = false;
    }
};

onMounted(() => {
    fetchNoticias();
});
</script>

<style scoped>
.noticias-wrapper {
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

/* Tabla de Anuncios */
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

.noticia-titulo-cell {
    display: flex;
    align-items: center;
    gap: 12px;
}

.thumb {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
}

.fallback-thumb {
    background: #f1f5f9;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
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
