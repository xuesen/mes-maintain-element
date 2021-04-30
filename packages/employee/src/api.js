import axios from 'axios'
import _ from 'lodash'
let base = './usermanagementservice'
let auth_service_type = ''
let auth_application = ''
export const init_application = (type, application) => {
  auth_service_type = type
  auth_application = application
  if (auth_service_type === 'RBPC') {
    base = './rbpcservice'
  } else if (auth_service_type === 'RBAC') {
    base = './rbacservice'
  }
}
const axiosInstDefault = axios.create({})
// http响应拦截器
const _this = this
axiosInstDefault.interceptors.response.use(data => {
  if (auth_service_type === 'RBAC') {
    if (data.data.result.toLowerCase() !== 'ok') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({message: data.data.errMsg})
    } else {
      return data.data
    }
  }
  return data
}, (error) => {
  let errmsg = error.message ? error.message : error
  if (error.response && error.response.data) {
    if (_.isObject(error.response.data)) errmsg = error.response.data.message
    if (!_.isObject(error.response.data)) errmsg = error.response.data
  }
  return Promise.reject(errmsg)
})
export const IfUserInRole = async params => {
  if (params.auth_service_type === 'RBPC') {
    let role = await axios.get('./rbpcservice/api/role/findRoleByName', {params: {application: params.application, aname: params.role_name}})
    if (!role.data) {
      return false
    }
    let accounts = await axios.get('./rbcservice/api/role/getAccountsByRole', {params: {roleId: role.data.id}})
    return {data: _.some(accounts.data, {login: params.login})}
  } else if (params.auth_service_type === 'RBAC') {
    let roles = await axiosInstDefault.post('./rbacservice/api/role/query', {name: 'application', value: params.application, Fuzzy: false})
    let role = _.find(roles.data, {name: params.role_name})
    if (!role) {
      return false
    }
    let roleemployees = await axiosInstDefault.post('./rbacservice/api/roleemployee/query', {name: 'sRole.id', value: role.id})
    if (!roleemployees.data) {
      return false
    }
    let account = _.find(roleemployees.data, {employeeCode: params.login})
    if (!account) {
      return false
    }
    return {data: account}
  } else {
  }
}
export const GetUsersByRoleName = async params => {
  if (params.auth_service_type === 'RBPC') {
    let role = await axios.get('./rbpcservice/api/role/findRoleByName', {params: {application: params.application, aname: params.role_name}})
    let users = await axios.get('./rbpcservice/api/role/getAccountsByRole', {params: {roleId: role.data.id}})
    return users
  } else if (params.auth_service_type === 'RBAC') {
    let roles = await axiosInstDefault.post('./rbacservice/api/role/query', {name: 'application', value: params.application, Fuzzy: false})
    let role = _.find(roles.data, {name: params.role_name})
    if (!role) {
      return {data: []}
    }
    let roleemployees = await axiosInstDefault.post('./rbacservice/api/roleemployee/query', {name: 'sRole.id', value: role.id})
    return roleemployees
  } else {
  }
}
export const GetRolesByUser = async params => {
  if (params.auth_service_type === 'RBPC') {
    let roles = await axios.get('./rbpcservice/api/account/getRoles', {params: {application: params.employee_code.indexOf('\\') !== -1 ? 'all' : params.application, logon: params.employee_code}})
    roles.data = _.filter(roles.data, {application: params.application})
    return roles
  } else if (params.auth_service_type === 'RBAC') {
    return {data: {}}
  } else {
  }
}
export const FindUser = async params => {
  if (params.auth_service_type === 'RBPC') {
    let employee = await axios.get('./rbpcservice/api/account/findAccountByLogin', {params: {application: params.employee_code.indexOf('\\') !== -1 ? 'all' : params.application, login: params.employee_code}})
    return employee
  } else if (params.auth_service_type === 'RBAC') {
    return axiosInstDefault.post(`${base}/api/employee/query`, {name: 'code', value: params.employee_code, Fuzzy: false})
  } else {
  }
}
// domain
export const fetchDomain = params => { return axios.get(`${base}/api/account/getDomains?search=`) }
export const fetchCompaniesByDomain = async params => {
  if (auth_service_type === 'RBPC') {
    return axios.get(`${base}/api/account/getCompanies`, {params: {domain: params, search: ''}})
  } else if (auth_service_type === 'RBAC') {
    return new Promise((resolve, reject) => {
      axiosInstDefault.post(`${base}/api/company/query`, {name: 'code', value: ''}).then((res) => {
        resolve({data: _.map(_.uniqBy(res.data, 'code'), 'name')})
      })
    })
  } else {
    return axios.post(`${base}/department/findcompanys`, {})
  }
}
export const fetchDepartment = params => {
  if (auth_service_type === 'RBPC') {
    return new Promise((resolve, reject) => {
      axios.get(`${base}/api/account/getDepartments`, {params: params}).then((res) => {
        let deps = _.map(res.data, (one_row) => {
          return {name: one_row}
        })
        resolve({data: deps})
      })
    })
  } else if (auth_service_type === 'RBAC') {
    return axiosInstDefault.post(`${base}/api/department/query`, {name: 'company', value: ''})
  } else {
    return axios.post(`${base}/department/findEnabled`, params)
  }
}
export const fetchDeptsByCompany = params => {
  if (auth_service_type === 'RBPC') {
    return axios.get(`${base}/api/account/getDepartments`, {params: params})
  } else if (auth_service_type === 'RBAC') {
    return axiosInstDefault.post(`${base}/api/department/query`, {name: 'company', value: params.company})
  } else {
    return axios.post(`${base}/department/findEnabled`, params)
  }
}
export const fetchUsersByDepartment = params => {
  if (auth_service_type === 'RBPC') {
    let query_param = _.clone(params)
    delete query_param.keyword
    if (query_param.domain === 'local') {
      return new Promise((resolve, reject) => {
        axios.get(`${base}/api/account/getAccountsByApplication`, {params: {application: auth_application}}).then((res) => {
          _.each(res.data, (one_row) => {
            one_row.code = one_row.login
          })
          resolve(res)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        if (query_param.company) {
          axios.get(`${base}/api/account/getAccounts`, {params: query_param}).then((res) => {
            _.each(res.data, (one_row) => {
              one_row.code = one_row.login
            })
            resolve(res)
          })
        } else {
          axios.get(`${base}/api/account/getAllAccounts`, {}).then((res) => {
            let filtered_user = _.filter(res.data, (item) => { 
              return (item.domain === query_param.domain && (!query_param.search || item.name.toLowerCase().indexOf(query_param.search.toLowerCase()) > -1))
            })
            _.each(res.data, (one_row) => {
              one_row.code = one_row.login
            })
            resolve({data: filtered_user})
          })
        }
      })
    }
  } else if (auth_service_type === 'RBAC') {
    return new Promise((resolve, reject) => {
      axiosInstDefault.post(`${base}/api/employee/query`, params.department ? {name: 'SDepartment.id', value: params.department} : {name: 'SDepartment.company', value: params.company}).then((res) => {
        let accs_filtered = _.filter(res.data, (acc) => { return acc.name.indexOf(params.search) !== -1 })
        resolve({data: accs_filtered})
      })
    })
  } else {
    let url = `${base}/employee/findEnabled`
    let searchCondition = {}
    if (params.keyword) {
      searchCondition.name = params.keyword
      url = `${base}/employee/findEnabledWhereLike`
    }
    if (params.department) {
      searchCondition.cascades = [{entity: 'department', condition: {id: params.department}}]
    }
    return axios.post(url, searchCondition)
  }
}
