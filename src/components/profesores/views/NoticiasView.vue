<template>
  <section class="tab-panel active">
    <div class="tab-toolbar">
      <div class="tab-toolbar-left">
        <h2 class="section-title"><i class="fas fa-newspaper"></i> Noticias y Comunicados</h2>
      </div>
      <button class="btn-add-subject"><i class="fas fa-plus"></i> Redactar Noticia</button>
    </div>

    <div class="noticias-grid">
      <div class="noticia-empty" style="grid-column: 1/-1">
        <i class="fas fa-newspaper" style="font-size: 2rem; color: #cbd5e1"></i>
        <p>Aún no has publicado ninguna noticia. Usa el botón <strong>Redactar Noticia</strong>.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped src="../profesores.css"></style>
