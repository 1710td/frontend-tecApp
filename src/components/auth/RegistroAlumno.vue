<template>
    <div class="auth-wrapper">
        <div class="auth-card">
            <div class="auth-header">
                <div class="logo-dot">SGE</div>
                <div class="brand-text">
                    <h1>Activar Cuenta de Alumno</h1>
                    <p>
                        {{
                            step === 1
                                ? "Paso 1: Identificación"
                                : "Paso 2: Verificación y Contraseña"
                        }}
                    </p>
                </div>
            </div>

            <div v-if="errorMessage" class="error-banner">
                <i class="ti ti-alert-circle"></i> {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="success-banner">
                <i class="ti ti-check"></i> {{ successMessage }}
            </div>

            <form
                v-if="step === 1"
                @submit.prevent="solicitarCodigo"
                class="auth-form"
            >
                <div class="field-group">
                    <label class="field-label">Documento (DNI)</label>
                    <input
                        v-model="registroData.dni"
                        type="text"
                        class="field-input"
                        placeholder="Ej: 48000000 (sin puntos)"
                        required
                    />
                    <small class="field-help"
                        >Buscaremos tu registro institucional para enviarte el
                        código de acceso.</small
                    >
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading">
                    {{ isLoading ? "Buscando..." : "Enviar código al Email" }}
                </button>
            </form>

            <form v-else @submit.prevent="handleRegister" class="auth-form">
                <div class="field-group">
                    <label class="field-label">Código de Verificación</label>
                    <input
                        v-model="registroData.codigo"
                        type="text"
                        class="field-input verification-code"
                        placeholder="Ej: 123456"
                        maxlength="6"
                        required
                    />
                    <small class="field-help"
                        >Ingresá el código de 6 dígitos enviado a tu
                        correo.</small
                    >
                </div>

                <div class="field-group">
                    <label class="field-label">Nueva Contraseña</label>
                    <input
                        v-model="registroData.contrasena"
                        type="password"
                        class="field-input"
                        placeholder="••••••••"
                        required
                        minlength="8"
                    />
                </div>

                <div class="field-group">
                    <label class="field-label">Confirmar Contraseña</label>
                    <input
                        v-model="confirmarContrasena"
                        type="password"
                        class="field-input"
                        placeholder="••••••••"
                        required
                        minlength="8"
                    />
                </div>

                <button type="submit" class="btn-submit" :disabled="isLoading">
                    {{ isLoading ? "Verificando..." : "Activar mi cuenta" }}
                </button>

                <button type="button" class="btn-link" @click="step = 1">
                    ← Volver a ingresar DNI
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios"; // Recomiendo usar axios directo aquí o mapearlo en tu auth-service
import { useRouter } from "vue-router";

const router = useRouter();
const step = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const confirmarContrasena = ref("");

const registroData = reactive({
    dni: "",
    codigo: "",
    contrasena: "",
    id_rol: 3, // Alumno
});

// PASO 1: Enviar DNI para disparar el Mail desde el backend
const solicitarCodigo = async () => {
    errorMessage.value = "";
    successMessage.value = "";
    isLoading.value = true;

    try {
        // Apunta al endpoint de tu backend que genera códigos
        const response = await axios.post(
            "http://localhost:3000/api/auth/solicitar-codigo",
            {
                dni: registroData.dni,
            },
        );

        if (response.data.success) {
            successMessage.value = `Código enviado con éxito a: ${response.data.emailEnmascarado}`;
            step.value = 2; // Avanzamos al paso 2
        }
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            "El DNI no figura en el padrón o ya tiene usuario.";
    } finally {
        isLoading.value = false;
    }
};

// PASO 2: Confirmar código y registrar
const handleRegister = async () => {
    errorMessage.value = "";
    successMessage.value = "";

    if (registroData.contrasena !== confirmarContrasena.value) {
        errorMessage.value = "Las contraseñas no coinciden.";
        return;
    }

    isLoading.value = true;

    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/confirmar-registro",
            registroData,
        );
        if (response.data.success) {
            alert("Cuenta activada de forma exitosa. Ya podés iniciar sesión.");
            router.push("/login");
        }
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            "El código ingresado es inválido o expiró.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<style src="../../assets/auth.css" scoped></style>
<style scoped>
.field-help {
    display: block;
    margin-top: 4px;
    font-size: 0.75rem;
    color: #64748b;
}
.verification-code {
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 4px;
    font-weight: bold;
}
.success-banner {
    background-color: #d1e7dd;
    color: #0f5132;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid #badbcc;
}
.btn-link {
    background: none;
    border: none;
    color: #64748b;
    margin-top: 15px;
    cursor: pointer;
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
}
.btn-link:hover {
    text-decoration: underline;
    color: #334155;
}
</style>
