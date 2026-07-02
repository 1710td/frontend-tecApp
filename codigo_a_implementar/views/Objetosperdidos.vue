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
            <p>Objetos Perdidos</p>
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
          <RouterLink to="/noticias"><li><i class="fas fa-newspaper"></i> Noticias</li></RouterLink>
          <RouterLink to="/biblioteca"><li><i class="fas fa-book"></i> Biblioteca</li></RouterLink>
          <RouterLink to="/objetos-perdidos"><li class="active"><i class="fas fa-box"></i> Objetos Perdidos</li></RouterLink>
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
        <section class="title-section">
          <div class="caja">
            <img src="/cajita2.png" alt="caja" />
          </div>
          <div>
            <h1>Objetos Perdidos</h1>
            <p>Explora las categorías para encontrar objetos perdidos.</p>
          </div>
          <img src="/cosas.png" />
        </section>
        <section class="cards">
          <div class="card red">
            <img src="/remera.png" alt="remera" />
            <div class="card-content">
              <h3>Ropa</h3>
              <p>Camperas, uniformes, bufandas...</p>
              <button>Ver objetos ></button>
            </div>
          </div>
          <div class="card yellow">
            <img src="/lapiz.png" alt="lapiz" />
            <div class="card-content">
              <h3>Útiles</h3>
              <p>Cartucheras, libros, mochilas...</p>
              <button>Ver objetos ></button>
            </div>
          </div>
          <div class="card blue">
            <img src="/celu.png" alt="celular" />
            <div class="card-content">
              <h3>Dispositivos</h3>
              <p>Calculadoras, celulares, tablets...</p>
              <button>Ver objetos ></button>
            </div>
          </div>
          <div class="card green">
            <img src="/llave.png" alt="llave" />
            <div class="card-content">
              <h3>Otros Objetos</h3>
              <p>Llaves, termos, lentes...</p>
              <button>Ver objetos ></button>
            </div>
          </div>
        </section>
        <section class="help-box">
          <div>
            <h4>¿Perdiste algo?</h4>
            <p>Revisa las categorías o acércate a preceptoría para más ayuda.</p>
          </div>
          <button class="btn-reportar">Reportar objeto perdido</button>
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


* { margin: 0; padding: 0; box-sizing: border-box; }

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 1.5%;
  background-color: #ffffff;
  border-bottom: 5px solid #ffffff;
  box-shadow: 0 6px 12px rgba(0,0,0,0.10);
}
.nav-izquierda { display: flex; align-items: center; gap: 15px; }
.logo { display: flex; align-items: center; gap: 15px; margin: 5px; }
.logo-titulo { display: flex; flex-direction: column; gap: 5px; }
.logo h2, .logo p { font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; }
.logo p { color: gray; }
.profile-container { position: relative; display: flex; align-items: center; }
.profile-trigger { border: 2px solid transparent; background: none; cursor: pointer; padding: 2px; border-radius: 50%; transition: 0.3s; }
.profile-trigger:hover { border-color: #ddd; }
.profile-trigger img { border-radius: 50%; width: 45px; height: 45px; display: block; }
.profile-menu { display: none; position: absolute; right: 0; top: 55px; width: 280px; background: white; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); padding: 20px; z-index: 1000; }
.profile-menu.active { display: block; }
.menu-header { text-align: center; padding-bottom: 10px; }
.large-avatar { border-radius: 50%; width: 70px; height: 70px; margin-bottom: 10px; }
.user-name { font-weight: 600; font-size: 1.1em; }
.user-email { color: #5f6368; font-size: 0.85em; }
hr { border: 0; border-top: 1px solid #eee; margin: 15px 0; }
.menu-item { display: flex; align-items: center; gap: 10px; padding: 12px; text-decoration: none; color: #3c4043; border-radius: 8px; transition: 0.2s; }
.menu-item:hover { background: #f8f9fa; }
.sign-out-btn { width: 100%; padding: 10px; border: 1px solid #dadce0; border-radius: 10px; background: white; cursor: pointer; font-weight: 500; transition: 0.3s; }
.sign-out-btn:hover { background: #fdf2f2; border-color: #d93025; color: #d93025; }

.container { display: flex; min-height: calc(100vh - 82px); }

.sidebar { width: 250px; background: linear-gradient(180deg, #ca0d0d, #420101); color: white; padding: 20px; flex-shrink: 0; align-self: stretch; }
.sidebar ul { list-style: none; }
.sidebar li { padding: 14px; margin-bottom: 10px; border-radius: 10px; cursor: pointer; transition: 0.3s; }
.sidebar li:hover, .sidebar li.active { background: rgba(255,255,255,0.2); }
.sidebar a { text-decoration: none; color: inherit; display: block; }
.sidebar-help { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 14px; margin-top: 20px; }
.sidebar-help i { font-size: 22px; color: rgba(255,255,255,0.7); flex-shrink: 0; }
.help-title { font-size: 13px; font-weight: 600; color: white; margin: 0; }
.help-sub { font-size: 11px; color: rgba(255,255,255,0.6); margin: 2px 0 0 0; }

.main-content { flex: 1; padding: 30px 35px; overflow-y: auto; }

.title-section { display: flex; align-items: center; gap: 20px; background: #f8f8fb; padding: 30px; border-radius: 20px; margin-bottom: 25px; }
.title-section h1 { font-size: 38px; margin-bottom: 5px; color: #1e2430; }
.title-section p { color: #666; }
.caja img { width: 70px; }
.title-section > img:last-child { margin-left: auto; width: 180px; }

.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 25px; }
.card { background: white; border-radius: 20px; padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); transition: 0.3s; display: flex; flex-direction: column; align-items: center; text-align: center; border-top: 5px solid transparent; }
.card:hover { transform: translateY(-4px); }
.card img { width: 100px; height: 100px; object-fit: contain; margin-bottom: 15px; }
.card.red { border-color: #dc2626; }
.card.yellow { border-color: #d97706; }
.card.blue { border-color: #2563eb; }
.card.green { border-color: #16a34a; }
.card-content h3 { font-size: 20px; margin-bottom: 8px; color: #1e2430; }
.card-content p { color: #777; font-size: 14px; margin-bottom: 15px; }
.card-content button { padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer; font-weight: 600; font-size: 14px; transition: 0.2s; background: #f1f1f1; color: #333; }
.card-content button:hover { background: #e0e0e0; }

.help-box { background: #fff4f4; border: 1px solid #ffdede; border-radius: 20px; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
.help-box h4 { font-size: 20px; margin-bottom: 6px; color: #1e2430; }
.help-box p { color: #666; font-size: 14px; }
.btn-reportar { background: #dc2626; color: white; border: none; padding: 14px 24px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: 0.3s; white-space: nowrap; }
.btn-reportar:hover { background: #b91c1c; }

@media (max-width: 1100px) { .cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) { .sidebar { display: none; } .main-content { width: 100%; } .title-section > img:last-child { display: none; } }
@media (max-width: 600px) { .cards { grid-template-columns: 1fr; } .help-box { flex-direction: column; gap: 15px; } }
</style>