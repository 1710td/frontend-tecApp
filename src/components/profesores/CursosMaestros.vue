<template>
    <div class="docente-wrapper">
        <nav class="navbar">
            <div class="nav-izquierda">
                <div class="logo">
                    <img
                        src="/logoEscuela.png"
                        width="48"
                        height="48"
                        alt="Logo"
                    />
                    <div class="logo-titulo">
                        <h2>Gestión Escolar</h2>
                        <p>Panel docente</p>
                    </div>
                </div>
            </div>

            <div class="profile-container">
                <button
                    class="profile-trigger"
                    @click="menuAbierto = !menuAbierto"
                >
                    <img :src="avatarUrl" alt="Avatar" />
                </button>
                <div class="profile-menu" :class="{ active: menuAbierto }">
                    <div class="menu-header">
                        <img
                            :src="avatarUrl"
                            class="large-avatar"
                            alt="Avatar grande"
                        />
                        <p class="user-name">{{ docente.nombre }}</p>
                        <p class="user-email">{{ docente.email }}</p>
                    </div>
                    <hr />
                    <div class="menu-body">
                        <p class="user-role">
                            Rol: <span id="roleBadge">Profesor</span>
                        </p>
                        <a href="#" class="menu-item"
                            ><i class="fas fa-user-cog"></i> Mi Perfil</a
                        >
                        <a href="#" class="menu-item"
                            ><i class="fas fa-book"></i> Mis Cursos</a
                        >
                    </div>
                    <hr />
                    <button class="sign-out-btn" @click="cerrarSesion">
                        <i class="fas fa-right-from-bracket"></i> &nbsp;Cerrar
                        sesión
                    </button>
                </div>
            </div>
        </nav>

        <div class="container">
            <aside class="sidebar">
                <ul>
                    <li>
                        <RouterLink to="/inicio"
                            ><i class="fas fa-home"></i> Inicio</RouterLink
                        >
                    </li>
                    <li>
                        <RouterLink to="/noticias"
                            ><i class="fas fa-newspaper"></i>
                            Noticias</RouterLink
                        >
                    </li>
                    <li>
                        <RouterLink to="/biblioteca"
                            ><i class="fas fa-book"></i> Biblioteca</RouterLink
                        >
                    </li>
                    <li>
                        <RouterLink to="/objetos-perdidos"
                            ><i class="fas fa-box"></i> Objetos
                            Perdidos</RouterLink
                        >
                    </li>
                    <li class="active">
                        <RouterLink to="/cursos-docente"
                            ><i class="fas fa-graduation-cap"></i>
                            Cursos</RouterLink
                        >
                    </li>
                </ul>
                <div class="sidebar-help">
                    <i class="fas fa-circle-question"></i>
                    <div>
                        <p class="help-title">¿Necesitás ayuda?</p>
                        <p class="help-sub">Pixelina resolverá tu consulta.</p>
                    </div>
                </div>
            </aside>

            <main class="main-content" @click="menuAbierto = false">
                <header class="prof-header">
                    <div class="prof-header-left">
                        <div class="prof-avatar-wrap">
                            <img
                                :src="avatarUrl"
                                alt="Avatar profesor"
                                id="profAvatar"
                            />
                            <span class="prof-status-dot"></span>
                        </div>
                        <div class="prof-info">
                            <p class="prof-label">DOCENTE ACTIVO</p>
                            <h1>{{ docente.nombre }}</h1>
                            <p class="prof-sub">
                                {{
                                    materiasProfesor.length > 0
                                        ? materiasProfesor[0].nombre
                                        : "Sin materias"
                                }}
                                · {{ materiasProfesor.length }} materias
                            </p>
                        </div>
                    </div>
                    <div class="prof-header-stats">
                        <div class="hs-item">
                            <span class="hs-num">{{ totalCursosUnicos }}</span>
                            <span class="hs-label">Cursos</span>
                        </div>
                        <div class="hs-divider"></div>
                        <div class="hs-item">
                            <span class="hs-num">{{ totalAlumnosUnicos }}</span>
                            <span class="hs-label">Alumnos</span>
                        </div>
                        <div class="hs-divider"></div>
                        <div class="hs-item">
                            <span class="hs-num">{{
                                materiasProfesor.length
                            }}</span>
                            <span class="hs-label">Materias</span>
                        </div>
                    </div>
                </header>

                <nav class="tabs-nav">
                    <button
                        :class="['tab-btn', { active: tabActiva === 'info' }]"
                        @click="tabActiva = 'info'"
                    >
                        <i class="fas fa-id-card"></i> Información Personal
                    </button>
                    <button
                        :class="[
                            'tab-btn',
                            { active: tabActiva === 'materias' },
                        ]"
                        @click="tabActiva = 'materias'"
                    >
                        <i class="fas fa-chalkboard-teacher"></i> Mis Materias
                    </button>
                    <button
                        :class="['tab-btn', { active: tabActiva === 'cursos' }]"
                        @click="tabActiva = 'cursos'"
                    >
                        <i class="fas fa-graduation-cap"></i> Mis Cursos
                    </button>
                    <button
                        :class="[
                            'tab-btn',
                            { active: tabActiva === 'asistencias' },
                        ]"
                        @click="tabActiva = 'asistencias'"
                    >
                        <i class="fas fa-clipboard-check"></i> Asistencias
                    </button>
                    <button
                        :class="[
                            'tab-btn',
                            { active: tabActiva === 'noticias' },
                        ]"
                        @click="tabActiva = 'noticias'"
                    >
                        <i class="fas fa-newspaper"></i> Noticias
                    </button>
                </nav>

                <section v-show="tabActiva === 'info'" class="tab-panel active">
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-header">
                                <i class="fas fa-user"></i>
                                <h3>Datos personales</h3>
                            </div>
                            <div class="info-fields">
                                <div class="info-field">
                                    <span class="field-label"
                                        >Nombre completo</span
                                    >
                                    <span class="field-value">{{
                                        docente.nombre
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">DNI</span>
                                    <span class="field-value">{{
                                        docente.dni || "—"
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label"
                                        >Correo institucional</span
                                    >
                                    <span class="field-value">{{
                                        docente.email
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Teléfono</span>
                                    <span class="field-value editable">{{
                                        docente.telefono || "—"
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Dirección</span>
                                    <span class="field-value editable">{{
                                        docente.direccion || "—"
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label"
                                        >Fecha de nacimiento</span
                                    >
                                    <span class="field-value editable">{{
                                        formatFechaVisual(docente.nacimiento)
                                    }}</span>
                                </div>
                            </div>
                            <button
                                class="btn-edit-info"
                                @click="abrirModalEdicion"
                            >
                                <i class="fas fa-pen"></i> Editar datos
                            </button>
                        </div>

                        <div class="info-card">
                            <div class="info-card-header">
                                <i class="fas fa-briefcase"></i>
                                <h3>Datos laborales</h3>
                            </div>
                            <div class="info-fields">
                                <div class="info-field">
                                    <span class="field-label">Cargo</span>
                                    <span class="field-value">Profesor</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label"
                                        >Departamento</span
                                    >
                                    <span class="field-value editable">{{
                                        docente.departamento || "—"
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Antigüedad</span>
                                    <span class="field-value editable">{{
                                        docente.antiguedad || "—"
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label"
                                        >Tipo de contrato</span
                                    >
                                    <span class="field-value editable">{{
                                        docente.contrato || "—"
                                    }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Turno</span>
                                    <span class="field-value editable">{{
                                        docente.turno || "—"
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    v-show="tabActiva === 'materias'"
                    class="tab-panel active"
                >
                    <div class="tab-toolbar">
                        <div class="tab-toolbar-left">
                            <h2 class="section-title">
                                <i class="fas fa-chalkboard-teacher"></i>
                                Materias que enseño
                            </h2>
                        </div>
                        <button
                            class="btn-add-subject"
                            @click="modales.materia = true"
                        >
                            <i class="fas fa-plus"></i> Agregar Materia
                        </button>
                    </div>

                    <div class="materias-grid">
                        <div
                            v-if="materiasProfesor.length === 0"
                            class="noticia-empty"
                            style="grid-column: 1/-1"
                        >
                            <i
                                class="fas fa-chalkboard-teacher"
                                style="font-size: 2rem; color: #cbd5e1"
                            ></i>
                            <p>
                                Todavía no agregaste materias. Usá el botón
                                <strong>Agregar Materia</strong>.
                            </p>
                        </div>

                        <div
                            v-for="(mat, idx) in materiasProfesor"
                            :key="idx"
                            class="materia-card"
                        >
                            <button
                                class="btn-eliminar-materia"
                                title="Eliminar materia"
                                @click="eliminarMateria(idx)"
                            >
                                <i class="fas fa-trash"></i>
                            </button>
                            <div class="materia-icon">
                                <i
                                    :class="['fas', iconoMateria(mat.nombre)]"
                                ></i>
                            </div>
                            <div class="materia-nombre">{{ mat.nombre }}</div>
                            <div class="materia-cursos-tag">
                                {{
                                    mat.cursos.length > 0
                                        ? mat.cursos.join(" · ")
                                        : "Sin cursos asignados"
                                }}
                            </div>
                            <span class="materia-badge">
                                {{ mat.cursos.length }}
                                {{
                                    mat.cursos.length === 1 ? "curso" : "cursos"
                                }}
                            </span>
                        </div>
                    </div>
                </section>

                <section
                    v-show="tabActiva === 'cursos'"
                    class="tab-panel active"
                >
                    <div class="tab-toolbar">
                        <div class="tab-toolbar-left">
                            <h2 class="section-title">
                                <i class="fas fa-graduation-cap"></i> Cursos en
                                que imparto clases
                            </h2>
                        </div>
                        <div class="filter-group">
                            <span class="courses-title">Curso:</span>
                            <select v-model="cursoVisualizado">
                                <option value="" disabled>
                                    Seleccionar curso…
                                </option>
                                <option
                                    v-for="curso in listaCursosGlobales"
                                    :key="curso"
                                    :value="curso"
                                >
                                    {{ curso }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <section class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Materia</th>
                                    <th
                                        style="width: 130px; text-align: center"
                                    >
                                        Alumnos
                                    </th>
                                    <th style="width: 120px">Tareas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!cursoVisualizado">
                                    <td colspan="3" class="empty-state">
                                        <i
                                            class="fas fa-graduation-cap empty-icon"
                                        ></i>
                                        <p>
                                            Seleccioná un curso para ver las
                                            materias
                                        </p>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr
                                        v-for="(
                                            materia, index
                                        ) in materiasDelCursoVisualizado"
                                        :key="index"
                                    >
                                        <td>{{ materia }}</td>
                                        <td
                                            v-if="index === 0"
                                            :rowspan="
                                                materiasDelCursoVisualizado.length
                                            "
                                            class="alumnos-cell"
                                            style="text-align: center"
                                        >
                                            {{
                                                datosCursos[cursoVisualizado]
                                                    .alumnos
                                            }}
                                        </td>
                                        <td class="tareas-cell">—</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </section>
                </section>

                <section
                    v-show="tabActiva === 'asistencias'"
                    class="tab-panel active"
                >
                    <div class="tab-toolbar">
                        <div class="tab-toolbar-left">
                            <h2 class="section-title">
                                <i class="fas fa-clipboard-check"></i> Registro
                                de asistencias
                            </h2>
                        </div>
                        <div class="asist-toolbar-right">
                            <div class="filter-group">
                                <span class="courses-title">Curso:</span>
                                <select v-model="asistenciaForm.curso">
                                    <option value="" disabled>
                                        Seleccionar curso…
                                    </option>
                                    <option
                                        v-for="curso in listaCursosGlobales"
                                        :key="curso"
                                        :value="curso"
                                    >
                                        {{ curso }}
                                    </option>
                                </select>
                            </div>
                            <input
                                type="date"
                                v-model="asistenciaForm.fecha"
                                class="date-input"
                            />
                            <button
                                class="btn-add-subject"
                                :disabled="
                                    !asistenciaForm.curso ||
                                    tomaAsistenciaActiva
                                "
                                @click="iniciarTomaAsistencia"
                            >
                                <i class="fas fa-clipboard-check"></i> Tomar
                                asistencia
                            </button>
                        </div>
                    </div>

                    <div v-show="tomaAsistenciaActiva" class="asist-resumen">
                        <div class="asist-stat asist-presentes">
                            <span class="asist-num">{{
                                contadoresAsistencia.presentes
                            }}</span>
                            <span class="asist-lbl">Presentes</span>
                        </div>
                        <div class="asist-stat asist-ausentes">
                            <span class="asist-num">{{
                                contadoresAsistencia.ausentes
                            }}</span>
                            <span class="asist-lbl">Ausentes</span>
                        </div>
                        <div class="asist-stat asist-tardanzas">
                            <span class="asist-num">{{
                                contadoresAsistencia.tardanzas
                            }}</span>
                            <span class="asist-lbl">Tardanzas</span>
                        </div>
                        <button
                            class="btn-guardar-asist"
                            @click="guardarAsistencia"
                        >
                            <i class="fas fa-save"></i> Guardar asistencia
                        </button>
                    </div>

                    <div v-show="tomaAsistenciaActiva" class="asist-lista-wrap">
                        <div class="asist-lista">
                            <div
                                v-for="alumno in alumnosParaAsistencia"
                                :key="alumno"
                                :class="[
                                    'alumno-row',
                                    estadoAsistencia[alumno],
                                ]"
                            >
                                <span class="alumno-nombre">{{ alumno }}</span>
                                <div class="asist-btns">
                                    <button
                                        :class="[
                                            'asist-btn btn-presente',
                                            {
                                                selected:
                                                    estadoAsistencia[alumno] ===
                                                    'presente',
                                            },
                                        ]"
                                        @click="
                                            estadoAsistencia[alumno] =
                                                'presente'
                                        "
                                        title="Presente"
                                    >
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button
                                        :class="[
                                            'asist-btn btn-ausente',
                                            {
                                                selected:
                                                    estadoAsistencia[alumno] ===
                                                    'ausente',
                                            },
                                        ]"
                                        @click="
                                            estadoAsistencia[alumno] = 'ausente'
                                        "
                                        title="Ausente"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                    <button
                                        :class="[
                                            'asist-btn btn-tardanza',
                                            {
                                                selected:
                                                    estadoAsistencia[alumno] ===
                                                    'tardanza',
                                            },
                                        ]"
                                        @click="
                                            estadoAsistencia[alumno] =
                                                'tardanza'
                                        "
                                        title="Tardanza"
                                    >
                                        <i class="fas fa-clock"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-container">
                        <div class="historial-header">
                            <i class="fas fa-history"></i>
                            <span>Historial de asistencias</span>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Curso</th>
                                    <th style="text-align: center">
                                        Presentes
                                    </th>
                                    <th style="text-align: center">Ausentes</th>
                                    <th style="text-align: center">
                                        Tardanzas
                                    </th>
                                    <th style="text-align: center">
                                        % Asistencia
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="historialAsistencias.length === 0">
                                    <td colspan="6" class="empty-state">
                                        <i
                                            class="fas fa-clipboard empty-icon"
                                        ></i>
                                        <p>
                                            Aún no hay asistencias registradas
                                        </p>
                                    </td>
                                </tr>
                                <tr
                                    v-for="(hist, i) in historialAsistencias"
                                    :key="i"
                                >
                                    <td>{{ hist.fecha }}</td>
                                    <td>
                                        <strong>{{ hist.curso }}</strong>
                                    </td>
                                    <td
                                        style="
                                            text-align: center;
                                            color: var(--success);
                                            font-weight: 700;
                                        "
                                    >
                                        {{ hist.presentes }}
                                    </td>
                                    <td
                                        style="
                                            text-align: center;
                                            color: var(--danger);
                                            font-weight: 700;
                                        "
                                    >
                                        {{ hist.ausentes }}
                                    </td>
                                    <td
                                        style="
                                            text-align: center;
                                            color: var(--warning);
                                            font-weight: 700;
                                        "
                                    >
                                        {{ hist.tardanzas }}
                                    </td>
                                    <td style="text-align: center">
                                        <span
                                            :class="[
                                                'porc-badge',
                                                getClasePorcentaje(hist.porc),
                                            ]"
                                            >{{ hist.porc }}%</span
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section
                    v-show="tabActiva === 'noticias'"
                    class="tab-panel active"
                >
                    <div class="tab-toolbar">
                        <div class="tab-toolbar-left">
                            <h2 class="section-title">
                                <i class="fas fa-newspaper"></i> Noticias del
                                establecimiento
                            </h2>
                        </div>
                        <button
                            class="btn-add-subject"
                            @click="abrirModalNuevaNoticia"
                        >
                            <i class="fas fa-plus"></i> Nueva noticia
                        </button>
                    </div>

                    <div class="noticias-grid">
                        <div
                            v-if="noticias.length === 0"
                            class="noticia-empty"
                            style="grid-column: 1/-1"
                        >
                            <i
                                class="fas fa-newspaper"
                                style="font-size: 2rem; color: #cbd5e1"
                            ></i>
                            <p>No hay noticias publicadas todavía.</p>
                        </div>

                        <div
                            v-for="n in noticias"
                            :key="n.id"
                            class="noticia-card"
                            @click="verNoticia(n)"
                            style="cursor: pointer"
                        >
                            <div
                                :class="[
                                    'noticia-franja',
                                    `franja-${categoriaClass(n.categoria)}`,
                                ]"
                            ></div>
                            <div class="noticia-body">
                                <span
                                    :class="[
                                        'noticia-categoria',
                                        `cat-${categoriaClass(n.categoria)}`,
                                    ]"
                                >
                                    {{ n.categoria }}
                                </span>
                                <p class="noticia-titulo">{{ n.titulo }}</p>
                                <p
                                    class="noticia-preview"
                                    style="
                                        display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                    "
                                >
                                    {{ n.contenido }}
                                </p>
                            </div>
                            <div class="noticia-footer">
                                <span class="noticia-fecha"
                                    ><i class="fas fa-calendar-alt"></i>
                                    {{ n.fecha }}</span
                                >
                                <span>{{ n.autor }}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

        <div
            v-if="modales.editInfo"
            class="modal-overlay active"
            @click.self="modales.editInfo = false"
        >
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Editar información personal</h3>
                    <span class="close-modal" @click="modales.editInfo = false"
                        >&times;</span
                    >
                </div>
                <div class="modal-body modal-body-grid">
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            v-model="formInfo.telefono"
                            placeholder="Ej: +54 9 299 123-4567"
                        />
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            v-model="formInfo.direccion"
                            placeholder="Ej: Av. San Martín 123"
                        />
                    </div>
                    <div class="form-group">
                        <label>Fecha de nacimiento</label>
                        <input type="date" v-model="formInfo.nacimiento" />
                    </div>
                    <div class="form-group">
                        <label>Departamento</label>
                        <input
                            type="text"
                            v-model="formInfo.departamento"
                            placeholder="Ej: Ciencias Exactas"
                        />
                    </div>
                    <div class="form-group">
                        <label>Antigüedad</label>
                        <input
                            type="text"
                            v-model="formInfo.antiguedad"
                            placeholder="Ej: 5 años"
                        />
                    </div>
                    <div class="form-group">
                        <label>Tipo de contrato</label>
                        <input
                            type="text"
                            v-model="formInfo.contrato"
                            placeholder="Ej: Planta permanente"
                        />
                    </div>
                    <div class="form-group form-group-full">
                        <label>Turno</label>
                        <select v-model="formInfo.turno">
                            <option value="">Sin turno asignado</option>
                            <option>Mañana</option>
                            <option>Tarde</option>
                            <option>Noche</option>
                            <option>Mañana y tarde</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        class="btn-cancel"
                        @click="modales.editInfo = false"
                    >
                        Cancelar
                    </button>
                    <button class="btn-submit" @click="guardarInfoPersonal">
                        <i class="fas fa-check"></i> &nbsp;Guardar cambios
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="modales.noticia"
            class="modal-overlay active"
            @click.self="modales.noticia = false"
        >
            <div class="modal-content modal-wide">
                <div class="modal-header">
                    <h3>Nueva noticia</h3>
                    <span class="close-modal" @click="modales.noticia = false"
                        >&times;</span
                    >
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            v-model="formNoticia.titulo"
                            :class="{ 'input-error': errores.noticiaTitulo }"
                            placeholder="Título de la noticia"
                        />
                    </div>
                    <div class="form-group" style="margin-top: 14px">
                        <label>Categoría</label>
                        <select v-model="formNoticia.categoria">
                            <option value="Informativa">Informativa</option>
                            <option value="Académica">Académica</option>
                            <option value="Evento">Evento</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-top: 14px">
                        <label>Contenido</label>
                        <textarea
                            v-model="formNoticia.contenido"
                            :class="{ 'input-error': errores.noticiaContenido }"
                            rows="5"
                            placeholder="Escribí el contenido de la noticia…"
                        ></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="modales.noticia = false">
                        Cancelar
                    </button>
                    <button class="btn-submit" @click="guardarNoticia">
                        <i class="fas fa-check"></i> &nbsp;Publicar
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="modales.verNoticia && noticiaSeleccionada"
            class="modal-overlay active"
            @click.self="modales.verNoticia = false"
        >
            <div class="modal-content modal-wide">
                <div class="modal-header">
                    <h3>{{ noticiaSeleccionada.titulo }}</h3>
                    <span
                        class="close-modal"
                        @click="modales.verNoticia = false"
                        >&times;</span
                    >
                </div>
                <div class="modal-body">
                    <p class="noticia-meta">
                        <span
                            :class="[
                                'noticia-categoria',
                                `cat-${categoriaClass(noticiaSeleccionada.categoria)}`,
                            ]"
                        >
                            {{ noticiaSeleccionada.categoria }} </span
                        >&nbsp; {{ noticiaSeleccionada.fecha }} ·
                        {{ noticiaSeleccionada.autor }}
                    </p>
                    <p class="noticia-cuerpo">
                        {{ noticiaSeleccionada.contenido }}
                    </p>
                </div>
                <div class="modal-footer">
                    <button
                        class="btn-cancel"
                        @click="modales.verNoticia = false"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="modales.materia"
            class="modal-overlay active"
            @click.self="modales.materia = false"
        >
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Agregar materia</h3>
                    <span class="close-modal" @click="modales.materia = false"
                        >&times;</span
                    >
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nombre de la materia</label>
                        <input
                            type="text"
                            v-model="formMateria.nombre"
                            :class="{ 'input-error': errores.materiaNombre }"
                            placeholder="Ej: Matemática Discreta"
                            @keydown.enter="guardarMateria"
                        />
                    </div>
                    <div class="form-group" style="margin-top: 14px">
                        <label>Cursos en que la enseñás</label>
                        <div class="cursos-checkboxes">
                            <label
                                v-for="curso in listaCursosGlobales"
                                :key="curso"
                                :class="{
                                    checked: formMateria.cursos.includes(curso),
                                }"
                            >
                                <input
                                    type="checkbox"
                                    :value="curso"
                                    v-model="formMateria.cursos"
                                />
                                <span class="curso-check-label">{{
                                    curso
                                }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="modales.materia = false">
                        Cancelar
                    </button>
                    <button class="btn-submit" @click="guardarMateria">
                        <i class="fas fa-check"></i> &nbsp;Guardar
                    </button>
                </div>
            </div>
        </div>

        <div id="toast" :class="{ show: toast.mostrar }">
            {{ toast.mensaje }}
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// ── Estado Global UI ───────────────────────────────────────
const tabActiva = ref("info");
const menuAbierto = ref(false);
const toast = reactive({ mostrar: false, mensaje: "" });

const modales = reactive({
    editInfo: false,
    noticia: false,
    verNoticia: false,
    materia: false,
});

const errores = reactive({
    noticiaTitulo: false,
    noticiaContenido: false,
    materiaNombre: false,
});

// ── Datos Base (Mockups originales) ────────────────────────
const datosCursos = {
    "1° Primera": {
        alumnos: 30,
        materias: [
            "Matemática",
            "Prácticas del Lenguaje",
            "Ciencias Naturales",
        ],
    },
    "1° Segunda": {
        alumnos: 25,
        materias: ["Matemática", "Prácticas del Lenguaje", "Ciencias Sociales"],
    },
    "1° Tercera": {
        alumnos: 28,
        materias: ["Matemática", "Prácticas del Lenguaje", "Plástica"],
    },
    "2° Primera": {
        alumnos: 34,
        materias: ["Matemática", "Prácticas del Lenguaje", "Físicoquímica"],
    },
    "2° Segunda": {
        alumnos: 32,
        materias: ["Educación Física", "Prácticas del Lenguaje", "Historia"],
    },
    "2° Tercera": {
        alumnos: 25,
        materias: ["Matemática", "Prácticas del Lenguaje", "Ciencias Sociales"],
    },
    "3° Primera": {
        alumnos: 30,
        materias: ["Matemática", "Prácticas del Lenguaje", "Química"],
    },
    "3° Segunda": {
        alumnos: 34,
        materias: ["Matemática", "Prácticas del Lenguaje", "Biología"],
    },
    "3° Tercera": {
        alumnos: 28,
        materias: ["Matemática", "Prácticas del Lenguaje", "Inglés"],
    },
    "4° Programación": {
        alumnos: 27,
        materias: [
            "Introducción a la Programación",
            "Sistemas Tecnológicos",
            "Tecnología de Control",
        ],
    },
    "4° Informática": {
        alumnos: 34,
        materias: [
            "Aplicaciones Informáticas",
            "Sistemas Digitales",
            "Mantenimiento Integrado",
        ],
    },
    "5° Programación": {
        alumnos: 33,
        materias: [
            "Programación sobre Plataformas",
            "Análisis de Sistemas",
            "Base de Datos",
        ],
    },
    "5° Informática": {
        alumnos: 33,
        materias: ["Sistemas Operativos", "Base de Datos", "Redes"],
    },
    "6° Programación": {
        alumnos: 20,
        materias: ["Tec. Electrónica", "Hardware", "Programación"],
    },
    "6° Informática": {
        alumnos: 21,
        materias: [
            "Instalación de Redes",
            "Mantenimiento de Software",
            "Sistemas Multiusuario",
        ],
    },
    "7° Programación": {
        alumnos: 22,
        materias: [
            "Prácticas Profesionalizantes",
            "Modelos y Sistemas",
            "Seguridad Informática",
        ],
    },
    "7° Informática": {
        alumnos: 14,
        materias: [
            "Prácticas Profesionalizantes",
            "Modelos y Sistemas",
            "Base de Datos",
        ],
    },
};

const alumnosEjemplo = [
    "Acosta, Lucas",
    "Benitez, Sofía",
    "Cabrera, Tomás",
    "Díaz, Valentina",
    "Esperanza, Mateo",
    "Fernández, Camila",
    "García, Nicolás",
    "Herrera, Lucía",
    "Ibáñez, Agustín",
    "Jiménez, Romina",
    "López, Ezequiel",
    "Martínez, Florencia",
    "Núñez, Ignacio",
    "Ortega, Martina",
    "Pérez, Santiago",
    "Quiroga, Ana",
    "Rodríguez, Facundo",
    "Sánchez, Julieta",
    "Torres, Emiliano",
    "Vega, Natalia",
];

const listaCursosGlobales = Object.keys(datosCursos);

// ── Perfil Docente ─────────────────────────────────────────
const docente = reactive({
    nombre: "Juan Pérez",
    dni: "",
    email: "juan.perez@escuela.edu",
    telefono: "",
    direccion: "",
    nacimiento: "",
    departamento: "",
    antiguedad: "",
    contrato: "",
    turno: "",
});

const avatarUrl = computed(() => {
    const nameForApi = docente.nombre.trim().split(" ").slice(0, 2).join("+");
    return `https://ui-avatars.com/api/?name=${nameForApi}&background=c0152a&color=fff`;
});

// ── Mis Materias & Estadísticas ────────────────────────────
const materiasProfesor = ref([]);

const totalCursosUnicos = computed(() => {
    const cursosSet = new Set();
    materiasProfesor.value.forEach((m) =>
        m.cursos.forEach((c) => cursosSet.add(c)),
    );
    return cursosSet.size;
});

const totalAlumnosUnicos = computed(() => {
    const cursosSet = new Set();
    materiasProfesor.value.forEach((m) =>
        m.cursos.forEach((c) => cursosSet.add(c)),
    );
    return Array.from(cursosSet).reduce(
        (acc, curso) => acc + (datosCursos[curso]?.alumnos || 0),
        0,
    );
});

// ── Tab: Mis Cursos ────────────────────────────────────────
const cursoVisualizado = ref("");
const materiasDelCursoVisualizado = computed(() => {
    if (!cursoVisualizado.value) return [];
    return datosCursos[cursoVisualizado.value]?.materias || [];
});

// ── Tab: Asistencias ───────────────────────────────────────
const asistenciaForm = reactive({
    curso: "",
    fecha: new Date().toISOString().split("T")[0],
});
const tomaAsistenciaActiva = ref(false);
const historialAsistencias = ref([]);
const alumnosParaAsistencia = ref([]);
const estadoAsistencia = reactive({});

const contadoresAsistencia = computed(() => {
    let presentes = 0,
        ausentes = 0,
        tardanzas = 0;
    Object.values(estadoAsistencia).forEach((estado) => {
        if (estado === "presente") presentes++;
        else if (estado === "ausente") ausentes++;
        else if (estado === "tardanza") tardanzas++;
    });
    return { presentes, ausentes, tardanzas };
});

const iniciarTomaAsistencia = () => {
    if (!asistenciaForm.curso) return;
    const cantidad = Math.min(
        datosCursos[asistenciaForm.curso].alumnos,
        alumnosEjemplo.length,
    );
    alumnosParaAsistencia.value = alumnosEjemplo.slice(0, cantidad);

    // Resetear estados a presente por defecto
    alumnosParaAsistencia.value.forEach((alumno) => {
        estadoAsistencia[alumno] = "presente";
    });

    tomaAsistenciaActiva.value = true;
};

const guardarAsistencia = () => {
    if (!asistenciaForm.fecha) {
        mostrarToast("Seleccioná una fecha primero");
        return;
    }

    const total = alumnosParaAsistencia.value.length;
    const porc =
        total > 0
            ? Math.round((contadoresAsistencia.value.presentes / total) * 100)
            : 0;

    // Format Date (DD/MM/YYYY)
    const [y, m, d] = asistenciaForm.fecha.split("-");
    const fechaStr = `${d}/${m}/${y}`;

    historialAsistencias.value.unshift({
        fecha: fechaStr,
        curso: asistenciaForm.curso,
        presentes: contadoresAsistencia.value.presentes,
        ausentes: contadoresAsistencia.value.ausentes,
        tardanzas: contadoresAsistencia.value.tardanzas,
        porc,
    });

    tomaAsistenciaActiva.value = false;
    asistenciaForm.curso = "";
    mostrarToast("Asistencia guardada correctamente");
};

const getClasePorcentaje = (porc) => {
    if (porc >= 80) return "porc-alto";
    if (porc >= 60) return "porc-medio";
    return "porc-bajo";
};

// ── Tab: Noticias ──────────────────────────────────────────
const noticias = ref([
    {
        id: 1,
        titulo: "Inicio del segundo trimestre",
        categoria: "Académica",
        contenido:
            "El segundo trimestre comenzará el próximo lunes. Se recuerda a todos los docentes entregar las planificaciones actualizadas a la dirección antes del viernes.",
        fecha: new Date().toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        autor: "Dirección",
    },
    {
        id: 2,
        titulo: "Reunión de padres – 7° año",
        categoria: "Evento",
        contenido:
            "Se convoca a una reunión informativa de padres del 7° año para el día jueves a las 18:00 hs en el SUM de la institución. Presencia obligatoria para los tutores de los alumnos.",
        fecha: new Date().toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        autor: "Secretaría",
    },
]);
const noticiaSeleccionada = ref(null);

const verNoticia = (n) => {
    noticiaSeleccionada.value = n;
    modales.verNoticia = true;
};

// ── Formularios y Modales ──────────────────────────────────
const formInfo = reactive({ ...docente });
const formNoticia = reactive({
    titulo: "",
    categoria: "Informativa",
    contenido: "",
});
const formMateria = reactive({ nombre: "", cursos: [] });

// Watchers para limpiar errores al escribir
watch(
    () => formNoticia.titulo,
    () => (errores.noticiaTitulo = false),
);
watch(
    () => formNoticia.contenido,
    () => (errores.noticiaContenido = false),
);
watch(
    () => formMateria.nombre,
    () => (errores.materiaNombre = false),
);

const abrirModalEdicion = () => {
    Object.assign(formInfo, docente); // Cargar datos actuales
    modales.editInfo = true;
};

const guardarInfoPersonal = () => {
    Object.assign(docente, formInfo);
    modales.editInfo = false;
    mostrarToast("Datos actualizados");
};

const abrirModalNuevaNoticia = () => {
    formNoticia.titulo = "";
    formNoticia.contenido = "";
    formNoticia.categoria = "Informativa";
    modales.noticia = true;
};

const guardarNoticia = () => {
    if (!formNoticia.titulo.trim()) {
        errores.noticiaTitulo = true;
        return;
    }
    if (!formNoticia.contenido.trim()) {
        errores.noticiaContenido = true;
        return;
    }

    noticias.value.unshift({
        id: Date.now(),
        titulo: formNoticia.titulo.trim(),
        categoria: formNoticia.categoria,
        contenido: formNoticia.contenido.trim(),
        fecha: new Date().toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        autor: docente.nombre,
    });

    modales.noticia = false;
    mostrarToast("Noticia publicada");
};

const guardarMateria = () => {
    const nombre = formMateria.nombre.trim();
    if (!nombre) {
        errores.materiaNombre = true;
        return;
    }

    if (
        materiasProfesor.value.some(
            (m) => m.nombre.toLowerCase() === nombre.toLowerCase(),
        )
    ) {
        errores.materiaNombre = true;
        mostrarToast("Ya existe una materia con ese nombre");
        return;
    }

    materiasProfesor.value.push({
        nombre,
        cursos: [...formMateria.cursos],
    });

    formMateria.nombre = "";
    formMateria.cursos = [];
    modales.materia = false;
    mostrarToast(`Materia "${nombre}" agregada`);
};

const eliminarMateria = (idx) => {
    materiasProfesor.value.splice(idx, 1);
    mostrarToast("Materia eliminada");
};

// ── Utilidades ─────────────────────────────────────────────
let timeoutToast;
const mostrarToast = (msg) => {
    toast.mensaje = msg;
    toast.mostrar = true;
    clearTimeout(timeoutToast);
    timeoutToast = setTimeout(() => {
        toast.mostrar = false;
    }, 2800);
};

const iconoMateria = (nombre) => {
    const n = nombre.toLowerCase();
    if (
        n.includes("programación") ||
        n.includes("código") ||
        n.includes("software")
    )
        return "fa-code";
    if (n.includes("base de dato") || n.includes("datos")) return "fa-database";
    if (n.includes("red") || n.includes("redes")) return "fa-network-wired";
    if (n.includes("sistema")) return "fa-server";
    if (
        n.includes("hardware") ||
        n.includes("electrónic") ||
        n.includes("digital")
    )
        return "fa-microchip";
    if (n.includes("análisis") || n.includes("modelos")) return "fa-chart-line";
    if (n.includes("seguridad")) return "fa-shield-halved";
    if (n.includes("práctica")) return "fa-briefcase";
    if (n.includes("tecnolog")) return "fa-cogs";
    if (n.includes("mantenimiento")) return "fa-screwdriver-wrench";
    if (n.includes("aplicac")) return "fa-window-restore";
    return "fa-book";
};

const categoriaClass = (cat) => {
    const map = {
        Informativa: "informativa",
        Académica: "academica",
        Evento: "evento",
        Urgente: "urgente",
    };
    return map[cat] || "informativa";
};

const formatFechaVisual = (fechaISO) => {
    if (!fechaISO) return "—";
    const [y, m, d] = fechaISO.split("-");
    return `${d}/${m}/${y}`;
};

const cerrarSesion = () => {
    localStorage.clear();
    router.push("/loginPrincipal");
};

// ── Inicialización ─────────────────────────────────────────
onMounted(() => {
    const sesionActiva = localStorage.getItem("sesionActiva");
    if (sesionActiva !== "true") {
        // Si manejas la sesión real con router y guards, esto puede omitirse
        // router.push('/loginPrincipal');
    }

    docente.nombre = localStorage.getItem("userName") || "Juan Pérez";
    docente.dni = localStorage.getItem("userDni") || "";
    docente.email =
        localStorage.getItem("userEmail") ||
        `${docente.nombre.toLowerCase().replace(" ", ".")}@escuela.edu`;
});
</script>

<style scoped>
/* =========================================================
   CURSOS DOCENTE - ESTILOS
   ========================================================= */

.docente-wrapper {
    --bg: #f4f6fb;
    --surface: #ffffff;
    --surface-2: #f8fafc;
    --text: #1f2937;
    --muted: #6b7280;
    --line: #e5e7eb;
    --primary: #c0152a;
    --primary-dark: #7f0917;
    --primary-soft: rgba(192, 21, 42, 0.1);
    --success: #16a34a;
    --warning: #f59e0b;
    --danger: #dc2626;
    --shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
    --shadow-soft: 0 6px 16px rgba(15, 23, 42, 0.08);
    --radius-lg: 24px;
    --radius-md: 16px;
    --radius-sm: 12px;

    background: var(--bg);
    color: var(--text);
    line-height: 1.5;
    min-height: 100vh;
    font-family:
        "Segoe UI",
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
}

/* Links y botones */
a {
    color: inherit;
    text-decoration: none;
}
button,
input,
select,
textarea {
    font: inherit;
}
button {
    cursor: pointer;
    border: none;
}
img {
    max-width: 100%;
    display: block;
}

/* NAVBAR */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    background: #fff;
    border-bottom: 5px solid #ffffff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0;
}

.logo img {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    object-fit: cover;
}

.logo-titulo {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.logo-titulo h2 {
    font-size: 24px;
    line-height: 1;
    font-weight: 800;
    color: #111;
    margin: 0;
}

.logo-titulo p {
    font-size: 16px;
    line-height: 1.1;
    color: #7b7b7b;
    margin: 0;
}

/* CONTENEDOR */
.container {
    display: flex;
    min-height: calc(100vh - 86px);
}

/* BARRA IZQUIERDA */
.sidebar {
    width: 270px;
    background: linear-gradient(180deg, #ca0d0d, #420101);
    color: white;
    padding: 18px 16px 16px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
}

.sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.sidebar li {
    margin-bottom: 10px;
}

.sidebar li a {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    transition: 0.25s;
}

.sidebar li:hover a,
.sidebar li.active a {
    background: rgba(255, 255, 255, 0.2);
}

.sidebar a i {
    width: 20px;
    text-align: center;
    flex-shrink: 0;
}

.sidebar-help {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 12px 14px;
}

/* Perfil */
.profile-container {
    position: relative;
    display: flex;
    align-items: center;
}

.profile-trigger {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 2px;
    background: transparent;
    border: 2px solid transparent;
    transition:
        transform 0.2s ease,
        border-color 0.2s ease;
}

.profile-trigger:hover {
    transform: translateY(-1px);
    border-color: #e5e7eb;
}

.profile-trigger img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.profile-menu {
    display: none;
    position: absolute;
    top: 62px;
    right: 0;
    width: min(320px, calc(100vw - 24px));
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 22px;
    box-shadow: var(--shadow);
    padding: 18px;
    z-index: 1000;
}

.profile-menu.active {
    display: block;
}

.menu-header {
    text-align: center;
}

.large-avatar {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    margin: 0 auto 10px;
}

.user-name {
    font-size: 1.05rem;
    font-weight: 700;
}
.user-email {
    color: var(--muted);
    font-size: 0.9rem;
}
.user-role {
    text-align: center;
    color: var(--muted);
    margin-top: 8px;
    font-size: 0.95rem;
}

#roleBadge {
    display: inline-block;
    margin-left: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--primary-soft);
    color: var(--primary);
    font-weight: 700;
    font-size: 0.85rem;
}

hr {
    border: 0;
    border-top: 1px solid var(--line);
    margin: 14px 0;
}

.menu-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 12px;
    border-radius: 12px;
    color: #334155;
    transition:
        background 0.2s ease,
        color 0.2s ease;
}
.menu-item:hover {
    background: #f8fafc;
    color: #111827;
}
.menu-item i {
    width: 20px;
    text-align: center;
}

.sign-out-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 2px;
    padding: 11px 14px;
    border-radius: 12px;
    border: 1px solid #f3d0d4;
    background: #fff;
    color: #b42318;
    font-weight: 600;
    transition:
        background 0.2s ease,
        transform 0.2s ease,
        border-color 0.2s ease;
}
.sign-out-btn:hover {
    background: #fef2f2;
    border-color: #f5aeb6;
    transform: translateY(-1px);
}

.main-content {
    flex: 1;
    padding: 28px;
    overflow-y: auto;
    min-width: 0;
}

/* CABECERA DOCENTE */
.prof-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    background: var(--surface);
    padding: 22px 24px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    margin-bottom: 18px;
}

.prof-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
}

.prof-avatar-wrap {
    position: relative;
    width: 78px;
    height: 78px;
    flex-shrink: 0;
}

#profAvatar {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #fff;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.prof-status-dot {
    position: absolute;
    right: 4px;
    bottom: 6px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #22c55e;
    border: 3px solid #fff;
}

.prof-info {
    min-width: 0;
}
.prof-label {
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--primary);
    margin-bottom: 4px;
}
.prof-info h1 {
    font-size: 1.55rem;
    line-height: 1.1;
    margin-bottom: 4px;
}
.prof-sub {
    color: var(--muted);
    font-size: 0.95rem;
}

.prof-header-stats {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
}

.hs-item {
    min-width: 84px;
    text-align: center;
    padding: 8px 12px;
    border-radius: 16px;
    background: var(--surface-2);
    border: 1px solid var(--line);
}
.hs-num {
    display: block;
    font-size: 1.3rem;
    font-weight: 800;
    color: #111827;
}
.hs-label {
    display: block;
    color: var(--muted);
    font-size: 0.85rem;
    margin-top: 2px;
}
.hs-divider {
    width: 1px;
    height: 42px;
    background: var(--line);
}

/* TABS */
.tabs-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 18px;
}

.tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: #374151;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
    transition:
        background 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease,
        transform 0.2s ease;
}
.tab-btn:hover {
    transform: translateY(-1px);
    border-color: #d1d5db;
}
.tab-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
}
.tab-btn i {
    font-size: 0.95rem;
}

