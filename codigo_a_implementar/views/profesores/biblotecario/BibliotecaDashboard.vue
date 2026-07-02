<template>
  <div class="dashboard-container">
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Libros</h3>
        <p>{{ cantidadLibros }}</p>
      </div>
      <div class="stat-card">
        <h3>Recursos</h3>
        <p>{{ cantidadRecursos }}</p>
      </div>
      <div class="stat-card">
        <h3>Prestados</h3>
        <p>{{ cantidadPrestados }}</p>
      </div>
      <div class="stat-card">
        <h3>Pendientes</h3>
        <p>{{ cantidadPendientes }}</p>
      </div>
    </div>

    <div class="solicitudes-section">
      <h2>Solicitudes Pendientes</h2>
      <div v-if="solicitudesPendientes.length === 0">
        <p>No hay solicitudes pendientes.</p>
      </div>
      <div v-else>
        <div v-for="prestamo in solicitudesPendientes" :key="prestamo.libro || prestamo.nombre" class="item-reciente">
          <strong>{{ prestamo.libro || prestamo.nombre }}</strong>
          <p>{{ prestamo.usuario }}</p>
          <button class="loan-btn" @click="aprobarPrestamo(prestamo.libro || prestamo.nombre)">
            Aprobar
          </button>
        </div>
      </div>
    </div>

    <div class="ultimos-section">
      <h2>Últimos Agregados</h2>
      <div v-if="ultimosAgregados.length === 0">
        <p>No hay elementos cargados.</p>
      </div>
      <div v-else>
        <div v-for="item in ultimosAgregados" :key="item.nombre" class="loan-card">
          <h3>{{ item.nombre }}</h3>
          <p>{{ item.tipo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BibliotecaDashboard',
  data() {
    return {
      libros: [],
      recursos: [],
      prestamos: [],
      userName: 'Bibliotecario'
    };
  },
  computed: {
    cantidadLibros() {
      return this.libros.length;
    },
    cantidadRecursos() {
      return this.recursos.length;
    },
    cantidadPrestados() {
      return this.prestamos.filter(p => p.estado === 'Prestado').length;
    },
    cantidadPendientes() {
      return this.prestamos.filter(p => p.estado === 'Pendiente').length;
    },
    solicitudesPendientes() {
      return this.prestamos.filter(p => p.estado === 'Pendiente');
    },
    ultimosAgregados() {
      let ultimos = [];
      this.libros.forEach(libro => {
        ultimos.push({ nombre: libro.titulo, tipo: '📖 Libro' });
      });
      this.recursos.forEach(recurso => {
        ultimos.push({ nombre: recurso.nombre, tipo: '📦 Recurso' });
      });
      return ultimos.reverse().slice(0, 5);
    }
  },
  created() {
    this.cargarDatos();
  },
  methods: {
    cargarDatos() {
      this.libros = JSON.parse(localStorage.getItem('libros')) || [];
      this.recursos = JSON.parse(localStorage.getItem('recursos')) || [];
      this.prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];
      this.userName = localStorage.getItem('userName') || 'Bibliotecario';
    },
    aprobarPrestamo(nombre) {
      this.prestamos.forEach(prestamo => {
        if ((prestamo.libro || prestamo.nombre) === nombre) {
          prestamo.estado = 'Prestado';
        }
      });

      this.libros.forEach(libro => {
        if (libro.titulo === nombre) {
          libro.estado = 'Prestado';
        }
      });

      this.recursos.forEach(recurso => {
        if (recurso.nombre === nombre) {
          recurso.estado = 'Prestado';
        }
      });

      localStorage.setItem('prestamos', JSON.stringify(this.prestamos));
      localStorage.setItem('libros', JSON.stringify(this.libros));
      localStorage.setItem('recursos', JSON.stringify(this.recursos));
      
      this.cargarDatos();
    }
  }
};
</script>

<style scoped>
/* Colocá acá los estilos CSS correspondientes a esta interfaz */
</style>