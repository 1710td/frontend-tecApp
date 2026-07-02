<template>
  <section class="tab-panel active">

    <!-- Stats rápidas -->
    <div class="inicio-stats">
      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-users"></i></div>
        <div class="stat-body">
          <span class="stat-num">—</span>
          <span class="stat-lbl">Alumnos a cargo</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--blue"><i class="fas fa-book-open"></i></div>
        <div class="stat-body">
          <span class="stat-num">—</span>
          <span class="stat-lbl">Materias activas</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--green"><i class="fas fa-calendar-check"></i></div>
        <div class="stat-body">
          <span class="stat-num">—</span>
          <span class="stat-lbl">Clases esta semana</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--amber"><i class="fas fa-clipboard-list"></i></div>
        <div class="stat-body">
          <span class="stat-num">—</span>
          <span class="stat-lbl">Asistencias pendientes</span>
        </div>
      </div>
    </div>

    <!-- Grilla principal -->
    <div class="inicio-grid">
      <div class="info-card">
        <div class="info-card-header">
          <i class="fas fa-bullhorn"></i>
          <h3>Avisos Recientes</h3>
        </div>
        <div class="empty-state">
          <i class="fas fa-bell-slash empty-icon"></i>
          <p>No hay avisos pendientes.</p>
        </div>
      </div>

      <div class="info-card">
        <div class="info-card-header">
          <i class="fas fa-calendar-alt"></i>
          <h3>Próximas Clases</h3>
        </div>
        <div class="empty-state">
          <i class="fas fa-calendar-times empty-icon"></i>
          <p>No hay clases programadas hoy.</p>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
</script>

<style scoped src="../profesores.css"></style>

<style scoped>
.inicio-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.07);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.stat-card:hover {
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  transform: translateY(-2px);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(192, 21, 42, 0.1);
  color: #c0152a;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.stat-icon--blue { background: #eff6ff; color: #3b82f6; }
.stat-icon--green { background: #f0fdf4; color: #16a34a; }
.stat-icon--amber { background: #fffbeb; color: #d97706; }
.stat-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  line-height: 1;
}
.stat-lbl {
  font-size: 0.82rem;
  color: #6b7280;
  font-weight: 500;
}
.inicio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
@media (max-width: 900px) {
  .inicio-stats { grid-template-columns: repeat(2, 1fr); }
  .inicio-grid  { grid-template-columns: 1fr; }
}
@media (max-width: 500px) {
  .inicio-stats { grid-template-columns: 1fr; }
}
</style>
