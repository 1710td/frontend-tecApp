<template>
  <main class="main-content" id="inicio-alumno">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <span class="hero-badge"> <i class="fas fa-sparkles"></i> Panel del Alumno </span>
        <h1>¡Bienvenido a<br />Gestión Escolar!</h1>
        <p>
          Nos alegra tenerte aquí. Este es tu espacio para enterarte de las nuevas noticias, revisar tus horarios, recuperar objetos
          perdidos y más, de la comunidad Técnica 2.
        </p>
        <div class="hero-accent"></div>
      </div>
      <div class="hero-image">
        <img src="/escuelita.png" alt="Escuela" />
      </div>
    </section>

    <!-- Info Banner -->
    <section class="info-box">
      <div class="info-left">
        <div class="icon-circle">
          <i class="fa-solid fa-shield-heart"></i>
        </div>
        <div>
          <h3>Estamos aquí para ayudarte</h3>
          <p>Usa las herramientas del menú para explorar categorías. Ante cualquier duda consultale a Pixelina.</p>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-consultar-inicio">
        <i class="fas fa-comment-dots"></i>
        Consultar ahora
      </button>
    </section>

    <!-- Quick Action Cards -->
    <section class="cards">
      <div class="card card-orange">
        <div class="card-icon">
          <img src="/cajita2.png" alt="Objetos" />
        </div>
        <div class="card-body">
          <h3>Encuentra objetos</h3>
          <p>Navega por las categorías y descubre lo que has perdido.</p>
        </div>
        <RouterLink to="/alumno/objetos-perdidos" class="card-link card-link-orange">
          Ver objetos <i class="fas fa-arrow-right"></i>
        </RouterLink>
      </div>

      <div class="card card-blue">
        <div class="card-icon">
          <span class="card-emoji">🔔</span>
        </div>
        <div class="card-body">
          <h3>Mantente informado</h3>
          <p>Consulta las últimas noticias y avisos importantes.</p>
        </div>
        <RouterLink to="/alumno/noticias" class="card-link card-link-blue"> Ver noticias <i class="fas fa-arrow-right"></i> </RouterLink>
      </div>

      <div class="card card-green">
        <div class="card-icon">
          <span class="card-emoji">📖</span>
        </div>
        <div class="card-body">
          <h3>Recursos y aprendizaje</h3>
          <p>Accede a materiales y recursos disponibles para ti.</p>
        </div>
        <a href="#" class="card-link card-link-green"> Ir a biblioteca <i class="fas fa-arrow-right"></i> </a>
      </div>

      <div class="card card-purple">
        <div class="card-icon">
          <span class="card-emoji">🎓</span>
        </div>
        <div class="card-body">
          <h3>Tus cursos</h3>
          <p>Revisa tus cursos y accede a su información.</p>
        </div>
        <RouterLink to="/alumno/cursos" class="card-link card-link-purple"> Ver cursos <i class="fas fa-arrow-right"></i> </RouterLink>
      </div>
    </section>

    <!-- Footer Banner -->
    <section class="footer-box">
      <div class="footer-left">
        <div class="footer-icon">
          <i class="fa-solid fa-hand-holding-heart"></i>
        </div>
        <div>
          <h3>Gracias por ser parte de nuestra comunidad</h3>
          <p>Tu colaboración ayuda a mantener nuestra escuela unida y organizada.</p>
        </div>
      </div>
      <div class="footer-text">¡Juntos hacemos la T2!</div>
    </section>
  </main>
</template>

