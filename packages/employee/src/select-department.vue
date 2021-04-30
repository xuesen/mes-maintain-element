<template>
    <div class="ii-select-department">
       <ii-tooltip class="item" effect="dark" :content='$t("select-department")' placement="top-start">
          <ii-button-group>
            <ii-button @click="open()" :disabled="disabled"><ii-svg-icon :name="'menuicon/department'" width="24" height="24"/></ii-button>
          </ii-button-group>
       </ii-tooltip>
       <ii-draggable-dialog top="0" class="viewinfor dialogwidth2" :title='$t("role.addDepartment")' :visible="visible" size="small"
            :modal="true" :append-to-body="true" :close-on-click-modal="false"
            :show-close='true' @open= 'handleOpen' @close= 'handleClose'>
        <div  class="filters">
          <ii-form ref="department" :model="form" label-width="100px">
              <ii-row v-if="auth_service_type === 'RBPC'">
                  <ii-col :span="24">
                    <ii-form-item :label='$t("role.domain")'>
                        <ii-select-org v-model="form.domain" style="width:80%">
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
                  <ii-col :span="24">
                    <ii-form-item :label='$t("role.company")'>
                        <ii-select-org v-model="form.company" style="width:80%">
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
                  <ii-col :span="20">
                    <ii-form-item :label='$t("role.search")'>
                    <ii-input v-model="form.search" ></ii-input>
                    </ii-form-item>
                  </ii-col>
                  <ii-col :span="4" :offset = "0" style="text-align: right;padding-right: 20px;">
                    <ii-button type="primary" @click="fetchDepartmentData">{{$t("button.search")}}</ii-button>
                </ii-col>
              </ii-row>
          </ii-form>
        </div>
        <div class="borderStype"></div>
          <ii-table :data="departments" ref="table" height="200" stripe border style="width: 100%"
            v-loading.body="loading"
            :highlight-current-row= "true"
            @selection-change="handleSelectionChange">
            <ii-table-column width= "60" type="selection">
            </ii-table-column>
            <ii-table-column prop="name" :label='$t("role.name")' min-width= "200">
            </ii-table-column>
        </ii-table>
          <div slot="footer" class="dialog-footer">
            <ii-button type="text" @click="handleCancel">{{$t('button.cancel')}}</ii-button>
            <ii-button type="primary" @click="handleSave">{{$t('button.save')}}</ii-button>
          </div>
      </ii-draggable-dialog>
  </div>
</template>
<style lang="scss" scoped>
</style>
<i18n>
{
  "en": {
    "button": {
    },
    "msg": {
    },
    "select-department": "Select Department"
  },
  "cn": {
    "button": {
    },
    "msg": {
    },
    "select-department": "选择部门"
  }
}
</i18n>
<script>
import locales from '../../i18n'
import {
  init_application,
  fetchDomain,
  fetchCompaniesByDomain,
  fetchDeptsByCompany
} from './api.js'

export default {
  name: 'IiSelectDepartment',
  locales: locales,
  props: {
    roleId: [String, Number],
    disabled: Boolean
  },
  data () {
    return {
      visible: false,
      domainOptions: [],
      companyOptions: [],
      multipleSelection: [],
      departments: [],
      loading: false,
      form: {
        domain: '',
        company: '',
        search: ''
      },
      auth_service_type: this.$session.get('auth_service_type')
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSave () {
      if (this.multipleSelection.length === 0) {
        return
      }
      this.visible = false
      this.$emit('select', this.multipleSelection)
    },
    handleCancel () {
      this.visible = false
      this.$emit('cancel')
    },
    handleOpen () {
      this.clear()
      // this.fetchData()
    },
    handleClose () {
      // this.resetForm()
      this.visible = false
    },
    saveData () {
      let _this = this
      let departmentIds = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        departmentIds.push(this.multipleSelection[i].id)
      }
      let params = {
        editorId: this.$session.get('loginstate').user.id,
        departmentIds: departmentIds,
        roleId: this.roleId
      }
    },
    fetchDomainData () {
      fetchDomain().then((res) => {
        this.domainOptions = res.data
      })
    },
    fetchCompanyData (val) {
      // if (!val) {
      //   return
      // }
      fetchCompaniesByDomain(val).then((res) => {
        this.companyOptions = res.data
      })
    },
    fetchDepartmentData () {
      this.loading = true
      fetchDeptsByCompany({domain: this.form.domain, company: this.form.company, search: this.form.search}).then((res) => {
        this.$refs.table.clearSelection()
        this.departments = this.auth_service_type === 'RBPC' ? _.map(res.data, (dep_item) => { return {name: dep_item} }) : res.data
        this.loading = false
      })
    },
    resetForm () {
      // this.$refs['form'].resetFields()
    },
    clear () {
      if (this.$session.get('auth_service_type') === 'RBPC') {
        this.companyOptions = []
      }
      this.multipleSelection = []
      this.departments = []
      this.form = {
        domain: '',
        company: '',
        search: ''
      }
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
      this.form.company = ''
      this.$refs.table.clearSelection()
      this.departments = []
      this.fetchCompanyData(val)
    },
    'form.company' (val) {
      this.fetchDepartmentData()
    }
  }
}
</script>
