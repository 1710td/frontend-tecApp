<template>
  <div>
    <nav class="navbar">
      <div class="nav-izquierda">
        <div class="logo">
          <div>
            <img src="/logoEscuela.png" width="60" height="60" />
          </div>
          <div class="logo-titulo">
            <h2>GESTIÓN ESCOLAR</h2>
            <p>Noticias</p>
          </div>
        </div>
      </div>

      <div class="profile-container">
        <button class="profile-trigger" @click="toggleMenu">
          <img :src="avatarUrl" alt="User" />
        </button>

        <div class="profile-menu" :class="{ active: menuAbierto }">
          <div class="menu-header">
            <img :src="avatarUrl" class="large-avatar" />
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">DNI: {{ userDni }}</p>
          </div>
          <hr />
          <div class="menu-body">
            <p class="user-role">Curso: <span :style="{ color: userCurso?.includes('7') ? '#d93025' : '#1e8e3e' }">{{ userCurso }}</span></p>
            <a href="#" class="menu-item"><i class="fas fa-user-cog"></i> Mi Perfil</a>
            <a href="#" class="menu-item"><i class="fas fa-book"></i> Mis Cursos</a>
          </div>
          <hr />
          <button class="sign-out-btn" @click="cerrarSesion">Cerrar Sesión</button>
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
        <div class="sidebar-help">
          <i class="fas fa-question-circle"></i>
          <div>
            <p class="help-title">¿Necesitás ayuda?</p>
            <p class="help-sub">Pixelina resolverá tu consulta.</p>
          </div>
        </div>
      </aside>

      <main class="content">
        <header class="page-header">
          <div class="page-header-text">
            <h1>Noticias</h1>
            <p>Panel de avisos y comunicados de la escuela</p>
          </div>
        </header>

        <div class="maintenance-container">
          <div class="maintenance-icon">
            📰
          </div>
          <h2 class="maintenance-title">Página en desarrollo</h2>
          <p class="maintenance-desc">
            Esta parte aún está siendo definida. Próximamente vas a poder ver todos los avisos y comunicados de la escuela en este lugar.
          </p>

          <div class="maintenance-cards">
            <div class="m-card">
              <h4>Preceptores</h4>
              <p>Podrán publicar avisos del día</p>
            </div>
            <div class="m-card">
              <h4>Director</h4>
              <p>Comunicados oficiales, fechas importantes y novedades institucionales.</p>
            </div>
            <div class="m-card">
              <h4>Centro de Estudiantes</h4>
              <p>Eventos, actividades, el almuerzo del día y propuestas organizadas por los alumnos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuAbierto = ref(false)

const userName = ref('')
const userDni = ref('')
const userCurso = ref('')
const avatarUrl = computed(() => {
  if (!userName.value) return ''
  const nameForApi = userName.value.split(' ').join('+')
  return `https://ui-avatars.com/api/?name=${nameForApi}&background=0D8ABC&color=fff`
})

onMounted(() => {
  const sesionActiva = localStorage.getItem('sesionActiva')
  if (sesionActiva !== 'true') {
    router.push('/')
    return
  }

  userName.value = localStorage.getItem('userName') || 'Usuario'
  userDni.value = localStorage.getItem('userDni') || 'Sin documento'
  userCurso.value = localStorage.getItem('userCurso') || 'Sin curso'
})

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
  if (menuAbierto.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

function handleClickOutside(e) {
  const profileMenu = document.querySelector('.profile-menu')
  const profileBtn = document.querySelector('.profile-trigger')
  
  if (profileMenu && !profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
    menuAbierto.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}

function cerrarSesion() {
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

/* RESET */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* NAVBAR */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 1.5%;
    background-color: #ffffff;
    border-bottom: 5px solid #ffffff;
    box-shadow: 0 6px 12px rgba(0,0,0,0.10);
}

.nav-izquierda {
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

.profile-trigger:hover {
    border-color: #ddd;
}

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

.profile-menu.active {
    display: block;
}

.menu-header {
    text-align: center;
    padding-bottom: 10px;
}

.large-avatar {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}

.user-name {
    font-weight: 600;
    font-size: 1.1em;
}

.user-email {
    color: #5f6368;
    font-size: 0.85em;
}

hr {
    border: 0;
    border-top: 1px solid #eee;
    margin: 15px 0;
}

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

.menu-item:hover {
    background: #f8f9fa;
}

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

/* LAYOUT */
.container {
    display: flex;
    min-height: calc(100vh - 70px);
}

/* LOGO */
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

.logo p {
    color: gray;
}

/* SIDEBAR */
.sidebar {
    width: 250px;
    background: linear-gradient(180deg, #ca0d0d, #420101);
    color: white;
    padding: 20px;
    flex-shrink: 0;
}

.sidebar ul {
    list-style: none;
}

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

.sidebar-help {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 12px 14px;
    margin-top: auto;
}

.sidebar-help i {
    font-size: 22px;
    color: rgba(255,255,255,0.7);
    flex-shrink: 0;
}

.help-title {
    font-size: 13px;
    font-weight: 600;
    color: white;
    margin: 0;
}

.help-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
    margin: 2px 0 0 0;
}

/* CONTENT */
.content {
    flex: 1;
    background-color: #f4f7f6;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}

/* PAGE HEADER */
.page-header {
    width: 100%;
    max-width: 1000px;
    margin-bottom: 24px;
}

.page-header h1 {
    font-size: 2rem;
    color: #2d3748;
}

.page-header p {
    color: #888;
    font-size: 14px;
    margin-top: 4px;
}

/* MAINTENANCE */
.maintenance-container {
    width: 100%;
    max-width: 860px;
    background: white;
    border-radius: 16px;
    padding: 60px 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
}

.maintenance-icon {
    width: 90px;
    height: 90px;
    background: linear-gradient(135deg, #fff0f0, #ffe0e0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4rem;
    color: #c0152a;
    margin-bottom: 8px;
}

.maintenance-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
}

.maintenance-desc {
    font-size: 15px;
    color: #888;
    max-width: 520px;
    line-height: 1.6;
}

/* CARDS */
.maintenance-cards {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
}

.m-card {
    background: #f9f9f9;
    border: 1.5px solid #eee;
    border-radius: 12px;
    padding: 24px 20px;
    flex: 1;
    min-width: 180px;
    max-width: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    transition: transform 0.2s, border-color 0.2s;
}

.m-card:hover {
    transform: translateY(-3px);
    border-color: #c0152a;
}

.m-card h4 {
    font-size: 15px;
    font-weight: 600;
    color: #2d3748;
}

.m-card p {
    font-size: 13px;
    color: #999;
    line-height: 1.5;
    text-align: center;
}

/* RESPONSIVE */
@media(max-width: 900px) {
    .sidebar {
        display: none;
    }
    .content {
        width: 100%;
    }
}

@media(max-width: 700px) {
    .maintenance-cards {
        flex-direction: column;
    }
    .m-card {
        max-width: 100%;
    }
}
</style>