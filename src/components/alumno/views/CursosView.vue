<template>
    <main class="content">
        <header class="page-header">
            <div class="page-header-text">
                <h1>
                    <i class="fas fa-graduation-cap header-icon"></i> Mis
                    Materias
                </h1>
                <p>
                    Revisá tus materias, los materiales subidos por tus
                    profesores y los comunicados del curso.
                </p>
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
            <button
                class="tab-btn"
                :class="{ active: tabActivo === 'materias' }"
                @click="tabActivo = 'materias'"
            >
                <i class="fas fa-table"></i> Mis Materias
            </button>
            <button
                class="tab-btn"
                :class="{ active: tabActivo === 'comunicados' }"
                @click="tabActivo = 'comunicados'"
            >
                <i class="fas fa-bullhorn"></i> Comunicados
            </button>
        </div>

        <section v-show="tabActivo === 'materias'" class="tab-content active">
            <div class="table-container">
                <div class="table-header">
                    <h3>Materias del curso</h3>
                    <button
                        v-if="esProfesor"
                        class="btn-agregar"
                        @click="abrirModal"
                    >
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
                            <td
                                :colspan="esProfesor ? 6 : 5"
                                class="empty-state"
                            >
                                <i class="fas fa-book-open"></i>
                                <p>
                                    {{
                                        esProfesor
                                            ? 'Usá el botón "Agregar materia" para empezar.'
                                            : "Tu profesor todavía no cargó materias."
                                    }}
                                </p>
                            </td>
                        </tr>
                        <tr v-for="m in materias" :key="m.id">
                            <td>
                                <strong>{{ m.materia }}</strong>
                            </td>
                            <td>{{ m.horario }}</td>
                            <td>{{ m.dias }}</td>
                            <td>{{ m.profesor }}</td>
                            <td>{{ m.tareas }}</td>
                            <td v-if="esProfesor">
                                <button
                                    class="btn-eliminar"
                                    @click="eliminarMateria(m.id)"
                                >
                                    <i class="fas fa-trash"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section
            v-show="tabActivo === 'comunicados'"
            class="tab-content active"
        >
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
                    <div
                        class="comunicado-header"
                        @click="c.abierto = !c.abierto"
                    >
                        <div class="comunicado-header-left">
                            <div class="comunicado-icono">
                                <i class="fas fa-bullhorn"></i>
                            </div>
                            <div>
                                <div class="comunicado-titulo">
                                    {{ c.titulo || "Sin título" }}
                                </div>
                                <div class="comunicado-meta">
                                    {{
                                        [
                                            c.materia,
                                            c.profesor,
                                            formatFecha(c.fecha),
                                        ]
                                            .filter(Boolean)
                                            .join(" · ")
                                    }}
                                </div>
                            </div>
                        </div>
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                gap: 10px;
                            "
                        >
                            <span
                                :class="`comunicado-badge ${tipoBadgeClass(c.tipo || 'General')}`"
                                >{{ c.tipo || "General" }}</span
                            >
                            <i
                                class="fas fa-chevron-down comunicado-toggle"
                            ></i>
                        </div>
                    </div>
                    <div class="comunicado-cuerpo">
                        <div
                            class="comunicado-cuerpo-inner"
                            v-html="
                                c.cuerpoHtml ||
                                '<p>Sin contenido adicional.</p>'
                            "
                        ></div>
                    </div>
                </div>
            </div>
        </section>

        <div
            class="modal-overlay"
            :class="{ active: modalAbierto }"
            @click.self="cerrarModal"
        >
            <div class="modal-box">
                <button class="modal-close" @click="cerrarModal">
                    <i class="fas fa-times"></i>
                </button>
                <h2><i class="fas fa-plus-circle"></i> Agregar materia</h2>
                <div class="form-group">
                    <label>Nombre de la materia *</label>
                    <input
                        type="text"
                        v-model="form.materia"
                        placeholder="Ej: Matemática"
                        :style="{ borderColor: errorMateria ? '#ca0d0d' : '' }"
                        @input="errorMateria = false"
                    />
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Horario</label
                        ><input
                            type="text"
                            v-model="form.horario"
                            placeholder="Ej: 08:00 - 09:30"
                        />
                    </div>
                    <div class="form-group">
                        <label>Días</label
                        ><input
                            type="text"
                            v-model="form.dias"
                            placeholder="Ej: Lun / Mié"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label>Profesor/a</label
                    ><input
                        type="text"
                        v-model="form.profesor"
                        placeholder="Ej: Prof. García"
                    />
                </div>
                <div class="form-group">
                    <label>Tareas</label
                    ><input
                        type="text"
                        v-model="form.tareas"
                        placeholder="Ej: Sin tareas"
                    />
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel" @click="cerrarModal">
                        Cancelar
                    </button>
                    <button class="btn-save" @click="guardarMateria">
                        Guardar materia
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const userRol = computed(() => authStore.rol || "alumno");
const esProfesor = computed(() => ["profesor", "root"].includes(userRol.value));

