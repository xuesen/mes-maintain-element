<template>
<div>
  <ii-filter
    size="size2"
    :fetch-data-api="fetch_data_api"
    :table-column="table_column"
    @select="data_selected"></ii-filter>
  <div>{{JSON.stringify(data)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_filter_code"></ii-code-view>
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
      fetch_data_api: { api_path: './datacenterservice/line/findEnabledWhereLike', req_type: 'post' },
      table_column: [{ title: 'line.code', value: 'code', filter_params: { code: '_xxx_', cascades: [{entity: 'workshop', cascades: [{entity: 'factory'}]}] }, width: 120 },
        { title: 'line.name', value: 'name', filter_params: { name: '_xxx_', cascades: [{entity: 'workshop', cascades: [{entity: 'factory'}]}] }, width: 120 },
        { title: 'line.desc', value: 'desc', filter_params: { desc: '_xxx_', cascades: [{entity: 'workshop', cascades: [{entity: 'factory'}]}] }, width: 250 },
        { title: 'workshop.name', value: 'workshop.name', filter_params: { cascades: [{entity: 'workshop', condition: { name: '_xxx_' }, cascades: [{entity: 'factory'}]}] }, width: 120 },
        { title: 'factory.name', formater: (row) => { return <ii-button>{row.name}</ii-button> }, value: 'workshop.factory.name', filter_params: { cascades: [{entity: 'workshop', cascades: [{entity: 'factory', condition: { name: '_xxx_' }}]}] }, width: 120 }],      
      data: {},
      ii_filter_code: Codes('./ii-filter.code')
    }
  },
  methods: {
    data_selected (data) {
      this.data = data
    }
  },
  mounted () {
  }
}
</script>
