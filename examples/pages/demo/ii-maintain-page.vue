<template>
<div>
  <ii-form>
    <ii-form-item label="Auth服务接口:" label-width="160px">
      用户是否在组中结果：{{result1}}
      <br>
      查询指定组中用户列表：{{JSON.stringify(result2)}}
    </ii-form-item>
  </ii-form>
  <ii-divider content-position="left">代码</ii-divider>
  <ii-code-view :code="auth_service"></ii-code-view>
</div>
</template>

<script>
import Codes from '../example-code/index.js'
import { AuthService } from '../../../packages/index.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      result1: '',
      result2: [],
      auth_service: Codes('./auth-service.code')
    }
  },
  methods: {
  },
  async mounted () {
    let r1 = await AuthService.IfUserInRole({
      auth_service_type: this.$session.get('auth_service_type'),
      application: this.$session.get('application'),
      role_name: 'TE_Role',
      login: 'ITC\\ITC010010'
    })
    this.result1 = r1.data
    let r2 = await AuthService.GetUsersByRoleName({
      auth_service_type: this.$session.get('auth_service_type'),
      application: this.$session.get('application'),
      role_name: 'TE_Role'
    })
    this.result2 = r2.data
  }
}
</script>
