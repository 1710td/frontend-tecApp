<template>
  <div class="docente-wrapper">
    <nav class="navbar">
      <div class="nav-izquierda">
        <button class="hamburger-btn" @click="sidebarAbierto = !sidebarAbierto">
          <i class="fas fa-bars"></i>
        </button>
        <div class="logo">
          <img src="/logoEscuela.png" width="48" height="48" alt="Logo" />
          <div class="logo-titulo">
            <h2>Gestión Escolar</h2>
            <p>Panel docente</p>
          </div>
        </div>
      </div>

      <div class="profile-container" ref="profileContainer">
        <button class="profile-trigger" @click.stop="toggleProfileMenu">
          <img :src="avatarUrl" alt="Avatar" />
        </button>
        <div class="profile-menu" :class="{ active: profileMenuOpen }">
          <div class="menu-header">
            <img :src="avatarUrl" class="large-avatar" alt="Avatar grande" />
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>
          <hr />
          <div class="menu-body">
            <p class="user-role">Rol: <span id="roleBadge">Profesor</span></p>
            <a href="javascript:void(0)" class="menu-item"><i class="fas fa-user-cog"></i> Mi Perfil</a>
          </div>
          <hr />
          <button class="sign-out-btn" @click="cerrarSesion"><i class="fas fa-right-from-bracket"></i>&nbsp;Cerrar sesión</button>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="sidebar-overlay" :class="{ visible: sidebarAbierto }" @click="sidebarAbierto = false"></div>
      <aside class="sidebar" :class="{ abierto: sidebarAbierto }">
        <ul>
          <RouterLink to="/profesor/inicio" active-class="active" @click="sidebarAbierto = false"
            ><li><i class="fas fa-home"></i> Inicio</li></RouterLink
          >
          <RouterLink to="/profesor/noticias" active-class="active" @click="sidebarAbierto = false"
            ><li><i class="fas fa-newspaper"></i> Noticias</li></RouterLink
          >
          <RouterLink to="/profesor/cursos" active-class="active" @click="sidebarAbierto = false"
            ><li><i class="fas fa-graduation-cap"></i> Mis Cursos</li></RouterLink
          >
          <RouterLink to="/profesor/materias" active-class="active" @click="sidebarAbierto = false"
            ><li><i class="fas fa-chalkboard-teacher"></i> Mis Materias</li></RouterLink
          >
          <RouterLink to="/profesor/asistencias" active-class="active" @click="sidebarAbierto = false"
            ><li><i class="fas fa-clipboard-check"></i> Asistencias</li></RouterLink
          >
        </ul>

        <div class="sidebar-help">
          <i class="fas fa-circle-question"></i>
          <div>
            <p class="help-title">¿Necesitás ayuda?</p>
            <p class="help-sub">Pixelina resolverá tu consulta.</p>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <header class="prof-header">
          <div class="prof-header-left">
            <div class="prof-avatar-wrap">
              <img :src="avatarUrl" alt="Avatar profesor" />
              <span class="prof-status-dot"></span>
            </div>
            <div class="prof-info">
              <p class="prof-label">DOCENTE ACTIVO</p>
              <h1>{{ userName }}</h1>
              <p class="prof-sub">Profesor Titular</p>
            </div>
          </div>
        </header>

        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const sidebarAbierto = ref(false);

const userName = computed(() => authStore.usuario?.nombre || "Juan Pérez");
const userEmail = computed(() => authStore.usuario?.email || "juan.perez@escuela.edu");
const avatarUrl = computed(() => `https://ui-avatars.com/api/?name=${userName.value.split(" ").join("+")}&background=c0152a&color=fff`);

const profileMenuOpen = ref(false);
const toggleProfileMenu = () => (profileMenuOpen.value = !profileMenuOpen.value);

const handleClickOutside = (e) => {
  if (!e.target.closest(".profile-container")) profileMenuOpen.value = false;
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const cerrarSesion = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped src="./profesores.css"></style>
