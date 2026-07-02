<template>
  <!-- ═══════════════════════ NAVBAR ═══════════════════════ -->
  <nav class="navbar">
    <div class="nav-izquierda">
      <div class="logo">
        <img src="/logoEscuela.png" width="60" height="60" alt="Logo" />
        <div class="logo-titulo">
          <h2>GESTION ESCOLAR</h2>
          <p>Panel del alumno</p>
        </div>
      </div>
    </div>
    <div class="nav-derecha">
      <div class="nav-search">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar..." />
      </div>
      <div class="nav-user">
        <span>Bienvenido, {{ userName }}</span>
        <div class="nav-avatar">{{ iniciales }}</div>
      </div>
    </div>
  </nav>

  <div class="container">
    <!-- ═══════════════════════ SIDEBAR ═══════════════════════ -->
    <aside class="sidebar">
      <ul>
        <RouterLink to="/inicio">          <li><i class="fas fa-home"></i> Inicio</li></RouterLink>
        <RouterLink to="/noticias">        <li><i class="fas fa-newspaper"></i> Noticias</li></RouterLink>
        <RouterLink to="/biblioteca">      <li><i class="fas fa-book"></i> Biblioteca</li></RouterLink>
        <RouterLink to="/objetos-perdidos"><li><i class="fas fa-box"></i> Objetos Perdidos</li></RouterLink>
        <RouterLink to="/cursos">          <li class="active"><i class="fas fa-graduation-cap"></i> Cursos</li></RouterLink>
      </ul>
      <div class="sidebar-help">
        <i class="fas fa-question-circle"></i>
        <div>
          <p class="help-title">¿Necesitás ayuda?</p>
          <p class="help-sub">Pixelina resolverá tu consulta.</p>
        </div>
      </div>
    </aside>

    <!-- ═══════════════════════ CONTENIDO ═══════════════════════ -->
    <main class="content">

      <!-- Header -->
      <header class="page-header">
        <div class="page-header-text">
          <h1><i class="fas fa-graduation-cap header-icon"></i> Mis Materias</h1>
          <p>Revisá tus materias, los materiales subidos por tus profesores y los comunicados del curso.</p>
        </div>
      </header>

      <!-- Stats -->
      <section class="stats">
        <div class="stat-card stat-red">
          <div class="stat-icon"><i class="fas fa-book-open"></i></div>
          <div class="stat-info"><p>Mis Materias</p><h3>{{ materias.length }}</h3></div>
        </div>
        <div class="stat-card stat-green">
          <div class="stat-icon"><i class="fas fa-bullhorn"></i></div>
          <div class="stat-info"><p>Comunicados</p><h3>{{ comunicados.length }}</h3></div>
        </div>
      </section>

      <!-- TABS -->
      <div class="tabs-bar">
        <button class="tab-btn" :class="{ active: tabActivo === 'materias' }" @click="tabActivo = 'materias'">
          <i class="fas fa-table"></i> Mis Materias
        </button>
        <button class="tab-btn" :class="{ active: tabActivo === 'comunicados' }" @click="tabActivo = 'comunicados'">
          <i class="fas fa-bullhorn"></i> Comunicados
        </button>
      </div>

      <!-- TAB: MATERIAS -->
      <section v-show="tabActivo === 'materias'" class="tab-content active">
        <div class="table-container">
          <div class="table-header">
            <h3>Materias del curso</h3>
            <button v-if="esProfesor" class="btn-agregar" @click="abrirModal">
              <i class="fas fa-plus"></i> Agregar materia
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>MATERIA</th>
                <th>HORARIO</th>
                <th>DÍAS</th>
                <th>PROFESOR</th>
                <th>TAREAS</th>
                <th v-if="esProfesor">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="materias.length === 0">
                <td :colspan="esProfesor ? 6 : 5" class="empty-state">
                  <i class="fas fa-book-open"></i>
                  <p>{{ esProfesor ? 'Todavía no hay materias. Usá el botón "Agregar materia" para empezar.' : 'Tu profesor todavía no cargó materias.' }}</p>
                </td>
              </tr>
              <tr v-for="m in materias" :key="m.id">
                <td><strong>{{ m.materia }}</strong></td>
                <td>{{ m.horario }}</td>
                <td>{{ m.dias }}</td>
                <td>{{ m.profesor }}</td>
                <td>{{ m.tareas }}</td>
                <td v-if="esProfesor">
                  <button class="btn-eliminar" @click="eliminarMateria(m.id)">
                    <i class="fas fa-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- TAB: COMUNICADOS -->
      <section v-show="tabActivo === 'comunicados'" class="tab-content active">
        <div id="comunicados-lista">
          <div v-if="comunicados.length === 0" class="no-comunicados">
            <i class="fas fa-bullhorn"></i>
            <p>No hay comunicados publicados todavía.</p>
          </div>
          <div
            v-for="c in comunicados"
            :key="c.id"
            class="comunicado-card"
            :class="{ abierto: c.abierto }"
          >
            <div class="comunicado-header" @click="c.abierto = !c.abierto">
              <div class="comunicado-header-left">
                <div class="comunicado-icono"><i class="fas fa-bullhorn"></i></div>
                <div>
                  <div class="comunicado-titulo">{{ c.titulo || 'Sin título' }}</div>
                  <div class="comunicado-meta">
                    {{ [c.materia, c.profesor, formatFecha(c.fecha)].filter(Boolean).join(' · ') }}
                  </div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;">
                <span :class="`comunicado-badge ${tipoBadgeClass(c.tipo || 'General')}`">{{ c.tipo || 'General' }}</span>
                <i class="fas fa-chevron-down comunicado-toggle"></i>
              </div>
            </div>
            <div class="comunicado-cuerpo">
              <div class="comunicado-cuerpo-inner" v-html="c.cuerpoHtml || '<p>Sin contenido adicional.</p>'"></div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- MODAL: AGREGAR MATERIA -->
  <div class="modal-overlay" :class="{ active: modalAbierto }" @click.self="cerrarModal">
    <div class="modal-box">
      <button class="modal-close" @click="cerrarModal"><i class="fas fa-times"></i></button>
      <h2><i class="fas fa-plus-circle"></i> Agregar materia</h2>

      <div class="form-group">
        <label>Nombre de la materia *</label>
        <input type="text" v-model="form.materia" placeholder="Ej: Matemática" :style="{ borderColor: errorMateria ? '#ca0d0d' : '' }" @input="errorMateria = false" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Horario</label>
          <input type="text" v-model="form.horario" placeholder="Ej: 08:00 - 09:30" />
        </div>
        <div class="form-group">
          <label>Días</label>
          <input type="text" v-model="form.dias" placeholder="Ej: Lun / Mié" />
        </div>
      </div>
      <div class="form-group">
        <label>Profesor/a</label>
        <input type="text" v-model="form.profesor" placeholder="Ej: Prof. García" />
      </div>
      <div class="form-group">
        <label>Tareas / Observaciones</label>
        <input type="text" v-model="form.tareas" placeholder="Ej: Ejercicios cap. 3 o Sin tareas" />
      </div>

      <div class="modal-actions">
        <button class="btn-cancel" @click="cerrarModal">Cancelar</button>
        <button class="btn-save" @click="guardarMateria">Guardar materia</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ── Sesión ────────────────────────────────────────────
