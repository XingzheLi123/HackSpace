import { createWebHistory, createRouter } from "vue-router"

import Home from "../views/Home.vue";
import Events from "../views/Events.vue";
import Event from "../views/Event.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/events", name: "Events", component: Events },
  { path: "/event/:id", name: "Event", component: Event },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
