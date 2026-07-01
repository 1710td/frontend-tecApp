<template>
  <div>
    <div class="main-container">
      <div class="header-logo">
        <img src="/logoEscuela.png" alt="logo" width="60" height="60" class="logo-chico" />
        <div class="logo-titulo">
          <h1>GESTIÓN ESCOLAR</h1>
          <h3>Portal Educativo</h3>
        </div>
      </div>

      <img src="/escuelita.png" alt="escuela" width="350" height="150" />
      <h2>¡Bienvenido!</h2>
      <h3>Inicia sesión para acceder al sistema<br />y continuar con tu experiencia.</h3>
      <p>Selecciona tu perfil para continuar:</p>
    </div>

    <div class="card-container">
      <RouterLink to="/login/profesor" class="login-card prof">
        <img src="/profesor.png" alt="" width="130" height="130" />
        <h3>Profesor</h3>
        <p>Accede a tus cursos, gestiona contenidos y más.</p>
        <span class="card-btn">Ingresar como Profesor &gt;</span>
      </RouterLink>

      <RouterLink to="/login/alumno" class="login-card alum">
        <img src="/gorro.png" alt="" width="130" height="130" />
        <h3>Alumno</h3>
        <p>Consulta tus cursos, noticias y recursos académicos.</p>
        <span class="card-btn">Ingresar como Alumno &gt;</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}
.logo-titulo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}
.logo-titulo h1 { margin: 0; font-size: 24px; line-height: 1.1; }
.logo-titulo h3 { margin: 5px 0 0 0; font-size: 16px; }
.main-container h2 { margin-top: 10px; margin-bottom: 5px; }
.main-container h3 { margin-top: 0; margin-bottom: 10px; }
.main-container p { margin-top: 0; }
.card-container {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    text-align: center;
    justify-content: center;
}

/* FIX: display:flex convierte al <a> (RouterLink) en un contenedor de bloque
   real, así el área clickeable coincide con lo que se ve en pantalla. */
.login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    width: 200px;
    padding: 30px;
    text-decoration: none;
    color: #333;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

/* El "botón" ahora es un <span>, no un <button> real (evita anidar
   elementos interactivos dentro de un <a>, que es HTML inválido) */
.card-btn {
    display: inline-block;
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: bold;
    transition: 0.3s;
    margin-top: 10px;
}

.login-card.prof .card-btn {
    border: 2px solid #ff4d4d;
    background-color: rgba(255, 77, 77, 0.15);
    color: #ff4d4d;
}
.login-card.prof:hover .card-btn { background-color: #ff4d4d; color: white; }

.login-card.alum .card-btn {
    border: 2px solid #007bff;
    background-color: rgba(0, 123, 255, 0.15);
    color: #007bff;
}
.login-card.alum:hover .card-btn { background-color: #007bff; color: white; }

h3 { margin: 10px 0; color: #2c3e50; }
p { font-size: 0.9rem; color: #666; }
</style>