import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import LoginAlumno from "../components/auth/LoginAlumno.vue";
import LoginProfesor from "../components/auth/LoginProfesor.vue";
import Inicio from "../components/inicio.vue";

import Unauthorized from "../components/auth/Unauthorized.vue";
import Unavailable from "../components/administrador/Unavailable.vue";

import LoginAdministrador from "../components/auth/LoginAdministrador.vue";
import RegistroAdministrador from "../components/auth/RegistroAdministrador.vue";
import DashboardAdministrador from "../components/administrador/Dashboard-administrador.vue";

import DashboardAlumno from "../components/alumno/Dashboard-alumno.vue";
import RegistroAlumno from "../components/auth/RegistroAlumno.vue";
import UsuarioPerfil from "../components/administrador/views/UsuarioPerfil.vue";

import CursosMaestros from "../components/profesores/CursosMaestros.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login/alumno",
    component: LoginAlumno,
  },
  {
    path: "/login/profesor",
    component: LoginProfesor,
  },
  {
    path: "/inicio",
    component: Inicio,
  },
  { path: "/noticias", component: Inicio }, // ← AGREGÁ ESTAS
  {
    path: "/biblioteca",
    component: Unavailable,
  },
  {
    path: "/objetos-perdidos",
    component: Unavailable,
  },
  { path: "/cursos", component: Inicio },

  {
    path: "/dashboard-administrador",
    component: DashboardAdministrador,
    meta: {
      requiresAuth: true,
      role: "root",
    },
  },
  {
    path: "/dashboard-alumno",
    component: DashboardAlumno,
    meta: {
      requiresAuth: true,
      role: "alumno",
    },
  },

  {
    path: "/login/administrador",
    component: LoginAdministrador,
  },
  {
    path: "/registro/administrador",
    component: RegistroAdministrador,
  },
  {
    path: "/registro/alumno",
    component: RegistroAlumno,
  },
  {
    path: "/perfil/administrador",
    component: UsuarioPerfil,
  },
  {
    path: "/cursos-maestros",
    component: CursosMaestros,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
