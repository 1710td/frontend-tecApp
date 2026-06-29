<template>
  
  <!-- ══ NAVBAR ══════════════════════════════════════════ -->
  <nav class="navbar">
    <div class="nav-izquierda">
      <div class="logo">
        <img src="/logoEscuela.png" width="48" height="48" alt="Logo" />
        <div class="logo-titulo">
          <h2>Gestión Escolar</h2>
          <p>Panel docente</p>
        </div>
      </div>
    </div>

    <div class="profile-container" ref="profileContainer">
      <button class="profile-trigger" @click.stop="toggleProfileMenu">
        <img :src="avatarUrl" alt="Avatar" />
      </button>
      <div class="profile-menu" :class="{ active: profileMenuOpen }">
        <div class="menu-header">
          <img :src="avatarUrlLarge" class="large-avatar" alt="Avatar grande" />
          <p class="user-name">{{ userName }}</p>
          <p class="user-email">{{ userEmail }}</p>
        </div>
        <hr />
        <div class="menu-body">
          <p class="user-role">Rol: <span id="roleBadge">Profesor</span></p>
          <a href="#" class="menu-item"><i class="fas fa-user-cog"></i> Mi Perfil</a>
          <a href="#" class="menu-item"><i class="fas fa-book"></i> Mis Cursos</a>
        </div>
        <hr />
        <button class="sign-out-btn" @click="cerrarSesion">
          <i class="fas fa-right-from-bracket"></i>&nbsp;Cerrar sesión
        </button>
      </div>
    </div>
  </nav>


      <div class="container">
    <!-- ── Sidebar ─────────────────────────────────── -->
    <aside class="sidebar">
  <ul>
    <RouterLink to="/inicio">        <li><i class="fas fa-home"></i> Inicio</li></RouterLink>
    <RouterLink to="/noticias">      <li><i class="fas fa-newspaper"></i> Noticias</li></RouterLink>
    <RouterLink to="/biblioteca">    <li><i class="fas fa-book"></i> Biblioteca</li></RouterLink>
    <RouterLink to="/objetos-perdidos"><li><i class="fas fa-box"></i> Objetos Perdidos</li></RouterLink>
    <RouterLink to="/cursosProfesor"><li class="active"><i class="fas fa-graduation-cap"></i> Cursos</li></RouterLink>
  </ul>
  
      <div class="sidebar-help">
        <i class="fas fa-circle-question"></i>
        <div>
          <p class="help-title">¿Necesitás ayuda?</p>
          <p class="help-sub">Pixelina resolverá tu consulta.</p>
        </div>
      </div>
    </aside>

    <!-- ── Contenido principal ──────────────────────── -->
    <main class="main-content">

      <!-- Cabecera docente -->
      <header class="prof-header">
        <div class="prof-header-left">
          <div class="prof-avatar-wrap">
            <img :src="profAvatarUrl" alt="Avatar profesor" />
            <span class="prof-status-dot"></span>
          </div>
          <div class="prof-info">
            <p class="prof-label">DOCENTE ACTIVO</p>
            <h1>{{ userName }}</h1>
            <p class="prof-sub">{{ profSubtitulo }}</p>
          </div>
        </div>
        <div class="prof-header-stats">
          <div class="hs-item">
            <span class="hs-num">{{ cursosProfesor.length }}</span>
            <span class="hs-label">Cursos</span>
          </div>
          <div class="hs-divider"></div>
          <div class="hs-item">
            <span class="hs-num">{{ totalAlumnos }}</span>
            <span class="hs-label">Alumnos</span>
          </div>
          <div class="hs-divider"></div>
          <div class="hs-item">
            <span class="hs-num">{{ materiasProfesor.length }}</span>
            <span class="hs-label">Materias</span>
          </div>
        </div>
      </header>

      <!-- ══ TABS ══════════════════════════════════ -->
      <nav class="tabs-nav" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: tabActivo === tab.id }"
          @click="tabActivo = tab.id"
          role="tab"
        >
          <i :class="`fas ${tab.icon}`"></i> {{ tab.label }}
        </button>
      </nav>

      <!-- ══ TAB 1: INFORMACIÓN PERSONAL ══ -->
      <section v-show="tabActivo === 'info'" class="tab-panel active">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-header">
              <i class="fas fa-user"></i>
              <h3>Datos personales</h3>
            </div>
            <div class="info-fields">
              <div class="info-field"><span class="field-label">Nombre completo</span><span class="field-value">{{ userName }}</span></div>
              <div class="info-field"><span class="field-label">DNI</span><span class="field-value">{{ userDni || '—' }}</span></div>
              <div class="info-field"><span class="field-label">Correo institucional</span><span class="field-value">{{ userEmail }}</span></div>
              <div class="info-field"><span class="field-label">Teléfono</span><span class="field-value">{{ infoPersonal.telefono || '—' }}</span></div>
              <div class="info-field"><span class="field-label">Dirección</span><span class="field-value">{{ infoPersonal.direccion || '—' }}</span></div>
              <div class="info-field"><span class="field-label">Fecha de nacimiento</span><span class="field-value">{{ infoPersonal.nacimiento || '—' }}</span></div>
            </div>
            <button class="btn-edit-info" @click="abrirModalEditInfo"><i class="fas fa-pen"></i> Editar datos</button>
          </div>

          <div class="info-card">
            <div class="info-card-header">
              <i class="fas fa-briefcase"></i>
              <h3>Datos laborales</h3>
            </div>
            <div class="info-fields">
              <div class="info-field"><span class="field-label">Cargo</span><span class="field-value">Profesor</span></div>
              <div class="info-field"><span class="field-label">Departamento</span><span class="field-value">{{ infoPersonal.departamento || '—' }}</span></div>
              <div class="info-field"><span class="field-label">Antigüedad</span><span class="field-value">{{ infoPersonal.antiguedad || '—' }}</span></div>
              <div class="info-field"><span class="field-label">Tipo de contrato</span><span class="field-value">{{ infoPersonal.contrato || '—' }}</span></div>
              <div class="info-field"><span class="field-label">Turno</span><span class="field-value">{{ infoPersonal.turno || '—' }}</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ TAB 2: MIS MATERIAS ══ -->
      <section v-show="tabActivo === 'materias'" class="tab-panel active">
        <div class="tab-toolbar">
          <div class="tab-toolbar-left">
            <h2 class="section-title"><i class="fas fa-chalkboard-teacher"></i> Materias que enseño</h2>
          </div>
          <button class="btn-add-subject" @click="abrirModalMateria"><i class="fas fa-plus"></i> Agregar Materia</button>
        </div>

        <div class="materias-grid">
          <div v-if="materiasProfesor.length === 0" class="noticia-empty" style="grid-column:1/-1">
            <i class="fas fa-chalkboard-teacher"></i>
            <p>Todavía no agregaste materias. Usá el botón <strong>Agregar Materia</strong>.</p>
          </div>
          <div v-for="(mat, idx) in materiasProfesor" :key="idx" class="materia-card">
            <button class="btn-eliminar-materia" title="Eliminar materia" @click="eliminarMateria(idx)">
              <i class="fas fa-trash"></i>
            </button>
            <div class="materia-icon"><i :class="`fas ${iconoMateria(mat.nombre)}`"></i></div>
            <div class="materia-nombre">{{ mat.nombre }}</div>
            <div class="materia-cursos-tag">{{ mat.cursos.length > 0 ? mat.cursos.join(' · ') : 'Sin cursos asignados' }}</div>
            <span class="materia-badge">{{ mat.cursos.length }} {{ mat.cursos.length === 1 ? 'curso' : 'cursos' }}</span>
          </div>
        </div>
      </section>

      <!-- ══ TAB 3: MIS CURSOS ══ -->
      <section v-show="tabActivo === 'cursos'" class="tab-panel active">
        <div class="tab-toolbar">
          <div class="tab-toolbar-left">
            <h2 class="section-title"><i class="fas fa-graduation-cap"></i> Cursos en que imparto clases</h2>
          </div>
          <div class="filter-group">
            <span class="courses-title">Curso:</span>
            <select v-model="cursoSeleccionado">
              <option value="" disabled>Seleccionar curso…</option>
              <option v-for="c in todosCursos" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <section class="table-container">
          <table>
            <thead>
              <tr>
                <th>Materia</th>
                <th style="width:130px; text-align:center;">Alumnos</th>
                <th style="width:120px;">Tareas</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cursoSeleccionado && datosCursos[cursoSeleccionado]">
                <tr v-for="(materia, i) in datosCursos[cursoSeleccionado].materias" :key="i">
                  <td>{{ materia }}</td>
                  <td v-if="i === 0" :rowspan="datosCursos[cursoSeleccionado].materias.length" class="alumnos-cell" style="text-align:center">
                    {{ datosCursos[cursoSeleccionado].alumnos }}
                  </td>
                  <td class="tareas-cell">—</td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="3" class="empty-state">
                  <i class="fas fa-graduation-cap empty-icon"></i>
                  <p>Seleccioná un curso para ver las materias</p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <!-- ══ TAB 4: ASISTENCIAS ══ -->
      <section v-show="tabActivo === 'asistencias'" class="tab-panel active">
        <div class="tab-toolbar">
          <div class="tab-toolbar-left">
            <h2 class="section-title"><i class="fas fa-clipboard-check"></i> Registro de asistencias</h2>
          </div>
          <div class="asist-toolbar-right">
            <div class="filter-group">
              <span class="courses-title">Curso:</span>
              <select v-model="asistCurso" @change="onAsistCursoChange">
                <option value="" disabled>Seleccionar curso…</option>
                <option v-for="c in todosCursos" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <input type="date" v-model="asistFecha" class="date-input" />
            <button class="btn-add-subject" :disabled="!asistCurso" @click="tomarAsistencia">
              <i class="fas fa-clipboard-check"></i> Tomar asistencia
            </button>
          </div>
        </div>

        <!-- Resumen -->
        <div v-if="mostrarAsistencia" class="asist-resumen" style="display:grid">
          <div class="asist-stat asist-presentes">
            <span class="asist-num">{{ contadores.presentes }}</span>
            <span class="asist-lbl">Presentes</span>
          </div>
          <div class="asist-stat asist-ausentes">
            <span class="asist-num">{{ contadores.ausentes }}</span>
            <span class="asist-lbl">Ausentes</span>
          </div>
          <div class="asist-stat asist-tardanzas">
            <span class="asist-num">{{ contadores.tardanzas }}</span>
            <span class="asist-lbl">Tardanzas</span>
          </div>
          <button class="btn-guardar-asist" @click="guardarAsistencia">
            <i class="fas fa-save"></i> Guardar asistencia
          </button>
        </div>

        <!-- Lista alumnos -->
        <div v-if="mostrarAsistencia" class="asist-lista-wrap">
          <div class="asist-lista">
            <div
              v-for="alumno in listaAlumnos"
              :key="alumno.nombre"
              class="alumno-row"
              :class="alumno.estado"
            >
              <span class="alumno-nombre">{{ alumno.nombre }}</span>
              <div class="asist-btns">
                <button class="asist-btn btn-presente" :class="{ selected: alumno.estado === 'presente' }" title="Presente" @click="setEstado(alumno, 'presente')">
                  <i class="fas fa-check"></i>
                </button>
                <button class="asist-btn btn-ausente" :class="{ selected: alumno.estado === 'ausente' }" title="Ausente" @click="setEstado(alumno, 'ausente')">
                  <i class="fas fa-times"></i>
                </button>
                <button class="asist-btn btn-tardanza" :class="{ selected: alumno.estado === 'tardanza' }" title="Tardanza" @click="setEstado(alumno, 'tardanza')">
                  <i class="fas fa-clock"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Historial -->
        <div class="table-container" style="margin-top:16px">
          <div class="historial-header"><i class="fas fa-history"></i><span>Historial de asistencias</span></div>
          <table>
            <thead>
              <tr>
                <th>Fecha</th><th>Curso</th>
                <th style="text-align:center">Presentes</th>
                <th style="text-align:center">Ausentes</th>
                <th style="text-align:center">Tardanzas</th>
                <th style="text-align:center">% Asistencia</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="historialAsistencias.length === 0">
                <td colspan="6" class="empty-state">
                  <i class="fas fa-clipboard empty-icon"></i>
                  <p>Aún no hay asistencias registradas</p>
                </td>
              </tr>
              <tr v-for="(r, i) in historialAsistencias" :key="i">
                <td>{{ r.fecha }}</td>
                <td><strong>{{ r.curso }}</strong></td>
                <td style="text-align:center; color:#16a34a; font-weight:700">{{ r.presentes }}</td>
                <td style="text-align:center; color:#dc2626; font-weight:700">{{ r.ausentes }}</td>
                <td style="text-align:center; color:#d97706; font-weight:700">{{ r.tardanzas }}</td>
                <td style="text-align:center"><span :class="`porc-badge porc-${r.porc >= 80 ? 'alto' : r.porc >= 60 ? 'medio' : 'bajo'}`">{{ r.porc }}%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ══ TAB 5: NOTICIAS ══ -->
      <section v-show="tabActivo === 'noticias'" class="tab-panel active">
        <div class="tab-toolbar">
          <div class="tab-toolbar-left">
            <h2 class="section-title"><i class="fas fa-newspaper"></i> Noticias del establecimiento</h2>
          </div>
          <button class="btn-add-subject" @click="abrirModalNoticia"><i class="fas fa-plus"></i> Nueva noticia</button>
        </div>

        <div class="noticias-grid">
          <div v-if="noticias.length === 0" class="noticia-empty">
            <i class="fas fa-newspaper"></i>
            <p>No hay noticias publicadas todavía.</p>
          </div>
          <div
            v-for="n in noticias"
            :key="n.id"
            class="noticia-card"
            @click="verNoticia(n)"
          >
            <div :class="`noticia-franja franja-${categoriaClass(n.categoria)}`"></div>
            <div class="noticia-body">
              <span :class="`noticia-categoria cat-${categoriaClass(n.categoria)}`">{{ n.categoria }}</span>
              <p class="noticia-titulo">{{ n.titulo }}</p>
              <p class="noticia-preview">{{ n.contenido }}</p>
            </div>
            <div class="noticia-footer">
              <span class="noticia-fecha"><i class="fas fa-calendar-alt"></i> {{ n.fecha }}</span>
              <span>{{ n.autor }}</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- ══ MODAL: Editar info personal ══ -->
  <div class="modal-overlay" :class="{ active: modales.editInfo }" @click.self="modales.editInfo = false">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Editar información personal</h3>
        <span class="close-modal" @click="modales.editInfo = false">&times;</span>
      </div>
      <div class="modal-body modal-body-grid">
        <div class="form-group"><label>Teléfono</label><input type="text" v-model="editForm.telefono" placeholder="Ej: +54 9 299 123-4567" /></div>
        <div class="form-group"><label>Dirección</label><input type="text" v-model="editForm.direccion" placeholder="Ej: Av. San Martín 123" /></div>
        <div class="form-group"><label>Fecha de nacimiento</label><input type="date" v-model="editForm.nacimiento" /></div>
        <div class="form-group"><label>Departamento</label><input type="text" v-model="editForm.departamento" placeholder="Ej: Ciencias Exactas" /></div>
        <div class="form-group"><label>Antigüedad</label><input type="text" v-model="editForm.antiguedad" placeholder="Ej: 5 años" /></div>
        <div class="form-group"><label>Tipo de contrato</label><input type="text" v-model="editForm.contrato" placeholder="Ej: Planta permanente" /></div>
        <div class="form-group form-group-full">
          <label>Turno</label>
          <select v-model="editForm.turno">
            <option value="">Sin turno asignado</option>
            <option>Mañana</option><option>Tarde</option><option>Noche</option><option>Mañana y tarde</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="modales.editInfo = false">Cancelar</button>
        <button class="btn-submit" @click="guardarInfoPersonal"><i class="fas fa-check"></i>&nbsp;Guardar cambios</button>
      </div>
    </div>
  </div>

  <!-- ══ MODAL: Nueva noticia ══ -->
  <div class="modal-overlay" :class="{ active: modales.noticia }" @click.self="modales.noticia = false">
    <div class="modal-content modal-wide">
      <div class="modal-header">
        <h3>Nueva noticia</h3>
        <span class="close-modal" @click="modales.noticia = false">&times;</span>
      </div>
      <div class="modal-body">
        <div class="form-group"><label>Título</label><input type="text" v-model="noticiaForm.titulo" placeholder="Título de la noticia" /></div>
        <div class="form-group" style="margin-top:14px"><label>Categoría</label>
          <select v-model="noticiaForm.categoria">
            <option>Informativa</option><option>Académica</option><option>Evento</option><option>Urgente</option>
          </select>
        </div>
        <div class="form-group" style="margin-top:14px"><label>Contenido</label>
          <textarea v-model="noticiaForm.contenido" rows="5" placeholder="Escribí el contenido de la noticia…"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="modales.noticia = false">Cancelar</button>
        <button class="btn-submit" @click="guardarNoticia"><i class="fas fa-check"></i>&nbsp;Publicar</button>
      </div>
    </div>
  </div>

  <!-- ══ MODAL: Ver noticia ══ -->
  <div class="modal-overlay" :class="{ active: modales.verNoticia }" @click.self="modales.verNoticia = false">
    <div class="modal-content modal-wide">
      <div class="modal-header">
        <h3>{{ noticiaVista?.titulo }}</h3>
        <span class="close-modal" @click="modales.verNoticia = false">&times;</span>
      </div>
      <div class="modal-body">
        <p class="noticia-meta">
          <span v-if="noticiaVista" :class="`noticia-categoria cat-${categoriaClass(noticiaVista.categoria)}`">{{ noticiaVista?.categoria }}</span>
          &nbsp; {{ noticiaVista?.fecha }} · {{ noticiaVista?.autor }}
        </p>
        <p class="noticia-cuerpo">{{ noticiaVista?.contenido }}</p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="modales.verNoticia = false">Cerrar</button>
      </div>
    </div>
  </div>

  <!-- ══ MODAL: Agregar materia ══ -->
  <div class="modal-overlay" :class="{ active: modales.materia }" @click.self="modales.materia = false">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Agregar materia</h3>
        <span class="close-modal" @click="modales.materia = false">&times;</span>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Nombre de la materia</label>
          <input type="text" v-model="materiaForm.nombre" placeholder="Ej: Matemática Discreta" @keydown.enter="guardarMateria" />
        </div>
        <div class="form-group" style="margin-top:14px">
          <label>Cursos en que la enseñás</label>
          <div class="cursos-checkboxes">
            <label v-for="curso in todosCursos" :key="curso" :class="{ checked: materiaForm.cursos.includes(curso) }">
              <input type="checkbox" :value="curso" v-model="materiaForm.cursos" />
              <span class="curso-check-label">{{ curso }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="modales.materia = false">Cancelar</button>
        <button class="btn-submit" @click="guardarMateria"><i class="fas fa-check"></i>&nbsp;Guardar</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" :class="{ visible: toastVisible }">{{ toastMsg }}</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ── Sesión ────────────────────────────────────────────
const userName  = ref(localStorage.getItem('userName')  || 'Juan Pérez')
const userDni   = ref(localStorage.getItem('userDni')   || '')
const userEmail = ref(localStorage.getItem('userEmail') || 'juan.perez@escuela.edu')

const nameForApi    = computed(() => userName.value.trim().split(' ').slice(0,2).join('+'))
const avatarUrl     = computed(() => `https://ui-avatars.com/api/?name=${nameForApi.value}&background=0D8ABC&color=fff`)
const avatarUrlLarge= computed(() => `https://ui-avatars.com/api/?name=${nameForApi.value}&background=c0152a&color=fff`)
const profAvatarUrl = computed(() => `https://ui-avatars.com/api/?name=${nameForApi.value}&background=c0152a&color=fff`)

function cerrarSesion() {
  localStorage.clear()
  window.location.href = 'loginPrincipal.html'
}

// ── Profile menu ──────────────────────────────────────
const profileMenuOpen = ref(false)
function toggleProfileMenu() { profileMenuOpen.value = !profileMenuOpen.value }
function handleClickOutside(e) {
  if (!e.target.closest('.profile-container')) profileMenuOpen.value = false
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// ── Tabs ──────────────────────────────────────────────
const tabActivo = ref('info')
const tabs = [
  { id: 'info',        label: 'Información Personal',  icon: 'fa-id-card' },
  { id: 'materias',    label: 'Mis Materias',           icon: 'fa-chalkboard-teacher' },
  { id: 'cursos',      label: 'Mis Cursos',             icon: 'fa-graduation-cap' },
  { id: 'asistencias', label: 'Asistencias',            icon: 'fa-clipboard-check' },
  { id: 'noticias',    label: 'Noticias',               icon: 'fa-newspaper' },
]

// ── Datos cursos ──────────────────────────────────────
const datosCursos = {
  "1° Primera":       { alumnos: 30,  materias: ["Matemática","Prácticas del Lenguaje","Ciencias Naturales"] },
  "1° Segunda":       { alumnos: 25,  materias: ["Matemática","Prácticas del Lenguaje","Ciencias Sociales"] },
  "1° Tercera":       { alumnos: 28,  materias: ["Matemática","Prácticas del Lenguaje","Plástica"] },
  "2° Primera":       { alumnos: 34,  materias: ["Matemática","Prácticas del Lenguaje","Físicoquímica"] },
  "2° Segunda":       { alumnos: 32,  materias: ["Educación Física","Prácticas del Lenguaje","Historia"] },
  "2° Tercera":       { alumnos: 25,  materias: ["Matemática","Prácticas del Lenguaje","Ciencias Sociales"] },
  "3° Primera":       { alumnos: 30,  materias: ["Matemática","Prácticas del Lenguaje","Química"] },
  "3° Segunda":       { alumnos: 34,  materias: ["Matemática","Prácticas del Lenguaje","Biología"] },
  "3° Tercera":       { alumnos: 28,  materias: ["Matemática","Prácticas del Lenguaje","Inglés"] },
  "4° Programación":  { alumnos: 27,  materias: ["Introducción a la Programación","Sistemas Tecnológicos","Tecnología de Control"] },
  "4° Informática":   { alumnos: 34,  materias: ["Aplicaciones Informáticas","Sistemas Digitales","Mantenimiento Integrado"] },
  "5° Programación":  { alumnos: 33,  materias: ["Programación sobre Plataformas","Análisis de Sistemas","Base de Datos"] },
  "5° Informática":   { alumnos: 33,  materias: ["Sistemas Operativos","Base de Datos","Redes"] },
  "6° Programación":  { alumnos: 20,  materias: ["Tec. Electrónica","Hardware","Programación"] },
  "6° Informática":   { alumnos: 21,  materias: ["Instalación de Redes","Mantenimiento de Software","Sistemas Multiusuario"] },
  "7° Programación":  { alumnos: 22,  materias: ["Prácticas Profesionalizantes","Modelos y Sistemas","Seguridad Informática"] },
  "7° Informática":   { alumnos: 14,  materias: ["Prácticas Profesionalizantes","Modelos y Sistemas","Base de Datos"] },
}
const todosCursos = Object.keys(datosCursos)

// ── Materias profesor ─────────────────────────────────
const cursosProfesor   = ref([])
const materiasProfesor = ref([])

const totalAlumnos = computed(() =>
  cursosProfesor.value.reduce((s, c) => s + (datosCursos[c]?.alumnos || 0), 0)
)
const profSubtitulo = computed(() =>
  materiasProfesor.value.length > 0
    ? `${materiasProfesor.value[0].nombre} · ${materiasProfesor.value.length} ${materiasProfesor.value.length === 1 ? 'materia' : 'materias'}`
    : 'Sin materias asignadas'
)

function iconoMateria(nombre) {
  const n = nombre.toLowerCase()
  if (n.includes('programación') || n.includes('código') || n.includes('software')) return 'fa-code'
  if (n.includes('base de dato') || n.includes('datos')) return 'fa-database'
  if (n.includes('red') || n.includes('redes')) return 'fa-network-wired'
  if (n.includes('sistema')) return 'fa-server'
  if (n.includes('hardware') || n.includes('electrónic') || n.includes('digital')) return 'fa-microchip'
  if (n.includes('análisis') || n.includes('modelos')) return 'fa-chart-line'
  if (n.includes('seguridad')) return 'fa-shield-halved'
  if (n.includes('práctica')) return 'fa-briefcase'
  if (n.includes('tecnolog')) return 'fa-cogs'
  if (n.includes('mantenimiento')) return 'fa-screwdriver-wrench'
  if (n.includes('aplicac')) return 'fa-window-restore'
  return 'fa-book'
}

function eliminarMateria(idx) {
  materiasProfesor.value.splice(idx, 1)
  mostrarToast('Materia eliminada')
}

// ── Cursos tab ────────────────────────────────────────
const cursoSeleccionado = ref('')

// ── Asistencia ────────────────────────────────────────
const asistCurso        = ref('')
const asistFecha        = ref((() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` })())
const mostrarAsistencia = ref(false)
const listaAlumnos      = ref([])
const historialAsistencias = ref([])

const alumnosEjemplo = [
  "Acosta, Lucas","Benitez, Sofía","Cabrera, Tomás","Díaz, Valentina",
  "Esperanza, Mateo","Fernández, Camila","García, Nicolás","Herrera, Lucía",
  "Ibáñez, Agustín","Jiménez, Romina","López, Ezequiel","Martínez, Florencia",
  "Núñez, Ignacio","Ortega, Martina","Pérez, Santiago","Quiroga, Ana",
  "Rodríguez, Facundo","Sánchez, Julieta","Torres, Emiliano","Vega, Natalia"
]

const contadores = computed(() => {
  let presentes = 0, ausentes = 0, tardanzas = 0
  listaAlumnos.value.forEach(a => {
    if (a.estado === 'presente') presentes++
    else if (a.estado === 'ausente') ausentes++
    else if (a.estado === 'tardanza') tardanzas++
  })
  return { presentes, ausentes, tardanzas }
})

function onAsistCursoChange() { mostrarAsistencia.value = false; listaAlumnos.value = [] }

function tomarAsistencia() {
  const datos = datosCursos[asistCurso.value]
  if (!datos) return
  const cantidad = Math.min(datos.alumnos, alumnosEjemplo.length)
  listaAlumnos.value = alumnosEjemplo.slice(0, cantidad).map(nombre => reactive({ nombre, estado: 'presente' }))
  mostrarAsistencia.value = true
}

function setEstado(alumno, estado) { alumno.estado = estado }

function guardarAsistencia() {
  if (!asistFecha.value) { mostrarToast('Seleccioná una fecha primero'); return }
  const [y, m, d] = asistFecha.value.split('-')
  const { presentes, ausentes, tardanzas } = contadores.value
  const total = presentes + ausentes + tardanzas
  const porc  = total > 0 ? Math.round((presentes / total) * 100) : 0
  historialAsistencias.value.unshift({ fecha: `${d}/${m}/${y}`, curso: asistCurso.value, presentes, ausentes, tardanzas, porc })
  mostrarAsistencia.value = false
  listaAlumnos.value = []
  mostrarToast('Asistencia guardada correctamente')
}

// ── Noticias ──────────────────────────────────────────
let noticiaIdCounter = 3
const noticias = ref([
  {
    id: 1, titulo: "Inicio del segundo trimestre", categoria: "Académica",
    contenido: "El segundo trimestre comenzará el próximo lunes. Se recuerda a todos los docentes entregar las planificaciones actualizadas.",
    fecha: new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' }),
    autor: "Dirección"
  },
  {
    id: 2, titulo: "Reunión de padres – 7° año", categoria: "Evento",
    contenido: "Se convoca a una reunión informativa de padres del 7° año para el día jueves a las 18:00 hs en el SUM.",
    fecha: new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' }),
    autor: "Secretaría"
  },
])
const noticiaVista = ref(null)
const noticiaForm  = reactive({ titulo: '', categoria: 'Informativa', contenido: '' })

function categoriaClass(cat) {
  return { 'Informativa':'informativa','Académica':'academica','Evento':'evento','Urgente':'urgente' }[cat] || 'informativa'
}

function verNoticia(n) { noticiaVista.value = n; modales.verNoticia = true }

function guardarNoticia() {
  if (!noticiaForm.titulo.trim())    { mostrarToast('Completá el título'); return }
  if (!noticiaForm.contenido.trim()) { mostrarToast('Completá el contenido'); return }
  noticias.value.unshift({
    id: noticiaIdCounter++,
    titulo: noticiaForm.titulo, categoria: noticiaForm.categoria, contenido: noticiaForm.contenido,
    fecha: new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' }),
    autor: userName.value
  })
  modales.noticia = false
  mostrarToast('Noticia publicada')
}

// ── Info personal ─────────────────────────────────────
const infoPersonal = reactive({ telefono:'', direccion:'', nacimiento:'', departamento:'', antiguedad:'', contrato:'', turno:'' })
const editForm     = reactive({ telefono:'', direccion:'', nacimiento:'', departamento:'', antiguedad:'', contrato:'', turno:'' })

function guardarInfoPersonal() {
  Object.assign(infoPersonal, {
    telefono:    editForm.telefono,
    direccion:   editForm.direccion,
    departamento:editForm.departamento,
    antiguedad:  editForm.antiguedad,
    contrato:    editForm.contrato,
    turno:       editForm.turno,
    nacimiento:  editForm.nacimiento
      ? (() => { const [y,m,d] = editForm.nacimiento.split('-'); return `${d}/${m}/${y}` })()
      : '',
  })
  modales.editInfo = false
  mostrarToast('Datos actualizados')
}

// ── Materia form ──────────────────────────────────────
const materiaForm = reactive({ nombre: '', cursos: [] })

function guardarMateria() {
  if (!materiaForm.nombre.trim()) { mostrarToast('Ingresá el nombre de la materia'); return }
  if (materiasProfesor.value.some(m => m.nombre.toLowerCase() === materiaForm.nombre.toLowerCase())) {
    mostrarToast('Ya existe una materia con ese nombre'); return
  }
  materiasProfesor.value.push({ nombre: materiaForm.nombre.trim(), cursos: [...materiaForm.cursos] })
  modales.materia = false
  mostrarToast(`Materia "${materiaForm.nombre}" agregada`)
}

// ── Modales ───────────────────────────────────────────
const modales = reactive({ editInfo: false, noticia: false, verNoticia: false, materia: false })

function abrirModalEditInfo() {
  Object.assign(editForm, { ...infoPersonal, nacimiento: '' })
  modales.editInfo = true
}
function abrirModalNoticia() {
  noticiaForm.titulo = ''; noticiaForm.contenido = ''; noticiaForm.categoria = 'Informativa'
  modales.noticia = true
}
function abrirModalMateria() {
  materiaForm.nombre = ''; materiaForm.cursos = []
  modales.materia = true
}

// ── Toast ─────────────────────────────────────────────
const toastMsg     = ref('')
const toastVisible = ref(false)
let toastTimer

function mostrarToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2800)
}

// ── Escape para cerrar modales ────────────────────────
function onKeydown(e) {
  if (e.key === 'Escape') Object.keys(modales).forEach(k => modales[k] = false)
}
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  if (localStorage.getItem('sesionActiva') !== 'true') window.location.href = 'loginPrincipal.html'
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* ── Variables ─────────────────────────────────────── */
:root{
  --bg:#f4f6fb; --surface:#fff; --surface-2:#f8fafc;
  --text:#1f2937; --muted:#6b7280; --line:#e5e7eb;
  --primary:#c0152a; --primary-dark:#7f0917; --primary-soft:rgba(192,21,42,.10);
  --success:#16a34a; --warning:#f59e0b; --danger:#dc2626;
  --shadow:0 10px 30px rgba(15,23,42,.10); --shadow-soft:0 6px 16px rgba(15,23,42,.08);
  --radius-lg:24px; --radius-md:16px; --radius-sm:12px;
}

*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',system-ui,-apple-system,BlinkMacSystemFont,sans-serif; }
a{ color:inherit; text-decoration:none; }
button,input,select,textarea{ font:inherit; }
button{ cursor:pointer; border:none; }
img{ max-width:100%; display:block; }

/* NAVBAR */
.navbar{ display:flex; justify-content:space-between; align-items:center; padding:10px 1.5%; background:#fff; border-bottom:5px solid #fff; box-shadow:0 6px 12px rgba(0,0,0,.10); }
.nav-izquierda{ display:flex; align-items:center; gap:15px; }
.logo{ display:flex; align-items:center; gap:15px; margin:5px; }
.logo img{ width:60px; height:60px; }
.logo-titulo{ display:flex; flex-direction:column; gap:5px; }
.logo h2{ font-family:'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif; font-size:1.4rem; font-weight:800; text-transform:uppercase; letter-spacing:.02em; color:#111; margin:0; }
.logo p{ font-family:'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif; font-size:.85rem; color:gray; margin:2px 0 0; }

/* CONTAINER */
.container{ display:flex; min-height:calc(100vh - 70px); }

/* SIDEBAR */
.sidebar{ width:250px; background:linear-gradient(180deg,#ca0d0d,#420101); color:#fff; padding:20px; flex-shrink:0; }
.sidebar ul{ list-style:none; }
.sidebar li{ padding:20px; border-radius:10px; cursor:pointer; transition:.3s; display:flex; align-items:center; gap:6px; color:#fff; }
.sidebar li i{ width:20px; text-align:center; flex-shrink:0; }
.sidebar li:hover,.sidebar li.active{ background:rgba(255,255,255,.2); }
.sidebar a{ text-decoration:none; color:#fff; display:block; }
.sidebar-help{ display:flex; align-items:center; gap:12px; background:rgba(255,255,255,.08); border-radius:10px; padding:12px 14px; margin-top:auto; }
.sidebar-help i{ font-size:22px; color:rgba(255,255,255,.7); flex-shrink:0; }
.help-title{ font-size:13px; font-weight:600; color:#fff; margin:0; }
.help-sub{ font-size:11px; color:rgba(255,255,255,.6); margin:2px 0 0; }

/* PROFILE */
.profile-container{ position:relative; display:flex; align-items:center; }
.profile-trigger{ width:52px; height:52px; border-radius:50%; padding:2px; background:transparent; border:2px solid transparent; transition:transform .2s,border-color .2s; }
.profile-trigger:hover{ transform:translateY(-1px); border-color:#e5e7eb; }
.profile-trigger img{ width:100%; height:100%; border-radius:50%; }
.profile-menu{ display:none; position:absolute; top:62px; right:0; width:min(320px,calc(100vw - 24px)); background:#fff; border:1px solid #e5e7eb; border-radius:22px; box-shadow:var(--shadow); padding:18px; z-index:100; }
.profile-menu.active{ display:block; }
.menu-header{ text-align:center; }
.large-avatar{ width:76px; height:76px; border-radius:50%; margin:0 auto 10px; }
.user-name{ font-size:1.05rem; font-weight:700; }
.user-email{ color:#6b7280; font-size:.9rem; }
.user-role{ text-align:center; color:#6b7280; margin-top:8px; font-size:.95rem; }
#roleBadge{ display:inline-block; margin-left:4px; padding:2px 8px; border-radius:999px; background:var(--primary-soft); color:var(--primary); font-weight:700; font-size:.85rem; }
hr{ border:0; border-top:1px solid #e5e7eb; margin:14px 0; }
.menu-body{ display:flex; flex-direction:column; gap:6px; }
.menu-item{ display:flex; align-items:center; gap:10px; padding:11px 12px; border-radius:12px; color:#334155; transition:background .2s,color .2s; }
.menu-item:hover{ background:#f8fafc; color:#111827; }
.menu-item i{ width:20px; text-align:center; }
.sign-out-btn{ width:100%; display:flex; align-items:center; justify-content:center; gap:8px; margin-top:2px; padding:11px 14px; border-radius:12px; border:1px solid #f3d0d4; background:#fff; color:#b42318; font-weight:600; transition:background .2s,transform .2s,border-color .2s; }
.sign-out-btn:hover{ background:#fef2f2; border-color:#f5aeb6; transform:translateY(-1px); }

/* MAIN */
.main-content{ flex:1; padding:28px; overflow-y:auto; min-width:0; }

/* CABECERA DOCENTE */
.prof-header{ display:flex; align-items:center; justify-content:space-between; gap:18px; background:#fff; padding:22px 24px; border-radius:var(--radius-lg); box-shadow:var(--shadow-soft); margin-bottom:18px; }
.prof-header-left{ display:flex; align-items:center; gap:16px; min-width:0; }
.prof-avatar-wrap{ position:relative; width:78px; height:78px; flex-shrink:0; }
.prof-avatar-wrap img{ width:78px; height:78px; border-radius:50%; object-fit:cover; border:3px solid #fff; box-shadow:0 6px 14px rgba(0,0,0,.10); }
.prof-status-dot{ position:absolute; right:4px; bottom:6px; width:15px; height:15px; border-radius:50%; background:#22c55e; border:3px solid #fff; }
.prof-info{ min-width:0; }
.prof-label{ font-size:.78rem; font-weight:800; letter-spacing:.08em; color:var(--primary); margin-bottom:4px; }
.prof-info h1{ font-size:1.55rem; line-height:1.1; margin-bottom:4px; }
.prof-sub{ color:#6b7280; font-size:.95rem; }
.prof-header-stats{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.hs-item{ min-width:84px; text-align:center; padding:8px 12px; border-radius:16px; background:#f8fafc; border:1px solid #e5e7eb; }
.hs-num{ display:block; font-size:1.3rem; font-weight:800; color:#111827; }
.hs-label{ display:block; color:#6b7280; font-size:.85rem; margin-top:2px; }
.hs-divider{ width:1px; height:42px; background:#e5e7eb; }

/* TABS */
.tabs-nav{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:18px; }
.tab-btn{ display:inline-flex; align-items:center; gap:10px; padding:12px 16px; border-radius:999px; background:#fff; border:1px solid #e5e7eb; color:#374151; box-shadow:0 2px 10px rgba(15,23,42,.04); transition:background .2s,color .2s,border-color .2s,transform .2s; }
.tab-btn:hover{ transform:translateY(-1px); border-color:#d1d5db; }
.tab-btn.active{ background:var(--primary); border-color:var(--primary); color:#fff; }
.tab-btn i{ font-size:.95rem; }
.tab-panel{ display:none; }
.tab-panel.active{ display:block; }

/* TOOLBAR */
.tab-toolbar{ display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:16px; }
.tab-toolbar-left{ min-width:0; }
.section-title{ display:flex; align-items:center; gap:10px; font-size:1.12rem; }
.section-title i{ color:var(--primary); }
.filter-group{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.courses-title{ font-weight:700; color:#374151; }

/* INPUTS */
select,.date-input,input[type="text"],input[type="date"],textarea{ width:100%; border:1px solid #e5e7eb; border-radius:12px; background:#fff; color:#1f2937; padding:12px 14px; outline:none; transition:border-color .2s,box-shadow .2s; }
select:focus,.date-input:focus,input[type="text"]:focus,input[type="date"]:focus,textarea:focus{ border-color:rgba(192,21,42,.45); box-shadow:0 0 0 4px rgba(192,21,42,.10); }
select{ min-width:220px; }
.date-input{ min-width:170px; }

/* BOTONES */
.btn-add-subject,.btn-guardar-asist,.btn-submit,.btn-cancel,.btn-edit-info{ display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:12px; padding:11px 16px; font-weight:700; transition:transform .2s,box-shadow .2s,background .2s,border-color .2s; }
.btn-add-subject,.btn-submit,.btn-guardar-asist{ background:var(--primary); color:#fff; box-shadow:0 10px 20px rgba(192,21,42,.16); }
.btn-add-subject:hover,.btn-submit:hover,.btn-guardar-asist:hover{ transform:translateY(-1px); background:#a91224; }
.btn-add-subject:disabled,.btn-guardar-asist:disabled{ opacity:.6; cursor:not-allowed; transform:none; box-shadow:none; }
.btn-cancel{ background:#f3f4f6; color:#374151; border:1px solid #e5e7eb; }
.btn-cancel:hover{ background:#e5e7eb; }
.btn-edit-info{ margin-top:16px; background:#fff; color:var(--primary); border:1px solid rgba(192,21,42,.22); }
.btn-edit-info:hover{ background:var(--primary-soft); transform:translateY(-1px); }

/* INFO GRID */
.info-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
.info-card{ background:#fff; border:1px solid #e5e7eb; border-radius:var(--radius-lg); padding:20px; box-shadow:var(--shadow-soft); }
.info-card-header{ display:flex; align-items:center; gap:10px; margin-bottom:18px; }
.info-card-header i{ width:38px; height:38px; display:grid; place-items:center; border-radius:12px; background:var(--primary-soft); color:var(--primary); }
.info-card-header h3{ font-size:1.05rem; }
.info-fields{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
.info-field{ padding:14px; border-radius:14px; background:#fafafa; border:1px solid #f1f5f9; }
.field-label{ display:block; color:#6b7280; font-size:.84rem; margin-bottom:6px; }
.field-value{ display:block; font-weight:600; color:#111827; word-break:break-word; }

/* TABLA */
.table-container{ background:#fff; border:1px solid #e5e7eb; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-soft); }
.table-container table{ width:100%; border-collapse:collapse; }
.table-container thead th{ background:#fafafa; text-align:left; padding:14px 16px; font-size:.92rem; color:#334155; border-bottom:1px solid #e5e7eb; }
.table-container tbody td{ padding:14px 16px; border-bottom:1px solid #eef2f7; color:#334155; vertical-align:middle; }
.table-container tbody tr:hover td{ background:#fcfcfd; }
.empty-state{ text-align:center; padding:34px 16px; color:#6b7280; }
.empty-state .empty-icon{ display:block; font-size:2rem; margin-bottom:10px; color:#cbd5e1; }
.empty-state p{ margin:0; }
.historial-header{ display:flex; align-items:center; gap:10px; padding:16px 18px; background:#fafafa; border-bottom:1px solid #e5e7eb; font-weight:700; }

/* MATERIAS / NOTICIAS */
.materias-grid,.noticias-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
.materia-card{ position:relative; background:#fff; border:1px solid #e5e7eb; border-radius:18px; box-shadow:var(--shadow-soft); padding:18px; }
.noticia-card{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; box-shadow:var(--shadow-soft); padding:0; overflow:hidden; cursor:pointer; transition:box-shadow .2s,transform .2s; }
.noticia-card:hover{ transform:translateY(-2px); box-shadow:var(--shadow); }
.noticia-franja{ height:6px; }
.franja-informativa{ background:#3b82f6; }
.franja-academica{ background:#8b5cf6; }
.franja-evento{ background:#f59e0b; }
.franja-urgente{ background:#dc2626; }
.noticia-body{ padding:14px 16px 10px; }
.noticia-categoria{ display:inline-block; padding:2px 8px; border-radius:999px; font-size:.8rem; font-weight:700; margin-bottom:8px; }
.cat-informativa{ background:#eff6ff; color:#1d4ed8; }
.cat-academica{ background:#f5f3ff; color:#6d28d9; }
.cat-evento{ background:#fffbeb; color:#92400e; }
.cat-urgente{ background:#fef2f2; color:#b91c1c; }
.noticia-titulo{ font-size:1rem; font-weight:700; margin-bottom:6px; color:#111827; }
.noticia-preview{ font-size:.88rem; color:#6b7280; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.noticia-footer{ display:flex; justify-content:space-between; align-items:center; padding:10px 16px 14px; font-size:.82rem; color:#6b7280; border-top:1px solid #f1f5f9; }
.noticia-empty{ text-align:center; padding:40px; color:#6b7280; }
.noticia-empty i{ font-size:2rem; margin-bottom:10px; color:#cbd5e1; }
.materia-icon{ width:44px; height:44px; display:grid; place-items:center; border-radius:12px; background:var(--primary-soft); color:var(--primary); font-size:1.2rem; margin-bottom:10px; }
.materia-nombre{ font-weight:700; font-size:1rem; margin-bottom:6px; color:#111827; }
.materia-cursos-tag{ font-size:.83rem; color:#6b7280; margin-bottom:10px; }
.materia-badge{ display:inline-block; padding:3px 10px; border-radius:999px; background:#f1f5f9; color:#475569; font-size:.8rem; font-weight:600; }
.btn-eliminar-materia{ position:absolute; top:12px; right:12px; width:32px; height:32px; display:grid; place-items:center; border-radius:50%; background:#fef2f2; color:#b91c1c; border:none; cursor:pointer; transition:background .2s; }
.btn-eliminar-materia:hover{ background:#fee2e2; }

/* ASISTENCIA */
.asist-toolbar-right{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.asist-resumen{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; align-items:stretch; margin-bottom:16px; }
.asist-stat{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; padding:16px; box-shadow:var(--shadow-soft); text-align:center; }
.asist-num{ display:block; font-size:1.8rem; font-weight:800; line-height:1; margin-bottom:6px; }
.asist-lbl{ color:#6b7280; font-size:.92rem; }
.asist-presentes .asist-num{ color:#16a34a; }
.asist-ausentes .asist-num{ color:#dc2626; }
.asist-tardanzas .asist-num{ color:#f59e0b; }
.asist-resumen .btn-guardar-asist{ align-self:stretch; min-height:100%; }
.asist-lista-wrap{ background:#fff; border:1px solid #e5e7eb; border-radius:var(--radius-lg); box-shadow:var(--shadow-soft); padding:16px; margin-bottom:16px; }
.asist-lista{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
.alumno-row{ display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-radius:12px; border:1px solid #e5e7eb; background:#fafafa; transition:background .2s; }
.alumno-row.presente{ border-color:#bbf7d0; background:#f0fdf4; }
.alumno-row.ausente{ border-color:#fecaca; background:#fef2f2; }
.alumno-row.tardanza{ border-color:#fde68a; background:#fffbeb; }
.alumno-nombre{ font-size:.9rem; font-weight:600; color:#374151; }
.asist-btns{ display:flex; gap:6px; }
.asist-btn{ width:30px; height:30px; display:grid; place-items:center; border-radius:50%; font-size:.8rem; border:1px solid #e5e7eb; background:#fff; color:#9ca3af; transition:background .15s,color .15s; }
.btn-presente.selected{ background:#dcfce7; color:#16a34a; border-color:#86efac; }
.btn-ausente.selected{ background:#fee2e2; color:#dc2626; border-color:#fca5a5; }
.btn-tardanza.selected{ background:#fef3c7; color:#f59e0b; border-color:#fcd34d; }
.porc-badge{ display:inline-block; padding:3px 10px; border-radius:999px; font-size:.82rem; font-weight:700; }
.porc-alto{ background:#dcfce7; color:#15803d; }
.porc-medio{ background:#fef9c3; color:#854d0e; }
.porc-bajo{ background:#fee2e2; color:#b91c1c; }

/* MODALES */
.modal-overlay{ display:none; position:fixed; inset:0; background:rgba(15,23,42,.58); backdrop-filter:blur(3px); z-index:2000; padding:20px; align-items:center; justify-content:center; }
.modal-overlay.active{ display:flex; }
.modal-content{ width:min(760px,100%); background:#fff; border-radius:28px; box-shadow:var(--shadow); overflow:hidden; border:1px solid rgba(255,255,255,.45); }
.modal-wide{ width:min(920px,100%); }
.modal-header{ display:flex; align-items:center; justify-content:space-between; gap:14px; padding:18px 22px; border-bottom:1px solid #e5e7eb; background:#fff; }
.modal-header h3{ font-size:1.1rem; }
.close-modal{ width:38px; height:38px; display:grid; place-items:center; border-radius:50%; font-size:1.5rem; color:#64748b; background:#f8fafc; cursor:pointer; transition:background .2s,color .2s,transform .2s; }
.close-modal:hover{ background:#eef2f7; color:#0f172a; transform:rotate(8deg); }
.modal-body{ padding:22px; }
.modal-body-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
.form-group{ display:flex; flex-direction:column; gap:8px; }
.form-group label{ font-weight:700; color:#334155; font-size:.94rem; }
.form-group-full{ grid-column:1/-1; }
textarea{ resize:vertical; min-height:120px; }
.modal-footer{ display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap; padding:18px 22px 22px; border-top:1px solid #e5e7eb; background:#fff; }

/* CHECKBOXES CURSOS */
.cursos-checkboxes{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:10px; max-height:220px; overflow:auto; padding:2px; }
.cursos-checkboxes label{ display:flex; align-items:center; gap:10px; padding:10px 12px; border:1px solid #e5e7eb; border-radius:12px; background:#fafafa; cursor:pointer; }
.cursos-checkboxes label.checked{ border-color:var(--primary); background:var(--primary-soft); }
.cursos-checkboxes input[type="checkbox"]{ width:18px; height:18px; accent-color:var(--primary); }
.noticia-meta{ color:#6b7280; font-size:.92rem; margin-bottom:14px; }
.noticia-cuerpo{ white-space:pre-wrap; line-height:1.7; }

/* TOAST */
.toast{ position:fixed; bottom:28px; left:50%; transform:translateX(-50%); background:#1a202c; color:#fff; padding:12px 24px; border-radius:8px; font-size:13px; font-weight:600; z-index:99999; box-shadow:0 4px 12px rgba(0,0,0,.2); opacity:0; transition:opacity .25s; pointer-events:none; }
.toast.visible{ opacity:1; }

/* RESPONSIVE */
@media (max-width:1200px){
  .info-grid{ grid-template-columns:1fr; }
  .prof-header{ align-items:flex-start; flex-direction:column; }
  .asist-resumen{ grid-template-columns:repeat(2,minmax(0,1fr)); }
}
@media (max-width:900px){
  .sidebar{ display:none; }
  .main-content{ padding:18px; }
  .prof-header-stats{ width:100%; justify-content:flex-start; }
  .modal-body-grid{ grid-template-columns:1fr; }
}
@media (max-width:640px){
  .navbar{ padding:10px 14px; }
  .tabs-nav{ gap:8px; }
  .tab-btn{ width:100%; justify-content:center; border-radius:14px; }
  .tab-toolbar,.filter-group,.asist-toolbar-right{ width:100%; }
  select,.date-input{ min-width:0; width:100%; }
  .asist-resumen{ grid-template-columns:1fr; }
  .prof-header{ padding:18px; }
  .prof-header-left{ width:100%; }
  .hs-divider{ display:none; }
  .table-container{ overflow:auto; }
  .table-container table{ min-width:720px; }
}
</style>