<template>
  <div class="login-box">
    <h2>Acceso Docente</h2>

    <form @submit.prevent="handleSubmit">
      <label>Nombre/s:</label>
      <input type="text" v-model="form.nombre" placeholder="Juan" required />

      <label>Apellido/s:</label>
      <input type="text" v-model="form.apellido" placeholder="Pérez" required />

      <label>Correo electrónico:</label>
      <input type="email" v-model="form.email" placeholder="Ej: pepito123@gmail.com" required />

      <label>Contraseña:</label>
      <input type="password" v-model="form.password" placeholder="********" required />

      <button type="submit" class="btn-submit">Ingresar al Panel</button>
    </form>

    <RouterLink to="/" class="back-link">← Volver al inicio</RouterLink>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  nombre: '',
  apellido: '',
  email: '',
  password: ''
})


function handleSubmit() {
  if (form.nombre && form.apellido && form.email && form.password) {
    router.push('/inicio')  // ← CAMBIÁ ESTO (era '/panel/profesor')
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
.login-box input {
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