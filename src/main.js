import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './assets/tailwind.css'
import { i18n } from 'vue-lang-router'

createApp(App).use(router).use(i18n).mount('#app')
