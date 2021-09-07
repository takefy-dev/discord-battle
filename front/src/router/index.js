import { createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import translations from '../lang/translations'
import { createLangRouter } from 'vue-lang-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/battle/:player1/:player2',
    name: 'Battle',
    component: () => import(/* webpackChunkName: "about" */ '../views/Battle.vue')
  }
]

const langRouterOptions = {
  defaultLanguage: 'en',
  translations
}
const routerOptions = {
  history: createWebHistory(),
  routes
}
const router = createLangRouter(langRouterOptions, routerOptions)

export default router
