// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './i18n/index.js'
import axios from 'axios'
import IiElement from '../packages'
import VueSession from 'vue-session'
import _ from 'lodash'
Vue.use(VueI18n)
Vue.use(VueSession)
console.log(messages)
const i18n = new VueI18n({
  locale: process.env.VUE_APP_LANGUAGE,
  messages: messages
})

Vue.config.productionTip = false
let vue_instance
const axiosInstDefault = axios.create({})
// http响应拦截器
axiosInstDefault.interceptors.response.use(data => {
  if (data.data && data.data.result.toLowerCase() !== 'ok') {
    vue_instance.$ii_message('error', data.data.errMsg)
    return Promise.reject(data.data.errMsg)
  } else {
    return data.data
  }
}, (error) => {
  let errmsg = error.message ? error.message : error
  if (error.response && error.response.data) {
    if (_.isObject(error.response.data)) errmsg = error.response.data.message
    if (!_.isObject(error.response.data)) errmsg = error.response.data
  }
  vue_instance.$ii_message('error', errmsg)
  return Promise.reject(errmsg)
})

const maintain_service_stub = async (entity, path, type, params) => {
  const result = await axiosInstDefault[type]('./datacenterservice/' + entity + '/' + path,
    type.toUpperCase() === 'GET' ? { params: params } : params)
  return result
}
const data_import_service_stub = async (entity, path, type, params) => {
  const result = await axiosInstDefault[type]('./dataimportservice/' + entity + '/' + path,
    type.toUpperCase() === 'GET' ? { params: params } : params)
  return result
}
const data_service_stub = async (path, type, params) => {
  const result = await axiosInstDefault[type](path,
    type.toUpperCase() === 'GET' ? { params: params } : params)
  return result
}
Object.defineProperty(Vue.prototype, '$axios', {
  get () {
    return async (api_path, type, params) => {
      const result = await axiosInstDefault[type](api_path,
        type.toUpperCase() === 'GET' ? { params: params } : params)
      return result
    }
  }
})

Object.defineProperty(Vue.prototype, '$maintain_service_agent', {
  get () {
    return maintain_service_stub
  }
})
Object.defineProperty(Vue.prototype, '$data_import_service_agent', {
  get () {
    return data_import_service_stub
  }
})
Object.defineProperty(Vue.prototype, '$data_service_agent', {
  get () {
    return data_service_stub
  }
})
Vue.use(IiElement, {
  maintain_service_agent: maintain_service_stub,
  locale: process.env.VUE_APP_LANGUAGE,
  i18n_handler: (key, value) => {
    return i18n.t(key, value)
  }
})

Vue.mixin({
  watch: {
    '$i18n.locale' () {
      if (this.$options['data'] && (this.$options.data.table_column || this.$options.data.form_define)) {
        Object.assign(this.$data, this.$options['data'].call(this))
      }
    }
  }
})
vue_instance = new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
