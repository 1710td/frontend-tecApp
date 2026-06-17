<template>
    <div class="auth-wrapper">
        <div class="auth-card">
            <div class="auth-header">
                <div class="logo-dot">SGE</div>
                <div class="brand-text">
                    <h1>Gestión Escolar</h1>
                    <p>Acceso Administrativo</p>
                </div>
            </div>

            <div v-if="errorMessage" class="error-banner">
                <i class="ti ti-alert-circle"></i> {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin" class="auth-form">
                <div class="field-group">
                    <label class="field-label">Correo institucional</label>
                    <input
                        v-model="loginData.email"
                        type="email"
                        class="field-input"
                        placeholder="admin@escuela.edu.ar"
                        required
                    />
                </div>
                <div class="field-group">
                    <label class="field-label">Contraseña</label>
                    <input
                        v-model="loginData.contrasena"
                        type="password"
                        class="field-input"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button type="submit" class="btn-submit" :disabled="isLoading">
                    {{ isLoading ? "Ingresando..." : "Ingresar" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { login } from "../../services/auth-service.js";

const isLoading = ref(false);
const errorMessage = ref("");

const loginData = reactive({
    email: "",
    contrasena: "",
});

const handleLogin = async () => {
    errorMessage.value = "";
    isLoading.value = true;
    const result = await login(loginData);
    if (!result.success) {
        errorMessage.value = result.message;
    }
    isLoading.value = false;
};
</script>

<style src="../../assets/auth.css" scoped></style>
