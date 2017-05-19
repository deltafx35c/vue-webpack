import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cart from '@/components/Cart'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  mode:'history',
  //base:'',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/home',
      name: 'home', 
      component: Home
    }, {
      path: '/cart',
      name: 'cart', 
      component: Cart
    }, {
      path: '/todo',
      name: 'todo', 
      component: Todo
    }
  ]
})
