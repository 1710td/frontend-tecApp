<template>
  <main class="content">
    <header class="page-header">
      <div class="page-header-text">
        <h1><i class="fas fa-graduation-cap header-icon"></i> Mis Materias</h1>
        <p>Revisá tus materias, los materiales subidos por tus profesores y los comunicados del curso.</p>
      </div>
    </header>

    <section class="stats">
      <div class="stat-card stat-red">
        <div class="stat-icon"><i class="fas fa-book-open"></i></div>
        <div class="stat-info">
          <p>Mis Materias</p>
          <h3>{{ materias.length }}</h3>
        </div>
      </div>
      <div class="stat-card stat-green">
        <div class="stat-icon"><i class="fas fa-bullhorn"></i></div>
        <div class="stat-info">
          <p>Comunicados</p>
          <h3>{{ comunicados.length }}</h3>
        </div>
      </div>
    </section>

    <div class="tabs-bar">
      <button class="tab-btn" :class="{ active: tabActivo === 'materias' }" @click="tabActivo = 'materias'">
        <i class="fas fa-table"></i> Mis Materias
      </button>
      <button class="tab-btn" :class="{ active: tabActivo === 'comunicados' }" @click="tabActivo = 'comunicados'">
        <i class="fas fa-bullhorn"></i> Comunicados
      </button>
    </div>

    <section v-show="tabActivo === 'materias'" class="tab-content">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>MATERIA</th>
              <th>HORARIO</th>
              <th>DÍAS</th>
              <th>PROFESOR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in materias" :key="m.id">
              <td>
                <strong>{{ m.nombre || m.materia }}</strong>
              </td>
              <td>{{ m.horario }}</td>
              <td>{{ m.dias }}</td>
              <td>{{ m.profesor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-show="tabActivo === 'comunicados'" class="tab-content">
      <div v-for="c in comunicados" :key="c.id" class="comunicado-card" :class="{ abierto: c.abierto }">
        <div class="comunicado-header" @click="c.abierto = !c.abierto">
          <div class="comunicado-header-left">
            <div class="comunicado-icono">
              <i class="fas fa-bullhorn"></i>
            </div>
            <div>
              <div class="comunicado-titulo">{{ c.titulo }}</div>
              <div class="comunicado-meta">{{ c.fecha }} · {{ c.profesor }}</div>
            </div>
          </div>
          <i class="fas fa-chevron-down comunicado-toggle"></i>
        </div>
        <div class="comunicado-cuerpo">
          <p>{{ c.contenido }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerMisMaterias, obtenerComunicados } from "@/services/academico-service.js";

const tabActivo = ref("materias");
const materias = ref([]);
const comunicados = ref([]);

const cargarDatos = async () => {
  try {
    // Intentar traer de servicio (o usar las estáticas por defecto)
    const dataMaterias = await obtenerMisMaterias();
    const dataComunicados = await obtenerComunicados();

    // Si la data está vacía, usamos las estáticas
    materias.value = dataMaterias.length > 0 ? dataMaterias : materiasEstaticas;
    comunicados.value =
      dataComunicados.length > 0
        ? dataComunicados.map((c) => ({ ...c, abierto: false }))
        : comunicadosEstaticos.map((c) => ({ ...c, abierto: false }));
  } catch (error) {
    console.log("Usando datos estáticos por error en servicio:", error);
    materias.value = materiasEstaticas;
    comunicados.value = comunicadosEstaticos.map((c) => ({
      ...c,
      abierto: false,
    }));
  }
};

// Data estática de ejemplo
const materiasEstaticas = [
  {
    id: 1,
    materia: "Matemática",
    horario: "08:00 - 09:30",
    dias: "Lun / Mié",
    profesor: "Prof. García",
  },
  {
    id: 2,
    materia: "Lengua",
    horario: "10:00 - 11:30",
    dias: "Mar / Jue",
    profesor: "Prof. Martínez",
  },
  {
    id: 3,
    materia: "Historia",
    horario: "13:00 - 14:30",
    dias: "Vie",
    profesor: "Prof. López",
  },
];

const comunicadosEstaticos = [
  {
    id: 1,
    titulo: "Entrega de Proyectos",
    fecha: "2026-07-01",
    profesor: "Prof. García",
    contenido: "Recuerden que el plazo máximo para subir el archivo final es el viernes.",
  },
  {
    id: 2,
    titulo: "Suspensión de clases",
    fecha: "2026-06-28",
    profesor: "Administración",
    contenido: "Debido a tareas de mantenimiento, no habrá clases el próximo lunes.",
  },
];

onMounted(cargarDatos);
</script>
<style scoped>
.content {
  flex: 1;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-bg, #f5f6fa);
}
.page-header {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 24px;
}
.page-header h1 {
  font-size: 2rem;
  color: #1e2430;
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-icon {
  color: #ca0d0d;
}
.page-header p {
  color: #666;
  font-size: 14px;
  margin-top: 6px;
  margin-left: 46px;
}

.stats {
  display: flex;
  gap: 18px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 24px;
}
.stat-card {
  background: #fff;
  flex: 1;
  padding: 20px 24px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #efefef;
  border-left: 4px solid transparent;
  transition: transform 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
}
.stat-red {
  border-left-color: #ca0d0d;
}
.stat-green {
  border-left-color: #38a169;
}
.stat-icon {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.stat-red .stat-icon {
  background: #ffe9e9;
  color: #ca0d0d;
}
.stat-green .stat-icon {
  background: #f0fff4;
  color: #38a169;
}
.stat-info p {
  font-size: 13px;
  color: #888;
  margin-bottom: 2px;
}
.stat-info h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e2430;
}

.tabs-bar {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 16px;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border: 2px solid #efefef;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #fff;
  color: #888;
  transition: all 0.2s;
}
.tab-btn.active {
  background: #ca0d0d;
  color: #fff;
  border-color: #ca0d0d;
  box-shadow: 0 4px 12px rgba(202, 13, 13, 0.25);
}
.tab-content {
  width: 100%;
  max-width: 1000px;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.table-container {
  background: #fff;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #efefef;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  color: #999;
  font-size: 0.78rem;
  text-transform: uppercase;
  padding: 12px 14px;
  border-bottom: 2px solid #f0f0f0;
  text-align: left;
}
td {
  padding: 14px;
  border-bottom: 1px solid #f5f5f5;
  color: #444;
  font-size: 14px;
}
tr:hover td {
  background: #fafafa;
}

.comunicado-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid #efefef;
  margin-bottom: 14px;
  border-left: 4px solid #ca0d0d;
}
.comunicado-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
}
.comunicado-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.comunicado-icono {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #ffe9e9;
  color: #ca0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comunicado-titulo {
  font-size: 15px;
  font-weight: 700;
}
.comunicado-meta {
  font-size: 12px;
  color: #aaa;
}
.comunicado-toggle {
  transition: transform 0.3s ease;
  color: #aaa;
  font-size: 13px;
}
.comunicado-card.abierto .comunicado-toggle {
  transform: rotate(180deg);
}
.comunicado-cuerpo {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 20px;
}
.comunicado-card.abierto .comunicado-cuerpo {
  max-height: 600px;
  padding: 16px 20px 20px;
  border-top: 1px solid #f5f5f5;
}
</style>
