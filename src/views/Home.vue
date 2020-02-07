<template>
  <div>
    <v-navigation-drawer permanent clipped app>
      <info-card
        :title="infoText"
      />
    </v-navigation-drawer>
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="rawData"
      :height="160"
      :width="160"
      @change="change"
      @remove="remove"
      @click="click"
      @sort="sort"
    />
  </div>
</template>

<script>
import Grid from '../components/Grid.vue'
import EventService from '@/services/EventService.js'
import InfoCard from '../components/InfoCard.vue'

export default {
  name: 'Home',
  components: {
    Grid, InfoCard
  },
  props: {
    msg: String
  },

  data () {
    return {
      rawData: [],
      infoText: 'HELLO'
    }
  },

  created() {
    EventService.getCharacters()
      .then(response => {
        this.rawData = response.data
      })
      .catch(error => {
        console.log('There was an error with fetching the data:', error.response)
      })
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
