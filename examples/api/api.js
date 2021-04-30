import axios from 'axios'
import _ from 'lodash'
let base = './usermanagementservice'
let application = ''
let auth_service_type = ''
export const init_application = (type, application_name) => {
  auth_service_type = type
  application = application_name
  if (auth_service_type === 'RBPC') {
    base = './rbpcservice'
  }
}
// auth
// role
export const fetchRoleList = params => {
  if (auth_service_type === 'RBPC') {
    return new Promise((resolve, reject) => {
      axios.get(`${base}/api/role/getAllRoles`, {params: {application: application}}).then((res) => {
        _.each(res.data, (one_row) => {
          one_row.description = one_row.descr
          one_row.editor_id = one_row.editorId
        })
        resolve(res)
      })
    })
  } else {
    return axios.post(`${base}/role/findEnabled`, {application: application})
  }
}
export const deleteRole = async (id, usercode) => {
  if (auth_service_type === 'RBPC') {
    await axios.get(`${base}/api/role/revokeAllPermissions?roleId=` + id + '&editorId=' + usercode)
    let accounts = await axios.get(`${base}/api/role/getAccountsByRole?roleId=` + id)
    let remove_role_req = []
    _.each(accounts.data, (account) => {
      remove_role_req.push(axios.get(`${base}/api/account/removeRole?acctId=` + account.id + '&roleId=' + id + '&editorId=' + usercode))
    })
    await axios.all(remove_role_req)
    return await axios.get(`${base}/api/role/deleteRole?roleId=` + id + '&editorId=' + usercode)
  } else {
    return await axios.delete(`${base}/role/deleteById/` + id + '/' + usercode)
  }
}
// export const getRole = params => { return axios.get(`${base}/api/roles/` + params) }
export const addRole = params => {
  if (auth_service_type === 'RBPC') {
    let role_info = { application: application, type: 1, name: params.name, descr: params.description, editorId: params.editor_id }
    return axios.post(`${base}/api/role/createRole?editorId=` + params.editor_id, role_info)
  } else {
    return axios.post(`${base}/role/create`, _.assignIn(params, {application: application}))
  }
}
export const saveRole = params => {
  if (auth_service_type === 'RBPC') {
    let role_info = { application: application, type: 1, name: params.name, descr: params.description, editorId: params.editor_id }
    return axios.post(`${base}/api/role/setRole?roleId=` + params.id + '&editorId=' + params.editor_id, role_info)
  } else {
    return axios.put(`${base}/role/updateById` + params.id, params)
  }
}

