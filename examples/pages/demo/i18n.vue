<template>
  <ii-code-view :code="i18n_code"></ii-code-view>
</template>

<script>
import Codes from '../example-code/index.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      i18n_code: Codes('./i18n.code')
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
