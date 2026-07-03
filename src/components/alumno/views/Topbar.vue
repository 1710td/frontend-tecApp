<template>
  <nav class="navbar" id="topbar-alumno">
    <div class="nav-izquierda">
      <!-- Hamburger for mobile -->
      <button class="hamburger" @click="$emit('toggle-sidebar')" aria-label="Menú">
        <i class="fas fa-bars"></i>
      </button>
      <div class="logo">
        <img src="/logoEscuela.png" width="48" height="48" alt="Logo Escuela" />
        <div class="logo-titulo">
          <h2>GESTIÓN ESCOLAR</h2>
          <p>Panel del Alumno</p>
        </div>
      </div>
    </div>

    <div class="nav-derecha">
      <!-- Notification bell (decorative) -->
      <button class="icon-btn" aria-label="Notificaciones">
        <i class="fas fa-bell"></i>
        <span class="notification-dot"></span>
      </button>

      <div class="profile-container" ref="profileContainer">
        <button class="profile-trigger" @click.stop="toggleMenu" id="profile-btn-alumno">
          <img :src="avatarUrl" alt="User" />
          <span class="profile-name">{{ userName }}</span>
          <i class="fas fa-chevron-down" :class="{ rotated: menuAbierto }"></i>
        </button>

        <transition name="dropdown">
          <div v-show="menuAbierto" class="profile-menu" id="profile-menu-alumno">
            <div class="menu-header">
              <img :src="avatarUrl" class="large-avatar" />
              <p class="user-name">{{ userName }}</p>
              <p class="user-email">DNI: {{ userDni }}</p>
            </div>
            <div class="menu-divider"></div>
            <div class="menu-body">
              <p class="user-role">
                Rol:
                <span class="role-badge">{{ userCurso }}</span>
              </p>
              <RouterLink to="/alumno/inicio" class="menu-item"> <i class="fas fa-home"></i> Inicio </RouterLink>
              <RouterLink to="/alumno/cursos" class="menu-item"> <i class="fas fa-graduation-cap"></i> Mis Cursos </RouterLink>
            </div>
            <div class="menu-divider"></div>
            <button class="sign-out-btn" @click="cerrarSesion" id="logout-btn-alumno">
              <i class="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

defineEmits(["toggle-sidebar"]);

const router = useRouter();
const authStore = useAuthStore();

const menuAbierto = ref(false);
const profileContainer = ref(null);

const userName = computed(() => authStore.usuario?.nombre || authStore.usuario?.nombre_usuario || "Alumno");
const userDni = computed(() => authStore.usuario?.dni || "Sin documento");
const userCurso = computed(() => authStore.rol || "alumno");

const avatarUrl = computed(() => {
  const nameForApi = userName.value.split(" ").join("+");
  return `https://ui-avatars.com/api/?name=${nameForApi}&background=ca0d0d&color=fff&bold=true&size=96`;
});

const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value;
};

const cerrarMenuClickAfuera = (e) => {
  if (menuAbierto.value && profileContainer.value && !profileContainer.value.contains(e.target)) {
    menuAbierto.value = false;
  }
};

onMounted(() => document.addEventListener("click", cerrarMenuClickAfuera));
onUnmounted(() => document.removeEventListener("click", cerrarMenuClickAfuera));

const cerrarSesion = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 70px;
  background: var(--color-surface, #fff);
  border-bottom: 1px solid var(--color-border, #efefef);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 200;
}

.nav-izquierda {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-text, #1e2430);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.hamburger:hover {
  background: #f3f4f6;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  border-radius: 12px;
}

.logo-titulo {
  display: flex;
  flex-direction: column;
}

.logo h2 {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-text, #1e2430);
  margin: 0;
  letter-spacing: 0.5px;
}

.logo p {
  color: var(--color-text-muted, #999);
  font-size: 0.78rem;
  margin: 0;
  font-weight: 500;
}

.nav-derecha {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  position: relative;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  font-size: 18px;
  transition: all var(--transition-fast, 0.15s ease);
}

.icon-btn:hover {
  background: #f3f4f6;
  color: var(--color-text, #1e2430);
}

.notification-dot {
  position: absolute;
  top: 8px;
  right: 9px;
  width: 8px;
  height: 8px;
  background: var(--color-primary, #ca0d0d);
  border-radius: 50%;
  border: 2px solid var(--color-surface, #fff);
}

.profile-container {
  position: relative;
  display: flex;
  align-items: center;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
  padding: 6px 12px 6px 6px;
  border-radius: 12px;
  transition: all var(--transition-fast, 0.15s ease);
}

.profile-trigger:hover {
  background: #f9fafb;
  border-color: var(--color-border, #efefef);
}

.profile-trigger img {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: block;
}

.profile-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text, #1e2430);
}

.profile-trigger i {
  font-size: 10px;
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.profile-trigger i.rotated {
  transform: rotate(180deg);
}

/* Dropdown menu */
.profile-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 280px;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 20px);
  box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
  border: 1px solid var(--color-border, #efefef);
  padding: 16px;
  z-index: 1000;
}

.menu-header {
  text-align: center;
  padding-bottom: 12px;
}

.large-avatar {
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin: 0 auto 10px;
  display: block;
  box-shadow: 0 2px 8px rgba(202, 13, 13, 0.15);
}

.user-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text, #1e2430);
}

.user-email {
  color: #6b7280;
  font-size: 0.82rem;
  margin-top: 2px;
}

.menu-divider {
  height: 1px;
  background: var(--color-border, #efefef);
  margin: 12px 0;
}

.user-role {
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #6b7280;
}

.role-badge {
  display: inline-block;
  background: var(--color-primary-light, #ffe9e9);
  color: var(--color-primary, #ca0d0d);
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  text-decoration: none;
  color: #374151;
  border-radius: var(--radius-sm, 8px);
  transition: all var(--transition-fast, 0.15s ease);
  font-size: 0.9rem;
  font-weight: 500;
}

.menu-item i {
  width: 18px;
  text-align: center;
  color: #9ca3af;
}

.menu-item:hover {
  background: #f3f4f6;
  color: var(--color-text, #1e2430);
}

.menu-item:hover i {
  color: var(--color-primary, #ca0d0d);
}

.sign-out-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border, #efefef);
  border-radius: 10px;
  background: var(--color-surface, #fff);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  color: #6b7280;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sign-out-btn:hover {
  background: #fef2f2;
  border-color: var(--color-primary, #ca0d0d);
  color: var(--color-primary, #ca0d0d);
}

/* Dropdown transitions */
.dropdown-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

/* Responsive */
@media (max-width: 900px) {
  .hamburger {
    display: flex;
  }

  .profile-name {
    display: none;
  }

  .profile-trigger i.fa-chevron-down {
    display: none;
  }

  .logo-titulo {
    display: none;
  }
}

@media (max-width: 500px) {
  .navbar {
    padding: 0 16px;
  }

  .icon-btn {
    display: none;
  }
}
</style>
