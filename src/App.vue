<template>
  <v-app>
    <top-header></top-header>
    <v-content>
      <router-view></router-view>
      
    </v-content>
    <Snackbar/>
  </v-app>
</template>
<script>
import Header from "./components/Header.vue"
import Snackbar from "./components/Snackbar.vue"
export default {
  name: 'app',
  components: {'top-header': Header, Snackbar},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.inline-block {
  display: flex;
}
</style>
