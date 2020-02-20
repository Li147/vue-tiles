<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Username" 
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text': 'password'" 
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn 
        color="success"
        @click="pressedRegister"
      >Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        color="info"
        @click="pressedLogin"
      >Login</v-btn>
    </v-card-actions>   
  </v-card>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"
import { mapState } from 'vuex'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: "",
      password: "",
      error: "",
      showPassword: false,
    }
  },
  computed: {
    // we use object spread operator so that we can also have LOCAl computed properties
    ...mapState([
      'user', 'tile', 'snackbar'
    ])
  },
  methods: {
    incorrectUsername(message){
      this.$store.dispatch('showSnackbar', {content: message, color: 'red'})
    },
    async pressedRegister(){
      try {
        const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        console.log(user)
        this.$router.replace({name: "home"})
      } catch(error){
        console.log(error)
      }
    },
    async pressedLogin(){
      try {
        const login = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        console.log(login)
        this.$router.replace({name: "home"})
      } catch(error){
        console.log(error)
        this.incorrectUsername(error.message)
      }
    }
  }


    
    
}
</script>

<style lang="scss" scoped>

</style>