const userName  = ref(localStorage.getItem('userName') || 'Alumno')
const userRol   = ref(localStorage.getItem('userRol')  || 'alumno')
const esProfesor = computed(() => userRol.value === 'profesor')
const iniciales  = computed(() =>
  userName.value.trim().split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || 'A'
)

// ── Tabs ──────────────────────────────────────────────
const tabActivo = ref('materias')

// ── Materias ──────────────────────────────────────────
const materias = ref([])

function getMaterias() {
  return JSON.parse(localStorage.getItem('materias') || '[]')
}
function setMaterias(arr) {
  localStorage.setItem('materias', JSON.stringify(arr))
  materias.value = arr
}

function eliminarMateria(id) {
  if (!confirm('¿Eliminás esta materia?')) return
  setMaterias(getMaterias().filter(m => m.id !== id))
}

// ── Modal ─────────────────────────────────────────────
const modalAbierto = ref(false)
const errorMateria = ref(false)
const form = ref({ materia: '', horario: '', dias: '', profesor: '', tareas: '' })

function abrirModal() {
  form.value = { materia: '', horario: '', dias: '', profesor: '', tareas: '' }
  errorMateria.value = false
  modalAbierto.value = true
}
function cerrarModal() { modalAbierto.value = false }

function guardarMateria() {
  if (!form.value.materia.trim()) { errorMateria.value = true; return }
  const lista = getMaterias()
  lista.push({
    id:       Date.now(),
    materia:  form.value.materia.trim(),
    horario:  form.value.horario.trim()  || '—',
    dias:     form.value.dias.trim()     || '—',
    profesor: form.value.profesor.trim() || '—',
    tareas:   form.value.tareas.trim()   || 'Sin tareas',
  })
  setMaterias(lista)
  cerrarModal()
}

