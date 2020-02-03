<template>
  <grid
    :center="false"
    :draggable="true"
    :sortable="true"
    :items="colors"
    :height="160"
    :width="160"
    @change="change"
    @remove="remove"
    @click="click"
    @sort="sort"
  >
    
    <template slot="cell" scope="props">
      <Icon :color="props.item"
            :index="props.index"
            :with-button="true"
            @remove="props.remove()"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue'
import Icon from '../components/Icon.vue'
import { generateRGBColors } from '../mixins/util.js'

export default {
  name: 'Home',
  components: {
    Grid, Icon
  },
  props: {
    msg: String
  },

  data () {
    let colors = generateRGBColors(50)

    return {
      colors,
      selected: null
    }
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
