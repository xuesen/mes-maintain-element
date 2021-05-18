
import iielement from 'xts-mes-common'
import { merge } from 'lodash'
let Messages = {}
merge(Messages, iielement.MessagesBase, {
  en: {
    basic: {
    },
    table: {
      xuhao: 'NO.',
      editor_name: 'Editor',
      update_time: 'Update Time',
      btn_group_in_row: 'Edit/Del'
    },
    dialog: {
      add_title: 'Add',
      edit_title: 'Edit'
    },
    placeholder: {
      select: 'Please select',
      input: 'Please input key words'
    },
    button: {
      add: 'Add',
      import: 'Import Data',
      export: 'Export Data',
      getout: 'Export',
      search: 'Search',
      query: 'Search',
      ok: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      pause: 'Pause',
      confirm: 'Confirm',
      close: 'Close',
      start: 'Start',
      submit: 'Submit',
      select: 'Select',
      edit: 'Edit',
      delete: 'Delete',
      remove: 'Remove',
      copyfrom: 'Copy...From',
      publish: 'Publish',
      serial_number: 'Serial NO.',
      complete: 'Complete',
      up: 'Up',
      down: 'Down',
      copy: 'Copy',
      print: 'Print',
      accounts: 'Accounts',
      left: 'Shift Left',
      right: 'Shift Right',
      upload: 'Upload',
      filter: 'Filter',
      addUser: 'Add User',
      addDepartment: 'Add Department'
    },
    account: {
      module_name: 'Account',
      login: 'Account',
      name: 'Account',
      descr: 'Description'
    },
    department: {
      moduleName: 'Department',
      code: 'Code',
      name: 'Name',
      desc: 'Description',
      description: 'Description',
      company: 'Company',
      parentDep: 'Parent Department'
    },
    employee: {
      moduleName: 'Employee',
      manager: 'Manager',
      code: 'Code',
      name: 'Name',
      duty: 'Duty',
      phone_no: 'Phone NO.',
      email: 'Email',
      leave_office_time: 'Leave Office Time',
      desc: 'Description',
      description: 'Description',
      selDepartment: 'Please select department',
      depname: 'Depatment'
    },
    manager: {
      name: 'Manager'
    },
    role: {
      addUser: 'Add Account',
      addDepartment: 'Add Dept.',
      role: 'Role',
      roleName: 'Role Name',
      name: 'Name',
      code: 'Code',
      comment: 'Comment',
      editor: 'Editor',
      user: 'User(Department)',
      domain: 'Domain',
      company: 'Company',
      department: 'Department',
      search: 'Search',
      searchbutton: 'Search',
      login: 'Login',
      usersInRole: 'Users in Role',
      permissionInRole: 'Permission in Role',
      editDel: 'Edit/Del',
      del: 'Del',
      msg: {
        required: 'Please input Role Name',
        validLength: 'The length is 3 to 20 characters',
        selectUser: 'Please select User',
        saveSucc: 'Save Successful'
      }
    },
    rulebasic: {
      please_enter_numbers_or_letters_or_char: 'Numbers and letters are valid',
      please_enter_numbers_or_letters: '"-", Numbers and letters are valid',
      character_length: 'Character length limit exceeded',
      enter_space: 'Space is invalid',
      please_select: 'Please select',
      please_enter: 'Please input',
      already_exists: 'Already exists',
      please_enter_number: '0-100 is valid',
      please_enter_valite_number: 'Please input valid number',
      please_enter_number_greaterThan_zero: 'Natural number is valid',
      length: 'Max length is '
    },
    common: {
      individual: '个',
      percent_sign: '%',
      code: '"-", Numbers and letters are valid',
      please_select: 'Please select',
      please_enter: 'Please input',
      already_exists: 'Already exists'
    },
    title: {
      pls_select: 'Please select'
    },
    msg: {
      confirm: {
        delete_msg: 'Confirm to delete？',
        new_anather: 'New another record？'
      }
    }
  },
  cn: {
    basic: {
    },
    table: {
      xuhao: 'NO.',
      editor_name: '编辑人',
      update_time: '编辑时间',
      btn_group_in_row: '编辑/删除'
    },
    dialog: {
      add_title: '新增',
      edit_title: '编辑'
    },
    placeholder: {
      select: '请选择',
      input: '请输入查询关键字'
    },
    button: {
      add: '新增',
      import: '导入数据',
      export: '导出数据',
      getout: '迁出',
      search: '查询',
      query: '查询',
      ok: '确定',
      cancel: '取消',
      save: '保存',
      pause: '暂停',
      confirm: '确认',
      close: '关闭',
      start: '开始',
      submit: '提交',
      select: '选择',
      edit: '编辑',
      delete: '删除',
      remove: '移除',
      copyfrom: '从...复制',
      publish: '发布',
      serial_number: '序号',
      complete: '完成',
      up: '上移',
      down: '下移',
      copy: '复制',
      print: '打印',
      accounts: '明细',
      left: '左移',
      right: '右移',
      upload: '上传',
      filter: '过滤',
      addUser: '添加用户',
      addDepartment: '添加部门'
    },
    account: {
      module_name: '账号',
      login: '账号',
      name: '用户名称',
      descr: '描述'
    },
    department: {
      moduleName: '部门',
      code: '部门代码',
      name: '部门名称',
      desc: '描述',
      description: '描述',
      company: '公司',
      parentDep: '上级部门'
    },
    employee: {
      moduleName: '员工',
      manager: '经理',
      code: '员工代码',
      name: '员工名称',
      duty: '职务',
      phone_no: '手机号',
      email: '员工邮箱',
      leave_office_time: '员工离职时间',
      desc: '描述',
      description: '描述',
      selDepartment: '请选择部门',
      depname: '部门名称'
    },
    manager: {
      name: '经理'
    },
    role: {
      addUser: '添加用户',
      addDepartment: '添加部门',
      role: '角色',
      roleName: '角色名称',
      name: '名称',
      code: '登录名',
      comment: '备注',
      editor: '编辑人',
      user: '用户(或部门)',
      domain: '域',
      company: '公司',
      department: '部门',
      search: '关键字',
      searchbutton: '查询',
      login: '登陆名',
      usersInRole: '用户',
      permissionInRole: '权限',
      editDel: '编辑/删除',
      del: '删除',
      msg: {
        required: '请输入角色名称',
        validLength: '长度在 3 到 20 个字符',
        selectUser: '请先选择用户',
        saveSucc: '保存成功'
      }
    },
    rulebasic: {
      please_enter_numbers_or_letters_or_char: '请输入数字、字母',
      please_enter_numbers_or_letters: '请输入数字、字母或者"-"',
      character_length: '超出规定长度',
      enter_space: '禁止输入空格',
      please_select: '请选择',
      please_enter: '请输入',
      already_exists: '已存在',
      please_enter_number: '请输入0-100的数字',
      please_enter_valite_number: '请输入合法数字',
      please_enter_number_greaterThan_zero: '请输入大于0的数字',
      length: '最大长度为'
    },
    common: {
      individual: '个',
      percent_sign: '%',
      code: '请输入数字、字母、-',
      please_select: '请选择',
      please_enter: '请输入',
      already_exists: '已存在'
    },
    title: {
      pls_select: '请选择'
    },
    msg: {
      confirm: {
        delete_msg: '确认删除？',
        new_anather: '新增下一条？'
      }
    }
  }
})
export default Messages
