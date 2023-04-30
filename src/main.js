import { createApp, Vue } from "vue";
import App from "./App.vue";
import router from "./router";

import '@/assets/style.scss';

createApp(App)
.use(router)
.provide('ethereum', window.ethereum)
.mount('#app');
