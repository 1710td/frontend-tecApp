<template>
  <div class="login-box">
    <h2>Acceso Alumno</h2>

    <form @submit.prevent="handleSubmit">
      <label for="inputNombre">Nombre/s:</label>
      <input
        type="text"
        id="inputNombre"
        v-model="nombre"
        placeholder="Ej: Juan"
        required
      >

      <label for="inputApellido">Apellido/s:</label>
      <input
        type="text"
        id="inputApellido"
        v-model="apellido"
        placeholder="Ej: Pérez"
        required
      >

      <label for="inputDni">Documento (DNI):</label>
      <input
        type="number"
        id="inputDni"
        v-model="dni"
        placeholder="Solo números"
        required
      >

      <label for="selectCurso">Curso:</label>
      <select id="selectCurso" v-model="curso" required>
        <option value="">Selecciona tu curso:</option>
        <option value="1Pri">1° Primera</option>
        <option value="1Seg">1° Segunda</option>
        <option value="2Pri">2° Primera</option>
        <option value="2Seg">2° Segunda</option>
        <option value="3Pri">3° Primera</option>
        <option value="3Seg">3° Segunda</option>
        <option value="4Pro">4° Programación</option>
        <option value="4Inf">4° Infórmatica</option>
        <option value="5Pro">5° Programación</option>
        <option value="5Inf">5° Infórmatica</option>
        <option value="6Pro">6° Programación</option>
        <option value="6Inf">6° Infórmatica</option>
        <option value="7Pro">7° Programación</option>
        <option value="7Inf">7° Infórmatica</option>
      </select>

      <button type="submit" class="btn-submit">Registrarse / Ingresar</button>
    </form>

    <!-- Si usás vue-router, reemplazá por <router-link to="/"> -->
    <a href="loginPrincipal.html" class="back-link">← Volver al inicio</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router' // descomentar si usás vue-router

// const router = useRouter()

const nombre = ref('')
const apellido = ref('')
const dni = ref('')
const curso = ref('')

function handleSubmit() {
  if (nombre.value && apellido.value && dni.value && curso.value) {
    localStorage.setItem('sesionActiva', 'true')
    localStorage.setItem('userName', `${nombre.value} ${apellido.value}`)
    localStorage.setItem('userDni', dni.value)
    localStorage.setItem('userCurso', curso.value)

    // Reemplazá por router.push('/ruta') si usás vue-router
    window.location.href = 'ObjetosPerdidos2.0.html'
  } else {
    alert('Por favor, completa todos los campos')
  }
}
</script>

<style scoped>
.login-box {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin: 0 auto;
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

.btn-submit:hover {
  background-color: #606160;
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