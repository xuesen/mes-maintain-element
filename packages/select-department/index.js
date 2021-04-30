import SelectDepartment from '../employee/src/select-department.vue'

/* istanbul ignore next */
SelectDepartment.install = function (Vue) {
  Vue.component(SelectDepartment.name, SelectDepartment)
}

export default SelectDepartment
