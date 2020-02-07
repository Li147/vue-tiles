<template>
  <v-card>
    <v-card-title> {{ title }} </v-card-title>
    <v-card-text> {{ title }} </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props:{
      title: {
        type: String,
        default: 'n/a'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>