/* BARRAS DE HERRAMIENTAS / FILTROS */
.tab-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}
.tab-toolbar-left {
    min-width: 0;
}
.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.12rem;
}
.section-title i {
    color: var(--primary);
}
.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.courses-title {
    font-weight: 700;
    color: #374151;
}

select,
.date-input,
input[type="text"],
input[type="date"],
textarea {
    width: 100%;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: #fff;
    color: var(--text);
    padding: 12px 14px;
    outline: none;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}
select:focus,
.date-input:focus,
input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    border-color: rgba(192, 21, 42, 0.45);
    box-shadow: 0 0 0 4px rgba(192, 21, 42, 0.1);
}
.input-error {
    border-color: var(--primary) !important;
}

select {
    min-width: 220px;
}
.date-input {
    min-width: 170px;
}

/* Botones principales */
.btn-add-subject,
.btn-guardar-asist,
.btn-submit,
.btn-cancel,
.btn-edit-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 12px;
    padding: 11px 16px;
    font-weight: 700;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease;
}
.btn-add-subject,
.btn-submit,
.btn-guardar-asist {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 10px 20px rgba(192, 21, 42, 0.16);
}
.btn-add-subject:hover,
.btn-submit:hover,
.btn-guardar-asist:hover {
    transform: translateY(-1px);
    background: #a91224;
}
.btn-guardar-asist:disabled,
.btn-add-subject:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}
.btn-cancel {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #e5e7eb;
}
.btn-cancel:hover {
    background: #e5e7eb;
}
.btn-edit-info {
    margin-top: 16px;
    background: #fff;
    color: var(--primary);
    border: 1px solid rgba(192, 21, 42, 0.22);
}
.btn-edit-info:hover {
    background: var(--primary-soft);
    transform: translateY(-1px);
}

