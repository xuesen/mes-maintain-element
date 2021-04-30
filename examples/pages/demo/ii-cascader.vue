<template>
<div>
  <ii-form>
    <ii-form-item label="数据获取功能级联:" label-width="160px">
      <ii-cascader v-model="cascader_selected_val" :value-obj.sync="cascader_selected_obj" :init-options="cascader_init_options"></ii-cascader>
    </ii-form-item>
  </ii-form>
  <div style="padding-left: 160px;">selected_val：{{cascader_selected_val}},&nbsp;&nbsp;&nbsp;&nbsp;selected_obj: {{JSON.stringify(cascader_selected_obj)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_cascader_with_ajax_code"></ii-code-view>
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
      cascader_init_options: {
        data_source: [
          { api_path: './example-data/ii-cascader-factory.json', req_type: 'get', params: {}, label_field: 'desc', value_field: 'name' },
          { api_path: './example-data/ii-cascader-workshop.json', req_type: 'get', params: {}, filter: 'factoryname', label_field: 'desc', value_field: 'name' }
        ],
        value_path: ['factory', 'workshop']
      },
      cascader_selected_val: '',
      cascader_selected_obj: {},
      ii_cascader_with_ajax_code: Codes('./ii-cascader-with-ajax.code')
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
