import iielement from '../../packages/index.js'
import _ from 'lodash'
let Messages = {}
_.merge(Messages, iielement.MessagesBase, {
  en: {
  },
  cn: {
    factory: {
      module_name: '工厂',
      code: '工厂代码',
      name: '工厂名称',
      group: '集团',
      desc: '描述'
    },
    workshop: {
      module_name: '车间',
      code: '车间代码',
      name: '车间名称',
      desc: '描述',
      factoryname: '工厂名称'
    },
    line: {
      module_name: '生产线',
      code: '生产线代码',
      name: '生产线名称',
      desc: '描述',
      nameForWO: ''
    },
    process: {
      moduleName: '工序',
      code: '工序代码',
      name: '工序名称',
      desc: '描述',
      ismultiwo: '支持多工单批处理',
      yes: '是',
      no: '否',
      stagename: '工序区段',
      typename: '工序类型'
    },
    stage: {
      module_name: '生产阶段',
      code: '生产阶段代码',
      name: '生产阶段名称',
      desc: '描述'
    },
    terminal: {
      moduleName: '工作站',
      processname: '工序',
      linename: '生产线',
      code: '工作站代码',
      name: '工作站名称',
      desc: '描述',
      ip: '数采IP',
      rowButtonGroupLabel: '编辑/删除/添加设备'
    },
    button: {
      add: 'Add',
      delete: 'Del',
      addUser: 'Add User',
      addDepartment: 'Add Department',
      ok: 'Confirm',
      search: 'Search',
      left: 'Shift Left',
      right: 'Shift Right'
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
    part: {
      moduleName: '物料',
      code: '物料代码',
      name: '物料名称',
      customerNo: '客户料号',
      partType: '物料类型',
      vendor: '供应商',
      spec1: '物料规格',
      spec2: '物料规格2',
      version: '版本',
      reserveType1: '物料类型1',
      reserveType2: '物料类型2',
      uom: '计量单位',
      sourceType: '来源',
      levelType: '料件类型',
      traceType: '追溯方式',
      snFormat: '匹配规则',
      snRule: '序号生成规则',
      isKeyPart: '关键料',
      needUniqueCheck: '唯一性检查',
      yes: '是',
      no: '否'
    },
    msg: {
      required: '请输入角色名称',
      validLength: '长度在 3 到 20 个字符',
      selectUser: '请先选择用户',
      saveSucc: '保存成功',
      beforeDelete: '确定要删除选中数据？',
      delete: '删除成功'
    }
  }
})
export default Messages
