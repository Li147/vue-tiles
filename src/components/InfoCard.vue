<template>
  <v-card
    class="info-card"
  >
    <v-card-title> Welcome {{ text }} </v-card-title>
    <v-card-text> Total number of characters: {{ totalCharacters }} </v-card-text>
    <v-container>
      <v-text-field 
        v-model="currentTile.mainString"
        label="mainString"
        outlined
        dense
        class="mx-auto"
      />
      <v-text-field 
        v-model="currentTile.subString"
        label="subString"
        outlined
        dense
        class="mx-auto"
      />
    </v-container>
    <v-card-actions>
      <v-btn
        @click="addTile"  
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

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
        userEmail: user.email,
        userDisplayName: user.displayName,
        mainString: '',
        subString: '',
        time: currentTime,
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.info-card {
  max-width: 512px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
}

</style>