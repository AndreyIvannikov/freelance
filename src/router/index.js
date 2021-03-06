import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import New from '../views/New.vue'
import Task from '../views/Task.vue'
import notFound from '../components/404.vue'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/new',
    name: 'new',
    component: New
  },
  {
    path: '/task/:id',
    name: 'task',
    component: Task,
    props:true
  },
  {
    path: "/:id(.*)",
    name: 'notFound',
    component: notFound,
    props:true
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass:'active'
})

export default router