const tabActivo = ref("materias");
const materias = ref([]);
const comunicados = ref([]);

function getMaterias() {
    return JSON.parse(localStorage.getItem("materias") || "[]");
}
function setMaterias(arr) {
    localStorage.setItem("materias", JSON.stringify(arr));
    materias.value = arr;
}

function eliminarMateria(id) {
    if (!confirm("¿Eliminás esta materia?")) return;
    setMaterias(getMaterias().filter((m) => m.id !== id));
}

const modalAbierto = ref(false);
const errorMateria = ref(false);
const form = ref({
    materia: "",
    horario: "",
    dias: "",
    profesor: "",
    tareas: "",
});

function abrirModal() {
    form.value = {
        materia: "",
        horario: "",
        dias: "",
        profesor: "",
        tareas: "",
    };
    errorMateria.value = false;
    modalAbierto.value = true;
}
const cerrarModal = () => (modalAbierto.value = false);

function guardarMateria() {
    if (!form.value.materia.trim()) {
        errorMateria.value = true;
        return;
    }
    const lista = getMaterias();
    lista.push({
        id: Date.now(),
        materia: form.value.materia.trim(),
        horario: form.value.horario.trim() || "—",
        dias: form.value.dias.trim() || "—",
        profesor: form.value.profesor.trim() || "—",
        tareas: form.value.tareas.trim() || "Sin tareas",
    });
    setMaterias(lista);
    cerrarModal();
}

function cargarComunicados() {
    const raw = JSON.parse(localStorage.getItem("comunicados") || "[]");
    raw.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    comunicados.value = raw.map((c) => ({ ...c, abierto: false }));
}

const formatFecha = (fecha) =>
    fecha
        ? new Date(fecha).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
          })
        : "Sin fecha";
const tipoBadgeClass = (tipo) =>
    ({ Info: "badge-info", Aviso: "badge-warning" })[tipo] || "";

onMounted(() => {
    materias.value = getMaterias();
    cargarComunicados();
});
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
.btn-agregar {
    background: #ca0d0d;
    color: #fff;
    border: none;
    padding: 9px 18px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
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
.btn-eliminar {
    background: none;
    border: 1.5px solid #ffb8b8;
    color: #e25d5d;
    padding: 5px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
    font-weight: 600;
}
.btn-eliminar:hover {
    background: #fff0f0;
    border-color: #ca0d0d;
    color: #ca0d0d;
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

.modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 500;
    align-items: center;
    justify-content: center;
}
.modal-overlay.active {
    display: flex;
}
.modal-box {
    background: #fff;
    border-radius: 20px;
    padding: 30px 32px;
    width: 480px;
    position: relative;
}
.modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
}
.form-group {
    margin-bottom: 16px;
}
.form-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
}
.form-group input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    transition: border-color 0.2s;
    box-sizing: border-box;
}
.form-group input:focus {
    border-color: #ca0d0d;
    box-shadow: 0 0 0 3px rgba(202, 13, 13, 0.08);
}
.form-row {
    display: flex;
    gap: 12px;
}
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}
.btn-save {
    background: #ca0d0d;
    color: #fff;
    border: none;
    padding: 10px 26px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.2s;
}
.btn-save:hover {
    background: #a80b0b;
}
.btn-cancel {
    background: #fff;
    border: 1.5px solid #e2e8f0;
    padding: 10px 22px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    color: #666;
    transition: border-color 0.2s;
}
.btn-cancel:hover {
    border-color: #ca0d0d;
    color: #ca0d0d;
}
</style>
