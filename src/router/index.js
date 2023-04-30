import { createWebHistory, createRouter } from "vue-router"

import Home from "../views/Home.vue";
import Organizer from "../views/Organizer.vue";
import Participant from "../views/Participant.vue";
import Sponsor from "../views/Sponsor.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/organizer", name: "Organizer", component: Organizer },
  { path: "/participant", name: "Participant", component: Participant },
  { path: "/sponsor", name: "Sponsor", component: Sponsor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
