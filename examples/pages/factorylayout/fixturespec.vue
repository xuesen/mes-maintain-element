<template>
  <ii-container class="specComponent">
    <ii-aside style="border-right: 2px solid #E8F1F8;" width="320px">
      <ii-list-with-filter
        :items="spec_list"
        :minitemsize="40"
        header-height="100px"
        ref="filterList"
        searchFiled="name"
        v-loading="loading"
      >
        <template slot="buttonGroup">
          <ii-button-group class="tableTop" style="padding-top: 5px;">
            <ii-tooltip
              :content="$t('button.add')"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <ii-button @click="handle_new_bop()">
                <ii-svg-icon :name="'btnicon/add'" height="24" width="24" />
              </ii-button>
            </ii-tooltip>
            <ii-tooltip
              :content="$t('button.copy')"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <ii-button @click="copy_from_dialog.visible=true">
                <ii-svg-icon :name="'btnicon/copy'" height="24" width="24" />
              </ii-button>
            </ii-tooltip>
          </ii-button-group>
        </template>
        <template v-slot:listitem="{row}">
          <ii-menu
            :default-active.sync="row.item.activeindex"
            :default-openeds.sync="row.item.defaultopends"
            :unique-opened="true"
            @select="clearOtherSelect(row.item)"
            class="oprate"
          >
            <ii-menu-item
              :index="row.item.index"
            >
              <div @click="view_bop('click', row.item)" style="display: inline-block; width: calc(100% - 50px);">
                <ii-text-overflow-tooltip
                  :content="row.item.name"
                  effect="dark"
                  :open-delay="800"
                  placement="right-start">
                  {{ row.item.name }}
                </ii-text-overflow-tooltip>
              </div>
              <ii-button @click.stop="handle_delete_spec(row.item)">
                <ii-svg-icon :name="'btnicon/delete'" height="18" width="24" />
              </ii-button>
            </ii-menu-item>
          </ii-menu>
        </template>
      </ii-list-with-filter>
    </ii-aside>
    <ii-main>
      <ii-container direction="vertical">
        <ii-header height="40px" style="padding-left: 16px; border-bottom: 1px solid rgba(207, 205, 205, 1);">
          <ii-button-group class="buttonGroup" style="padding-top: 5px">
            <ii-tooltip
              :content="$t('button.save')"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <ii-button
                @click="handle_save_bop()"
                v-show="adding || editing"
              >
                <ii-svg-icon :name="'btnicon/save'" height="24" width="24" />
              </ii-button>
            </ii-tooltip>
          </ii-button-group>
        </ii-header>
        <ii-main v-show="adding || viewing || editing">
          <ii-container direction="vertical">
            <ii-header height="200px">
              <ii-panel
                :title="$t('spec.info.title')"
                height="220px"
              >
                <ii-form :model="spec_info" :rules="spec_info_rules" label-width="80px" ref="spec_form">
                  <ii-row>
                    <ii-col :span="12">
                      <ii-form-item
                        :label="$t('fixture_spec.info.name')"
                        prop="name"
                      >
                        <ii-input
                          :disabled="spec_info.id !== null"
                          v-model="spec_info.name"
                        ></ii-input>
                      </ii-form-item>
                    </ii-col>
                  </ii-row>
                  <ii-row>
                    <ii-col :span="24">
                      <ii-form-item
                        :label="$t('fixture_spec.info.description')"
                        prop="description"
                      >
                        <ii-input
                          type="textarea"
                          :rows="3"
                          v-model="spec_info.description"
                        ></ii-input>
                      </ii-form-item>
                    </ii-col>
                  </ii-row>
                </ii-form>
              </ii-panel>
            </ii-header>
            <ii-main>
              <ii-panel :title="$t('fixture_spec.process_spec.title')">
                <ii-data-table
                  ref="spec_table"
                  :data="processes_spec"
                  :form-define="form_define"
                  :table-column="table_column"
                >
                </ii-data-table>
              </ii-panel>
            </ii-main>
          </ii-container>
        </ii-main>
      </ii-container>
    </ii-main>
    <ii-draggable-dialog top="20" :visible="copy_from_dialog.visible" :title="$t('button.copyfrom')" @close="copy_from_dialog.visible=false" size="size1">
      <ii-select v-model="copy_from_dialog.bop_id" :init-options="bop_select_options"></ii-select>
      <span slot="footer" class="dialog-footer">
      <ii-button type="primary" @click="handle_bop_copy()">{{$t('button.copy')}}</ii-button>
      </span>
    </ii-draggable-dialog>
  </ii-container>
</template>

<style lang="scss" scoped>
</style>

