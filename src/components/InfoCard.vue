<template>
  <v-card>
    <v-card-title> {{ text }} </v-card-title>
    <v-card-text> Total number of characters: {{ totalCharacters }} </v-card-text>
    <v-text-field v-model="currentTile.mainString"/>
    <v-btn
      @click="addTile"  
    >
    Add
    </v-btn>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/firebaseConfig.js'

export default {
  props:{
    title: {
      type: String,
      default: 'n/a'
    },
    text: {
      type: String,
      default: 'n/a'
    }
  },
  data() {
    return {
      currentTile: this.createFreshTileObject()
    }
  },
  computed: {
    totalCharacters() {
      return this.$store.getters['tile/charCount']
    },
    ...mapState([
      'user', 'tile'
    ])
  },
  methods: {
    addTile() {
      // dispatch the action the store
      this.$store.dispatch('tile/addTileDatabase', this.currentTile).then(() => {

        var user = firebase.auth.currentUser

        user.updateProfile({
          displayName: "Anfan Li"
        }).then(function() {
          console.log("Successfully changed display name. Display name is now: ", user.displayName)
        })
        console.log(firebase.auth.currentUser)

        //clears old data once api call is successful
        this.currentTile = this.createFreshTileObject()
      })
      .catch(error => {
        console.log('There was a problem adding your tile', error.response)
      })
    },
    createFreshTileObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 100000000)
      const currentTime = new Date().getTime()
      return {
        id: id,
        mainString: '',
        user: user,
        time: currentTime,
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>