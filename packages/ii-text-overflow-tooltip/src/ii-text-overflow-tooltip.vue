<template>
  <ii-tooltip v-bind="$props" :disabled="flag">
    <span @mouseenter="visibilityChange($event)"><slot name="default"></slot></span>
  </ii-tooltip>
</template>

<script>

export default {
  name: 'IiTextOverflowTooltip',
  props: {
    openDelay: {
      type: Number,
      default: 0
    },
    placement: String,
    disabled: Boolean,
    manual: Boolean,
    effect: {
      type: String,
      default: 'dark'
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    popperClass: String,
    content: String,
    visibleArrow: {
      default: true
    },
    transition: {
      type: String,
      default: 'el-fade-in-linear'
    },
    popperOptions: {
      default () {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        }
      }
    },
    enterable: {
      type: Boolean,
      default: true
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      flag: true
    }
  },
  methods: {
    visibilityChange (event) {
      let ev = event.target
      let thisWidth = ev.offsetWidth
      let wordWidth = ev.scrollWidth
      this.flag = thisWidth >= wordWidth
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
