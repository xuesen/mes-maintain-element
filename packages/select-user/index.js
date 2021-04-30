import SelectUser from '../employee/src/select-user.vue'

/* istanbul ignore next */
SelectUser.install = function (Vue) {
  Vue.component(SelectUser.name, SelectUser)
}

export default SelectUser
