<template>
<div style="width: 100%; height: 100%;" class="ii-list-with-filter">
  <div class="filter">
      <ii-input
      v-model="filterKeyWord"
      placeholder="Filter..."
      ></ii-input>
  </div>
  <slot name="buttonGroup"></slot>
  <div style="width: calc(100%);" :style="{height: 'calc(100% - ' + headerHeight + ')'}">
    <DynamicScroller
    ref="dynamic-scroller"
    :min-item-size="minitemsize"
    :items="filteredItems"
    style="height: 100%;"
    >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
      :ref="'dynamicScrollerItem'+item[searchFiled]"
      :item="item"
      :active="active"
      :data-index="index"
      :data-active="active"
      >
        <slot name="listitem" v-bind:row="{item: item, index: index}"></slot>
      </DynamicScrollerItem>
    </template>
    </DynamicScroller>
  </div>
</div>
</template>
<style lang="scss" scoped="" type="text/css">
  .el-select .ii-input input, .ii-input input {
    border-bottom: 1px solid rgba(112,112,112,1);
  }
</style>

<script>
import _ from 'lodash'
export default {
  name: 'IiListWithFilter',
  props: {
    minitemsize: Number,
    items: Array,
    labelField: String,
    searchFiled: String,
    headerHeight: {
      type: String,
      default: '43px'
    }
  },
  data () {
    return {
      ready: false,
      filterKeyWord: ''
    }
  },
  computed: {
    filteredItems () {
      let activeItems = []
      if (!this.filterKeyWord) {
        activeItems = _.clone(this.items)
      } else {
        const lowerCaseSearch = this.filterKeyWord.toLowerCase()
        activeItems = this.items.filter(item => item[this.searchFiled ? this.searchFiled : this.labelField].toLowerCase().includes(lowerCaseSearch))
      }
      return activeItems
    }
  },
  created () {
    // _.each(this.items, (item) => {
    //   item.resize = false
    // })
    // this.ready = true
  },
  methods: {
    resizeItem (item) {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs['dynamicScrollerItem' + item[this.searchFiled]]) {
            this.$refs['dynamicScrollerItem' + item[this.searchFiled]].updateSize()
          }
        }, 400)
      })
    },
    scrollToItem (index, sub_size) {
      this.$refs['dynamic-scroller'].scrollToItem(index, sub_size)
    }
  },
  async mounted () {
  },
  watch: {
  }
}
</script>
