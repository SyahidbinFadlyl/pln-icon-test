import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/home/index.vue";
import DetailPage from "../views/detail/index.vue";
import CreatePage from "../views/create/index.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/detail/:id", component: DetailPage },
  { path: "/create", component: CreatePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
