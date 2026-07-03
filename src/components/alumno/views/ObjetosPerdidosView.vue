<template>
  <main class="main-content">
    <section class="title-section">
      <div class="caja"><img src="/cajita2.png" alt="caja" /></div>
      <div>
        <h1>Objetos Perdidos</h1>
        <p>Explora las categorías para encontrar objetos perdidos.</p>
      </div>
      <img src="/cosas.png" alt="Cosas" class="cosas-img" />
    </section>

    <section class="cards">
      <div class="card red">
        <img src="/remera.png" alt="remera" />
        <div class="card-content">
          <h3>Ropa</h3>
          <p>Camperas, uniformes, bufandas...</p>
          <button class="btn-cat btn-cat-red">Ver objetos <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <div class="card yellow">
        <img src="/lapiz.png" alt="lapiz" />
        <div class="card-content">
          <h3>Útiles</h3>
          <p>Cartucheras, libros, mochilas...</p>
          <button class="btn-cat btn-cat-yellow">Ver objetos <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <div class="card blue">
        <img src="/celu.png" alt="celular" />
        <div class="card-content">
          <h3>Dispositivos</h3>
          <p>Calculadoras, celulares, tablets...</p>
          <button class="btn-cat btn-cat-blue">Ver objetos <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <div class="card green">
        <img src="/llave.png" alt="llave" />
        <div class="card-content">
          <h3>Otros Objetos</h3>
          <p>Llaves, termos, lentes...</p>
          <button class="btn-cat btn-cat-green">Ver objetos <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </section>

    <section class="help-box">
      <div>
        <h4>¿Perdiste algo?</h4>
        <p>Revisa las categorías o acércate a preceptoría para más ayuda.</p>
      </div>
      <button class="btn-reportar" @click="reportarNuevoObjeto">Reportar objeto perdido</button>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerObjetosPerdidos, reportarObjetoPerdido } from "@/services/comunidad-service.js";

const listaObjetos = ref([]);

onMounted(async () => {
  try {
    const data = await obtenerObjetosPerdidos();
    if (data) {
      listaObjetos.value = data;
    }
  } catch (error) {
    console.error("Error al obtener objetos perdidos:", error);
  }
});

const reportarNuevoObjeto = async () => {
  const nombre = prompt("Nombre del objeto:");
  const descripcion = prompt("Descripción:");
  const categoria = prompt("Categoría (Ropa, Útiles, Dispositivos, Otros):");
  if (!nombre || !descripcion || !categoria) return;

  try {
    await reportarObjetoPerdido({
      nombre,
      descripcion,
      categoria,
      estado: "perdido",
      fecha_registro: new Date(),
    });
    alert("Objeto reportado correctamente.");
    const data = await obtenerObjetosPerdidos();
    listaObjetos.value = data;
  } catch (error) {
    alert("Error al reportar objeto.");
  }
};
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 28px 32px;
  background: var(--color-bg, #f5f6fa);
}

.title-section {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #f8f8fb;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 25px;
}
.title-section h1 {
  font-size: 38px;
  margin-bottom: 5px;
  color: #1e2430;
}
.title-section p {
  color: #666;
}
.caja img {
  width: 70px;
}
.cosas-img {
  margin-left: auto;
  width: 180px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}
.card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 5px solid transparent;
}
.card:hover {
  transform: translateY(-4px);
}
.card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}
.card.red {
  border-color: #dc2626;
}
.card.yellow {
  border-color: #d97706;
}
.card.blue {
  border-color: #2563eb;
}
.card.green {
  border-color: #16a34a;
}
.card-content h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #1e2430;
}
.card-content p {
  color: #777;
  font-size: 14px;
  margin-bottom: 15px;
}
.card-content button,
.btn-cat {
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn-cat i {
  font-size: 12px;
  transition: transform 0.2s;
}
.btn-cat:hover i {
  transform: translateX(3px);
}
.btn-cat-red {
  border-color: #fca5a5;
  color: #dc2626;
}
.btn-cat-red:hover {
  background: #fef2f2;
}
.btn-cat-yellow {
  border-color: #fcd34d;
  color: #d97706;
}
.btn-cat-yellow:hover {
  background: #fffbeb;
}
.btn-cat-blue {
  border-color: #93c5fd;
  color: #2563eb;
}
.btn-cat-blue:hover {
  background: #eff6ff;
}
.btn-cat-green {
  border-color: #86efac;
  color: #16a34a;
}
.btn-cat-green:hover {
  background: #f0fdf4;
}

.help-box {
  background: #fff4f4;
  border: 1px solid #ffdede;
  border-radius: 20px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.help-box h4 {
  font-size: 20px;
  margin-bottom: 6px;
  color: #1e2430;
}
.help-box p {
  color: #666;
  font-size: 14px;
}
.btn-reportar {
  background: #dc2626;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}
.btn-reportar:hover {
  background: #b91c1c;
}

@media (max-width: 1100px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .cosas-img {
    display: none;
  }
}
@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;
  }
  .help-box {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
