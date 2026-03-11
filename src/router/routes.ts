import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: ":id", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: ":id", component: () => import("pages/IndexPage.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
