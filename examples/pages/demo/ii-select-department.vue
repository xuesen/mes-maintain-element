<template>
<div>
  <ii-select-department @select="department_selected"></ii-select-department>
  <div>{{JSON.stringify(departments)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_select_department_code"></ii-code-view>
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
      departments: [],
      ii_select_department_code: Codes('./ii-select-department.code')
    }
  },
  methods: {
    department_selected (departments) {
      this.departments = departments
    }
  },
  mounted () {
  }
}
</script>
