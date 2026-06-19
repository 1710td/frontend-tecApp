<template>
    <header class="topbar">
        <div class="brand-section">
            <img src="/logoEscuela.png" class="brand-logo" alt="Logo Escuela" />
            <div class="brand-divider"></div>
            <div class="brand-text">
                <h1 class="brand-title">Gestión Escolar</h1>
                <span class="brand-subtitle">{{ currentPage }}</span>
            </div>
        </div>

        <div class="user-section" ref="profileMenuRef">
            <button
                class="avatar-btn"
                @click="toggleMenu"
                :class="{ 'is-active': menuAbierto }"
            >
                <img :src="avatarUrl" alt="Avatar del usuario" />
            </button>

            <transition name="fade-slide">
                <div v-if="menuAbierto" class="dropdown-menu">
                    <div class="dropdown-header">
                        <img
                            :src="avatarUrl"
                            class="dropdown-avatar"
                            alt="Avatar"
                        />
                        <div class="dropdown-user-info">
                            <p class="user-name">{{ userName }}</p>
                            <p class="user-email">DNI: {{ userDni }}</p>
                        </div>
                    </div>

                    <div class="dropdown-divider"></div>

                    <div class="dropdown-body">
                        <RouterLink
                            to="/perfil"
                            class="dropdown-item"
                            @click="menuAbierto = false"
                        >
                            <i class="fas fa-user-circle"></i> Mi Perfil
                        </RouterLink>
                    </div>

                    <div class="dropdown-divider"></div>

                    <button
                        class="dropdown-item text-danger"
                        @click="cerrarSesion"
                    >
                        <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            </transition>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";

defineProps({
    currentPage: { type: String, default: "Inicio" },
});

const router = useRouter();
const menuAbierto = ref(false);
const profileMenuRef = ref(null);
const authStore = useAuthStore();

const userName = ref(authStore.usuario?.nombre || "NULL");

const avatarUrl = computed(() => {
    const name = userName.value.split(" ").join("+");
    return `https://ui-avatars.com/api/?name=${name}&background=0f172a&color=fff&rounded=true&bold=true`;
});

const toggleMenu = () => {
    menuAbierto.value = !menuAbierto.value;
};

// Cierra el menú si se hace clic fuera de él
const handleClickOutside = (event) => {
    if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
        menuAbierto.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const cerrarSesion = () => {
    localStorage.clear();
    router.push("/");
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css");

/* --- Header Principal --- */
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 24px;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* --- Marca y Logo --- */
.brand-section {
    display: flex;
    align-items: center;
    gap: 16px;
}

.brand-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.brand-divider {
    width: 1px;
    height: 24px;
    background-color: #cbd5e1;
}

.brand-text {
    display: flex;
    align-items: baseline;
    gap: 12px;
}

.brand-title {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.01em;
}

.brand-subtitle {
    font-size: 14px;
    color: #64748b;
    font-weight: 400;
}

/* --- Sección de Usuario --- */
.user-section {
    position: relative;
}

.avatar-btn {
    background: transparent;
    border: 2px solid transparent;
    padding: 2px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-btn img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.avatar-btn:hover,
.avatar-btn.is-active {
    border-color: #cbd5e1;
}

/* --- Menú Desplegable --- */
.dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 280px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    overflow: hidden;
}

.dropdown-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
}

.dropdown-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.dropdown-user-info {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
}

.user-email {
    font-size: 12px;
    color: #64748b;
    margin: 0;
}

.dropdown-divider {
    height: 1px;
    background-color: #f1f5f9;
    margin: 4px 0;
}

.dropdown-body {
    padding: 4px 0;
}

.user-badge {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    margin: 0 8px 8px 8px;
    background-color: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}

.badge-label {
    font-size: 12px;
    color: #64748b;
}

.badge-value {
    font-size: 12px;
    font-weight: 600;
    color: #0f172a;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 16px;
    font-size: 14px;
    color: #334155;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease;
    text-align: left;
}

.dropdown-item i {
    font-size: 16px;
    color: #94a3b8;
    width: 20px;
    text-align: center;
}

.dropdown-item:hover {
    background-color: #f1f5f9;
    color: #0f172a;
}

.dropdown-item:hover i {
    color: #64748b;
}

.dropdown-item.text-danger {
    color: #ef4444;
}

.dropdown-item.text-danger i {
    color: #ef4444;
}

.dropdown-item.text-danger:hover {
    background-color: #fef2f2;
}

/* --- Animación de Transición --- */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
