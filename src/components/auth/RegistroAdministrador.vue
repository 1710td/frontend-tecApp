<template>
    <div class="auth-wrapper">
        <div class="auth-card">
            <div class="auth-header">
                <div class="logo-dot">SGE</div>
                <div class="brand-text">
                    <h1>Registro de Administrador</h1>
                    <p>Crea tu cuenta de acceso</p>
                </div>
            </div>

            <div v-if="errorMessage" class="error-banner">
                <i class="ti ti-alert-circle"></i> {{ errorMessage }}
            </div>

            <form @submit.prevent="handleRegister" class="auth-form">
                <div class="field-group">
                    <label class="field-label">Nombre</label>
                    <input
                        v-model="registroData.nombre"
                        type="text"
                        class="field-input"
                        placeholder="Ej: Carlos"
                        required
                    />
                </div>

                <div class="field-group">
                    <label class="field-label">Apellido</label>
                    <input
                        v-model="registroData.apellido"
                        type="text"
                        class="field-input"
                        placeholder="Ej: Admin"
                        required
                    />
                </div>

                <div class="field-group">
                    <label class="field-label">Correo institucional</label>
                    <input
                        v-model="registroData.email"
                        type="email"
                        class="field-input"
                        placeholder="admin@escuela.edu.ar"
                        required
                    />
                </div>

                <div class="field-group">
                    <label class="field-label">Contraseña</label>
                    <input
                        v-model="registroData.contrasena"
                        type="password"
                        class="field-input"
                        placeholder="••••••••"
                        required
                        minlength="8"
                    />
                </div>

                <!-- comment

                <div class="field-group">
                    <label class="field-label">Código de autorización</label>
                    <input
                        v-model="registerData.authCode"
                        type="password"
                        class="field-input"
                        placeholder="Clave de administrador"
                        required
                    />
                    <span class="field-help"
                        >Solo el personal autorizado posee este código.</span
                    >
                </div>
                --->
                <div class="field-group">
                    <label class="field-label">Rol</label>
                    <select
                        v-model="registroData.id_rol"
                        class="field-input"
                        required
                    >
                        <option value="" disabled selected>
                            Selecciona un rol
                        </option>
                        <option
                            v-for="rol in roles"
                            :key="rol.id"
                            :value="rol.id"
                        >
                            {{ rol.nombre }}
                        </option>
                    </select>
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading">
                    {{
                        isLoading
                            ? "Procesando..."
                            : "Crear cuenta de administrador"
                    }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { registro } from "../../services/auth-service";

const isLoading = ref(false);
const errorMessage = ref("");

const roles = [
    { id: "1", nombre: "Alumno" },
    { id: "2", nombre: "Delegado" },
    { id: "3", nombre: "Profesor" },
    { id: "4", nombre: "Preceptor" },
    { id: "5", nombre: "Bibliotecario" },
    { id: "6", nombre: "Tutor" },
    { id: "7", nombre: "Invitado" },
    { id: "8", nombre: "Administrativo" },
    { id: "9", nombre: "Root" },
];

const registroData = reactive({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    id_rol: "",
    //authCode: "",
});

const handleRegister = async () => {
    errorMessage.value = "";
    isLoading.value = true;
    const result = await registro(registroData);
    if (!result.success) {
        errorMessage.value = result.message;
    }
    isLoading.value = false;
};
</script>

<style src="../../assets/auth.css" scoped></style>
