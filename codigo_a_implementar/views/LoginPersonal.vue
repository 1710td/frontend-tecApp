<template>
  <div class="login-personal-container">
    <div class="login-box">
      <h2>Acceso {{ rol }}</h2>

      <form @submit.prevent="manejarLogin">
        <label>Nombre/s:</label>
        <input
          type="text"
          v-model="nombre"
          placeholder="Juan"
          required
        >

        <label>Apellido/s:</label>
        <input
          type="text"
          v-model="apellido"
          placeholder="Pérez"
          required
        >

        <label>Correo electrónico:</label>
        <input
          type="email"
          v-model="email"
          placeholder="ejemplo@escuela.edu.ar"
          required
        >

        <label>Contraseña:</label>
        <input
          type="password"
          v-model="password"
          placeholder="********"
          required
        >

        <button type="submit" class="btn-submit">Registrarse / Ingresar</button>
      </form>

      <RouterLink to="/login" class="back-link">
        ← Volver al inicio
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPersonal',
  data() {
    return {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: 'Personal'
    };
  },
  watch: {
    '$route.query.rol': {
      immediate: true,
      handler(nuevoRol) {
        if (nuevoRol) {
          this.rol = nuevoRol;
        }
      }
    }
  },
  created() {
    this.verificarSesionExistente();
  },
  methods: {
    verificarSesionExistente() {
      if (localStorage.getItem('sesionActiva') === 'true') {
        this.$router.push('/inicio');
      }
    },
    manejarLogin() {
      localStorage.setItem('sesionActiva', 'true');
      localStorage.setItem('userName', `${this.nombre} ${this.apellido}`);
      localStorage.setItem('userEmail', this.email);
      localStorage.setItem('userCurso', this.rol);
      localStorage.setItem('userDni', 'DNI-' + Math.floor(10000000 + Math.random() * 90000000));

      this.$router.push('/inicio');
    }
  }
};
</script>

<style scoped>
.login-personal-container {
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    padding: 20px; 
    box-sizing: border-box;
    background-image: url(/fondo.jpg);
    background-size: cover; 
    background-position: center;
    background-attachment: fixed; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

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