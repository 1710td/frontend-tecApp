<template>
  <section class="tab-panel active">
    <div class="tab-toolbar">
      <div class="tab-toolbar-left">
        <h2 class="section-title"><i class="fas fa-newspaper"></i> Noticias y Comunicados</h2>
      </div>
      <button class="btn-add-subject" @click="mostrarRedactar = true"><i class="fas fa-plus"></i> Redactar Noticia</button>
    </div>

    <div class="noticias-grid">
      <div v-for="n in noticias" :key="n.id_noticia" class="noticia-card-prof">
        <h3>{{ n.titulo }}</h3>
        <p>{{ n.contenido }}</p>
        <span class="fecha-lbl">{{ new Date(n.fecha).toLocaleDateString() }}</span>
        <button class="btn-delete-noticia" @click="eliminarNoticia(n.id_noticia)"><i class="fas fa-trash"></i> Eliminar</button>
      </div>
      <div v-if="noticias.length === 0" class="noticia-empty" style="grid-column: 1/-1">
        <i class="fas fa-newspaper" style="font-size: 2rem; color: #cbd5e1"></i>
        <p>Aún no has publicado ninguna noticia. Usa el botón <strong>Redactar Noticia</strong>.</p>
      </div>
    </div>

    <div v-if="mostrarRedactar" class="modal-overlay active" @click.self="mostrarRedactar = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Redactar Noticia</h3>
          <button class="close-modal" @click="mostrarRedactar = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Título</label>
            <input type="text" v-model="nuevaNoticia.titulo" placeholder="Ej: Feriado puente escolar" />
          </div>
          <div class="form-group" style="margin-top: 14px">
            <label>Contenido</label>
            <textarea v-model="nuevaNoticia.contenido" placeholder="Escribe el contenido aquí..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="mostrarRedactar = false">Cancelar</button>
          <button class="btn-submit" @click="publicarNoticia"><i class="fas fa-check"></i>&nbsp;Publicar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { obtenerNoticias, crearNoticia, eliminarNoticia as eliminarNoticiaApi } from "@/services/comunidad-service.js";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const noticias = ref([]);
const mostrarRedactar = ref(false);
const nuevaNoticia = reactive({ titulo: "", contenido: "" });

const cargarNoticias = async () => {
  try {
    const data = await obtenerNoticias();
    if (data) {
      noticias.value = data;
    }
  } catch (error) {
    console.error("Error al obtener noticias:", error);
  }
};

onMounted(cargarNoticias);

const publicarNoticia = async () => {
  if (!nuevaNoticia.titulo.trim() || !nuevaNoticia.contenido.trim()) return;
  try {
    await crearNoticia({
      titulo: nuevaNoticia.titulo.trim(),
      contenido: nuevaNoticia.contenido.trim(),
      autor_id: authStore.usuario?.id || 1,
    });
    alert("Noticia publicada correctamente.");
    nuevaNoticia.titulo = "";
    nuevaNoticia.contenido = "";
    mostrarRedactar.value = false;
    await cargarNoticias();
  } catch (error) {
    alert("Error al publicar la noticia.");
  }
};

const eliminarNoticia = async (id) => {
  if (confirm("¿Estás seguro de eliminar esta noticia?")) {
    try {
      await eliminarNoticiaApi(id);
      await cargarNoticias();
    } catch (error) {
      alert("Error al eliminar la noticia.");
    }
  }
};
</script>

<style scoped src="../profesores.css"></style>
