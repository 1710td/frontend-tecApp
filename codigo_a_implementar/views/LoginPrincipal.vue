<template>
  <div class="login-portal-container">
    <div class="main-container">
      <div class="header-logo">
        <img src="/logoEscuela.png" alt="logo" width="60" height="60" class="logo-chico">
        <div class="logo-titulo">
          <h1>GESTIÓN ESCOLAR</h1>
          <h3>Portal Educativo</h3>
        </div>   
      </div>
      <img src="/escuelita.png" alt="escuela" width="350" height="150">
      <h2>¡Bienvenido!</h2>
      <h3>Inicia sesión para acceder al sistema<br> y continuar con tu experiencia.</h3>
      <p>Selecciona tu perfil para continuar:</p>
    </div>
    
    <div class="card-container">
      <RouterLink to="/login/personal?rol=Profesor" class="login-card prof">
        <img src="/profesor.png" alt="" width="130" height="130">
        <h3>Profesor</h3>
        <p>Accede a tus cursos, gestiona contenidos y más.</p>
        <button>Ingresar como Profesor ></button>
      </RouterLink>

      <RouterLink to="/login/alumno" class="login-card alum">
        <img src="/gorro.png" alt="" width="130" height="130">
        <h3>Alumno</h3>
        <p>Consulta tus cursos, noticias y recursos académicos.</p>
        <button>Ingresar como Alumno ></button>
      </RouterLink>

      <RouterLink to="/login/personal?rol=Bibliotecario" class="login-card biblio">
        <img src="/libritos.png" alt="" width="130" height="130">
        <h3>Bibliotecario</h3>
        <p>Administre la biblioteca, vea las noticias y más.</p>
        <button>Ingresar como Bibliotecario ></button>
      </RouterLink>
    </div>

    <div class="card-container">
      <RouterLink to="/login/personal?rol=Administrador" class="login-card admin">
        <img src="/administrador.png" alt="" width="130" height="130">
        <h3>Administrador</h3>
        <p>Administre toda la Gestión Escolar.</p>
        <button>Ingresar como Administrador ></button>
      </RouterLink>

      <RouterLink to="/login/personal?rol=Tutor" class="login-card tutor">
        <img src="/tutores.png" alt="" width="130" height="130">
        <h3>Tutor</h3>
        <p>Consulte las asistencias y notas de sus hijos y vea las noticias.</p>
        <button>Ingresar como Tutor ></button>
      </RouterLink>

      <RouterLink to="/login/personal?rol=Preceptor" class="login-card precep">
        <img src="/preceptor.png" alt="" width="130" height="130">
        <h3>Preceptor</h3>
        <p>Accede a las notas and asistencias, entre otros.</p>
        <button>Ingresar como Preceptor ></button>
      </RouterLink>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PortalLogin',
  created() {
    this.verificarSesionExistente();
  },
  methods: {
    verificarSesionExistente() {
      if (localStorage.getItem('sesionActiva') === 'true') {
        this.$router.push('/inicio');
      }
    }
  }
};
</script>

<style scoped>
.login-portal-container {
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    padding: 20px; 
    box-sizing: border-box;
    background-image: url(@/assets/fondo.jpg);
    background-size: cover; 
    background-position: center;
    background-attachment: fixed; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

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

.logo-titulo h1 {
    margin: 0; 
    font-size: 24px;
    line-height: 1.1;
}

.logo-titulo h3 {
    margin: 5px 0 0 0;
    font-size: 16px;
}

.main-container img[src="escuelita.png"] {
    margin-bottom: 20px; 
}

.main-container h2 {
    margin-top: 10px;
    margin-bottom: 5px;
}

.main-container h3 {
    margin-top: 0px;    
    margin-bottom: 10px;
}

.main-container p {
    margin-top: 0px;   
}

.card-container {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    text-align: center;
}

.login-card {
    background: white;
    inline-size: 200px;
    padding: 30px;
    text-decoration: none;
    color: #333;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.login-card button {
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    background: transparent; 
    font-weight: bold;
    transition: 0.3s;
    align-self: flex-start; 
}

.login-card button:hover {
    background: #333;
    color: white;
}

.login-card.prof button {
    border: 2px solid #ff4d4d;          
    background-color: rgba(255, 77, 77, 0.15); 
    color: #ff4d4d;                    
}

.login-card.prof button:hover {
    background-color: #ff4d4d;          
    color: white;                      
}

.login-card.alum button {
    border: 2px solid #007bff;         
    background-color: rgba(0, 123, 255, 0.15); 
    color: #007bff;                   
}

.login-card.alum button:hover {
    background-color: #007bff;         
    color: white;                
}

.login-card.biblio button {
    border: 2px solid #18a70b;         
    background-color: #c6e9af; 
    color: #18a70b;                   
}

.login-card.biblio button:hover {
    background-color: #18a70b;         
    color: white;                
}

.login-card.tutor button {
    border: 2px solid #f1c40f;         
    background-color: rgba(255, 230, 0, 0.281); 
    color: #f1c40f;                   
}

.login-card.tutor button:hover {
    background-color: #f1c40f;         
    color: white;                
}

.login-card.admin button {
    border: 2px solid #9b51e0;         
    background-color:  #d5bbffbb; 
    color: #9b51e0;                   
}

.login-card.admin button:hover {
    background-color: #9b51e0;         
    color: white;                
}

.login-card.precep button {
    border: 2px solid #ff9100;         
    background-color: rgba(255, 123, 0, 0.288); 
    color: #ff9100;                   
}

.login-card.precep button:hover {
    background-color: #ff9100;         
    color: white;                
}

h3 { margin: 10px 0; color: #2c3e50; }
p { font-size: 0.9rem; color: #666; }

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