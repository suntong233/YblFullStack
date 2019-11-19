import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: () => import('../views/Home.vue') },
      { name: 'course-list', path: '/courses/list', component: () => import('../views/courses/CourseList.vue')},
      { name: 'course-edit', path: '/courses/edit/:id', component: () => import('../views/courses/CourseEdit.vue'), props: true },
      { name: 'course-create', path: '/courses/create', component: () => import('../views/courses/CourseEdit.vue') },
      { name: 'course-crud', path: '/:resource/crud', component: () => import('../views/ResourceCrud.vue'), props:true  },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
