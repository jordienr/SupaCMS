export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomeView.vue"),
  },
  {
    path: "/:table",
    name: "Table",
    component: () => import("../components/TableView.vue"),
  },
];