/* INFO PERSONAL / LABORAL */
.info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}
.info-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 20px;
    box-shadow: var(--shadow-soft);
}
.info-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
}
.info-card-header i {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: var(--primary-soft);
    color: var(--primary);
}
.info-card-header h3 {
    font-size: 1.05rem;
}
.info-fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}
.info-field {
    padding: 14px;
    border-radius: 14px;
    background: #fafafa;
    border: 1px solid #f1f5f9;
}
.field-label {
    display: block;
    color: var(--muted);
    font-size: 0.84rem;
    margin-bottom: 6px;
}
.field-value {
    display: block;
    font-weight: 600;
    color: #111827;
    word-break: break-word;
}
.field-value.editable {
    color: #0f172a;
}

/* TABLAS */
.table-container {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-soft);
}
.table-container table {
    width: 100%;
    border-collapse: collapse;
}
.table-container thead th {
    background: #fafafa;
    text-align: left;
    padding: 14px 16px;
    font-size: 0.92rem;
    color: #334155;
    border-bottom: 1px solid var(--line);
}
.table-container tbody td {
    padding: 14px 16px;
    border-bottom: 1px solid #eef2f7;
    color: #334155;
    vertical-align: middle;
}
.table-container tbody tr:hover td {
    background: #fcfcfd;
}
.empty-state {
    text-align: center;
    padding: 34px 16px;
    color: var(--muted);
}
.empty-state .empty-icon {
    display: block;
    font-size: 2rem;
    margin-bottom: 10px;
    color: #cbd5e1;
}
.empty-state p {
    margin: 0;
}

