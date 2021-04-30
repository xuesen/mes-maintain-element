<template>
<div>
  <ii-panel title="我的编辑面板">
    <ii-form ref="form" :model="form" label-width="80px">
      <ii-form-item label="活动名称">
        <ii-input v-model="form.name"></ii-input>
      </ii-form-item>
      <ii-form-item label="即时配送">
        <ii-switch v-model="form.delivery"></ii-switch>
      </ii-form-item>
      <ii-form-item label="活动性质">
        <ii-radio-group v-model="form.type" :value-obj.sync="selected_obj" :init-options="select_init_options"></ii-radio-group>
      </ii-form-item>
    </ii-form>
  </ii-panel>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_panel_code"></ii-code-view>
  <ii-panel height="200px">
    <h2 slot="title">自定义标题面板</h2>
    <ii-form ref="form" :model="form" label-width="80px">
      <ii-form-item label="活动名称">
        <ii-input v-model="form.name"></ii-input>
      </ii-form-item>
      <ii-form-item label="即时配送">
        <ii-switch v-model="form.delivery"></ii-switch>
      </ii-form-item>
      <ii-form-item label="活动性质">
        <ii-radio-group v-model="form.type" :value-obj.sync="selected_obj" :init-options="select_init_options"></ii-radio-group>
      </ii-form-item>
    </ii-form>
  </ii-panel>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_panel_customise_title_code"></ii-code-view>
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: '',
        resource: '',
        desc: ''
      },
      select_init_options: {
        api_path: './example-data/ii-select.json',
        req_type: 'get',
        params: {},
        label_field: 'desc',
        value_field: 'name'
      },
      selected_obj: {},
      ii_panel_code: Codes('./ii-panel.code'),
      ii_panel_customise_title_code: Codes('./ii-panii-customise_title.code')
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
