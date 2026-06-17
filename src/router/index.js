
import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import LoginAlumno from "../components/auth/LoginAlumno.vue";
import LoginProfesor from "../components/auth/LoginProfesor.vue";
import Inicio from "../components/inicio.vue";

import LoginAdministrador from "../components/auth/LoginAdministrador.vue";
import RegistroAdministrador from "../components/auth/RegistroAdministrador.vue";
import DashboardAdministrador from "../components/administrador/Dashboard-administrador.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/login/alumno", component: LoginAlumno },
  { path: "/login/profesor", component: LoginProfesor },
  { path: "/inicio", component: Inicio },
  { path: "/noticias", component: Inicio }, // ← AGREGÁ ESTAS
  { path: "/biblioteca", component: Inicio },
  { path: "/objetos-perdidos", component: Inicio },
  { path: "/cursos", component: Inicio },

  { path: "/administrador/login", component: LoginAdministrador },
  { path: "/administrador/registro", component: RegistroAdministrador },
  { path: "/dashboard-administrador", component: DashboardAdministrador },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
