<template>
  <v-app-bar 
    app 
    clipped-left 
    color="indigo" 
    dark
  >
    <img alt="Vue logo"  width="50" height="50" src="../assets/logo.png">
    <v-toolbar-title>Veutify Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="link in links"
      :key="`${link.label}-header-link`"
      text
      rounded
      :to="link.url"
    >
      {{ link.label }}
    </v-btn>

    <v-btn
      v-if="!loggedIn"
      :key="`${'Login'}-header-link`"
      text
      rounded
      :to="'/login'"
    >Login</v-btn>

    <v-menu
      v-if="loggedIn"
      transition="slide-y-transition"
      :offset-y="true"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="white"
          v-on="on"
        >
          <v-icon x-large="">mdi-account-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn
            v-if="loggedIn"
            class="mx-4"
            @click="signOut"
          >
            Logout
            <v-icon right>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"

  export default {
    created(){
      firebase.auth().onAuthStateChanged(user => {
        this.loggedIn = !!user;
      })
    },
    data() {
      return {
        loggedIn: false,
        links: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Signup',
          url: '/signup'
        }]
      }
    },
    
    methods: {
      async signOut(){
        try {
          const data = await firebase.auth().signOut();
          console.log(data)
          this.$router.replace({name: "login"})
        } catch(error){
          console.logg(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>