import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CategoriesProductsView from '../views/CategoriesProductsView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'CategoriesProductsView',
    component: () => CategoriesProductsView,
    children: [
      {
        path: 'categories-products',
        name: 'CategoriesProductsView',
        component: () => CategoriesProductsView
      }
    ]
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => ProductView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => CartView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router
