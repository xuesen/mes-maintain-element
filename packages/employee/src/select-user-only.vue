<template>
    <div>
       <ii-tooltip class="item" effect="dark" :content='$t("button.add_user")' placement="top-start">
          <ii-button type="primary__icon" :disabled="disabled" @click="openSelectUserDialog()"><ii-svg-icon :name="'btnicon/user'" width="24" height="24"/></ii-button>
       </ii-tooltip>
       <ii-draggable-dialog ref="select_user" title='Add User' :visible="visible"
            top="0" :append-to-body="true" :close-on-click-modal="false"
            :show-close='false' @open= 'handleOpen' @close= 'handleClose' size="size1">
          <div class="filters">
          <ii-form ref="department" :model="form" :rules="rules" label-width="100px">
              <ii-row v-if="auth_service_type === 'RBPC'">
                  <ii-col :span="18">
                    <ii-form-item :label='$t("role.domain")' prop="domain">
                        <ii-select-org v-model="form.domain" :filterable="true" style="width:100%">
                            <ii-option-org
                            v-for="item in domainOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                            </ii-option-org>
                        </ii-select-org>
                    </ii-form-item>
                  </ii-col>
              </ii-row>
              <ii-row>
                  <ii-col :span="18">
                    <ii-form-item :label='$t("role.company")'>
                        <ii-select-org v-model="form.company" :filterable="true" :clearable="true" style="width:100%">
                            <ii-option-org
                            v-for="item in companyOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                            </ii-option-org>
                        </ii-select-org>
                    </ii-form-item>
                  </ii-col>
              </ii-row>
              <ii-row>
                  <ii-col :span="18">
                    <ii-form-item :label='$t("role.department")'>
                      <ii-select-org v-if="auth_service_type === 'RBPC'" :filterable="true" :clearable="true" v-model="form.department" style="width:100%">
                          <ii-option-org
                          v-for="item in departmentOptions"
                          :key="item"
                          :label="item"
                          :value="item">
                          </ii-option-org>
                      </ii-select-org>
                      <ii-select-org v-else v-model="form.department" :filterable="true" :clearable="true" style="width:100%">
                          <ii-option-org
                          v-for="item in departmentOptions"
                          :key="item.id"
                          :label="'(' + item.code + ')' + item.name"
                          :value="item.id">
                          </ii-option-org>
                      </ii-select-org>
                    </ii-form-item>
                  </ii-col>
              </ii-row>
              <ii-row>
                  <ii-col :span="18">
                    <ii-form-item :label='$t("role.search")'>
                    <ii-input v-model="form.search" :clearable="true"></ii-input>
                    </ii-form-item>
                  </ii-col>
                  <ii-col :xs="24" :sm="6" :md="6" :lg="6" :offset = "0" style="text-align: right">
                    <ii-button type="primary" @click="fetchUserData">{{$t("button.search")}}</ii-button>
                </ii-col>
              </ii-row>
          </ii-form>
            </div>
          <ii-row style="margin-top: 40px; height: 200px;">
            <ii-col :span="24">
                <ii-table :data="users" ref="table" height="200" stripe border style="width: 100%"
                    v-loading.body="loading"
                    :highlight-current-row= "true"
                    @selection-change="handleMultiSelectionChange"
                    @row-click="handleSelectionChange">
                    <ii-table-column v-if="multiSelect" width= "40" type="selection" class-name="select_box">
                    </ii-table-column>
                    <ii-table-column prop="name" :label='$t("role.name")' min-width= "140">
                    </ii-table-column>
                    <ii-table-column prop="code" :label='$t("role.login")' min-width= "100">
                    </ii-table-column>
                </ii-table>
            </ii-col>
          </ii-row>
          <div slot="footer" class="dialog-footer">
            <ii-button type="text" @click="handleCancel">{{$t('button.cancel')}}</ii-button>
            <ii-button type="primary" @click="handleSelect">{{$t('button.ok')}}</ii-button>
          </div>
      </ii-draggable-dialog>
  </div>
