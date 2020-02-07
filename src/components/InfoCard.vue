<template>
  <v-card>
    <v-card-title> {{ title }} </v-card-title>
    <v-card-text> {{ text }}, the total number of character is: {{ totalCharacters }} </v-card-text>
    <v-text-field v-model="inputString" />
    <v-btn
      @click="addString"  
    >
    Add
    </v-btn>

  </v-card>
</template>

<script>
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
        inputString: 'n/a'
      }
    },
    computed: {
      totalCharacters() {
        return this.$store.getters.charCount
      }
    },
    methods: {
      addString() {
        this.$store.dispatch('updateString', this.inputString)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>