// ── Comunicados ───────────────────────────────────────
const comunicados = ref([])

function cargarComunicados() {
  const raw = JSON.parse(localStorage.getItem('comunicados') || '[]')
  raw.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  comunicados.value = raw.map(c => ({ ...c, abierto: false }))
}

function formatFecha(fecha) {
  if (!fecha) return 'Sin fecha'
  return new Date(fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function tipoBadgeClass(tipo) {
  return { Info: 'badge-info', Aviso: 'badge-warning' }[tipo] || ''
}

// ── Init ──────────────────────────────────────────────
onMounted(() => {
  materias.value = getMaterias()
  cargarComunicados()
})
</script>

<style scoped>
* { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
body { background:#f5f6fa; }

/* NAVBAR */
.navbar { display:flex; justify-content:space-between; align-items:center; padding:10px 1.5%; background:#fff; border-bottom:5px solid #fff; box-shadow:0 6px 12px rgba(0,0,0,.10); position:sticky; top:0; z-index:100; }
.nav-izquierda,.nav-derecha { display:flex; align-items:center; gap:15px; }
.logo { display:flex; align-items:center; gap:15px; margin:5px; }
.logo img { width:60px; height:60px; object-fit:contain; }
.logo-titulo { display:flex; flex-direction:column; gap:5px; }
.logo h2,.logo p { font-family:'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif; }
.logo h2 { font-size:1.4rem; font-weight:800; text-transform:uppercase; letter-spacing:.02em; color:#111; margin:0; }
.logo p { font-size:.85rem; color:gray; margin:2px 0 0; }

.nav-search { display:flex; align-items:center; gap:8px; background:#f5f6fa; border:1px solid #e2e8f0; border-radius:8px; padding:8px 14px; }
.nav-search i { color:#aaa; font-size:13px; }
.nav-search input { border:none; background:transparent; outline:none; font-size:14px; color:#333; width:180px; }
.nav-user { display:flex; align-items:center; gap:10px; cursor:pointer; }
.nav-user span { font-size:14px; color:#444; font-weight:600; }
.nav-avatar { width:45px; height:45px; border-radius:50%; background:linear-gradient(135deg,#ca0d0d,#420101); display:flex; align-items:center; justify-content:center; color:#fff; font-size:15px; font-weight:700; }

/* LAYOUT */
.container { display:flex; min-height:calc(100vh - 70px); }

/* SIDEBAR */
.sidebar { width:250px; background:linear-gradient(180deg,#ca0d0d,#420101); color:#fff; padding:20px; flex-shrink:0; display:flex; flex-direction:column; height:calc(100vh - 70px); position:sticky; top:70px; }
.sidebar ul { list-style:none; }
.sidebar a { text-decoration:none; color:#fff; display:block; }
.sidebar li { padding:20px; margin-bottom:8px; border-radius:10px; cursor:pointer; transition:.3s; display:flex; align-items:center; gap:6px; color:#fff; }
.sidebar li i { width:20px; text-align:center; flex-shrink:0; }
.sidebar li:hover,.sidebar li.active { background:rgba(255,255,255,.2); }
.sidebar-help { display:flex; align-items:center; gap:12px; background:rgba(255,255,255,.08); border-radius:10px; padding:12px 14px; margin-top:16px; }
.sidebar-help i { font-size:22px; color:rgba(255,255,255,.7); flex-shrink:0; }
.help-title { font-size:13px; font-weight:600; color:#fff; margin:0; }
.help-sub { font-size:11px; color:rgba(255,255,255,.6); margin:2px 0 0; }

/* CONTENT */
.content { flex:1; background:#f5f6fa; padding:30px 35px; display:flex; flex-direction:column; align-items:center; overflow-y:auto; }
.page-header { width:100%; max-width:1000px; margin-bottom:24px; }
.page-header h1 { font-size:2rem; color:#1e2430; display:flex; align-items:center; gap:12px; }
.header-icon { color:#ca0d0d; }
.page-header p { color:#666; font-size:14px; margin-top:6px; margin-left:46px; }

/* STATS */
.stats { display:flex; gap:18px; width:100%; max-width:1000px; margin-bottom:24px; }
.stat-card { background:#fff; flex:1; padding:20px 24px; border-radius:18px; display:flex; align-items:center; gap:16px; box-shadow:0 2px 8px rgba(0,0,0,.05); border:1px solid #efefef; border-left:4px solid transparent; transition:transform .2s; }
.stat-card:hover { transform:translateY(-2px); }
.stat-red { border-left-color:#ca0d0d; }
.stat-green { border-left-color:#38a169; }
.stat-icon { width:55px; height:55px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
.stat-red .stat-icon { background:#ffe9e9; color:#ca0d0d; }
.stat-green .stat-icon { background:#f0fff4; color:#38a169; }
.stat-info p { font-size:13px; color:#888; margin-bottom:2px; }
.stat-info h3 { font-size:1.6rem; font-weight:700; color:#1e2430; }

/* TABS */
.tabs-bar { display:flex; gap:8px; width:100%; max-width:1000px; margin-bottom:16px; }
.tab-btn { display:flex; align-items:center; gap:8px; padding:10px 22px; border:2px solid #efefef; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; background:#fff; color:#888; transition:all .2s; }
.tab-btn:hover { color:#ca0d0d; border-color:#ca0d0d; }
.tab-btn.active { background:#ca0d0d; color:#fff; border-color:#ca0d0d; box-shadow:0 4px 12px rgba(202,13,13,.25); }
.tab-content { display:none; width:100%; max-width:1000px; }
.tab-content.active { display:block; }

/* TABLA */
.table-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.table-header h3 { font-size:15px; color:#1e2430; font-weight:700; }
.btn-agregar { display:flex; align-items:center; gap:8px; padding:9px 18px; background:#ca0d0d; color:#fff; border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; transition:.2s; }
.btn-agregar:hover { background:#a80b0b; }
.table-container { background:#fff; padding:24px; border-radius:18px; box-shadow:0 2px 8px rgba(0,0,0,.05); border:1px solid #efefef; }
table { width:100%; border-collapse:collapse; }
th { color:#999; font-size:.78rem; text-transform:uppercase; letter-spacing:.06em; padding:12px 14px; border-bottom:2px solid #f0f0f0; text-align:left; }
td { padding:14px; border-bottom:1px solid #f5f5f5; color:#444; font-size:14px; }
tr:last-child td { border-bottom:none; }
tr:hover td { background:#fafafa; }
.btn-eliminar { background:none; border:1.5px solid #ffb8b8; color:#e25d5d; padding:5px 12px; border-radius:8px; cursor:pointer; font-size:12px; font-weight:600; transition:.2s; }
.btn-eliminar:hover { background:#fff0f0; }
.empty-state { text-align:center; padding:50px 20px; color:#bbb; }
.empty-state i { font-size:3rem; display:block; margin-bottom:12px; color:#ddd; }
.empty-state p { font-size:14px; }

/* COMUNICADOS */
#comunicados-lista { display:flex; flex-direction:column; gap:14px; }
.comunicado-card { background:#fff; border-radius:18px; border:1px solid #efefef; box-shadow:0 2px 8px rgba(0,0,0,.05); overflow:hidden; border-left:4px solid #ca0d0d; transition:box-shadow .2s; }
.comunicado-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.09); }
.comunicado-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; user-select:none; }
.comunicado-header-left { display:flex; align-items:center; gap:12px; }
.comunicado-icono { width:44px; height:44px; border-radius:12px; background:#ffe9e9; color:#ca0d0d; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
.comunicado-titulo { font-size:15px; font-weight:700; color:#1e2430; }
.comunicado-meta { font-size:12px; color:#aaa; margin-top:3px; }
.comunicado-badge { background:#ffe9e9; color:#ca0d0d; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; }
.badge-info { background:#ebf8ff; color:#3182ce; }
.badge-warning { background:#fffbeb; color:#d69e2e; }
.comunicado-toggle { font-size:13px; color:#bbb; transition:transform .25s; margin-left:8px; }
.comunicado-card.abierto .comunicado-toggle { transform:rotate(180deg); }
.comunicado-cuerpo { max-height:0; overflow:hidden; transition:max-height .3s ease, padding .3s ease; padding:0 20px; }
.comunicado-card.abierto .comunicado-cuerpo { max-height:600px; padding:16px 20px 20px; border-top:1px solid #f5f5f5; }
.comunicado-cuerpo-inner { font-size:14px; color:#555; line-height:1.7; }
.no-comunicados { background:#fff; border-radius:18px; padding:50px 20px; text-align:center; border:1px solid #efefef; color:#bbb; }
.no-comunicados i { font-size:3rem; display:block; margin-bottom:12px; color:#ddd; }
.no-comunicados p { font-size:14px; }

/* MODAL */
.modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:500; align-items:center; justify-content:center; }
.modal-overlay.active { display:flex; }
.modal-box { background:#fff; border-radius:20px; padding:30px 32px; width:480px; max-width:95vw; box-shadow:0 8px 32px rgba(0,0,0,.18); position:relative; }
.modal-box h2 { font-size:1.2rem; color:#1e2430; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
.modal-box h2 i { color:#ca0d0d; }
.modal-close { position:absolute; top:18px; right:20px; background:none; border:none; font-size:20px; color:#aaa; cursor:pointer; }
.modal-close:hover { color:#ca0d0d; }
.form-group { margin-bottom:16px; }
.form-group label { display:block; font-size:13px; font-weight:600; color:#555; margin-bottom:6px; }
.form-group input { width:100%; padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; color:#333; outline:none; transition:border-color .2s; background:#fff; }
.form-group input:focus { border-color:#ca0d0d; }
.form-row { display:flex; gap:12px; }
.form-row .form-group { flex:1; }
.modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:20px; }
.btn-cancel { padding:10px 22px; border:1.5px solid #e2e8f0; border-radius:10px; background:#fff; color:#666; font-weight:600; cursor:pointer; font-size:14px; transition:.2s; }
.btn-cancel:hover { background:#f5f6fa; }
.btn-save { padding:10px 26px; border:none; border-radius:10px; background:#ca0d0d; color:#fff; font-weight:700; cursor:pointer; font-size:14px; transition:.2s; }
.btn-save:hover { background:#a80b0b; }

@media (max-width:900px) {
  .sidebar { display:none; }
  .content { padding:20px; }
}
</style>