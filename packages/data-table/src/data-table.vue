<template>
<ii-container :style="{height: !onlyView && !hideAddBtn ? (tableHeight.replace('px', '') - (-50)) + 'px' : tableHeight}" direction="vertical" class="ii-maitain-page">
    <ii-header height="50px" v-if="!onlyView && (!hideAddBtn || !hideExport)">
    <div class="ii-table-top">
      <ii-row>
        <ii-col :span="4">
          <ii-button-group>
            <ii-tooltip class="item" effect="dark" :content='$t("button.add")' placement="top" v-if="!hideAddBtn">
              <ii-button @click="handle_add()"><ii-svg-icon :name="'btnicon/add'" width="24" height="24"/></ii-button>
            </ii-tooltip>
            <ii-tooltip class="item" effect="dark" :content='$t("button.export")' placement="top" v-if="!hideExport">
              <ii-button @click="handle_export()"><ii-svg-icon :name="'btnicon/export'" width="24" height="24"/></ii-button>
            </ii-tooltip>
          </ii-button-group>
        </ii-col>
      </ii-row>
    </div>
    </ii-header>
    <ii-main>
      <div class="ii-maintain-table">
        <ii-table ref="maintainTable"
          @current-change="change_current_row"
          @selection-change="handle_selection_change"
          @row-click="handle_row_click"
          empty-text=" "
          class="virtualTable"
          :row-class-name="rowClassName"
          v-loading="loading"
          :fit="true"
          :data="pageData"
          :height="tableHeight"
          @sort-change="handleSortChange"
          v-if="dataReady"
          highlight-current-row
          stripe
          :border="true">
          <ii-table-column
            v-if="showSelection"
            type="selection"
            width="70">
          </ii-table-column>
          <ii-table-column
            v-if="showIndex"
            :key="'tableColumnxuhao'"
            :label="$t('table.xuhao')"
            prop="index"
            width="80">
          </ii-table-column>
          <ii-table-column v-for="column in tableColumn"
            :key="'tableColumn' + column.value"
            :label="$t(column.title)"
            :prop="column.value"
            :show-overflow-tooltip="true"
            :sortable="sortable ? 'custom' : false"
            :resizable="true"
            :min-width="column.width">
            <template slot-scope="scope">
              <ColumnContent v-if="column.formater" :formater="column.formater" :row-data="scope.row"></ColumnContent>
              <span v-else>{{ get_column_value(column.value, scope.row) }}</span>
            </template>
          </ii-table-column>
          <ii-table-column class-name="row-handler-group" fixed="right" v-if="!onlyView && (!hideEditBtn || !hideDeleteBtn)" :label='rowButtonGroupLabel || $t("table.btn_group_in_row")' :width="rowButtonGroupWidth || 95">
            <template slot-scope="scope">
              <slot name="row-handler-first" v-bind:row="scope.row"></slot>
              <ii-button size="small" v-if="!hideEditBtn" :disabled="disableEdit ? disableEdit(scope.row) : false" @click="handle_edit(scope.$index, scope.row)"><ii-svg-icon :name="'btnicon/edit'"/></ii-button>
              <slot name="row-handler-middle" v-bind:row="scope.row"></slot>
              <ii-button size="small" v-if="!hideDeleteBtn" :disabled="disableDelete ? disableDelete(scope.row) : false" @click="handle_delete(scope.$index, scope.row)"><ii-svg-icon :name="'btnicon/delete'"/></ii-button>
              <slot name="row-handler-last" v-bind:row="scope.row"></slot>
            </template>
          </ii-table-column>
          <ii-table-column class-name="cust-button-group" fixed="right" v-if="custButtonGroup" :label='rowButtonGroupLabel' :width="rowButtonGroupWidth || 95">
            <template slot-scope="scope">
              <slot name="cust-button-group" v-bind:row="scope.row"></slot>
            </template>
          </ii-table-column>
          <div class="append" slot="append" style="text-align: center"></div>
        </ii-table>
        <ii-data-edit-form ref="data_edit_form" :top="dialogtop" :formDefine="formDefine" :table-data="table_data" @haveSaved="handle_data_add">
          <template v-for="_slot in slots" v-slot:[_slot]="form">
            <slot :name="_slot" v-bind:form="form.form"></slot>
          </template>
        </ii-data-edit-form>
      </div>
    </ii-main>
  </ii-container>
</template>