<style scoped>
.main-content {
  flex: 1;
  padding: 28px 32px;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #fefefe 0%, #faf7f5 100%);
  border-radius: var(--radius-xl, 24px);
  padding: 44px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  border: 1px solid #f0ece8;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-primary-light, #ffe9e9);
  color: var(--color-primary, #ca0d0d);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 0.3px;
}
.hero-text h1 {
  font-size: 2.6rem;
  color: var(--color-text, #1e2430);
  margin-bottom: 16px;
  line-height: 1.15;
  letter-spacing: -0.5px;
}
.hero-text p {
  color: var(--color-text-secondary, #666);
  max-width: 560px;
  font-size: 1rem;
  line-height: 1.7;
}
.hero-accent {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary, #ca0d0d), #ff6b6b);
  margin-top: 24px;
  border-radius: 10px;
}
.hero-image img {
  width: 340px;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
}

/* Info Banner */
.info-box {
  margin-top: 24px;
  background: linear-gradient(135deg, #fff5f5 0%, #fff0f0 100%);
  border: 1px solid #fde2e2;
  border-radius: var(--radius-lg, 20px);
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.info-left {
  display: flex;
  align-items: center;
  gap: 18px;
}
.icon-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #ffd4d4, #ffc0c0);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary, #ca0d0d);
  font-size: 22px;
  flex-shrink: 0;
}
.info-left h3 {
  font-size: 1.05rem;
  margin-bottom: 4px;
  color: var(--color-text, #1e2430);
}
.info-left p {
  color: var(--color-text-secondary, #666);
  font-size: 0.88rem;
}
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.btn-primary {
  background: var(--color-surface, #fff);
  border: 2px solid #fca5a5;
  color: var(--color-primary, #ca0d0d);
}
.btn-primary:hover {
  background: var(--color-primary, #ca0d0d);
  color: #fff;
  border-color: var(--color-primary, #ca0d0d);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(202, 13, 13, 0.25);
}

/* Cards Grid */
.cards {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.card {
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 20px);
  padding: 28px 20px 20px;
  text-align: center;
  border: 1px solid var(--color-border, #efefef);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  position: relative;
  overflow: hidden;
}
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 20px 20px 0 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.06));
}
.card:hover::before {
  opacity: 1;
}

/* Card color variants */
.card-orange::before {
  background: linear-gradient(90deg, #f2994a, #ff6b00);
}
.card-blue::before {
  background: linear-gradient(90deg, #4f7cff, #2563eb);
}
.card-green::before {
  background: linear-gradient(90deg, #74b93f, #16a34a);
}
.card-purple::before {
  background: linear-gradient(90deg, #9b51e0, #7c3aed);
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.card-orange .card-icon {
  background: #fff4eb;
}
.card-blue .card-icon {
  background: #eef3ff;
}
.card-green .card-icon {
  background: #f0f9eb;
}
.card-purple .card-icon {
  background: #f5edff;
}

.card-icon img {
  max-width: 48px;
  max-height: 48px;
}
.card-emoji {
  font-size: 34px;
  line-height: 1;
}
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.card h3 {
  font-size: 1.08rem;
  margin-bottom: 8px;
  color: var(--color-text, #1e2430);
}
.card p {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 18px;
  line-height: 1.5;
  flex: 1;
}

/* Card link buttons */
.card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 2px solid;
}
.card-link i {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}
.card-link:hover i {
  transform: translateX(3px);
}
.card-link-orange {
  border-color: #ffd4a8;
  color: #e27d2a;
  background: #fffaf5;
}
.card-link-orange:hover {
  background: #fff4eb;
}
.card-link-blue {
  border-color: #b7d1ff;
  color: #4f7cff;
  background: #f8fbff;
}
.card-link-blue:hover {
  background: #eef3ff;
}
.card-link-green {
  border-color: #b8e59f;
  color: #4d9a1f;
  background: #f8fcf5;
}
.card-link-green:hover {
  background: #f0f9eb;
}
.card-link-purple {
  border-color: #d5bbff;
  color: #8b3fd4;
  background: #faf5ff;
}
.card-link-purple:hover {
  background: #f5edff;
}

/* Footer Banner */
.footer-box {
  margin-top: 28px;
  background: linear-gradient(135deg, #fff5f5 0%, #fef0f0 100%);
  border: 1px solid #fde2e2;
  border-radius: var(--radius-lg, 20px);
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
}
.footer-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #ffd4d4, #ffc0c0);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-primary, #ca0d0d);
  flex-shrink: 0;
}
.footer-left h3 {
  font-size: 1.15rem;
  margin-bottom: 6px;
  color: var(--color-text, #1e2430);
}
.footer-left p {
  color: var(--color-text-secondary, #666);
  font-size: 0.9rem;
}
.footer-text {
  font-size: 1.8rem;
  color: var(--color-primary, #ca0d0d);
  font-weight: 800;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 1200px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 32px 28px;
  }
  .hero-text p {
    max-width: 100%;
  }
  .hero-accent {
    margin: 20px auto 0;
  }
  .hero-image img {
    width: 260px;
  }
  .info-box {
    flex-direction: column;
    text-align: center;
  }
  .info-left {
    flex-direction: column;
  }
  .footer-box {
    flex-direction: column;
    text-align: center;
  }
  .footer-left {
    flex-direction: column;
  }
}
@media (max-width: 700px) {
  .main-content {
    padding: 20px 16px;
  }
  .cards {
    grid-template-columns: 1fr;
  }
  .hero-text h1 {
    font-size: 1.8rem;
  }
  .footer-text {
    font-size: 1.4rem;
  }
}
</style>
