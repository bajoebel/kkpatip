import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PerusahaanView from '../views/PerusahaanView.vue'
import MahasiswaView from '../views/MahasiswaView.vue'
import JenisView from '../views/JenisView.vue'
import JenisKuotaView from '../views/JenisKuotaView.vue'
import DokumenView from '../views/DokumenView.vue'
import ProdiView from '../views/ProdiView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/perusahaan',
    name: 'perusahaan',
    component: PerusahaanView
  },
  {
    path: '/mahasiswa',
    name: 'mahasiswa',
    component: MahasiswaView
  },
  {
    path: '/jenis',
    name: 'jenis',
    component: JenisView
  },
  {
    path: '/jeniskuota',
    name: 'jeniskuota',
    component: JenisKuotaView
  },
  {
    path: '/dokumen',
    name: 'dokumen',
    component: DokumenView
  },
  {
    path: '/prodi',
    name: 'prodi',
    component: ProdiView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
