<template>
  <div class="vista-noticias">
    <nav class="navbar">
      <div class="nav-izquierda">
        <div class="logo">
          <div>
            <img src="../assets/logoEscuela.png" alt="Logo" width="60" height="60">
          </div>
          <div class="logo-titulo">
            <h2>GESTIÓN ESCOLAR</h2>
            <p>Objetos Perdidos</p>
          </div>
        </div>
      </div>
   
      <div class="profile-container" ref="profileContainer">
        <button class="profile-trigger" @click.stop="toggleProfileMenu">
          <img src="https://ui-avatars.com/api/?name=Usuario+Escuela&background=0D8ABC&color=fff" alt="User">
        </button>

        <div class="profile-menu" :class="{ 'active': profileMenuActivo }">
          <div class="menu-header">
            <img src="https://ui-avatars.com/api/?name=Usuario+Escuela&background=0D8ABC&color=fff" class="large-avatar">
            <p class="user-name">Juan Pérez</p>
            <p class="user-email">juan.perez@escuela.edu</p>
          </div>
          <hr>
          <div class="menu-body">
            <p class="user-role">Curso: <span id="roleBadge">Profesor</span></p>
            <a href="#" class="menu-item"><i class="fas fa-user-cog"></i> Mi Perfil</a>
            <a href="#" class="menu-item"><i class="fas fa-book"></i> Mis Cursos</a>
          </div>
          <hr>
          <button class="sign-out-btn">Cerrar Sesión</button>
        </div>
      </div>      
    </nav>

    <div class="container">
      <aside class="sidebar">
        <ul>
          <RouterLink to="/inicio"><li><i class="fas fa-home"></i> Inicio</li></RouterLink>
          <RouterLink to="/noticias"><li class="active"><i class="fas fa-newspaper"></i> Noticias</li></RouterLink>
          <RouterLink to="/biblioteca"><li><i class="fas fa-book"></i> Biblioteca</li></RouterLink>
          <RouterLink to="/objetos-perdidos"><li><i class="fas fa-box"></i> Objetos Perdidos</li></RouterLink>
          <RouterLink to="/cursos"><li><i class="fas fa-graduation-cap"></i> Cursos</li></RouterLink>
        </ul>

        <div class="sidebar-footer-help">
          <i class="far fa-question-circle"></i>
          <div>
            <h5>¿Necesitas ayuda?</h5>
            <p>Pixelina resolvera tu consulta.</p>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <div class="news-layout">
          <div class="news-left-section">
            <div class="news-header-box">
              <div class="news-header-icon">
                <img src="../assets/noticias-header.png" alt="Noticias">
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

            <div class="crear-noticia">
              <h3>Nueva publicación</h3>
              <input type="text" v-model="nuevaNoticia.titulo" placeholder="Título">
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
                  <span class="badge" :class="'badge-' + noticia.categoria.toLowerCase()">
                    {{ noticia.categoria }}
                  </span>
                  <h3 class="news-card-title">{{ noticia.titulo }}</h3>
                  <p class="news-card-description">{{ noticia.descripcion }}</p>
                  <div class="news-card-meta">
                    <span><i class="far fa-calendar"></i> {{ formatearFecha(noticia.fecha) }}</span>
                    <span>•</span>
                    <span><i class="fas fa-user"></i> Publicado por: {{ noticia.autor }}</span>
                  </div>
                  <div style="margin-top:10px;">
                    <button class="loan-btn" @click="editarNoticia(noticia)">Editar</button>
                    <button class="loan-btn btn-delete" style="background-color: #dc2626; margin-left: 5px;" @click="eliminarNoticia(noticia)">Eliminar</button>
                  </div>
                </div>
                <div class="news-card-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </article>
            </div>
            
            <div class="pagination-container" v-if="totalPaginas > 1">
              <div>Mostrando página {{ paginaActual }} de {{ totalPaginas }}</div>
              <ul class="pagination-list">
                <li class="pagination-item" @click="cambiarPagina(paginaActual - 1)"><i class="fas fa-chevron-left"></i></li>
                <li 
                  v-for="p in totalPaginas" 
                  :key="p"
                  class="pagination-item"
                  :class="{ active: paginaActual === p }"
                  @click="cambiarPagina(p)"
                >
                  {{ p }}
                </li>
                <li class="pagination-item" @click="cambiarPagina(paginaActual + 1)"><i class="fas fa-chevron-right"></i></li>
              </ul>
            </div>
          </div>

          <div class="news-right-section">
            <div class="promo-banner">
              <img src="../assets/banner.jpg" alt="Banner Noticias">
            </div>
            
            <div class="sidebar-widget">
              <div class="widget-header">
                <div class="widget-title text-anuncios">
                  <i class="fas fa-bullhorn"></i> Anuncios importantes
                </div>
                <a href="#" class="widget-link">Ver todos</a>
              </div>
              <div class="widget-list">
                <div v-for="(anuncio, i) in anunciosWidget" :key="i" class="widget-item">
                  <div class="widget-icon-box" style="background-color: #fbb7b7; color: #b10d0d;">
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
                <div class="widget-title text-eventos">
                  <i class="far fa-calendar-alt"></i> Próximos eventos
                </div>
                <a href="#" class="widget-link">Ver todos</a>
              </div>
              <div class="widget-list">
                <div class="event-calendar-item">
                  <div class="calendar-box">
                    <div class="calendar-month" style="background-color: #3b82f6;">JUL</div>
                    <div class="calendar-day">16</div>
                  </div>
                  <div class="widget-item-info">
                    <h4>Receso Invernal 2026</h4>
                    <p>Vacaciones de Invierno<br>Descanso</p>
                  </div>
                </div>
                <div v-for="(evento, i) in eventosWidget" :key="i" class="event-calendar-item">
                  <div class="calendar-box">
                    <div class="calendar-month" style="background-color: #22c55e;">{{ obtenerMes(evento.fecha) }}</div>
                    <div class="calendar-day">{{ obtenerDia(evento.fecha) }}</div>
                  </div>
                  <div class="widget-item-info">
                    <h4>{{ evento.titulo }}</h4>
                    <p>{{ evento.descripcion.substring(0, 40) }}...</p>
                  </div>
                </div>
              </div>
              <button class="btn-widget-action" @click="abrirModalEventos">
                Ver todos los eventos
                <i class="fas fa-chevron-right" style="font-size: 0.75rem;"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div class="modal" :style="{ display: modalEventosAbierto ? 'block' : 'none' }">
      <div class="modal-content">
        <span class="cerrar-modal" @click="cerrarModal">&times;</span>
        <h2>📅 Próximos Eventos</h2>
        <div>
          <div v-for="(evt, i) in todosLosEventos" :key="i" class="evento-modal">
            <h4>{{ evt.titulo }} ({{ formatearFecha(evt.fecha) }})</h4>
            <p>{{ evt.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const profileMenuActivo = ref(false)
const modalEventosAbierto = ref(false)
const filtroCategoria = ref('Todas')
const ordenarPor = ref('recientes')
const paginaActual = ref(1)
const noticiasPorPagina = 3

const categoriasFiltro = ['Todas', 'Anuncios', 'Eventos', 'Comunicados', 'Logros', 'Recordatorios']

const nuevaNoticia = ref({
  titulo: '',
  descripcion: '',
  categoria: 'Anuncios'
})

const noticias = ref([
  {
    titulo: 'FAMILIAS, FECHAS IMPORTANTES',
    descripcion: '📍 2° PERIODO DE INTENSIFICACIÓN DEL AÑO: desde el 29/06 al 10/07. Periodo donde alumnos que tienen temas pendientes del cuatrimestre y los alumnos que tienen materias pendientes de años anteriores (*estudiar y repasar* los temas que han hablado con los profesores).',
    categoria: 'Anuncios',
    autor: 'Equipo Directivo',
    fecha: new Date('2026-05-24T10:00:00')
  }
])

const toggleProfileMenu = () => {
  profileMenuActivo.value = !profileMenuActivo.value
}

const cerrarMenuClickAfuera = (e) => {
  if (profileMenuActivo.value) {
    profileMenuActivo.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', cerrarMenuClickAfuera)
})

onUnmounted(() => {
  document.removeEventListener('click', cerrarMenuClickAfuera)
})

const crearNoticia = () => {
  if (!nuevaNoticia.value.titulo.trim() || !nuevaNoticia.value.descripcion.trim()) {
    alert('Complete todos los campos')
    return
  }

  noticias.value.unshift({
    titulo: nuevaNoticia.value.titulo.trim(),
    descripcion: nuevaNoticia.value.descripcion.trim(),
    categoria: nuevaNoticia.value.categoria,
    autor: 'Juan Pérez',
    fecha: new Date()
  })

  nuevaNoticia.value.titulo = ''
  nuevaNoticia.value.descripcion = ''
  nuevaNoticia.value.categoria = 'Anuncios'
  paginaActual.value = 1
}

const eliminarNoticia = (noticia) => {
  const index = noticias.value.indexOf(noticia)
  if (index !== -1) {
    noticias.value.splice(index, 1)
  }
}

const editarNoticia = (noticia) => {
  const nuevoTitulo = prompt('Nuevo título', noticia.titulo)
  const nuevaDesc = prompt('Nueva descripción', noticia.descripcion)
  if (nuevoTitulo !== null) noticia.titulo = nuevoTitulo
  if (nuevaDesc !== null) noticia.descripcion = nuevaDesc
}

 const noticiasFiltradasYOrdenadas = computed(() => {
  let resultado = [...noticias.value]
  if (filtroCategoria.value !== 'Todas') {
    resultado = resultado.filter(n => n.categoria === filtroCategoria.value)
  }
  if (ordenarPor.value === 'recientes') {
    resultado.sort((a, b) => b.fecha - a.fecha)
  } else {
    resultado.sort((a, b) => a.fecha - b.fecha)
  }
  return resultado
})

const noticiasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * noticiasPorPagina
  const fin = inicio + noticiasPorPagina
  return noticiasFiltradasYOrdenadas.value.slice(inicio, fin)
})

