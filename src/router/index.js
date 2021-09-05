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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
