<template>
  <div>
    <ii-tooltip class="item" effect="dark" :content='$t("button.filter")' placement="top-start">
        <ii-button-group>
          <ii-button @click="open()" :disabled="disabled"><ii-svg-icon :name="'menuicon/samplingplan_detail'" width="24" height="24"/></ii-button>
        </ii-button-group>
    </ii-tooltip>
    <ii-draggable-dialog
      class="filter-dialog"
      :modal="false"
      :visible.sync="show"
      @close="closediag()"
      :close-on-click-modal="false"
      :show-close='true'
      :size="size"
      :title="title ? title : $t('title.pls_select')">
        <ii-maintain-page
        v-if="table_show"
        ref="filter"
        :only-view="true"
        :fix-table-height="tableHeight"
        :fetch-data-api="fetchDataApi"
        :table-column="tableColumn"
        :hide-record-fix-info="true"
        :form-define="{}">
        </ii-maintain-page>
        <span slot="footer" class="dialog-footer">
          <ii-button type="text" @click="handle_selected()">{{$t('button.confirm')}}</ii-button>
        </span>
    </ii-draggable-dialog>
  </div>
</template>

<style lang="scss" scoped>
</style>
<i18n>
{
  "en": {
  },
  "cn": {
    "button": {
      "filter": "过滤"
    },
    "msg": {
      "select-row": "请选择一行数据"
    },
    "title": {
      "pls_select": "请选择"
    }
  }
}
</i18n>
<script>
import _ from 'lodash'
export default {
  name: 'IiFilter',
  props: {
    title: String,
    top: {
      type: [String, Number],
      default: '15%'
    },
    size: {
      type: String,
      default: 'size2'
    },
    tableHeight: {
      type: String,
      default: '300px'
    },
    fetchDataApi: Object,
    tableColumn: Array,
    disabled: Boolean
  },
  data () {
    return {
      show: false,
      table_show: false
    }
  },
  methods: {
    closediag () {
      // this.$refs.filter.reinit()
      this.show = false
      this.$nextTick(() => {
        this.table_show = false
      })
    },
    async open () {
      this.show = true
      this.table_show = true
      this.$nextTick(() => {
        this.$refs.filter.datamaintain_serach()
      })
    },
    handle_selected () {
      if (!this.$refs.filter.get_table_hightlight_row()) {
        this.$ii_message('warn', this.$t('msg.select-row'))
        return
      }
      this.$emit('select', this.$refs.filter.get_table_hightlight_row())
      this.show = false
    }
  },
  async mounted () {
  },
  computed: {
  }
}
</script>
