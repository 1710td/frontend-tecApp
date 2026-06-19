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
    path: "/login/administrador",
    component: LoginAdministrador,
  },
  {
    path: "/registro",
    component: RegistroAdministrador,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
