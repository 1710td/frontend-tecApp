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
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Title Section ────────────────────────── */
.title-section {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #fdf8f8 100%);
  padding: 28px 36px;
  border-radius: 22px;
  border: 1px solid #f0e8e8;
  box-shadow: 0 6px 24px rgba(192, 21, 42, 0.04), 0 1px 4px rgba(15,23,42,0.04);
  position: relative;
  overflow: hidden;
}

.title-section::after {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(192,21,42,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.title-section h1 {
  font-size: 2.2rem;
  margin-bottom: 6px;
  color: #0f172a;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.title-section p {
  color: #64748b;
  font-size: 1rem;
}

.caja img {
  width: 72px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.cosas-img {
  margin-left: auto;
  width: 180px;
  opacity: 0.85;
  animation: floatY 4s ease-in-out infinite;
}

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ── Cards Grid ───────────────────────────── */
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  background: #fff;
  border-radius: 22px;
  padding: 24px 20px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 5px solid transparent;
  border-left: 1px solid #e8edf2;
  border-right: 1px solid #e8edf2;
  border-bottom: 1px solid #e8edf2;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.10);
}

.card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.card:hover img { transform: scale(1.06); }

.card.red   { border-top-color: #dc2626; }
.card.yellow{ border-top-color: #d97706; }
.card.blue  { border-top-color: #2563eb; }
.card.green { border-top-color: #16a34a; }

.card-content h3 {
  font-size: 1.15rem;
  margin-bottom: 8px;
  color: #0f172a;
  font-weight: 700;
}

.card-content p {
  color: #94a3b8;
  font-size: 0.88rem;
  margin-bottom: 18px;
  line-height: 1.5;
}

.btn-cat {
  padding: 10px 20px;
  border-radius: 50px;
  border: 2px solid;
  cursor: pointer;
  font-weight: 700;
  font-size: 13.5px;
  transition: all 0.25s ease;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.btn-cat i {
  font-size: 11px;
  transition: transform 0.2s ease;
}

.btn-cat:hover i { transform: translateX(4px); }

.btn-cat-red    { border-color: #fca5a5; color: #dc2626; }
.btn-cat-red:hover { background: #fef2f2; }

.btn-cat-yellow { border-color: #fde68a; color: #d97706; }
.btn-cat-yellow:hover { background: #fffbeb; }

.btn-cat-blue   { border-color: #93c5fd; color: #2563eb; }
.btn-cat-blue:hover { background: #eff6ff; }

.btn-cat-green  { border-color: #86efac; color: #16a34a; }
.btn-cat-green:hover { background: #f0fdf4; }

/* ── Help Box ─────────────────────────────── */
.help-box {
  background: linear-gradient(135deg, #fff5f5 0%, #fef0f0 100%);
  border: 1px solid #fde0e0;
  border-radius: 20px;
  padding: 26px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 14px rgba(192, 21, 42, 0.06);
  gap: 20px;
}

.help-box h4 {
  font-size: 1.2rem;
  margin-bottom: 6px;
  color: #0f172a;
  font-weight: 700;
}

.help-box p { color: #64748b; font-size: 0.9rem; }

.btn-reportar {
  background: linear-gradient(135deg, #c0152a, #a81124);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(192, 21, 42, 0.25);
}

.btn-reportar:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(192, 21, 42, 0.3);
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 1100px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .cosas-img { display: none; }
}

@media (max-width: 600px) {
  .main-content { padding: 16px; }
  .cards { grid-template-columns: 1fr; }
  .help-box { flex-direction: column; text-align: center; }
  .title-section h1 { font-size: 1.6rem; }
}
</style>
