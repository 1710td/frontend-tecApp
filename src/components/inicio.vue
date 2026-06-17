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
            <p>Inicio</p>
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
            <p class="user-role">Curso: <span id="roleBadge" :style="{ color: userCurso?.includes('7') ? '#d93025' : '#1e8e3e' }">{{ userCurso }}</span></p>
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
          <RouterLink to="/inicio"><li class="active"><i class="fas fa-home"></i> Inicio</li></RouterLink>
          <RouterLink to="/noticias"><li><i class="fas fa-newspaper"></i> Noticias</li></RouterLink>
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

      <main class="main-content">
        <section class="hero">
          <div class="hero-text">
            <h1>¡Bienvenido a Gestión Escolar!</h1>
            <p>
              Nos alegra tenerte aquí. Este es tu espacio para enterarte de las nuevas noticias, revisar tus horarios,
              recuperar objetos perdidos y más, de la comunidad Técnica 2.
            </p>
            <div class="red-line"></div>
          </div>
          <img src="/escuelita.png" />
        </section>

        <section class="info-box">
          <div class="info-left">
            <div class="icon-circle">
              <i class="fa-solid fa-shield-heart"></i>
            </div>
            <div>
              <h3>Estamos aquí para ayudarte</h3>
              <p>Usa las herramientas del menú para explorar categorías. Ante cualquier duda consultale a Pixelina.</p>
            </div>
          </div>
          <button class="btn btn-primary">Consultar ahora</button>
        </section>

        <section class="cards">
          <div class="card">
            <div class="card-icon orange">
              <img src="/cajita2.png" alt="Objetos" />
            </div>
            <h3>Encuentra objetos</h3>
            <p>Navega por las categorías y descubre lo que has perdido.</p>
            <RouterLink to="/objetos-perdidos" style="text-decoration: none">
              <button class="btn-red">Ver objetos →</button>
            </RouterLink>
          </div>

          <div class="card">
            <div class="card-icon blue">
              🔔
            </div>
            <h3>Mantente informado</h3>
            <p>Consulta las últimas noticias y avisos importantes.</p>
            <RouterLink to="/noticias" style="text-decoration: none">
              <button class="btn-blue">Ver noticias →</button>
            </RouterLink>
          </div>

          <div class="card">
            <div class="card-icon green">
              📖
            </div>
            <h3>Recursos y aprendizaje</h3>
            <p>Accede a materiales y recursos disponibles para ti.</p>
            <RouterLink to="/biblioteca" style="text-decoration: none">
              <button class="btn-green">Ir a biblioteca →</button>
            </RouterLink>
          </div>

          <div class="card">
            <div class="card-icon purple">
              🎓
            </div>
            <h3>Tus cursos</h3>
            <p>Revisa tus cursos y accede a su información.</p>
            <RouterLink to="/cursos" style="text-decoration: none">
              <button class="btn-purple">Ver cursos →</button>
            </RouterLink>
          </div>
        </section>

        <section class="footer-box">
          <div class="footer-left">
            <i class="fa-solid fa-hand-holding-heart"></i>
            <div>
              <h3>Gracias por ser parte de nuestra comunidad</h3>
              <p>Tu colaboración ayuda a mantener nuestra escuela unida y organizada.</p>
            </div>
          </div>
          <div class="footer-text">¡Juntos hacemos la T2!</div>
        </section>
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
  // Verificar sesión
  const sesionActiva = localStorage.getItem('sesionActiva')
  if (sesionActiva !== 'true') {
    router.push('/')
    return
  }

  // Cargar datos del perfil
  userName.value = localStorage.getItem('userName') || 'Usuario'
  userDni.value = localStorage.getItem('userDni') || 'Sin documento'
  userCurso.value = localStorage.getItem('userCurso') || 'Sin curso'
})

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
  
  // Cerrar al hacer clic fuera
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

/* RESET Y CONFIGURACIÓN GLOBAL */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

