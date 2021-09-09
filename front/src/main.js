import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './assets/tailwind.css'
import { i18n } from 'vue-lang-router'

const app = createApp(App)
app.config.devtool = true
app.use(router).use(i18n).mount('#app')
