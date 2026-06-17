<template>
    <div
        class="dash"
        role="main"
        aria-label="Panel de administración del sistema de gestión escolar"
    >
        <Sidebar :vista-actual="currentView" @cambiar-vista="setView" />

        <div class="main">
            <Topbar :vista-actual="currentView" />

            <div class="content">
                <OverviewView
                    v-if="currentView === 'overview'"
                    @cambiar-vista="setView"
                />
                <AlumnosView v-if="currentView === 'alumnos'" />
                <ProfesoresView v-if="currentView === 'profesores'" />
                <CursosView v-if="currentView === 'cursos'" />
                <NoticiasView v-if="currentView === 'noticias'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

import Sidebar from "./views/Sidebar.vue";
import Topbar from "./views/Topbar.vue";
import OverviewView from "./views/Overview.vue";
import AlumnosView from "./views/AlumnosView.vue";
import ProfesoresView from "./views/ProfesoresView.vue";
import CursosView from "./views/CursosView.vue";
import NoticiasView from "./views/NoticiasView.vue";

const currentView = ref("overview");

const setView = (vista) => {
    currentView.value = vista;
};
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
