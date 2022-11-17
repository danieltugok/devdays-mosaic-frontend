import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createRouter, createWebHistory } from "vue-router";


import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import 'quasar/src/css/index.sass'
import { Notify, Loading } from 'quasar'

import routes from "./routes";
import App from './App.vue'
const myApp = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App)
  .use(Quasar, { plugins: { Notify, Loading}, })
  .use(router)
  .mount('#app')