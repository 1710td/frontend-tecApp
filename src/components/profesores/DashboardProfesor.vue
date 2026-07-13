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
                <button class="profile-trigger" @click.stop="toggleProfileMenu" :aria-expanded="profileMenuOpen" aria-haspopup="true">
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
                        <button type="button" class="menu-item" @click="openProfile = true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            Mi Perfil
                        </button>
                    </div>
                    <hr />
                    <button class="sign-out-btn" @click="cerrarSesion">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        &nbsp;Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="sidebar-overlay" :class="{ visible: sidebarAbierto }" @click="sidebarAbierto = false"></div>
            <aside class="sidebar" :class="{ abierto: sidebarAbierto }">
                <ul>
                    <li @click="sidebarAbierto = false">
                        <RouterLink to="/profesor/inicio" active-class="active" aria-label="Inicio">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l9-8 9 8v8a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-8z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            Inicio
                        </RouterLink>
                    </li>
                    <li @click="sidebarAbierto = false">
                        <RouterLink to="/profesor/noticias" active-class="active" aria-label="Noticias">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.2"/></svg>
                            Noticias
                        </RouterLink>
                    </li>
                    <li @click="sidebarAbierto = false">
                        <RouterLink to="/profesor/cursos" active-class="active" aria-label="Mis Cursos">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3L2 9l10 6 10-6-10-6zM2 15l10 6 10-6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            Mis Cursos
                        </RouterLink>
                    </li>
                    <li @click="sidebarAbierto = false">
                        <RouterLink to="/profesor/comunicados" active-class="active" aria-label="Comunicados">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            Comunicados
                        </RouterLink>
                    </li>
                    <li @click="sidebarAbierto = false">
                        <RouterLink to="/profesor/materias" active-class="active" aria-label="Mis Materias">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            Mis Materias
                        </RouterLink>
                    </li>
                    <li @click="sidebarAbierto = false">
                        <RouterLink to="/profesor/asistencias" active-class="active" aria-label="Asistencias">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            Asistencias
                        </RouterLink>
                    </li>
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
        <Modal v-model="openProfile" title="Mi Perfil" wide>
            <div class="perfil-modal-body">
                <div class="perfil-layout">
                    <div class="perfil-avatar-wrapper">
                        <img :src="avatarUrl" alt="Avatar" class="perfil-avatar-lg" />
                    </div>
                    <div class="perfil-info">
                        <template v-if="!editingProfile">
                            <h3 class="perfil-name">{{ userName }}</h3>
                            <p class="perfil-email">{{ userEmail }}</p>
                            <p class="perfil-role">
                                <span class="role-badge">Rol: Profesor</span>
                            </p>
                        </template>
                        <template v-else>
                            <div class="form-group">
                                <label>Nombre completo</label>
                                <input type="text" v-model="editProfile.nombre" class="perfil-input" />
                            </div>
                            <div class="form-group" style="margin-top:12px">
                                <label>Email</label>
                                <input type="email" v-model="editProfile.email" class="perfil-input" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <template #footer>
                <button class="btn-cancel" @click="closeProfile()">Cerrar</button>
                <template v-if="!editingProfile">
                    <button class="btn-edit-info" @click="startEditProfile">Editar perfil</button>
                </template>
                <template v-else>
                    <button class="btn-cancel" @click="cancelEdit">Cancelar</button>
                    <button class="tb-btn primary" @click="saveProfile">Guardar</button>
                </template>
            </template>
        </Modal>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Modal from '@/components/ui/Modal.vue';
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
const openProfile = ref(false);
const closeProfile = () => (openProfile.value = false);

const handleClickOutside = (e) => {
    if (!e.target.closest(".profile-container")) profileMenuOpen.value = false;
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const cerrarSesion = () => {
    authStore.logout();
    router.push("/");
};

// Perfil editable
import { reactive } from 'vue';
const editingProfile = ref(false);
const editProfile = reactive({ nombre: authStore.usuario?.nombre || '', email: authStore.usuario?.email || '' });

const startEditProfile = () => {
    editingProfile.value = true;
    editProfile.nombre = authStore.usuario?.nombre || '';
    editProfile.email = authStore.usuario?.email || '';
};

const cancelEdit = () => {
    editingProfile.value = false;
};

const saveProfile = () => {
    // simple validation
    if (!editProfile.nombre.trim() || !editProfile.email.trim()) {
        alert('Por favor completa nombre y email.');
        return;
    }

    // actualizar en el store (persistirá en localStorage)
    authStore.updateProfile({ nombre: editProfile.nombre.trim(), email: editProfile.email.trim() });
    editingProfile.value = false;
    alert('Perfil actualizado.');
};
</script>


<style scoped src="./profesores.css"></style>
<style scoped>
.perfil-modal-body {
    padding: 10px 0;
}
.perfil-layout {
    display: flex;
    gap: 24px;
    align-items: center;
}
.perfil-avatar-wrapper {
    flex-shrink: 0;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(135deg, var(--primary, #c0152a), var(--primary-dark, #7f0917));
    box-shadow: 0 4px 12px rgba(192, 21, 42, 0.2);
}
.perfil-avatar-lg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #fff;
    object-fit: cover;
    display: block;
}
.perfil-info {
    flex: 1;
}
.perfil-name {
    margin: 0 0 8px 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text, #0f172a);
}
.perfil-email {
    margin: 0 0 12px 0;
    color: var(--muted, #64748b);
    font-size: 1.05rem;
}
.perfil-role {
    margin: 0;
}
.role-badge {
    background: var(--primary-soft, rgba(192, 21, 42, 0.1));
    color: var(--primary, #c0152a);
    font-weight: 700;
    font-size: 0.85rem;
    padding: 4px 12px;
    border-radius: 999px;
    display: inline-block;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.form-group label {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text, #334155);
}
.perfil-input {
    border: 1px solid #d1d5db;
    border-radius: var(--radius-sm, 10px);
    padding: 12px 14px;
    background: var(--surface-2, #f8fafc);
    color: var(--text, #0f172a);
    font-family: inherit;
    transition: all 0.2s;
    width: 100%;
}
.perfil-input:focus {
    border-color: var(--primary, #c0152a);
    box-shadow: 0 0 0 3px var(--primary-soft, rgba(192, 21, 42, 0.15));
    outline: none;
}
@media (max-width: 600px) {
    .perfil-layout {
        flex-direction: column;
        text-align: center;
    }
}
</style>
