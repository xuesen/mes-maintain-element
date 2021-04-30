<template>
<div>
  <ii-form>
    <ii-form-item label="数据获取功能下拉:" label-width="160px">
      <ii-multi-select v-model="selected_val" :value-obj.sync="selected_obj" :init-options="select_init_options"></ii-multi-select>
    </ii-form-item>
  </ii-form>
  <div style="padding-left: 160px;">selected_val：{{JSON.stringify(selected_val)}},&nbsp;&nbsp;&nbsp;&nbsp;selected_obj: {{JSON.stringify(selected_obj)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_multi_select_with_ajax_code"></ii-code-view>
  <ii-form>
    <ii-form-item label="options赋值下拉:" label-width="160px">
      <ii-multi-select v-model="selected_val2" :value-obj.sync="selected_obj2" :init-options="select_init_options2"></ii-multi-select>
      <div style="padding-left: 160px;">selected_val：{{JSON.stringify(selected_val2)}},&nbsp;selected_obj: {{JSON.stringify(selected_obj2)}}</div>
    </ii-form-item>
    <ii-form-item label="options赋值下拉:" label-width="160px">
      <ii-multi-select v-model="selected_val3" :value-obj.sync="selected_obj3" :lazy-load="true" :options="options" label-field="desc" value-field="name"></ii-multi-select>
      <div style="padding-left: 160px;">selected_val：{{JSON.stringify(selected_val3)}},&nbsp;sselected_obj: {{JSON.stringify(selected_obj3)}}</div>
    </ii-form-item>
  </ii-form>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_multi_select_with_options"></ii-code-view>
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
      select_init_options: {
        api_path: './example-data/ii-select.json',
        req_type: 'get',
        params: {},
        label_field: 'desc',
        value_field: 'name'
      },
      selected_val: [],
      selected_obj: [],
      select_init_options2: {
        lazyLoad: true,
        options: [{name: 'options1', desc: '选项1'}, {name: 'options2', desc: '选项2'}, {name: 'options3', desc: '选项3'}],
        label_field: 'desc',
        value_field: 'name'
      },
      selected_val2: [],
      selected_obj2: [],
      options: [{name: 'options1', desc: '选项1'}, {name: 'options2', desc: '选项2'}, {name: 'options3', desc: '选项3'}],
      selected_val3: [],
      selected_obj3: [],
      ii_multi_select_with_ajax_code: Codes('./ii-multi-select-with-ajax.code'),
      ii_multi_select_with_options: Codes('./ii-multi-select-with-options.code')
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