.historial-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 18px;
    background: #fafafa;
    border-bottom: 1px solid var(--line);
    font-weight: 700;
}

/* MATERIAS / NOTICIAS */
.materias-grid,
.noticias-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
}

.materia-card,
.noticia-card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 18px;
    box-shadow: var(--shadow-soft);
    padding: 18px;
}

.btn-eliminar-materia {
    position: absolute;
    top: 14px;
    right: 14px;
    background: transparent;
    color: var(--muted);
    transition: 0.2s;
}
.btn-eliminar-materia:hover {
    color: var(--danger);
}

.materia-icon {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 10px;
}
.materia-nombre {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 6px;
}
.materia-cursos-tag {
    color: var(--muted);
    font-size: 0.85rem;
    margin-bottom: 12px;
}
.materia-badge {
    display: inline-block;
    padding: 4px 10px;
    background: var(--primary-soft);
    color: var(--primary);
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
}

.noticia-franja {
    height: 6px;
    border-radius: 18px 18px 0 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.franja-informativa {
    background: #3b82f6;
}
.franja-academica {
    background: #8b5cf6;
}
.franja-evento {
    background: #10b981;
}
.franja-urgente {
    background: #ef4444;
}

.noticia-body {
    padding-top: 10px;
}
.noticia-categoria {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: inline-block;
    margin-bottom: 8px;
}
.cat-informativa {
    color: #3b82f6;
}
.cat-academica {
    color: #8b5cf6;
}
.cat-evento {
    color: #10b981;
}
.cat-urgente {
    color: #ef4444;
}
.noticia-titulo {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #111827;
}
.noticia-preview {
    color: var(--muted);
    font-size: 0.9rem;
    margin-bottom: 14px;
    line-height: 1.4;
}
.noticia-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--line);
    padding-top: 12px;
    font-size: 0.85rem;
    color: var(--muted);
}