const totalPaginas = computed(() => {
  return Math.ceil(noticiasFiltradasYOrdenadas.value.length / noticiasPorPagina)
})

const cambiarFiltro = (cat) => {
  filtroCategoria.value = cat
  paginaActual.value = 1
}

const cambiarPagina = (p) => {
  if (p >= 1 && p <= totalPaginas.value) {
    paginaActual.value = p
  }
}

const anunciosWidget = computed(() => {
  return noticias.value.filter(n => n.categoria === 'Anuncios')
})

const eventosWidget = computed(() => {
  return noticias.value.filter(n => n.categoria === 'Eventos')
})

const todosLosEventos = computed(() => {
  return noticias.value.filter(n => n.categoria === 'Eventos')
})

const abrirModalEventos = () => {
  modalEventosAbierto.value = true
}

const cerrarModal = () => {
  modalEventosAbierto.value = false
}

const formatearFecha = (fecha) => {
  return fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const obtenerMes = (fecha) => {
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
  return meses[fecha.getMonth()]
}

const obtenerDia = (fecha) => {
  return fecha.getDate()
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.vista-noticias {
  font-family: Arial, sans-serif;
  background-image: url("../assets/fondo (1).jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 1.5%;
  background-color: #ffffff;
  border-bottom: 5px solid #ffffff;
  box-shadow: 0 6px 12px rgba(0,0,0,0.10);
}
.nav-izquierda, .nav-derecha {
  display: flex;
  align-items: center;
  gap: 15px;
}
.profile-container {
  position: relative;
  display: flex;
  align-items: center;
}
.profile-trigger {
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  transition: 0.3s;
}
.profile-trigger:hover { border-color: #ddd; }
.profile-trigger img {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: block;
}
.profile-menu {
  display: none;
  position: absolute;
  right: 0;
  top: 55px;
  width: 280px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  padding: 20px;
  z-index: 1000;
}
.profile-menu.active { display: block; }
.menu-header { text-align: center; padding-bottom: 10px; }
.large-avatar {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.user-name { font-weight: 600; font-size: 1.1em; }
.user-email { color: #5f6368; font-size: 0.85em; }
hr { border: 0; border-top: 1px solid #eee; margin: 15px 0; }
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  text-decoration: none;
  color: #3c4043;
  border-radius: 8px;
  transition: 0.2s;
}
.menu-item:hover { background: #f8f9fa; }
.sign-out-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid #dadce0;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
}
.sign-out-btn:hover {
  background: #fdf2f2;
  border-color: #d93025;
  color: #d93025;
}
.container {
  display: flex;
  min-height: calc(100vh - 70px);
}
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #ca0d0d, #420101);
  color: white;
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar ul { list-style: none; }
.sidebar li {
  padding: 14px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.sidebar li:hover, .sidebar li.active {
  background: rgba(255, 255, 255, 0.2);
}
.sidebar a {
  text-decoration: none;
  color: inherit;
  display: block;
}
.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  overflow-x: hidden;
}
.logo {
  display: flex;
  align-items: center;      
  gap: 15px;              
  margin: 5px;
}
.logo-titulo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.logo h2, .logo p {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.logo p { color: gray; }
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
  position: relative;
}
.news-header-icon {
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
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
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  background: #fff;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
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
.filter-btn:hover:not(.active) {
  background: #f1f5f9;
}
.sort-select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  color: #64748b;
  outline: none;
  background-color: #fff;
  font-size: 0.9rem;
}
.sort-select:focus {
  background: #fef2f2;
  border: 1px solid #ef4444;
  color: #ef4444;
  font-weight: 600;
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #f1f5f9;
  justify-content: space-between;
}
.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
}
.news-card-content {
  flex: 1;
}
.news-card-arrow {
  color: #ef4444;
  font-size: 22px;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.news-card-arrow:hover {
  transform: translateX(5px);
}
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}
.badge-anuncios { background: #fee2e2; color: #dc2626; }
.badge-eventos { background: #dbeafe; color: #2563eb; }
.badge-comunicados { background: #dcfce7; color: #16a34a; }
.badge-logros { background: #fef3c7; color: #d97706; }
.badge-recordatorios { background: #f3e8ff; color: #9333ea; }
.news-card-title {
  font-size: 1.05rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 6px;
}
.news-card-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 10px;
}
.news-card-meta {
  display: flex;
  gap: 15px;
  color: #94a3b8;
  font-size: 0.8rem;
}
.news-card-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.news-line {  
  width: 45px;
  height: 3px;
  background: #ef4444;
  border-radius: 10px;
  margin-top: 12px;
}
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding: 0 10px;
  color: #64748b;
  font-size: 0.9rem;
}
.pagination-list {
  display: flex;
  list-style: none;
  gap: 5px;
  align-items: center;
}
.pagination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}
.pagination-item.active {
  border: 1px solid #ef4444;
  color: #ef4444;
  font-weight: bold;
  background: #fff;
}
.pagination-item:hover:not(.active) {
  background: #e2e8f0;
}
.promo-banner {
  background: none;
  border: none;
  padding: 0;
  border-radius: 0;
  overflow: hidden;
}
.promo-banner img {
  width: 100%;
  display: block;
  border-radius: 16px;
}
.sidebar-widget {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  border: 1px solid #f1f5f9;
}
.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.widget-title {
  font-size: 0.95rem;
  color: #1e293b;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}
.widget-title i { font-size: 1.1rem; }
.widget-title.text-anuncios i { color: #ef4444; }
.widget-title.text-eventos i { color: #22c55e; }
.widget-link {
  font-size: 0.8rem;
  color: #ef4444;
  text-decoration: none;
  font-weight: 600;
}
.widget-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.widget-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.widget-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.95rem;
}
.widget-item-info h4 {
  font-size: 0.85rem;
  color: #334155;
  font-weight: 600;
  margin-bottom: 2px;
}
.widget-item-info p {
  font-size: 0.78rem;
  color: #94a3b8;
}
.event-calendar-item {
  display: flex;
  gap: 15px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px dashed #f1f5f9;
}
.event-calendar-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
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
  color: #fff;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 2px 0;
  text-transform: uppercase;
}
.calendar-day {
  font-size: 1.1rem;
  font-weight: 700;
  color: #334155;
  padding: 4px 0;
}
.btn-widget-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  padding: 10px;
  border-radius: 10px;
  margin-top: 15px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.2s;
}
.btn-widget-action:hover { background: #dcfce7; }
.sidebar-footer-help {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-top: auto;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.sidebar-footer-help i { font-size: 1.2rem; }
.sidebar-footer-help div h5 { font-size: 0.85rem; margin-bottom: 4px; }
.sidebar-footer-help div p { font-size: 0.75rem; color: #fca5a5; line-height: 1.3; }
.crear-noticia {
  background: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,.04);
}
.crear-noticia input, .crear-noticia textarea, .crear-noticia select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.crear-noticia textarea { resize: vertical; min-height: 100px; }
.crear-noticia button {
  background: #ca0d0d;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}
.loan-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
  font-size: 14px;
  font-weight: 600;
}
.loan-btn:hover { background: #c62828; }
.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.45);
}
.modal-content {
  background: #fff;
  width: 60%;
  max-width: 700px;
  margin: 60px auto;
  border-radius: 15px;
  padding: 25px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-content h2 { margin-bottom: 30px; color: #1e293b; }
.cerrar-modal {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 30px;
  cursor: pointer;
  color: #ca0d0d;
}
.cerrar-modal:hover { color: #7a0000; }
.evento-modal {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
.evento-modal:last-child { border-bottom: none; }
.evento-modal h4 { color: #ca0d0d; margin-bottom: 5px; }
.evento-modal p { color: #555; }
</style>