<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <i class="ti ti-chalkboard" aria-hidden="true"></i>
                Gestión de docentes
            </div>
            <button class="tb-btn primary" @click="mostrarFormulario = true">
                <i class="ti ti-plus" aria-hidden="true"></i>Nuevo docente
            </button>
        </div>

        <table class="mini" aria-label="Listado de docentes">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Materias asignadas</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prof in profesores" :key="prof.email">
                    <td>{{ prof.nombre }}</td>
                    <td class="email-cell">{{ prof.email }}</td>
                    <td>{{ prof.materias }}</td>
                    <td>
                        <span class="status-pill" :class="`sp-${prof.estado}`">
                            {{ etiquetaEstado[prof.estado] }}
                        </span>
                    </td>
                    <td>
                        <div class="actions-col">
                            <button class="icon-btn" aria-label="Editar">
                                <i
                                    class="ti ti-edit"
                                    style="font-size: 13px"
                                ></i>
                            </button>
                            <button
                                class="icon-btn danger"
                                aria-label="Eliminar"
                            >
                                <i
                                    class="ti ti-trash"
                                    style="font-size: 13px"
                                ></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="card" v-if="mostrarFormulario">
        <div class="card-header">
            <div class="card-title">
                <i class="ti ti-forms" aria-hidden="true"></i>
                Registro rápido de docente
            </div>
            <button class="card-action" @click="mostrarFormulario = false">
                Cerrar
            </button>
        </div>

        <div class="form-mini">
            <div class="field-row">
                <div>
                    <div class="field-label">Nombre</div>
                    <input
                        v-model="profesorInfo.nombre"
                        class="field-input"
                        type="text"
                        placeholder="Nombre"
                        aria-label="Nombre"
                    />
                </div>
                <div>
                    <div class="field-label">Apellido</div>
                    <input
                        v-model="profesorInfo.apellido"
                        class="field-input"
                        type="text"
                        placeholder="Apellido"
                        aria-label="Apellido"
                    />
                </div>
            </div>
            <div class="field-row full">
                <div>
                    <div class="field-label">Email institucional</div>
                    <input
                        v-model="profesorInfo.email"
                        class="field-input"
                        type="email"
                        placeholder="docente@esc.edu"
                        aria-label="Email"
                    />
                </div>
            </div>

            <p v-if="error" class="error-msg">{{ error }}</p>

            <div style="margin-top: 4px">
                <button
                    class="tb-btn primary"
                    @click="registrarProfesor"
                    :disabled="cargando"
                >
                    <i class="ti ti-check" aria-hidden="true"></i>
                    {{ cargando ? "Registrando..." : "Registrar docente" }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const profesores = ref([]);
const mostrarFormulario = ref(false);
const cargando = ref(false);
const error = ref("");

const profesorInfo = reactive({
    nombre: "",
    apellido: "",
    email: "",
});

const etiquetaEstado = {
    active: "Activo",
    pending: "Sin asig. completa",
};

const registrarProfesor = async () => {
    error.value = "";
    if (!profesorInfo.nombre || !profesorInfo.apellido || !profesorInfo.email) {
        error.value = "Completá todos los campos.";
        return;
    }
    try {
        cargando.value = true;
        // TODO: await crearProfesor(profesorInfo)
        console.log("Registrar profesor:", profesorInfo);
    } catch {
        error.value = "Error al registrar el docente.";
    } finally {
        cargando.value = false;
    }
};

onMounted(() => {
    // Datos de ejemplo hasta conectar el backend
    profesores.value = [
        {
            nombre: "Prof. Garmendia",
            email: "garmendia@esc.edu",
            materias: "Matemáticas 5°A, 4°B",
            estado: "active",
        },
        {
            nombre: "Prof. Molina",
            email: "molina@esc.edu",
            materias: "Historia 4°B, 3°A",
            estado: "active",
        },
        {
            nombre: "Prof. Castro",
            email: "castro@esc.edu",
            materias: "Biología 3°A",
            estado: "pending",
        },
        {
            nombre: "Prof. Suárez",
            email: "suarez@esc.edu",
            materias: "Lengua 2°C, 1°A",
            estado: "active",
        },
    ];
});
</script>

<style scoped>
.card {
    background: var(--color-background-primary, #ffffff);
    border: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    border-radius: 8px;
    padding: 14px;
}
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}
.card-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-primary, #111827);
    display: flex;
    align-items: center;
    gap: 6px;
}
.card-title i {
    font-size: 15px;
    color: #cd322c;
}
.card-action {
    font-size: 11px;
    color: #cd322c;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
}
.card-action:hover {
    text-decoration: underline;
}
.mini {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}
.mini th {
    text-align: left;
    padding: 6px 8px;
    color: var(--color-text-tertiary, #6b7280);
    font-weight: 400;
    font-size: 11px;
    border-bottom: 0.5px solid var(--color-border-tertiary, #e5e7eb);
}
.mini td {
    padding: 7px 8px;
    border-bottom: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    color: var(--color-text-primary, #111827);
}
.mini tr:last-child td {
    border-bottom: none;
}
.email-cell {
    font-size: 11px;
    color: var(--color-text-tertiary, #6b7280);
}
.actions-col {
    display: flex;
    gap: 4px;
}
.icon-btn {
    width: 26px;
    height: 26px;
    border-radius: 5px;
    border: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary, #4b5563);
}
.icon-btn:hover {
    background: var(--color-background-secondary, #f3f4f6);
}
.icon-btn.danger:hover {
    background: #fcebeb;
    color: #a32d2d;
    border-color: #f09595;
}
.status-pill {
    font-size: 10px;
    padding: 2px 7px;
    border-radius: 10px;
}
.sp-active {
    background: #eaf3de;
    color: #3b6d11;
}
.sp-pending {
    background: #faeeda;
    color: #854f0b;
}
.form-mini {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
}
.field-row.full {
    grid-template-columns: 1fr;
}
.field-label {
    font-size: 11px;
    color: var(--color-text-secondary, #4b5563);
    margin-bottom: 2px;
}
.field-input {
    width: 100%;
    padding: 6px 8px;
    border-radius: 5px;
    border: 0.5px solid var(--color-border-secondary, #d1d5db);
    background: var(--color-background-secondary, #ffffff);
    color: var(--color-text-primary, #111827);
    font-size: 12px;
    outline: none;
}
.field-input:focus {
    border-color: #cd322c;
}
.tb-btn {
    padding: 6px 12px;
    border-radius: 6px;
    border: 0.5px solid var(--color-border-tertiary, #e5e7eb);
    background: var(--color-background-secondary, #f3f4f6);
    color: var(--color-text-secondary, #4b5563);
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}
.tb-btn.primary {
    background: #cd322c;
    color: #fff;
    border-color: #cd322c;
}
.tb-btn.primary:hover {
    background: #a52420;
}
.tb-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
.error-msg {
    font-size: 12px;
    color: #a32d2d;
    background: #fcebeb;
    padding: 6px 10px;
    border-radius: 5px;
}
</style>