/* ASISTENCIAS */
.asist-toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}
.asist-resumen {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    align-items: stretch;
    margin-bottom: 16px;
}
.asist-stat {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 16px;
    box-shadow: var(--shadow-soft);
    text-align: center;
}
.asist-num {
    display: block;
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 6px;
}
.asist-lbl {
    color: var(--muted);
    font-size: 0.92rem;
}
.asist-presentes .asist-num {
    color: var(--success);
}
.asist-ausentes .asist-num {
    color: var(--danger);
}
.asist-tardanzas .asist-num {
    color: var(--warning);
}
.btn-guardar-asist {
    align-self: stretch;
    min-height: 100%;
}

.asist-lista-wrap {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    padding: 16px;
    margin-bottom: 16px;
}
.asist-lista {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
}

.alumno-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: #fafafa;
}
.alumno-row.presente {
    border-color: #bbf7d0;
    background: #f0fdf4;
}
.alumno-row.ausente {
    border-color: #fecaca;
    background: #fef2f2;
}
.alumno-row.tardanza {
    border-color: #fde68a;
    background: #fefce8;
}
.alumno-nombre {
    font-weight: 600;
    font-size: 0.9rem;
}
.asist-btns {
    display: flex;
    gap: 4px;
}
.asist-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #fff;
    border: 1px solid var(--line);
    display: grid;
    place-items: center;
    color: var(--muted);
    transition: 0.2s;
}
.asist-btn:hover {
    background: #f1f5f9;
}
.btn-presente.selected {
    background: var(--success);
    color: #fff;
    border-color: var(--success);
}
.btn-ausente.selected {
    background: var(--danger);
    color: #fff;
    border-color: var(--danger);
}
.btn-tardanza.selected {
    background: var(--warning);
    color: #fff;
    border-color: var(--warning);
}

