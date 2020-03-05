<template>
  <div class="v-grid" :style="style">
    <GridItem v-for="c in tiles"
              :key="c.symbol"
              :index="c.index"
              :sort="c.sort"
              :draggable="draggable"
              :drag-delay="dragDelay"
              :row-count="rowCount"
              :cell-width="cellWidth"
              :cell-height="cellHeight"
              :window-width="windowWidth"
              :row-shift="rowShift"
              @dragstart="onDragStart"
              @dragend="onDragEnd"
              @drag="onDrag"
              @click="click"
    >
      <Icon 
        :text="c.item.mainString"
        :color="colors[0]"
        :index="c.index"
        :with-button="true"
        @remove="removeItem(c)"
      />
    </GridItem>
  </div>
</template>

<script>
import windowSize from '../mixins/window_size.js'
import GridItem from './GridItem.vue'
import Icon from './Icon.vue'
import { generateRGBColors } from '../mixins/util.js'

export default {
  name: 'Grid',
  mixins: [windowSize],
  components: {
    GridItem, Icon
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    gridWidth: {
      type: Number,
      default: -1
    },
    cellWidth: {
      type: Number,
      default: 120,
    },
    cellHeight: {
      type: Number,
      default: 120
    },
    draggable: {
      type: Boolean,
      default: true
    },
    dragDelay: {
      type: Number,
      default: 0
    },
    sortable: {
       type: Boolean,
       default: true
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data () {
    let colors = generateRGBColors(1)
    return {
      list: [],
      tiles: [],
      colors,
    }
  },
  computed: {
    gridResponsiveWidth () {
      if (this.gridWidth < 0) {
        return this.windowWidth
      } else {
        return Math.min(this.windowWidth, this.gridWidth)
      }
    },

    height () {
      return Math.ceil(this.tiles.length / this.rowCount) *
        this.cellHeight
    },

    style () {
      return {
        height: this.height + 'px'
      }
    },

    rowCount () {
      return Math.floor(this.gridResponsiveWidth / this.cellWidth)
    },

    rowShift () {
      if (this.center) {
        let contentWidth = this.tiles.length * this.cellWidth
        let rowShift = contentWidth < this.gridResponsiveWidth
          ? (this.gridResponsiveWidth - contentWidth) / 2
          : (this.gridResponsiveWidth % this.cellWidth) / 2

        return Math.floor(rowShift)
      }

      return 0
    }
  },

  watch: {
    items: {
      handler: function (nextItems = []) {
        this.tiles = nextItems.map((item, index) => {
          return {
            item,
            index: index,
            sort: index
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    /* Returns merged event object */
    wrapEvent (other = {}) {
      return {
        datetime: Date.now(),
        items: this.getListClone(),
        ...other
      }
    },
    /* Returns sorted clone of "list" array */
    getListClone () {
      return this.tiles
        .slice(0)
        .sort((a, b) => {
          return a.sort - b.sort
        })
    },

    removeItem ({ index }) {
      let removeItem = this.tiles.find(v => v.index === index)
      let removeItemSort = removeItem.sort

      this.tiles = this.tiles
        .filter(v => {
          return v.index !== index
        })
        .map(v => {
          let sort = v.sort > removeItemSort
            ? (v.sort - 1)
            : v.sort

          return { ...v, sort }
        })

      this.$emit('remove', this.wrapEvent({ index }))
    },

    onDragStart (event) {
      this.$emit('dragstart', this.wrapEvent(event))
    },

    onDragEnd (event) {
      this.$emit('dragend', this.wrapEvent(event))
    },

    click (event) {
      this.$emit('click', this.wrapEvent(event))
    },

    onDrag (event) {
      if (this.sortable) {
        this.sortList(event.index, event.gridPosition)
      }

      this.$emit('drag', this.wrapEvent({ event }))
    },

    sortList (itemIndex, gridPosition) {
      let targetItem = this.tiles.find(item => item.index === itemIndex)
      let targetItemSort = targetItem.sort

      /*
        Normalizing new grid position
      */
      gridPosition = Math.max(gridPosition, 0)
      /*
        If you remove this line you can drag items to positions that
        are further than items array length
      */
      gridPosition = Math.min(gridPosition, this.tiles.length - 1)

      if (targetItemSort !== gridPosition) {
        this.tiles= this.tiles.map(item => {
          if (item.index === targetItem.index) {
            return {
              ...item,
              sort: gridPosition
            }
          }

          const { sort } = item

          if (targetItemSort > gridPosition) {
            if (sort <= targetItemSort && sort >= gridPosition) {
              return {
                ...item,
                sort: sort + 1
              }
            }
          }

          if (targetItemSort < gridPosition) {
            if (sort >= targetItemSort && sort <= gridPosition) {
              return {
                ...item,
                sort: sort - 1
              }
            }
          }

          return item
        })

        this.$emit('sort', this.wrapEvent())
      }
    }
  }
}
</script>
<style>
.v-grid {
  display: block;
  position: relative;
  width: 100%;
}
</style>