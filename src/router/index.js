import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  mode:'history',
  base:'app',
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    }, {
      path: 'home',
      name: 'home', 
      component: Home
    }, {
      path: 'cart',
      name: 'cart', 
      component: Cart
    }
  ]
})
