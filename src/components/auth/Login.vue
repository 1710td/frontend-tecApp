<template>
    <div class="auth-wrapper">
        <div class="auth-card">
            <div class="auth-header">
                <div class="logo-dot">
                    <img
                        src="/logoEscuela.png"
                        alt="logo"
                        width="22"
                        height="22"
                        style="border-radius: 4px"
                    />
                </div>
                <div class="brand-text">
                    <h1>GESTIÓN ESCOLAR</h1>
                    <p>Portal Educativo</p>
                </div>
            </div>

            <div class="hero-section">
                <img src="/escuelita.png" alt="escuela" class="hero-image" />
                <div class="welcome-text">
                    <h2>¡Bienvenido!</h2>
                    <p>
                        Selecciona tu perfil para iniciar sesión y continuar con
                        tu experiencia.
                    </p>
                </div>
            </div>

            <div class="profile-options">
                <RouterLink to="/login/administrador" class="profile-btn">
                    <div class="profile-icon">
                        <i class="fa-solid fa-user-shield"></i>
                    </div>
                    <div class="profile-info">
                        <span class="profile-title">Administrador</span>
                        <span class="profile-desc"
                            >Gestión institucional y padrón.</span
                        >
                    </div>
                    <i class="fa-solid fa-chevron-right arrow-icon"></i>
                </RouterLink>

                <RouterLink to="/login/profesor" class="profile-btn">
                    <div class="profile-icon">
                        <img src="/profesor.png" alt="Profesor" />
                    </div>
                    <div class="profile-info">
                        <span class="profile-title">Profesor</span>
                        <span class="profile-desc"
                            >Tus cursos, contenidos y notas.</span
                        >
                    </div>
                    <i class="fa-solid fa-chevron-right arrow-icon"></i>
                </RouterLink>

                <RouterLink to="/login/alumno" class="profile-btn">
                    <div class="profile-icon">
                        <img src="/gorro.png" alt="Alumno" />
                    </div>
                    <div class="profile-info">
                        <span class="profile-title">Alumno</span>
                        <span class="profile-desc"
                            >Tus cursos y recursos académicos.</span
                        >
                    </div>
                    <i class="fa-solid fa-chevron-right arrow-icon"></i>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
// Lógica de enrutamiento manejada directamente por los RouterLinks
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css");

/* =========================================
   ESTILOS BASE DE LA PLANTILLA VERTICAL
========================================= */
.auth-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f4f5f7;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.auth-card {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.auth-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
}

.logo-dot {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #cd322c;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
}

.brand-text h1 {
    margin: 0;
    font-size: 18px;
    color: #111827;
}

.brand-text p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #6b7280;
}

/* =========================================
   NUEVOS ESTILOS ADAPTADOS AL FORMATO
========================================= */

.hero-section {
    text-align: center;
    margin-bottom: 24px;
}

.hero-image {
    width: 100%;
    max-width: 280px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;
}

.welcome-text h2 {
    font-size: 20px;
    color: #111827;
    margin: 0 0 6px 0;
}

.welcome-text p {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
}

.profile-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* Estilo de los botones de perfil emulando los "fields" */
.profile-btn {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #ffffff;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
}

.profile-btn:hover {
    border-color: #cd322c;
    background-color: #fef2f2;
    box-shadow: 0 0 0 3px rgba(205, 50, 44, 0.05);
    transform: translateY(-2px);
}

.profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #f4f5f7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 18px;
    color: #4b5563;
    flex-shrink: 0;
}

.profile-icon img {
    max-width: 24px;
    max-height: 24px;
}

.profile-btn:hover .profile-icon {
    background: #ffffff;
    color: #cd322c;
}

.profile-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.profile-title {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 2px;
}

.profile-desc {
    font-size: 11px;
    color: #6b7280;
}

.arrow-icon {
    font-size: 12px;
    color: #9ca3af;
    transition: 0.2s;
}

.profile-btn:hover .arrow-icon {
    color: #cd322c;
    transform: translateX(3px);
}
</style>
