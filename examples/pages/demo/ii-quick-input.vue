<template>
<div>
  <ii-quick-input ref="quick_input" @nextData="handle_input"></ii-quick-input>
  <span>增加is-mobile属性后的样式</span>
  <ii-quick-input ref="quick_input_mobile" :is-mobile="true" @nextData="handle_input"></ii-quick-input>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_quick_input_code"></ii-code-view>
</div>
</template>

<script>
import Codes from '../example-code/index.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      ii_quick_input_code: Codes('./ii-quick-input.code')
    }
  },
  methods: {
    async handle_input (data) {
      await this.$ii_message('warn', data)
      this.$refs.quick_input.focus()
      this.$refs.quick_input.get_input_data()
    }
  },
  mounted () {
    this.$refs.quick_input.get_input_data()
  }
}
</script>