.porc-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.85rem;
}
.porc-alto {
    background: #dcfce7;
    color: #166534;
}
.porc-medio {
    background: #fef9c3;
    color: #854d0e;
}
.porc-bajo {
    background: #fee2e2;
    color: #991b1b;
}

/* MODALES */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.58);
    backdrop-filter: blur(3px);
    z-index: 2000;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-content {
    width: min(760px, 100%);
    background: var(--surface);
    border-radius: 28px;
    box-shadow: var(--shadow);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.45);
}
.modal-wide {
    width: min(920px, 100%);
}
.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid var(--line);
}
.close-modal {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.5rem;
    color: #64748b;
    background: #f8fafc;
    cursor: pointer;
    transition: 0.2s;
}
.close-modal:hover {
    background: #eef2f7;
    color: #0f172a;
    transform: rotate(8deg);
}
.modal-body {
    padding: 22px;
}
.modal-body-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.form-group label {
    font-weight: 700;
    color: #334155;
    font-size: 0.94rem;
}
.form-group-full {
    grid-column: 1 / -1;
}
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 18px 22px 22px;
    border-top: 1px solid var(--line);
}

.cursos-checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    max-height: 220px;
    overflow: auto;
    padding: 2px;
}
.cursos-checkboxes label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: #fafafa;
    cursor: pointer;
}
.cursos-checkboxes label.checked {
    background: #fef2f2;
    border-color: #fca5a5;
}
.cursos-checkboxes input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--primary);
}

