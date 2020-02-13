<template>
  <div>
    <v-navigation-drawer permanent clipped app>
      <info-card
        :title="userName"
        :text="userName"
      />
    </v-navigation-drawer>
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="rawData"
      @change="change"
      @remove="remove"
      @click="click"
      @sort="sort"
    />
  </div>
</template>

<script>
import Grid from '../components/Grid.vue'
import InfoCard from '../components/InfoCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Grid, InfoCard
  },
  props: {
    msg: String
  },

  // computed properties
  computed: {
    userName() {
      return this.user.user.name
    },
    rawData() {
      return this.tile.chars
    },
    // we use object spread operator so that we can also have LOCAl computed properties
    ...mapState([
      'user', 'tile'
    ])
  },

  // When component is created, pull data from database (json file)
  created() {
    this.$store.dispatch('tile/updateData')
  },
  

  methods: {
    click ({ items, index }) {
      let value = items.find(v => v.index === index)
      this.selected = value.item
      console.log(this.selected)
    },
    change (event) {
      console.log('change', event)
    },
    remove (event) {
      console.log('remove', event)
    },
    sort (event) {
      console.log('sort', event)
    }
  }

}
</script>

<style lang="scss">
body {
  background: #fafafa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.color-header {
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;
}
</style>
