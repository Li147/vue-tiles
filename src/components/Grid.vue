<template>
  <div class="v-grid" :style="style">
    <GridItem v-for="c in characters"
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
      <!-- <slot name="cell"
            :item="c.item"
            :index="c.index"
            :sort="c.sort"
            :remove="() => { removeItem(v) }">
      </slot> -->
      <Icon 
        :text="c.item.symbol"
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
import EventService from '@/services/EventService.js'
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
      default: 160,
    },
    cellHeight: {
      type: Number,
      default: 160
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
    let colors = generateRGBColors(10)
    return {
      list: [],
      characters: [],
      colors,
    }
  },
  
  watch: {
    items: {
      handler: function (nextItems = []) {
        this.characters = nextItems.map((item, index) => {
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

  created() {
    EventService.getCharacters()
      .then(response => {
        this.items = response.data
      })
      .catch(error => {
        console.log('There was an error with fetching the data:', error.response)
      })
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
      return Math.ceil(this.characters.length / this.rowCount) *
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
        let contentWidth = this.characters.length * this.cellWidth
        let rowShift = contentWidth < this.gridResponsiveWidth
          ? (this.gridResponsiveWidth - contentWidth) / 2
          : (this.gridResponsiveWidth % this.cellWidth) / 2

        return Math.floor(rowShift)
      }

      return 0
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
      return this.characters
        .slice(0)
        .sort((a, b) => {
          return a.sort - b.sort
        })
    },

    removeItem ({ index }) {
      let removeItem = this.characters.find(v => v.index === index)
      let removeItemSort = removeItem.sort

      this.characters = this.characters
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
      let targetItem = this.characters.find(item => item.index === itemIndex)
      let targetItemSort = targetItem.sort

      /*
        Normalizing new grid position
      */
      gridPosition = Math.max(gridPosition, 0)
      /*
        If you remove this line you can drag items to positions that
        are further than items array length
      */
      gridPosition = Math.min(gridPosition, this.characters.length - 1)

      if (targetItemSort !== gridPosition) {
        this.characters = this.characters.map(item => {
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