import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

// Layouts Principales
import DashboardAdministrador from "../components/administrador/DashboardAdministrador.vue";
import DashboardAlumno from "../components/alumno/DashboardAlumno.vue";

// Vistas del Alumno (Las nuevas versiones refactorizadas)
import InicioView from "../components/alumno/views/InicioView.vue";
import NoticiasView from "../components/alumno/views/NoticiaView.vue";
import CursosView from "../components/alumno/views/CursosView.vue";
import ObjetosPerdidosView from "../components/alumno/views/ObjetosPerdidosView.vue";

// Auth y otros componentes
import Login from "../components/auth/Login.vue";
import LoginAlumno from "../components/auth/LoginAlumno.vue";
import LoginProfesor from "../components/auth/LoginProfesor.vue";
import LoginAdministrador from "../components/auth/LoginAdministrador.vue";
import RegistroAdministrador from "../components/auth/RegistroAdministrador.vue";
import RegistroAlumno from "../components/auth/RegistroAlumno.vue";
import Unauthorized from "../components/auth/Unauthorized.vue";
import UsuarioPerfil from "../components/administrador/views/UsuarioPerfil.vue";

// Biblioteca y otros
import Biblioteca from "../components/bibliotecario/Biblioteca.vue";
import Libros from "../components/bibliotecario/Libros.vue";
import BibliotecaRecursos from "../components/bibliotecario/BiblotecaRecursos.vue";
import PrestamosBiblotecario from "../components/bibliotecario/PrestamosBiblotecario.vue";
import BibliotecaDashboard from "../components/bibliotecario/BibliotecaDashboard.vue";

// Profesores
import DashboardProfesor from "../components/profesores/DashboardProfesor.vue";
import MateriasView from "../components/profesores/views/MateriasView.vue";
import AsistenciasView from "../components/profesores/views/AsistenciasView.vue";
import InicioViewProfesor from "../components/profesores/views/InicioView.vue";
import NoticiasViewProfesor from "../components/profesores/views/NoticiasView.vue";
import CursosViewProfesor from "../components/profesores/views/CursosView.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/login/alumno", component: LoginAlumno },
  { path: "/login/profesor", component: LoginProfesor },
  { path: "/login/administrador", component: LoginAdministrador },
  { path: "/registro/administrador", component: RegistroAdministrador },
  { path: "/registro/alumno", component: RegistroAlumno },
  { path: "/unauthorized", component: Unauthorized },

  // --- RUTA MODULAR DEL ALUMNO ---
  {
    path: "/alumno",
    component: DashboardAlumno, // El layout que contiene Sidebar y Topbar
    meta: { requiresAuth: true, role: "alumno" },

    children: [
      { path: "inicio", component: InicioView },
      { path: "noticias", component: NoticiasView },
      { path: "cursos", component: CursosView },
      { path: "objetos-perdidos", component: ObjetosPerdidosView },
      { path: "", redirect: "/alumno/inicio" }, // Si entran a /alumno, van a inicio
    ],
  },

  // --- OTRAS RUTAS ---
  {
    path: "/dashboard-administrador",
    component: DashboardAdministrador,
    meta: { requiresAuth: true, role: "root" },
  },
  { path: "/biblioteca", component: Biblioteca, meta: { requiresAuth: true } },
  {
    path: "/biblioteca/libros",
    component: Libros,
    meta: { requiresAuth: true },
  },
  {
    path: "/biblioteca/recursos",
    component: BibliotecaRecursos,
    meta: { requiresAuth: true },
  },
  {
    path: "/biblioteca/prestamos",
    component: PrestamosBiblotecario,
    meta: { requiresAuth: true, role: "bibliotecario" },
  },
  {
    path: "/biblioteca/dashboard",
    component: BibliotecaDashboard,
    meta: { requiresAuth: true, role: "bibliotecario" },
  },
  { path: "/perfil/administrador", component: UsuarioPerfil },

  {
    path: "/profesor",
    component: DashboardProfesor,
    //meta: { requiresAuth: true, role: "profesor" },
    children: [
      { path: "inicio", component: InicioViewProfesor },
      { path: "noticias", component: NoticiasViewProfesor },
      { path: "cursos", component: CursosViewProfesor },
      { path: "materias", component: MateriasView },
      { path: "asistencias", component: AsistenciasView },
      { path: "", redirect: "/profesor/inicio" },
    ],
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.estaAutenticado) {
    return next("/");
  }

  if (to.meta.role && authStore.rol !== to.meta.role && authStore.rol !== "root") {
    return next("/unauthorized");
  }

  next();
});

export default router;
