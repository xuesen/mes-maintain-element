<template>
<div>
  多用户选择<ii-select-user @select="user_selected" domain="ITC" company="英業達(天津)"></ii-select-user>
  <div>{{JSON.stringify(users)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_select_user_code"></ii-code-view>
  单用户选择<ii-select-user-only @select="one_user_selected"></ii-select-user-only>
  <div>{{JSON.stringify(one_user)}}</div>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="ii_select_user_only_code"></ii-code-view>
</div>
</template>

<script>
import Codes from '../example-code/index.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      users: [],
      one_user: {},
      ii_select_user_code: Codes('./ii-select-user.code'),
      ii_select_user_only_code: Codes('./ii-select-user-only.code')
    }
  },
  methods: {
    user_selected (users) {
      this.users = users
    },
    one_user_selected (user) {
      this.one_user = user
    }
  },
  mounted () {
  }
}
</script>