#toast {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a202c;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    z-index: 99999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
}
#toast.show {
    opacity: 1;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
    .info-grid {
        grid-template-columns: 1fr;
    }
    .prof-header {
        align-items: flex-start;
        flex-direction: column;
    }
    .asist-resumen {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (max-width: 900px) {
    .sidebar {
        display: none;
    }
    .main-content {
        padding: 18px;
    }
    .prof-header-stats {
        width: 100%;
        justify-content: flex-start;
    }
    .modal-body-grid {
        grid-template-columns: 1fr;
    }
}
@media (max-width: 640px) {
    .navbar {
        padding: 10px 14px;
    }
    .logo-titulo h2 {
        font-size: 1rem;
    }
    .logo-titulo p {
        font-size: 0.82rem;
    }
    .tabs-nav {
        gap: 8px;
    }
    .tab-btn {
        width: 100%;
        justify-content: center;
        border-radius: 14px;
    }
    .tab-toolbar,
    .filter-group,
    .asist-toolbar-right {
        width: 100%;
    }
    .asist-resumen {
        grid-template-columns: 1fr;
    }
    .prof-header {
        padding: 18px;
    }
    .prof-header-left {
        width: 100%;
    }
    .hs-divider {
        display: none;
    }
    .table-container {
        overflow: auto;
    }
    .table-container table {
        min-width: 720px;
    }
}
</style>
