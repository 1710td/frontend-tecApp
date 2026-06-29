<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Acceso Docente</h2>

    <form @submit.prevent="handleSubmit">
      <label for="nombre">Nombre/s:</label>
      <input
        id="nombre"
        v-model="form.nombre"
        type="text"
        placeholder="Juan"
        required
      >

      <label for="apellido">Apellido/s:</label>
      <input
        id="apellido"
        v-model="form.apellido"
        type="text"
        placeholder="Pérez"
        required
      >

      <label for="correo">Correo electrónico:</label>
      <input
        id="correo"
        v-model="form.correo"
        type="email"
        placeholder="Ej: pepito123@gmail.com"
        required
      >

      <label for="contrasena">Contraseña:</label>
      <input
        id="contrasena"
        v-model="form.contrasena"
        type="password"
        placeholder="********"
        required
      >

      <button type="submit" class="btn-submit">Ingresar al Panel</button>
    </form>

      <a href="#" class="back-link" @click.prevent="volver">← Volver al inicio</a>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  contrasena: ''
})

function handleSubmit() {
  const { nombre, apellido, correo, contrasena } = form

  if (!nombre || !apellido || !correo || !contrasena) {
    alert('Por favor, completa todos los campos')
    return
  }

  // Guardamos la sesión (misma idea que el java.js original, adaptada a estos campos)
  localStorage.setItem('sesionActiva', 'true')
  localStorage.setItem('userName', `${nombre} ${apellido}`)
  localStorage.setItem('userEmail', correo)
  localStorage.setItem('userRol', 'profesor')

  router.push('/objetos-perdidos')
}

function volver() {
  router.push('/')
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-box {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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