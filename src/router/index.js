import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import HomeViewVue from "@/views/HomeView.vue";
import UserViewVue from "../views/UserView.vue";
import PathNotFound from "../views/PathNotFound.vue";
const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    component: HomeViewVue,
  },
  {
    path: "/user",
    component: UserViewVue,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "found",
    component: PathNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