<script>
import _ from 'lodash'
import XLSX from 'xlsx'
import moment from 'moment'
import Vue from 'vue'
import IiDataEditForm from './data-edit-form.vue'
import VirtualTable from '../../maintain-table/src/virtual-table.mixin.js'
let ColumnContentComponent = Vue.extend({
  props: {
    formater: Function,
    rowData: Object
  },
  render (h) {
    return this.formater(this.rowData)
  }
})
export default {
  name: 'IiDataTable',
  components: {
    IiDataEditForm,
    ColumnContent: ColumnContentComponent
  },
  mixins: [VirtualTable],
  props: {
    sortable: {
      type: Boolean,
      default: true
    },
    dialogtop: Number,
    tableColumn: Array,
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    formDefine: Object,
    fixTableHeight: [Number, String],
    titleHeight: {
      type: Number,
      default: 40
    },
    rowHeight: {
      type: Number,
      default: 31
    },
    disableEdit: Function,
    disableDelete: Function,
    onlyView: {
      type: Boolean,
      default: false
    },
    custButtonGroup: Boolean,
    rowButtonGroupWidth: Number,
    rowButtonGroupLabel: String,
    hideEditBtn: {
      type: Boolean,
      default: false
    },
    hideAddBtn: {
      type: Boolean,
      default: false
    },
    hideExport: {
      type: Boolean,
      default: true
    },
    hideDeleteBtn: {
      type: Boolean,
      default: false
    },
    rowClassName: Function
  },
  data () {
    return {
      dataReady: false,
      loading: false,
      currentRow: undefined
    }
  },
  computed: {
    slots () {
      let _slots = []
      _.forEach(this.formDefine.prop, function (row) {
        _.forEach(row, function (form_item) {
          if (form_item.control === 'slot') {
            _slots.push(form_item.model)
          }
        })
      })
      return _slots
    }
  },
  methods: {
    clear_data () {
      this.pageData = []
      this.table_data = []
    },
    handle_add () {
      this.$refs.data_edit_form.open()
    },
    handle_edit (rowIndex, data) {
      this.$refs.data_edit_form.open(data)
    },
    handle_row_click (row, column, event) {
      this.hightlight_key = row
      if (column.className === 'row-handler-group' || column.className === 'cust-button-group') {
        return
      }
      this.$emit('row-click', row)
    },
    handle_data_add (new_data) {
      let hightlight_key
      if (new_data) {
        hightlight_key = {}
        hightlight_key[this.formDefine.primary_column] = new_data[this.formDefine.primary_column]
      }
      this.refresh_table_data(this.table_data, hightlight_key)
    },
    set_current_row (row) {
      this.$refs.maintainTable.setCurrentRow(row)
    },
    async handle_delete (row_index, data) {
      await this.$ii_message('confirm', this.$t('msg.confirm.delete_msg'))
      _.remove(this.table_data, {index: data.index})
      // let new_table_data = this.table_data.splice(data.index, 1)
      this.refresh_table_data(this.table_data)
    },
    get_column_value (column, rowData) {
      if (column.indexOf('.') >= 0) {
        let result = rowData
        let value_path = column.split('.')
        _.each(value_path, (key, index) => {
          if (!result || result === null || result === 'null') {
            return
          }
          result = result[key]
        })
        return result
      } else {
        return rowData[column]
      }
    },
    change_current_row (currentRow, oldCurrentRow) {
      this.currentRow = currentRow
    },
    get_current_row () {
      return this.currentRow
    },
    recreate_form_layout () {
      this.$refs.data_edit_form.recreateLayout()
    },
    handle_selection_change (selection) {
      this.$emit('selection-change', selection)
    },
    handle_export () {
      let _this = this
      if (this.table_data && this.table_data.length > 0) {
        this.export_data = []
        let columndata = []
        this.tableColumn.forEach(column => {
          columndata.push(this.$t(column.title))
        })
        this.export_data.push(columndata)
        let rowdata = []
        this.table_data.forEach(row => {
          rowdata = []
          this.tableColumn.forEach(column => {
            let has_formater = column.formater
            let new_coulnm_content
            if (has_formater) {
              let new_coulnm_content_comp = new ColumnContentComponent()
              new_coulnm_content_comp.rowData = row
              new_coulnm_content_comp.formater = column.formater
              new_coulnm_content = new_coulnm_content_comp.$mount().$el.innerText
            } else {
              new_coulnm_content = this.get_column_value(column.value, row)
            }
            rowdata.push(new_coulnm_content)
          })
          this.export_data.push(rowdata)
        })
        const ws = XLSX.utils.aoa_to_sheet(_this.export_data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws)
        XLSX.writeFile(wb, this.$route.name + '(' + moment().format('YYYY-MM-DD HH:mm:ss') + ')' + '.xlsx')
      } else {
        this.$ii_message('warn', 'no data')
      }
    }
  },
  mounted () {
    this.dataReady = true
    if (this.fixTableHeight) {
      this.tableHeight = this.fixTableHeight
    } else {
      // this.$nextTick(() => {
      //   this.caculateTableHeight(this)
      // })
    }
  },
  watch: {
    '$i18n.locale' () {
      this.recreate_form_layout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
