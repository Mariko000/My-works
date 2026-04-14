import { createRouter, createWebHistory } from 'vue-router'
import Works from '../Works.vue'
import Apps from '../Index.vue'
import About from '../About.vue'
import Contact from '../Contact.vue'
import WorkDetail from '../WorkDetail.vue'
import Featured from '../Featured.vue'
import Projects from '../Projects.vue'

const routes = [
  { path: '/', component: Projects, meta: { index: 1 } },
  { path: '/Works', component: Works, meta: { index: 2 } },
  { path: '/Featured', component: Featured, meta: { index: 3 } },
  { path: '/about', component: About, meta: { index: 4 } },
  { path: '/Apps', component: Apps, meta: { index: 5 } },
  { path: '/Contact', component: Contact, meta: { index: 6 } },
  { path: '/works/:id', component: WorkDetail, meta: { index: 7 } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router