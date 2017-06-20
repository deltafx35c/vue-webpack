<template>
  <div id="app">
    <router-view></router-view>
    <!--<v-menu></v-menu>-->
  </div>
</template>

<script>
import './static/lib/css/main.css'
import vMenu from './components/Menu'
export default {
  name: 'app',
  components: {
      vMenu
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
</style>