/* MAIN CONTENT */
.main-content {
    flex: 1;
    padding: 35px;
    min-height: 900px;
    overflow-y: auto;
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

/* HERO */
.hero {
    background: #fafafa;
    border-radius: 25px;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.hero-text h1 {
    font-size: 48px;
    color: #1e2430;
    margin-bottom: 20px;
}

.hero-text p {
    color: #666;
    width: 620px;
    font-size: 19px;
    line-height: 1.6;
}

.red-line {
    width: 80px;
    height: 4px;
    background: #d84444;
    margin-top: 25px;
    border-radius: 10px;
}

.hero img {
    width: 380px;
}

/* INFO BOX */
.info-box {
    margin-top: 30px;
    background: #fff3f3;
    border: 1px solid #ffdede;
    border-radius: 20px;
    padding: 22px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.icon-circle {
    width: 65px;
    height: 65px;
    background: #ffdede;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d93d54;
    font-size: 25px;
    flex-shrink: 0;
}

.info-left h3 {
    font-size: 22px;
    margin-bottom: 5px;
}

.info-left p {
    color: #666;
    font-size: 15px;
}

.btn {
    padding: 14px 26px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: 0.3s;
}

.btn-primary {
    background: white;
    border: 2px solid #ff8f8f;
    color: #d84848;
}

.btn-primary:hover {
    transform: scale(1.03);
}

/* CARDS */
.cards {
    margin-top: 35px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
}

.card {
    background: white;
    border-radius: 18px;
    padding: 28px 18px;
    text-align: center;
    border: 1px solid #efefef;
    box-shadow: none;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 320px;
}

.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.05);
}

.card-icon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    margin-bottom: 18px;
    overflow: hidden;
}

.card-icon img {
    max-width: 55px;
    max-height: 55px;
    width: auto;
    height: auto;
}

.orange {
    background: #ffe9d6;
    color: #f2994a;
}

.blue {
    background: #e7efff;
    color: #4f7cff;
}

.green {
    background: #ebf8df;
    color: #74b93f;
}

.purple {
    background: #f0e3ff;
    color: #9b51e0;
}

.card h3 {
    font-size: 20px;
    margin-bottom: 8px;
    color: #1f2632;
}

.card p {
    color: #777;
    line-height: 1.4;
    font-size: 14px;
    margin-bottom: 18px;
    min-height: 60px;
}

.card button {
    background: white;
    border-radius: 10px;
    padding: 10px 18px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: 0.2s;
}

.card button:hover {
    transform: scale(1.05);
}

.btn-red {
    border: 2px solid #ffb8b8;
    color: #e25d5d;
}

.btn-blue {
    border: 2px solid #b7d1ff;
    color: #4f7cff;
}

.btn-green {
    border: 2px solid #b8e59f;
    color: #74b93f;
}

.btn-purple {
    border: 2px solid #d5bbff;
    color: #9b51e0;
}

/* FOOTER */
.footer-box {
    margin-top: 35px;
    background: #fff4f4;
    border-radius: 20px;
    padding: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.footer-left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.footer-left i {
    font-size: 42px;
    color: #e14b5a;
}

.footer-left h3 {
    font-size: 24px;
    margin-bottom: 8px;
}

.footer-left p {
    color: #666;
}

.footer-text {
    font-size: 34px;
    color: #e05667;
    font-family: cursive;
}

/* RESPONSIVE */
@media(max-width: 1200px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media(max-width: 900px) {
    .sidebar {
        display: none;
    }
    .main-content {
        width: 100%;
    }
    .hero {
        flex-direction: column;
        gap: 30px;
        text-align: center;
    }
    .hero-text p {
        width: 100%;
    }
    .red-line {
        margin: auto;
        margin-top: 20px;
    }
}

@media(max-width: 700px) {
    .cards {
        grid-template-columns: 1fr;
    }
    .hero-text h1 {
        font-size: 34px;
    }
}
</style>