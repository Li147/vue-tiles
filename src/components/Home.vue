<template>
  <grid>
    :draggable="true"
    :sortable="true"
    :items="items"
    :height="100"
    :width="100">

  <template slot="cell" scope="props">
    <div>{{props.item}}</div>
  </template>

  </grid>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },

  data () {
    let words = [ 'red', 'apple', 'lemon']

    return {
      words
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
