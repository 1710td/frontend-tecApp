<template>
  <div class="login-box">
    <h2>Acceso Alumno</h2>

    <div v-if="errorMessage" class="error-banner">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleLogin">
      <label for="inputNombre">Nombre/s:</label>
      <input type="text" id="inputNombre" v-model="loginData.nombre" placeholder="Ej: Juan" required />

      <label for="inputApellido">Apellido/s:</label>
      <input type="text" id="inputApellido" v-model="loginData.apellido" placeholder="Ej: Pérez" required />

      <label for="inputDni">Documento (DNI):</label>
      <input type="number" id="inputDni" v-model="loginData.dni" placeholder="Solo números" required />

      <label for="selectCurso">Curso:</label>
      <select id="selectCurso" v-model="loginData.id_curso" required>
        <option value="">Selecciona tu curso:</option>
        <option value="1Pri">1° Primera</option>
        <option value="1Seg">1° Segunda</option>
        <option value="2Pri">2° Primera</option>
        <option value="2Seg">2° Segunda</option>
        <option value="3Pri">3° Primera</option>
        <option value="3Seg">3° Segunda</option>
        <option value="4Pro">4° Programación</option>
        <option value="4Inf">4° Informática</option>
        <option value="5Pro">5° Programación</option>
        <option value="5Inf">5° Informática</option>
        <option value="6Pro">6° Programación</option>
        <option value="6Inf">6° Informática</option>
        <option value="7Pro">7° Programación</option>
        <option value="7Inf">7° Informática</option>
      </select>

      <button type="submit" class="btn-submit" :disabled="isLoading">
        {{ isLoading ? "Cargando..." : "Registrarse / Ingresar" }}
      </button>
    </form>

    <RouterLink to="/" class="back-link">← Volver al inicio</RouterLink>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { login } from "../../services/auth-service.js";
import { useRouter } from "vue-router"; // Importante para redirigir tras loguear

const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref("");

// Se unificó el objeto para mapear los v-model del template
const loginData = reactive({
    nombre: "",
    apellido: "",
    dni: "",
    id_curso: "" // Asegúrate de que coincida con lo que espera tu endpoint
});

const handleLogin = async () => {
    errorMessage.value = "";
    isLoading.value = true;
    
    try {
        const result = await login(loginData);
        if (result && result.success) {
            // Si el backend responde exitosamente, redirigís al panel del alumno
            router.push("/alumno/dashboard"); 
        } else {
            errorMessage.value = result?.message || "Credenciales inválidas.";
        }
    } catch (error) {
        console.error("Error en login de alumno:", error);
        errorMessage.value = "Error de conexión con el servidor.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.login-box {
    background: white;
    width: 100%;
    max-width: 400px;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    text-align: left;
}
.login-box h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 1.8rem;
}
.login-box label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 600;
    font-size: 0.9rem;
}
.login-box input,
.login-box select {
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}
.btn-submit {
    width: 100%;
    padding: 12px;
    background-color: #898c8b;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.btn-submit:hover:not(:disabled) {
    background-color: #606160;
}
.btn-submit:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
.error-banner {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid #f5c6cb;
}
.back-link {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #888;
    text-decoration: none;
    font-size: 0.85rem;
}
.back-link:hover {
    color: #606160;
    text-decoration: underline;
}
</style>