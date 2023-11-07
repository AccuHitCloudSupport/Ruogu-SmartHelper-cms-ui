import { createRouter, createWebHistory } from "vue-router";

function authorizeIsAdmin(to, from, next) {
  if (to.fullPath === "/login") {
    if (
      sessionStorage.getItem("Token") !== undefined &&
      sessionStorage.getItem("Token") !== null
    ) {
      next("/");
    } else {
      next(true);
    }
  } else {
    if (
      sessionStorage.getItem("Token") !== undefined &&
      sessionStorage.getItem("Token") !== null
    ) {
      next(true);
    } else {
      next("/login");
    }
  }
}

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/",
    name: "",
    component: () => import("../views/HomeView.vue"),
    children: [
      { path: "/", redirect: "/permission" },
      {
        path: "/permission",
        name: "permission",
        component: () => import("../views/PermissionView.vue"),
      },
      {
        path: "/dataMangent",
        name: "dataMangent",
        component: () => import("../views/DataMangentView.vue"),
      },
    ],
    beforeEnter: authorizeIsAdmin,
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
