import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Cart from '@/pages/Cart'
import Todo from '@/pages/Todo'
import Schedule from '@/pages/Schedule'
import Blog from '@/pages/Blog'
import Photo from '@/pages/Photo'

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
      path: '/blog',
      name: 'blog', 
      component: Blog
    }, {
      path: '/schedule',
      name: 'schedule', 
      component: Schedule
    }, {
      path: '/photo',
      name: 'photo',
      component: Photo
    }
  ]
})
