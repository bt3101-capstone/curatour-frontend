<template>
  <div id="app">
  <NavBar class='navbar'/>
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
  NavBar
}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Muli|Raleway&display=swap');
#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif,;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