<script>
import moment from 'moment'
import _ from 'lodash'
import $ from 'jquery'
export default {
  data () {
    return {
      editor: '',
      adding: false,
      viewing: false,
      editing: false,
      loading: false,
      spec_list: [],
      processes_spec: [],
      spec_info: {id: null, name: '', description: '', editor: this.$session.get('loginstate').userInMES.code},
      spec_info_rules: {
        name: [{
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error(this.$t('spec.msg.input_name')))
            } else {
              callback()
            }
          },
          message: this.$t('spec.msg.input_name'),
          trigger: 'blur'
        }],
      },
      copy_from_dialog: {
        visible: false,
        bop_id: undefined
      },
      bop_select_options: {
        api_path: './datacenterservice/api/BopFixture',
        req_type: 'get',
        params: {},
        label_field: 'name',
        value_field: 'id'
      },
      table_column: [
        { title: 'fixture_spec.process_spec.col_process', value: 'processName', width: 120 },
        { title: 'fixture_spec.process_spec.col_fixture_type', value: 'fixtureTypeName', width: 120 },
        { title: 'fixture_spec.process_spec.col_fixture_pn', value: 'fixturePnName', width: 120 },
        { title: 'fixture_spec.process_spec.col_qty', value: 'qty', width: 120 }],

      form_define: {
        new_anather: true,
        primary_column: 'id',
        module_name: this.$t('fixture_spec.process_spec.title'),
        labelWidth: '80px',
        preprocess_data: (data, type) => {
          if (type === 'data_init_form') {
            if (data) {
              data.fixtureType = { id: data.fixtureTypeId, name: data.fixtureTypeName, code: data.fixtureTypeCode }
              data.fixturePn = { id: data.fixturePnId, name: data.fixturePnName, code: data.fixturePnCode }
              data.process = { id: data.processId, name: data.processName, code: data.processCode }
            }
            return data
          } else if (type === 'data_to_save' || type === 'data_to_create') {
            return data
          }
        },
        beforeSave: async (data, form_data) => {
          form_data.fixtureTypeId = form_data.fixtureType.id
          form_data.fixtureTypeCode = form_data.fixtureType.code
          form_data.fixtureTypeName = form_data.fixtureType.name
          form_data.fixturePnId = form_data.fixturePn.id
          form_data.fixturePnCode = form_data.fixturePn.code
          form_data.fixturePnName = form_data.fixturePn.name
          form_data.processId = form_data.process.id
          form_data.processCode = form_data.process.code
          form_data.processName = form_data.process.name
          let exists = _.some(this.processes_spec, (item) => {
            return (!data || (data && item.index !== data.index)) && item.processId === form_data.processId && item.fixturePnId === form_data.fixturePnId
          })
          if (exists) {
            await this.$ii_message('error', this.$t('fixture_spec.process_spec.fixture_dupulicate'))
            return false
          } else {
            return true
          }
        },
        prop: [
          [{
            model: 'process.id',
            label: 'fixture_spec.process_spec.col_process',
            control: 'select',
            control_options: {
              api_path: './datacenterservice/api/process/query',
              req_type: 'post',
              params: {
                name: 'Name',
                value: ''
              },
              label_field: 'code+name',
              value_field: 'id'
            },
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error(this.$t('fixture_spec.process_spec.col_process')))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }]
          }],
          [{
            model: 'fixtureType.code',
            label: 'fixturepn.fixtureType',
            control: 'select',
            control_options: {
              api_path: './datacenterservice/api/fixturetype/query',
              req_type: 'post',
              params: { name: 'code', value: '' },
              label_field: 'code+name',
              value_field: 'code'
            },
            span: 23,
            change_affect_select_options: [{ target: 'fixturePn.id', param_key: 'value' }]
          }],
          [{
            model: 'fixturePn.id',
            label: 'fixturestatus.fixturePart',
            control: 'multi-select',
            control_options: {
              api_path: './datacenterservice/api/fixturepn/query',
              req_type: 'post',
              params: { name: 'fixtureType.code', value: '' },
              label_field: 'code+name',
              value_field: 'id'
            },
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value || value.length === 0) {
                  callback(new Error(this.$t('rulebasic.please_select') + this.$t('fixturestatus.fixturePart')))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }]
          }],
          [{
            model: 'qty',
            label: 'fixture_spec.process_spec.col_qty',
            control: 'input',
            span: 23,
            rules: [{
              required: true,
              validator: (rule, value, callback) => {
                if (!value || value.trim() === '') {
                  callback(new Error(this.$t('fixture_spec.process_spec.input_qty')))
                } else if (value && !/^[1-9][0-9]*$/.test(value)) {
                  callback(new Error(this.$t('fixture_spec.process_spec.input_qty')))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            }],
            displayformat: function (data) { return data['qty'] ? String(data['qty']).toString() : '' }

          }]
        ]
      }
    }
  },
  created () {
  },
  destroyed () {
  },
  computed: {
  },
  methods: {
    async refresh_spec_list () {
      let dataindex = 0
      let result
      this.loading = true
      try {
        result = await this.$axios('./datacenterservice/api/bopfixture', 'get', {})
      } catch (e) {
      } finally {
        this.loading = false
      }
      let _this = this
      let scroll_to_index
      let data_index = 0
      this.spec_list = _.map(result.data, (spec) => {
        if (this.spec_info.name === spec.name) {
          this.adding = false
          this.editing = true
          this.viewing = false
        }
        data_index++
        return { index: data_index.toString(), activeindex: this.spec_info.name === spec.name ? data_index.toString() : null, ...spec}
      })
      this.$nextTick(()=> {
        this.$refs.filterList.scrollToItem(scroll_to_index, 60)
      })
    },
    async handle_bop_copy () {
      if (!this.copy_from_dialog.bop_id) {
        return
      }
      await this.bop_clone({id: this.copy_from_dialog.bop_id})
      this.copy_from_dialog.visible = false
      this.copy_from_dialog.bop_id = undefined
    },
    async bop_clone (bop) {
      this.handle_new_bop()
      try {
        let result = await this.$axios('./datacenterservice/api/BopFixture/detail/' + bop.id, 'post', {})
        this.spec_info.id = null
        this.spec_info.name = result.data.bopFixture.name
        this.spec_info.description = result.data.bopFixture.description
        this.processes_spec = this.data_adapter(result.data.processList)
      } catch (e) {
        console.log(e)
        return
      }
    },
    handle_new_bop () {
      $('.el-menu-item.is-active').removeClass('is-active')
      this.spec_info.id = null
      this.spec_info.name = ''
      this.spec_info.description = ''
      this.processes_spec = []
      this.adding = true
      this.editing = false
      this.viewing = false
    },
    async handle_save_bop () {
      this.$refs['spec_form'].validate(async (valid) => {
        if (valid) {
          let data = {
            processList: _.map(_.uniqBy(this.processes_spec, 'processId'), (spec) => {
              let fixtures = _.filter(this.processes_spec, {processId: spec.processId})
              return {
                processId: spec.processId,
                processCode: spec.processCode,
                processName: spec.processName,
                details: _.map(fixtures,
                  (fixture) => {
                    if (this.spec_info.id === null) {
                      return {
                        fixturePnId: fixture.fixturePnId,
                        qty: fixture.qty,
                      }
                    } else {
                      return {
                        id: fixture.id,
                        bopFixtureId: this.spec_info.id,
                        processId: spec.processId,
                        fixturePnId: fixture.fixturePnId,
                        qty: fixture.qty,
                        fixturePnCode: fixture.fixturePnCode,
                        fixturePnName: fixture.fixturePnName
                      }
                    }
                  })
              }
            }),
            bopFixture: this.spec_info
          }
          let saved_spec
          let exists_spec
          try {
            if (data.bopFixture.id === null) {
              saved_spec = await this.$axios('./datacenterservice/api/BopFixture/add', 'post', data)
              this.spec_info.id = saved_spec.data
            } else  {
              saved_spec = await this.$axios('./datacenterservice/api/BopFixture/update/' + data.bopFixture.id, 'put', data)
            }
          } catch (e) {
            return
          }

          this.$message({
            message: this.$t('msg.saveSuccess'),
            type: 'success'
          })

          await this.refresh_spec_list()
      
          _.each(this.spec_list, (spec) => {
            if (spec.name !== this.spec_info.name) {
              spec.defaultopends = []
            }
          })
        }
      })
    },
    async handle_delete_spec (bop) {
      let _this = this
      try {
        await this.$ii_message('confirm', this.$t('msg.confirm.delete_msg'))
        await this.$axios('./datacenterservice/api/BopFixture/delete/' + bop.id, 'delete', null)
      } catch (e) {
        return
      }

      $('.el-menu-item.is-active').removeClass('is-active')
      this.clearAllSelect()
      this.adding = false
      this.editing = false
      this.viewing = false
      this.refresh_spec_list()
    },
    async view_bop (action, bop) {
      let result = await this.$axios('./datacenterservice/api/BopFixture/detail/' + bop.id, 'post', {})
      this.processes_spec = this.data_adapter(result.data.processList)
      this.spec_info.id = result.data.bopFixture.id
      this.spec_info.name = result.data.bopFixture.name
      this.spec_info.description = result.data.bopFixture.description
      this.adding = false
      this.editing = true
      this.viewing = false
    },
    data_adapter (processes) {
      let processes_spec = []
      _.each(processes, (process_spec) => {
        processes_spec = _.concat(processes_spec, _.map(process_spec.details, (fixture) => {
          return {...fixture, processCode: process_spec.processCode, processName: process_spec.processName}
        }))
      })
      return processes_spec
    },
    clearAllSelect (item) {
      _.each(this.spec_list, (spec) => {
        spec.activeindex = null
      })
    },
    clearOtherSelect (item) {
      _.each(this.spec_list, (spec) => {
        if (item.name !== spec.name) {
          spec.activeindex = null
        }
      })
    }
  },
  async mounted () {
    await this.refresh_spec_list()
  }
}
</script>
