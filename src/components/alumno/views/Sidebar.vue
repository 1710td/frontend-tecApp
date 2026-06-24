<template>
    <aside class="sidebar" aria-label="Navegación Alumno">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="logo-dot">SGE</div>
                <div>
                    <div class="logo-title">Gestión Escolar</div>
                    <div class="logo-sub">Portal Alumno</div>
                </div>
            </div>
        </div>

        <div class="sidebar-section">General</div>
        <div
            class="nav-item"
            :class="{ active: vistaActual === 'overview' }"
            @click="$emit('cambiar-vista', 'overview')"
        >
            <i class="ti ti-layout-dashboard" aria-hidden="true"></i>Inicio
        </div>

        <div class="sidebar-section">Académico</div>
        <div
            class="nav-item"
            :class="{ active: vistaActual === 'materias' }"
            @click="$emit('cambiar-vista', 'materias')"
        >
            <i class="ti ti-book" aria-hidden="true"></i>Mis Materias
        </div>
        <div
            class="nav-item"
            :class="{ active: vistaActual === 'profesores' }"
            @click="$emit('cambiar-vista', 'profesores')"
        >
            <i class="ti ti-chalkboard" aria-hidden="true"></i>Mis Profesores
        </div>
        <div
            class="nav-item"
            :class="{ active: vistaActual === 'calificaciones' }"
            @click="$emit('cambiar-vista', 'calificaciones')"
        >
            <i class="ti ti-report-analytics" aria-hidden="true"></i>Boletín Digital
        </div>

        <div class="sidebar-section">Comunidad</div>
        <div
            class="nav-item"
            :class="{ active: vistaActual === 'noticias' }"
            @click="$emit('cambiar-vista', 'noticias')"
        >
            <i class="ti ti-speakerphone" aria-hidden="true"></i>Noticias
        </div>

        <div class="sidebar-footer">
            <div class="user-pill">
                <div class="user-avatar">
                    {{ initial }}
                </div>
                <div class="user-info">
                    <p>{{ shortName }}</p>
                    <span>{{ curso }}</span>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    vistaActual: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        default: "Alumno",
    },
    curso: {
        type: String,
        default: "Sin curso",
    },
});

defineEmits(["cambiar-vista"]);

const initial = computed(() => {
    return props.studentName.charAt(0).toUpperCase();
});

const shortName = computed(() => {
    const parts = props.studentName.split(" ");
    if (parts.length > 2) {
        return `${parts[0]} ${parts[1]}`;
    }
    return props.studentName;
});
</script>

<style scoped>
.sidebar {
    background: var(--color-background-primary, #ffffff);
    border-right: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: 16px;
    border-bottom: 0.5px solid var(--color-border-tertiary, #e5e7eb);
}

.sidebar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo-dot {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #007bff; /* Student Blue instead of Admin Red */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    flex-shrink: 0;
}

.logo-title {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--color-text-primary, #111827);
}

.logo-sub {
    font-size: 10px;
    color: var(--color-text-tertiary, #6b7280);
}

.sidebar-section {
    padding: 8px 8px 4px;
    font-size: 11px;
    color: var(--color-text-tertiary, #6b7280);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-top: 8px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 6px;
    cursor: pointer;
    color: var(--color-text-secondary, #4b5563);
    margin: 1px 6px;
    transition: background 0.15s;
    font-size: 12.5px;
}

.nav-item:hover {
    background: var(--color-background-secondary, #f3f4f6);
    color: var(--color-text-primary, #111827);
}

.nav-item.active {
    background: #e6f0ff;
    color: #0056b3;
}

.nav-item i {
    font-size: 16px;
    flex-shrink: 0;
}

.sidebar-footer {
    margin-top: auto;
    padding: 12px;
    border-top: 0.5px solid var(--color-border-tertiary, #e5e7eb);
}

.user-pill {
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.user-info p {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-primary, #111827);
    line-height: 1.2;
}

.user-info span {
    font-size: 11px;
    color: var(--color-text-tertiary, #6b7280);
}
</style>
