<template>
    <div>
       <ii-tooltip class="item" effect="dark" :content='$t("button.add_user")' placement="top-start">
          <ii-button-group>
            <ii-button @click="openSelectUserDialog()" :disabled="disabled"><ii-svg-icon :name="'btnicon/user'" width="24" height="24"/></ii-button>
          </ii-button-group>
       </ii-tooltip>
       <ii-draggable-dialog :append-to-body="true" :title='$t("role.addUser")' class="selectUser viewinfor"  size="size2" :visible="visible"
            top="0" :close-on-click-modal="false"
            :show-close='true' @open= 'handleOpen' @close= 'handleClose'>
          <div  class="filters">
          <ii-form ref="select-user" :model="form" :rules="rules" label-width="100px">
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
                    <ii-input v-model="form.search" :clearable="true" ></ii-input>
                    </ii-form-item>
                  </ii-col>
                  <ii-col :span="6"  :offset = "0" style="text-align: right;padding-right: 20px;">
                    <ii-button type="primary" @click="fetchUserData">{{$t("button.search")}}</ii-button>
                </ii-col>
              </ii-row>
          </ii-form>
          </div>
          <div class="border-stype"></div>
          <ii-row  style="margin-top: 40px; height: 200px;">
            <ii-col :span="11">
                <ii-table :data="users" ref="table" height="200" stripe border style="width: 100%"
                    v-loading.body="loading"
                    :highlight-current-row= "true"
                    @selection-change="handleSelectionChange">
                    <ii-table-column width= "40" type="selection" class-name="select_box">
                    </ii-table-column>
                    <ii-table-column prop="name" :label='$t("role.name")' min-width= "100" :show-overflow-tooltip="true">
                    </ii-table-column>
                    <ii-table-column prop="code" :label='$t("role.login")' min-width= "100" :show-overflow-tooltip="true">
                    </ii-table-column>
                </ii-table>
            </ii-col>
            <ii-col :span="2">
                <div style='width:30px;text-align: center; margin: auto; height:200px; display: flex; align-items: center;'>
                  <ii-button-group>
                    <ii-tooltip class="item buttonspace" effect="dark" :content='$t("button.right")' placement="top-start">
                      <ii-button @click='selectUser' style="margin: 5px 0px;"><ii-svg-icon :name="'btnicon/right_shift'" width="24" height="24"/></ii-button>
                    </ii-tooltip>
                    <ii-tooltip class="item" effect="dark" :content='$t("button.left")' placement="top-start">
                      <ii-button @click='unSelectUser' style="margin: 5px 0px;"><ii-svg-icon :name="'btnicon/left_shift'" width="24" height="24"/></ii-button>
                    </ii-tooltip>
                  </ii-button-group>
                </div>
            </ii-col>
            <ii-col :span="11">
                <ii-table :data="selectedUsers" ref="selectedTable" height="200" stripe border style="width: 100%"
                    :highlight-current-row= "true"
                    @selection-change="handleUnSelectionChange">
                    <ii-table-column width= "40" type="selection" class-name="select_box">
                    </ii-table-column>
                    <ii-table-column prop="name" :label='$t("role.name")' min-width= "100" :show-overflow-tooltip="true">
                    </ii-table-column>
                    <ii-table-column prop="code" :label='$t("role.login")' min-width= "100" :show-overflow-tooltip="true">
                    </ii-table-column>
                </ii-table>
            </ii-col>
          </ii-row>
          <div slot="footer" class="dialog-footer">
            <ii-button type="text" @click="handleCancel">{{$t('button.cancel')}}</ii-button>
            <ii-button type="primary" @click="handleSave">{{$t('button.ok')}}</ii-button>
          </div>
      </ii-draggable-dialog>
  </div>
</template>
<style lang="scss">
  .select_box {
    .cell {
      padding-left: 10px !important;
    }
  }
  .filters {
    border-bottom: 0px !important;
  }
  .border-stype {
    border-bottom: 1px dashed rgba(117,117,117,1) !important;
    opacity: 0.54;
    margin: 0px -20px;
  }
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
      "search": "查询",
      "left": "左移",
      "right": "右移"
    },
    "role": {
      "name": "名称",
      "code": "登录名",
      "domain": "域",
      "company": "公司",
      "department": "部门",
      "search": "关键字",
      "searchbutton": "查询",
      "login": "登陆名",
      "addUser": "添加用户"
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
import _ from 'lodash'
import {
  init_application,
  fetchDomain,
  fetchCompaniesByDomain,
  fetchDeptsByCompany,
  fetchUsersByDepartment
} from './api'

export default {
  name: 'IiSelectUser',
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
    editDialog: Boolean
  },
  data () {
    return {
      visible: false,
      domainOptions: [],
      companyOptions: [],
      departmentOptions: [],
      multipleSelection: [],
      multipleSelectedSelection: [],
      department: [],
      users: [],
      selectedUsers: [],
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSave () {
      if (this.selectedUsers.length === 0) {
        return
      }
      this.visible = false
      this.$emit('select', this.selectedUsers)
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
      this.clear()
      // this.resetForm()
      this.visible = false
      this.loading = false
    },
    handleUnSelectionChange (val) {
      this.multipleSelectedSelection = val
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
    async fetchUserData () {
      let _this = this
      try {
        let valid = await this.$refs['select-user'].validate()
        if (!valid) {
          return
        }
      } catch (e) {
        return
      }
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
      }).catch((error) => {
        this.loading = false
        this.$ii_message('error', error.message)
      })
    },
    resetForm () {
      // this.$refs['form'].resetFields()
    },
    selectUser () {
      this.selectedUsers = _.union(this.selectedUsers, _.clone(this.multipleSelection))
      this.$refs.table.clearSelection()
      this.$refs.selectedTable.clearSelection()
    },
    unSelectUser () {
      this.$refs.table.clearSelection()
      this.selectedUsers = _.difference(this.selectedUsers, this.multipleSelectedSelection)
      this.$refs.selectedTable.clearSelection()
      // this.multipleSelectedSelection = []
    },
    clear () {
      if (this.$session.get('auth_service_type') === 'RBPC') {
        this.companyOptions = []
      }
      this.departmentOptions = []
      this.multipleSelection = []
      this.multipleSelectedSelection = []
      this.department = []
      this.users = []
      this.selectedUsers = []
      this.loading = false
      this.form = {
        domain: '',
        company: '',
        department: '',
        search: ''
      }
      this.$refs.table.clearSelection()
      this.$refs.selectedTable.clearSelection()
    },
    open () {
      this.visible = true
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