// user-role
export const fetchUserByRole = params => {
  return axios.post(`${base}/employee/findEnabled`, {cascades: [{entity: 'role_emp', cascades: [{entity: 'role', condition: {id: params}}]}]})
}
export const fetchDepartmentByRole = params => {
  return axios.post(`${base}/department/findEnabled`, {cascades: [{entity: 'role_dep', cascades: [{entity: 'role', condition: {id: params}}]}]})
}
export const fetchMemberInRole = params => {
  if (auth_service_type === 'RBPC') {
    return new Promise((resolve, reject) => {
      axios.get(`${base}/api/role/getAccountsByRole?roleId=` + params).then((res) => {
        _.each(res.data, (one_row) => {
          one_row.code = one_row.login
        })
        resolve(res)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios.all([fetchUserByRole(params), fetchDepartmentByRole(params)]).then((res) => {
        let result = {data: _.concat(res[0].data, res[1].data)}
        resolve(result)
      })
    })
  }
}
export const deleteUserInRole = async (roleid, usercode, editor_id) => {
  if (auth_service_type === 'RBPC') {
    let accounts = await axios.get(`${base}/api/role/getAccountsByRole?roleId=` + roleid)
    let accd_ids = _.remove(_.map(accounts.data, 'id'), (acc_id) => { return acc_id !== usercode })
    return await axios.post(`${base}/api/role/setAccounts?roleId=` + roleid + '&editorId=' + editor_id, accd_ids)
  } else {
    return await axios.delete(`${base}/roleEmployee/deleteById/` + roleid + '/' + usercode)
  }
}
export const deleteDepartmentInRole = (roleid, usercode) => {
  if (auth_service_type === 'RBPC') {
    return axios.delete(`${base}/api/roles/` + roleid + '/users/' + usercode)
  } else {
    return axios.delete(`${base}/roleDepartment/deleteById/` + roleid + '/' + usercode)
  }
}
export const saveDepartmentsToRole = async params => {
  if (auth_service_type === 'RBPC') {
    let exists_dep_ids = []
    let not_exists_dep = []
    for (let dep_index = 0; dep_index < params.departments.length; dep_index++) {
      let exists_acount = await axios.get(`${base}/api/account/findAccountByLogin`, {params: {login: params.departments[dep_index].login, application: 'All'}})
      if (!exists_acount.data) {
        not_exists_dep.push(params.departments[dep_index])
      } else {
        exists_dep_ids.push(exists_acount.data.id)
      }
    }
    let new_dep_arrays = []
    _.each(not_exists_dep, (dep) => {
      new_dep_arrays.push({
        application: 'All',
        type: 'domain',
        name: dep.name,
        login: dep.login,
        editorId: params.editorId,
        accountType: 'accountdepartment'
      })
    })
    let new_dep_ids = { data: [] }
    if (not_exists_dep.length > 0) {
      new_dep_ids = await axios.post(`${base}/api/account/createAccounts?careAccIsExist=true&editorId=` + params.editorId, new_dep_arrays)
    }
    let accounts = await axios.get(`${base}/api/role/getAccountsByRole?roleId=` + params.roleId)
    let accdId = _.union(_.map(accounts.data, 'id'), exists_dep_ids, new_dep_ids.data)
    return await axios.post(`${base}/api/role/setAccounts?roleId=` + params.roleId + '&editorId=' + params.editorId, accdId)
  } else {
    return await axios.post(`${base}/role/saveDepartments`, params)
  }
}
export const saveUsersToRole = async params => {
  if (auth_service_type === 'RBPC') {
    let accounts = await axios.get(`${base}/api/role/getAccountsByRole?roleId=` + params.roleId)
    let accdId = _.union(_.map(accounts.data, 'id'), params.userIds)
    return await axios.post(`${base}/api/role/setAccounts?roleId=` + params.roleId + '&editorId=' + params.editorId, accdId)
  } else {
    return await axios.post(`${base}/role/saveUsers`, params)
  }
}

function make_permission_tree (parent, data) {
  parent.icon = parent.target.displayName
  parent.is_leaf = parent.privilege.constraint === 'Child'
  if (parent.is_leaf) {
    let func_child_level = _.filter(data, (node) => {
      return _.startsWith(node.type, parent.type + '|') && node.target.type === (parent.target.type - (-1)).toString()
    })
    if (func_child_level.length > 0) {
      parent.resource_permissions = []
      _.each(func_child_level, (func_child_level_item) => {
        parent.resource_permissions.push({id: func_child_level_item.id, permission: {id: func_child_level_item.id, name: func_child_level_item.name}})
      })
    }
  } else {
    let child_level = _.filter(data, (node) => {
      return _.startsWith(node.type, parent.type + '|') && node.target.type === (parent.target.type - (-1)).toString()
    })
    parent.children = child_level
    _.each(child_level, (child_level_item) => {
      make_permission_tree(child_level_item, data)
    })
  }
}
// permission
export const fetchPermissionList = params => {
  if (auth_service_type === 'RBPC') {
    return new Promise((resolve, reject) => {
      axios.get(`${base}/api/permission/findPermissionsByApplication`, {params: {application: application}}).then((res) => {
        let top_level = _.filter(res.data, {target: {type: '0'}})
        _.each(top_level, (parent) => {
          make_permission_tree(parent, res.data)
        })
        resolve({data: top_level})
      })
    })
  } else {
    return axios.post(`${base}/permission/getPermissionTree`, {application: application})
  }
}
export const fetchPermissionListByRole = params => {
  if (auth_service_type === 'RBPC') {
    return new Promise((resolve, reject) => {
      axios.get(`${base}/api/permission/getPermissions`, {params: {roleId: params}}).then((res) => {
        let tree_leaf = _.filter(res.data, { privilege: {constraint: 'Child'} })
        _.each(tree_leaf, (tree_leaf_item) => {
          let func_items = _.filter(res.data, (tree_item) => {
            return _.startsWith(tree_item.type, tree_leaf_item.type + '|')
          })
          tree_leaf_item.resource_permissions = []
          _.each(func_items, (func_item) => {
            tree_leaf_item.resource_permissions.push({id: func_item.id, permission: {id: func_item.id, name: func_item.name}})
            res.data.splice(_.findIndex(res.data, {id: func_item.id}), 1)
          })
        })
        resolve(res)
      })
    })
  } else {
    return axios.post(`${base}/role/getPermissionSByEmployee`, {roleid: params, application: application})
  }
}
export const savePermission = async params => {
  if (auth_service_type === 'RBPC') {
    let perm_ids = params.nodesChecked
    for (let key in params.resourcepermissions) {
      perm_ids = _.union(perm_ids, params.resourcepermissions[key])
    }
    await axios.get(`${base}/api/role/revokeAllPermissions?roleId=` + params.roleId + '&editorId=' + params.editorId)
    return await axios.post(`${base}/api/role/grantPermissions?roleId=` + params.roleId + '&editorId=' + params.editorId, perm_ids)
  } else {
    return axios.post(`${base}/role/saveRoleResourcePermission`, params)
  }
}
// export const fetchPermission = params => { return axios.all([fetchPermissionList(), fetchPermissionListByRole(params)]) }

// domain
export const fetchDomain = params => { return axios.get(`${base}/api/account/getDomains?search=`) }
export const fetchCompaniesByDomain = async params => {
  if (auth_service_type === 'RBPC') {
    return axios.get(`${base}/api/account/getCompanies`, {params: {domain: params, search: ''}})
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
  } else {
    return axios.post(`${base}/department/findEnabled`, params)
  }
}
export const fetchDeptsByCompany = params => {
  if (auth_service_type === 'RBPC') {
    return axios.get(`${base}/api/account/getDepartments`, {params: params})
  } else {
    return axios.post(`${base}/department/findEnabled`, params)
  }
}
export const fetchUsersByDepartment = params => {
  if (auth_service_type === 'RBPC') {
    let query_param = _.clone(params)
    delete query_param.keyword
    return new Promise((resolve, reject) => {
      axios.get(`${base}/api/account/getAccounts`, {params: query_param}).then((res) => {
        _.each(res.data, (one_row) => {
          one_row.code = one_row.login
        })
        resolve(res)
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
