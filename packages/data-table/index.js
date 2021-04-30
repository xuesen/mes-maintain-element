import DataTable from './src/data-table.vue'
/* istanbul ignore next */
DataTable.install = function (Vue) {
  Vue.component(DataTable.name, DataTable)
}

export default DataTable
