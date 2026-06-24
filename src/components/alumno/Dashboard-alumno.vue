<template>
    <div
        class="dash"
        role="main"
        aria-label="Panel de alumno del sistema de gestión escolar"
    >
        <Sidebar 
            :vista-actual="currentView" 
            :student-name="studentName"
            :curso="studentCurso"
            @cambiar-vista="setView" 
        />

        <div class="main">
            <Topbar 
                :vista-actual="currentView" 
                :student-name="studentName"
                :user-dni="studentDni"
                :curso="studentCurso"
            />

            <div class="content">
                <OverviewView
                    v-if="currentView === 'overview'"
                    @cambiar-vista="setView"
                />
                <MateriasView v-if="currentView === 'materias'" />
                <ProfesoresView v-if="currentView === 'profesores'" />
                <CalificacionesView v-if="currentView === 'calificaciones'" />
                <NoticiasView v-if="currentView === 'noticias'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";

import Sidebar from "./views/Sidebar.vue";
import Topbar from "./views/Topbar.vue";
import OverviewView from "./views/Overview.vue";
import MateriasView from "./views/MateriasView.vue";
import ProfesoresView from "./views/ProfesoresView.vue";
import CalificacionesView from "./views/CalificacionesView.vue";
import NoticiasView from "./views/NoticiasView.vue";

const currentView = ref("overview");
const authStore = useAuthStore();

const studentName = ref("Alumno");
const studentDni = ref("Sin documento");
const studentCurso = ref("Sin curso");

const setView = (vista) => {
    currentView.value = vista;
};

onMounted(() => {
    // Intentar leer de Pinia store primero, de lo contrario de localStorage (para LoginAlumno)
    if (authStore.usuario) {
        studentName.value = `${authStore.usuario.nombre} ${authStore.usuario.apellido}`;
        studentDni.value = authStore.usuario.dni || "Sin documento";
        studentCurso.value = authStore.usuario.curso || "Sin curso";
    } else {
        studentName.value = localStorage.getItem("userName") || "Alumno";
        studentDni.value = localStorage.getItem("userDni") || "Sin documento";
        studentCurso.value = localStorage.getItem("userCurso") || "Sin curso";
    }
});
</script>

<style scoped>
.dash {
    display: grid;
    grid-template-columns: 200px 1fr;
    min-height: 600px;
    background: var(--color-background-tertiary, #f8f9fa);
    border-radius: var(--border-radius-lg, 12px);
    border: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    overflow: hidden;
    font-size: 13px;
}

.main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.content {
    padding: 16px 20px;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
