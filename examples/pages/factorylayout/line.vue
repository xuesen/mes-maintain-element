<template>
  <ii-maintain-page v-show="show"
     :fetch-data-api="fetch_data_api"
     :delete-data-api="delete_data_api"
     :table-column="table_column"
     :disable-edit="disable_it"
     :form-define="form_define"
     :show-selection="true"
     :virtual-mix-forbidden="false">
  </ii-maintain-page>
</template>

<script>
export default {
  mounted () {
  },
  methods: {
    disable_it (row) {
      if (row.desc === '2') {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      show: true,
      fetch_data_api: { api_path: './datacenterservice/api/terminal/query', req_type: 'post' },
      delete_data_api: { api_path: './datacenterservice/api/terminal/', req_type: 'delete' },
      table_column: [
        { title: 'terminal.code', value: 'code', filter_params: { name: 'code', value: '_xxx_', orderBy: 'Code' }, width: 120 },
        { title: 'terminal.name', value: 'name', filter_params: { name: 'name', value: '_xxx_', orderBy: 'Code' }, width: 120 },

        { title: 'process.name', value: 'process.name', filter_params: { name: 'process.name', value: '_xxx_', orderBy: 'Code' }, width: 120 },
        { title: 'process.typename', value: 'process.type.name', filter_params: { name: 'process.processtype', value: '_xxx_', orderBy: 'Code' }, width: 120 },

        { title: 'line.name', value: 'pdline.name', filter_params: { name: 'line.name', value: '_xxx_', orderBy: 'Code' }, width: 120 },
        { title: 'workshop.name', value: 'pdline.workshop.name', filter_params: { name: 'line.workshop.name', value: '_xxx_', orderBy: 'Code' }, width: 120 },
        { title: 'factory.name', value: 'pdline.workshop.factory.name', filter_params: { name: 'line.workshop.factory.name', value: '_xxx_', orderBy: 'Code' }, width: 120 },
        { title: 'terminal.desc', value: 'description', filter_params: { name: 'description', value: '_xxx_', orderBy: 'Code' }, width: 120 }],
      form_define: {
        primary_column: 'id',
        // 只配置controller_path， 会使用默认方法名进行访问， 如果使用其他方法名， 需要配置add_api和save_api, save_api的路由需要是methodpath/primary_value的形式
        // controller_path: './datacenterservice/line/',
        add_api: { api_path: './datacenterservice/api/terminal/', req_type: 'post' },
        save_api: { api_path: './datacenterservice/api/terminal/', req_type: 'put' },
        module_name: this.$t('terminal.moduleName'),
        labelWidth: '120px',
        preprocess_data: (data, type) => {
          if (type === 'data_init_form') {
            return data
          } else if (type === 'data_to_save' || type === 'data_to_create') {
            return data
          }
        },
        prop: [
          [{
            model: 'process.id',
            label: 'terminal.processname',
            control: 'cascader', // cascader返回的obj，val返回的键值对
            control_options: {
              data_source: [
                { api_path: './datacenterservice/api/DataDictionaryValue/querybycode', req_type: 'post', params: { code : 'ProcessType' }, label_field: 'code+name', value_field: 'name' },
                { api_path: './datacenterservice/api/process/query', req_type: 'post', params: {name: 'processType' }, filter: 'value', label_field: 'code+name', value_field: 'id' }
              ],
              value_path: ['type', 'process']
            },
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error(this.$t('rulebasic.please_select') + this.$t('terminal.processname')))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }]
          }],

          [{
            model: 'pdline.id',
            label: 'terminal.linename',
            control: 'cascader', // cascader返回的obj，val返回的键值对
            control_options: {
              data_source: [
                { api_path: './datacenterservice/api/factory/query', req_type: 'post', params: {name: 'code', value: ''}, label_field: 'code+name', value_field: 'id' },
                { api_path: './datacenterservice/api/workshop/query', req_type: 'post', params: {name: 'factory.id' }, filter: 'value', label_field: 'code+name', value_field: 'id' },
                { api_path: './datacenterservice/api/line/query', req_type: 'post', params: {name: 'workshop.id' }, filter: 'value', label_field: 'code+name', value_field: 'id' }
              ],
              value_path: ['factory', 'workshop', 'pdline']
            },
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error(this.$t('rulebasic.please_select') + this.$t('terminal.linename')))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }]
          }],

          [{
            model: 'code',
            label: 'terminal.code',
            control: 'input',
            span: 23,
            dismodify: true,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value || value.trim() === '') {
                  callback(new Error(this.$t('rulebasic.please_enter') + this.$t('terminal.code')))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            },
            { max: 20, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }],
            inputconvert: function (value) {
              return String(value).toUpperCase()
            }
          }],

          [{
            model: 'name',
            label: 'terminal.name',
            control: 'input',
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value || value.trim() === '') {
                  callback(new Error(this.$t('rulebasic.please_enter') + this.$t('terminal.name')))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            },
            { max: 20, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }],
            inputconvert: function (value) {
              return String(value).toUpperCase()
            }
          }],

          [{
            model: 'description',
            label: 'terminal.desc',
            control: 'textarea',
            span: 23,
            rules: [{ max: 255, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }]
          }]
        ]
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
</style>
