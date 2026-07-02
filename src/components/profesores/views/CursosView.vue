<template>
  <section class="tab-panel active">
    <div class="tab-toolbar">
      <div class="tab-toolbar-left">
        <h2 class="section-title"><i class="fas fa-graduation-cap"></i> Mis Cursos Asignados</h2>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Materia</th>
            <th>Cant. Alumnos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              <div class="empty-state">
                <i class="fas fa-users-slash empty-icon"></i>
                <p>No hay cursos asignados para este periodo lectivo.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped src="../profesores.css"></style>
