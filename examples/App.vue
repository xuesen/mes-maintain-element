<template>
  <div class="app" id="app">
    <router-view v-if="islogined === true"/>
    <span v-else-if="islogined === false">no authority</span>
  </div>
</template>

<script>
// import axios from 'axios'
// let Base64 = require('js-base64').Base64
import VueSession from 'vue-session'
import { init_application } from './api/api.js'
import IiElement from '../packages'
export default {
  name: 'App',
  data () {
    return {
      islogined: true
    }
  },
  watch: {
    $route () {
      this.$ii_messenger.send('MASTER', 'request_session', {})
    },
    '$18n.locale' () {
      IiElement.locale(IiElement.cn_ocale)
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      this.$ii_messenger.send('MASTER', 'request_session', {})
      this.$ii_messenger.extends('session', (msg) => {
        if (msg && msg.loginstate) {
          VueSession.setAll(msg)
          this.islogined = true
          // axios.defaults.headers['Authorization'] = Base64.encode(this.$session.get('loginstate').user.name)
          if (msg.locale) {
            this.$i18n.locale = msg.locale
          }
        } else {
          this.islogined = true
        }
      })
      this.$ii_messenger.extends('locale_refresh', (locale) => {
        this.$i18n.locale = locale
      })
      VueSession.setAll({loginstate: { user: { id: 100, code: 'ADMIN', name: '管理员', email: 'qin.xiao-ying@inventec.com', type: 'local', domain: null }, userInMES: {  id: 1, code: 'ADMIN', name: '管理员', email: 'qin.xiao-ying@inventec.com', type: 'local', domain: null  } } })
      let search = window.location.search
      let param_value = search.substr(1, search.length - 2).replace('application=', '').split(',')
      this.$session.set('auth_service_type', param_value[0])
      this.$session.set('application', param_value[1])
      this.islogined = true
    } else {
      this.$ii_messenger.send('MASTER', 'request_session', {})
      this.$ii_messenger.extends('session', (msg) => {
        if (msg && msg.loginstate) {
          VueSession.setAll(msg)
          this.islogined = true
          // axios.defaults.headers['Authorization'] = Base64.encode(this.$session.get('loginstate').user.name)
          if (msg.locale) {
            this.$i18n.locale = msg.locale
          }
        } else {
          this.islogined = false
        }
      })
      this.$ii_messenger.extends('locale_refresh', (locale) => {
        this.$i18n.locale = locale
      })
      VueSession.setAll({loginstate: { user: { id: 100, code: 'ADMIN', name: '管理员', email: 'qin.xiao-ying@inventec.com', type: 'local', domain: null }, userInMES: {  id: 1, code: 'ADMIN', name: '管理员', email: 'qin.xiao-ying@inventec.com', type: 'local', domain: null  } } })
      let search = window.location.search
      let param_value = search.substr(1, search.length - 2).replace('application=', '').split(',')
      this.$session.set('auth_service_type', param_value[0])
      this.$session.set('application', param_value[1])
      this.islogined = true
    }
    init_application(this.$session.get('auth_service_type'), this.$session.get('application'))
    this.$ii_messenger.extends('locale_refresh', (locale) => {
      this.$i18n.locale = locale
    })
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app {
  font-family: Source Han Sans CN,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,"sans-serif";
  box-sizing: border-box;
  height: 100%;
}
</style>
