
<template>
<div>
<ii-button @click="open_attribute_form">编辑属性</ii-button>
<ii-attribute-form ref="attribute_form" owner_type="Model"></ii-attribute-form>
<ii-steps :active="active" finish-status="success">
  <ii-step title="步骤 1"></ii-step>
  <ii-step title="步骤 2"></ii-step>
  <ii-step title="步骤 3"></ii-step>
</ii-steps>
<ii-date-picker type="datetime" v-model="stage_type"></ii-date-picker>
  <ii-auto-height-table
     :showIndex="true"
     :show-selection="true"
     @selection-change="handle_selection_change"
     :data.sync="table_data"
     :hide-export='false'
     :disable-edit="disable_it"
     :table-column="table_column"
     :show-index="true"
     :row-class-name="table_row_class"
     :form-define="form_define">
  </ii-auto-height-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      stage_type: '',
      table_data: [],
      table_column: [{ title: 'line.code', value: 'code', width: 120 },
        { title: 'line.name', value: 'name', width: 120 },
        { title: 'test.code', value: 'test.code', width: 120 },
        { title: 'line.desc', value: 'desc', width: 250 },
        { title: 'workshop.name', value: 'workshopname', width: 120 },
        { title: 'workshop.name', value: 'workshop.name', width: 120 },
        { title: 'factory.name', value: 'workshop.factory.name', width: 120 }],
      form_define: {
        primary_column: 'code',
        // 只配置controller_path， 会使用默认方法名进行访问， 如果使用其他方法名， 需要配置add_api和save_api, save_api的路由需要是methodpath/primary_value的形式
        // controller_path: './datacenterservice/line/',
        add_api: { api_path: './datacenterservice/line/create', req_type: 'post' },
        save_api: { api_path: './datacenterservice/line/updateById/', req_type: 'put' },
        module_name: this.$t('line.module_name'),
        labelWidth: '120px',
        prop: [
          // [{
          //   model: 'workshopname',
          //   label: 'workshop.name',
          //   control: 'cascaderval',
          //   control_options: {
          //     data_source: [
          //       { api_path: './datacenterservice/factory/findEnabled', req_type: 'post', params: {}, label_field: 'name', value_field: 'id' },
          //       { api_path: './datacenterservice/workshop/findEnabled', req_type: 'post', params: {}, filter: 'factory.id', label_field: 'name', value_field: 'id' }
          //     ],
          //     value_path: ['factory', 'workshop']
          //   },
          //   span: 23,
          //   rules: [{
          //     required: true,
          //     validator: (rule, value, callback) => {
          //       if (!value) {
          //         callback(new Error(this.$t('rulebasic.please_select') + this.$t('workshop.name')))
          //       } else {
          //         callback()
          //       }
          //     },
          //     trigger: 'change'
          //   }]
          // }],
          [{
            model: 'test.code',
            label: 'test.code',
            control: 'input',
            span: 23,
            rules: [{ max: 20, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }],
            dismodify: true,
            inputconvert: function (value) {
              return String(value).toUpperCase()
            }
          }],
          [{
            model: 'code',
            label: 'line.code',
            control: 'input',
            span: 23,
            rules: [{ max: 20, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }],
            dismodify: true,
            inputconvert: function (value) {
              return String(value).toUpperCase()
            }
          }],
          [{
            model: 'name',
            label: 'line.name',
            control: 'input',
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value || value.trim() === '') {
                  callback(new Error(this.$t('rulebasic.please_enter') + this.$t('line.name')))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            },
            { max: 50, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }]
          }],
          [{
            model: 'desc',
            label: 'line.desc',
            control: 'textarea',
            span: 23,
            rules: [{ max: 255, message: this.$t('rulebasic.character_length'), trigger: ['blur', 'change'] }]
          }],
          [{
            model: 'factoryid',
            label: 'factory.name',
            control: 'selectval',
            control_options: {
              lazyLoad: true,
              options: [{id: 0, name: 'name1', desc: 'aaa'}, {id: 1, name: 'name2', desc: 'bbb'}],
              label_field: 'name',
              value_field: 'name'
            },
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value || value.toString().trim() === '') {
                  callback(new Error(this.$t('rulebasic.please_enter') + this.$t('line.name')))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            }]
          }],
          [{
            model: 'factory.desc',
            label: 'factory.desc',
            control: 'input',
            disabled: true,
            span: 23
          }],
          [{
            model: 'files',
            label: 'line.files',
            control: 'upload',
            control_options: {
              accept: '.jpg,.png,.jpeg',
              file_metadata: {appName: 'test', module: 'demo-pic-upload'},
              list_type: 'picture-card',
              before_upload: (file) => {
                console.log(file)
                return true
              }
            },
            disabled_customize_func: (data) => {
              return data.desc === '2'
            },
            span: 23
          }]
        ]
      }
    }
  },
  methods: {
    table_row_class ({row, rowIndex}) {
      return rowIndex === 1 ? 'first' : ''
    },
    handle_selection_change (selection) {
      console.log(selection)
    },
    disable_it (row) {
      return row.desc === '2'
    },
    open_attribute_form () {
      this.$refs.attribute_form.open({id: 2})
    }
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style scoped>
</style>