</template>
<style lang="css">
</style>
<i18n>
{
  "en": {
    "button": {
      "add_user": "Select User",
      "cancel": "Cancel",
      "ok": "Confirm",
      "search": "Search",
      "left": "Shift Left",
      "right": "Shift Right"
    },
    "role": {
      "name": "Name",
      "code": "Code",
      "domain": "Domain",
      "company": "Company",
      "department": "Department",
      "search": "Key Words",
      "searchbutton": "Search",
      "login": "Login",
      "addUser": "Add Account"
    },
    "msg": {
      "selectUser": "Please select user",
      "select_domain": "Please select domain",
      "select_company": "Please select company",
      "search_too_many_user": "If there are too many query results, the page operation will slow down. Do you want to continue?"
    }
  },
  "cn": {
    "button": {
      "add_user": "选择用户",
      "cancel": "取消",
      "ok": "确定",
      "search": "查询"
    },
    "role": {
      "name": "名称",
      "code": "登录名",
      "domain": "域",
      "company": "公司",
      "department": "部门",
      "search": "关键字",
      "searchbutton": "查询",
      "login": "登陆名"
    },
    "msg": {
      "selectUser": "请先选择用户",
      "select_domain": "请选择域",
      "select_company": "请选择公司",
      "search_too_many_user": "查询结果过多，页面操作会变慢，是否继续？"
    }
  }
}
</i18n>
<script>
import {
  init_application,
  fetchDomain,
  fetchCompaniesByDomain,
  fetchDeptsByCompany,
  fetchUsersByDepartment
} from './api'
export default {
  name: 'IiSelectUserOnly',
  props: {
    domain: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      domainOptions: [],
      companyOptions: [],
      departmentOptions: [],
      department: [],
      users: [],
      selectedUser: '',
      multipleSelectedSelection: [],
      loading: false,
      form_company: '',
      form: {
        domain: '',
        company: '',
        department: '',
        search: ''
      },
      rules: {
        domain: [
          { required: true, message: this.$t('msg.select_domain'), trigger: 'change' }
        ],
        company: [
          { required: true, message: this.$t('msg.select_company'), trigger: 'change' }
        ]
      },
      auth_service_type: this.$session.get('auth_service_type')
    }
  },
  computed: {
  },
  methods: {
    openSelectUserDialog () {
      this.visible = true
    },
    handleSelectionChange (currentRow, oldRow) {
      this.selectedUser = currentRow
    },
    handleMultiSelectionChange (val) {
      this.multipleSelectedSelection = val
    },
    handleSelect () {
      let _this = this
      if ((this.multiSelect && this.multipleSelectedSelection.length === 0) || (!this.multiSelect && !this.selectedUser)) {
        _this.$ii_message('error', _this.$t('msg.selectUser')).then(function (data) {
          // 确认操作
          console.log('error')
        }).catch(error => {
          // 取消和异常操作
          console.log(error)
        })
        return
      }
      this.visible = false
      this.$emit('select', this.multiSelect ? this.multipleSelectedSelection : this.selectedUser)
    },
    handleCancel () {
      this.visible = false
      this.$emit('cancel')
    },
    handleOpen () {
      this.form.domain = this.domain
      this.form_company = this.company
      // this.clear()
      // this.fetchData()
    },
    handleClose () {
      // this.resetForm()
      this.clear()
      this.visible = false
      this.loading = false
    },
    fetchDomainData () {
      fetchDomain().then((res) => {
        this.domainOptions = res.data
      })
    },
    fetchCompanyData (val) {
      fetchCompaniesByDomain(val).then((res) => {
        this.companyOptions = res.data
      })
    },
    fetchDepartmentData () {
      fetchDeptsByCompany({domain: this.form.domain, company: this.form.company, search: ''}).then((res) => {
        this.departmentOptions = res.data
      })
    },
    fetchUserData () {
      let _this = this
      // if (this.$session.get('auth_service_type') !== 'RBAC' && !this.form.company) {
      //   return
      // }
      this.loading = true
      fetchUsersByDepartment({domain: this.form.domain, company: this.form.company, department: this.form.department, search: this.form.search, keyword: this.form.search}).then(async (res) => {
        this.$refs.table.clearSelection()
        if (res.data.length> 500) {
          try {
            await this.$ii_message('confirm', this.$t('msg.search_too_many_user'))
            this.users = res.data
          } catch (e) {
            console.log(e)
          } finally {
            this.loading = false
          }
        } else {
          this.users = res.data
          this.loading = false
        }
      }).catch(function (error) {
        this.loading = false
        _this.$ii_message('error', error.message).then(function (data) {
          // 确认操作
          console.log('error')
        }).catch(error => {
          // 取消和异常操作
          console.log(error)
        })
        /* _this.$notify.error({
          title: 'error',
          message: error.message,
          offset: 40,
          duration: 0
        }) */
      })
    },
    resetForm () {
      // this.$refs['form'].resetFields()
    },
    clear () {
      if (this.$session.get('auth_service_type') === 'RBPC') {
        this.companyOptions = []
      }
      this.departmentOptions = []
      this.selectedUser = ''
      this.department = []
      this.users = []
      this.loading = false
      this.form = {
        domain: '',
        company: '',
        department: '',
        search: ''
      }
    }
  },
  mounted () {
    init_application(this.$session.get('auth_service_type'), this.$session.get('application'))
    if (this.$session.get('auth_service_type') === 'RBPC') {
      this.fetchDomainData()
    } else {
      this.fetchCompanyData()
    }
  },
  watch: {
    'form.domain' (val) {
      this.form.company = this.form_company
      this.form_company = ''
      // this.departments = []
      this.fetchCompanyData(val)
    },
    'form.company' (val) {
      this.form.department = ''
      this.fetchDepartmentData()
    },
    'form.department' (val) {
      this.$refs.table.clearSelection()
      this.users = []
      this.fetchUserData()
    }
  }
}
</script>
