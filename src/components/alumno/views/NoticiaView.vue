<template>
  <main class="main-content">
    <div class="news-layout">
      <div class="news-left-section">
        <div class="news-header-box">
          <div class="news-header-icon">
            <img src="/noticias-header.png" alt="Noticias" />
          </div>
          <div class="news-header-text">
            <h1>Noticias</h1>
            <p>Mantente informado sobre lo que sucede en la Técnica 2</p>
            <div class="news-line"></div>
          </div>
        </div>

        <div class="filter-bar">
          <div class="filter-tabs">
            <button
              v-for="cat in categoriasFiltro"
              :key="cat"
              class="filter-btn"
              :class="{ active: filtroCategoria === cat }"
              @click="cambiarFiltro(cat)"
            >
              {{ cat }}
            </button>
          </div>
          <select class="sort-select" v-model="ordenarPor">
            <option value="recientes">Más recientes</option>
            <option value="antiguos">Más antiguos</option>
          </select>
        </div>

        <div class="crear-noticia" v-if="puedeCrear">
          <h3>Nueva publicación</h3>
          <input type="text" v-model="nuevaNoticia.titulo" placeholder="Título" />
          <textarea v-model="nuevaNoticia.descripcion" placeholder="Escriba la noticia"></textarea>
          <select v-model="nuevaNoticia.categoria">
            <option value="Anuncios">Anuncios</option>
            <option value="Eventos">Eventos</option>
            <option value="Comunicados">Comunicados</option>
            <option value="Logros">Logros</option>
            <option value="Recordatorios">Recordatorios</option>
          </select>
          <button @click="crearNoticia">Publicar</button>
        </div>

        <div class="news-list">
          <article v-for="(noticia, index) in noticiasPaginadas" :key="index" class="news-card">
            <div class="news-card-content">
              <span class="badge" :class="'badge-' + noticia.categoria.toLowerCase()">{{ noticia.categoria }}</span>
              <h3 class="news-card-title">
                {{ noticia.titulo }}
              </h3>
              <p class="news-card-description">
                {{ noticia.descripcion }}
              </p>
              <div class="news-card-meta">
                <span><i class="far fa-calendar"></i> {{ formatearFecha(noticia.fecha) }}</span>
                <span>•</span>
                <span><i class="fas fa-user"></i> Publicado por: {{ noticia.autor }}</span>
              </div>
              <div class="card-actions" v-if="puedeCrear">
                <button class="loan-btn" @click="editarNoticia(noticia)"><i class="fas fa-pencil-alt"></i> Editar</button>
                <button class="loan-btn btn-delete" @click="eliminarNoticia(noticia)"><i class="fas fa-trash"></i> Eliminar</button>
              </div>
            </div>
            <div class="news-card-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </article>
        </div>

        <div class="pagination-container" v-if="totalPaginas > 1">
          <div>
            Mostrando página {{ paginaActual }} de
            {{ totalPaginas }}
          </div>
          <ul class="pagination-list">
            <li class="pagination-item" @click="cambiarPagina(paginaActual - 1)">
              <i class="fas fa-chevron-left"></i>
            </li>
            <li
              v-for="p in totalPaginas"
              :key="p"
              class="pagination-item"
              :class="{ active: paginaActual === p }"
              @click="cambiarPagina(p)"
            >
              {{ p }}
            </li>
            <li class="pagination-item" @click="cambiarPagina(paginaActual + 1)">
              <i class="fas fa-chevron-right"></i>
            </li>
          </ul>
        </div>
      </div>

      <div class="news-right-section">
        <div class="promo-banner">
          <img src="/fondo.jpg" alt="Banner Noticias" />
        </div>

        <div class="sidebar-widget">
          <div class="widget-header">
            <div class="widget-title text-anuncios"><i class="fas fa-bullhorn"></i> Anuncios importantes</div>
            <a href="#" class="widget-link">Ver todos</a>
          </div>
          <div class="widget-list">
            <div v-for="(anuncio, i) in anunciosWidget" :key="i" class="widget-item">
              <div class="widget-icon-box widget-icon-red">
                <i class="fas fa-user-edit"></i>
              </div>
              <div class="widget-item-info">
                <h4>{{ anuncio.titulo }}</h4>
                <p>{{ anuncio.descripcion.substring(0, 40) }}...</p>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-widget">
          <div class="widget-header">
            <div class="widget-title text-eventos"><i class="far fa-calendar-alt"></i> Próximos eventos</div>
            <a href="#" class="widget-link">Ver todos</a>
          </div>
          <div class="widget-list">
            <div v-for="(evento, i) in eventosWidget" :key="i" class="event-calendar-item">
              <div class="calendar-box">
                <div class="calendar-month">
                  {{ obtenerMes(evento.fecha) }}
                </div>
                <div class="calendar-day">
                  {{ obtenerDia(evento.fecha) }}
                </div>
              </div>
              <div class="widget-item-info">
                <h4>{{ evento.titulo }}</h4>
                <p>{{ evento.descripcion.substring(0, 40) }}...</p>
              </div>
            </div>
          </div>
          <button class="btn-widget-action" @click="modalEventosAbierto = true">
            Ver todos los eventos
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="modal" v-if="modalEventosAbierto">
      <div class="modal-content">
        <span class="cerrar-modal" @click="modalEventosAbierto = false">&times;</span>
        <h2>📅 Próximos Eventos</h2>
        <div v-for="(evt, i) in todosLosEventos" :key="i" class="evento-modal">
          <h4>{{ evt.titulo }} ({{ formatearFecha(evt.fecha) }})</h4>
          <p>{{ evt.descripcion }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { obtenerNoticias, crearNoticia as crearNoticiaApi, eliminarNoticia as eliminarNoticiaApi } from "@/services/comunidad-service.js";

const authStore = useAuthStore();
// Permitir crear noticias si es root, podes ajustarlo según tu backend
const puedeCrear = computed(() => ["root", "profesor"].includes(authStore.rol));

const modalEventosAbierto = ref(false);
const filtroCategoria = ref("Todas");
const ordenarPor = ref("recientes");
const paginaActual = ref(1);
const noticiasPorPagina = 3;

const categoriasFiltro = ["Todas", "Anuncios", "Eventos", "Comunicados", "Logros", "Recordatorios"];

const nuevaNoticia = ref({
  titulo: "",
  descripcion: "",
  categoria: "Anuncios",
});

const noticias = ref([]);

const cargarNoticias = async () => {
  try {
    const data = await obtenerNoticias();
    if (data && data.length > 0) {
      noticias.value = data.map((n) => ({
        id: n.id_noticia,
        titulo: n.titulo,
        descripcion: n.contenido,
        categoria: n.categoria || "Anuncios",
        autor: n.autor || "Equipo Directivo",
        fecha: new Date(n.fecha),
      }));
    } else {
      noticias.value = noticiasEstaticas;
    }
  } catch (error) {
    console.error("Error al cargar noticias:", error);
    noticias.value = noticiasEstaticas;
  }
};

const noticiasEstaticas = [
  {
    titulo: "FAMILIAS, FECHAS IMPORTANTES",
    descripcion: "📍 2° PERIODO DE INTENSIFICACIÓN...",
    categoria: "Anuncios",
    autor: "Equipo Directivo",
    fecha: new Date("2026-05-24T10:00:00"),
  },
];

onMounted(cargarNoticias);

const crearNoticia = async () => {
  if (!nuevaNoticia.value.titulo.trim() || !nuevaNoticia.value.descripcion.trim()) return alert("Complete todos los campos");

  try {
    const payload = {
      titulo: nuevaNoticia.value.titulo.trim(),
      contenido: nuevaNoticia.value.descripcion.trim(),
      autor_id: authStore.usuario?.id || 1,
      categoria: nuevaNoticia.value.categoria,
    };
    await crearNoticiaApi(payload);
    nuevaNoticia.value = { titulo: "", descripcion: "", categoria: "Anuncios" };
    paginaActual.value = 1;
    await cargarNoticias();
  } catch (error) {
    alert("Error al publicar la noticia en el servidor.");
  }
};

const eliminarNoticia = async (noticia) => {
  if (confirm("¿Estás seguro de eliminar esta noticia?")) {
    try {
      await eliminarNoticiaApi(noticia.id);
      await cargarNoticias();
    } catch (error) {
      alert("Error al eliminar la noticia en el servidor.");
    }
  }
};

const editarNoticia = (noticia) => {
  const nuevoTitulo = prompt("Nuevo título", noticia.titulo);
  const nuevaDesc = prompt("Nueva descripción", noticia.descripcion);
  if (nuevoTitulo) noticia.titulo = nuevoTitulo;
  if (nuevaDesc) noticia.descripcion = nuevaDesc;
};

const noticiasFiltradasYOrdenadas = computed(() => {
  let resultado =
    filtroCategoria.value !== "Todas" ? noticias.value.filter((n) => n.categoria === filtroCategoria.value) : [...noticias.value];
  return resultado.sort((a, b) => (ordenarPor.value === "recientes" ? b.fecha - a.fecha : a.fecha - b.fecha));
});

const noticiasPaginadas = computed(() =>
  noticiasFiltradasYOrdenadas.value.slice((paginaActual.value - 1) * noticiasPorPagina, paginaActual.value * noticiasPorPagina),
);
const totalPaginas = computed(() => Math.ceil(noticiasFiltradasYOrdenadas.value.length / noticiasPorPagina));

const cambiarFiltro = (cat) => {
  filtroCategoria.value = cat;
  paginaActual.value = 1;
};
const cambiarPagina = (p) => {
  if (p >= 1 && p <= totalPaginas.value) paginaActual.value = p;
};

const anunciosWidget = computed(() => noticias.value.filter((n) => n.categoria === "Anuncios"));
const eventosWidget = computed(() => noticias.value.filter((n) => n.categoria === "Eventos"));
const todosLosEventos = computed(() => eventosWidget.value);

const formatearFecha = (fecha) =>
  fecha.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
const obtenerMes = (fecha) => ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"][fecha.getMonth()];
const obtenerDia = (fecha) => fecha.getDate();
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 28px 32px;
  background: var(--color-bg, #f5f6fa);
}

.news-layout {
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.news-left-section {
  flex: 1;
  min-width: 0;
}

.news-right-section {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-header-box {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.news-header-icon img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.news-header-text h1 {
  font-size: 1.6rem;
  color: #1e293b;
  margin-bottom: 4px;
}

.news-header-text p {
  color: #64748b;
  font-size: 0.95rem;
}

.news-line {
  width: 45px;
  height: 3px;
  background: #ef4444;
  border-radius: 10px;
  margin-top: 12px;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  background: #fff;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #64748b;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #ef4444;
  font-weight: 600;
}

.sort-select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  outline: none;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 300px;
}

.news-card {
  display: flex;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  align-items: center;
  gap: 20px;
  border: 1px solid #f1f5f9;
  transition: transform 0.2s;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.news-card-content {
  flex: 1;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.badge-anuncios {
  background: #fee2e2;
  color: #dc2626;
}

.badge-eventos {
  background: #dbeafe;
  color: #2563eb;
}

.badge-comunicados {
  background: #dcfce7;
  color: #16a34a;
}

.badge-logros {
  background: #fef3c7;
  color: #d97706;
}

.badge-recordatorios {
  background: #f3e8ff;
  color: #9333ea;
}

.news-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.news-card-description {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.news-card-meta {
  display: flex;
  gap: 15px;
  color: #94a3b8;
  font-size: 0.8rem;
}

.crear-noticia {
  background: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.crear-noticia input,
.crear-noticia textarea,
.crear-noticia select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.crear-noticia button,
.loan-btn {
  background: #ca0d0d;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
}

.crear-noticia button:hover,
.loan-btn:hover {
  background: #a80b0b;
}

.sidebar-widget {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.widget-title {
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.text-anuncios {
  color: #b10d0d;
}

.text-eventos {
  color: #16a34a;
}

.widget-link {
  font-size: 0.8rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.widget-link:hover {
  color: #ca0d0d;
}

.widget-item-info h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e2430;
  margin-bottom: 2px;
}

.widget-item-info p {
  font-size: 0.78rem;
  color: #94a3b8;
  margin: 0;
}

.widget-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 10px;
}

.widget-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
}

.widget-icon-red {
  background-color: #fbb7b7;
  color: #b10d0d;
}

.event-calendar-item {
  display: flex;
  gap: 15px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px dashed #f1f5f9;
  margin-bottom: 10px;
}

.calendar-box {
  width: 45px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
}

.calendar-month {
  background-color: #22c55e;
  color: #fff;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 2px 0;
}

.calendar-day {
  font-size: 1.1rem;
  font-weight: 700;
  padding: 4px 0;
  color: #1e2430;
}

.btn-widget-action {
  width: 100%;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-widget-action:hover {
  background: #dcfce7;
}

.card-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.promo-banner img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  color: #64748b;
  font-size: 0.9rem;
}

.pagination-list {
  display: flex;
  list-style: none;
  gap: 5px;
  padding: 0;
}

.pagination-item {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.pagination-item:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.pagination-item.active {
  border-color: #ef4444;
  color: #ef4444;
  font-weight: bold;
}

.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}

.modal-content {
  background: #fff;
  width: 60%;
  max-width: 700px;
  border-radius: 20px;
  padding: 28px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}

.cerrar-modal {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 28px;
  cursor: pointer;
  color: #ca0d0d;
  line-height: 1;
  transition: transform 0.2s;
}

.cerrar-modal:hover {
  transform: scale(1.15);
}

.evento-modal {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.evento-modal h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e2430;
  margin-bottom: 4px;
}

.evento-modal p {
  color: #64748b;
  font-size: 0.88rem;
}
</style>
