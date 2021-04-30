/* eslint-disable @typescript-eslint/no-var-requires */
<template>
  <div class="app" id="app" style="padding: 20px;">
    <ii-collapse accordion>
      <ii-collapse-item :title="item.title" :name="index" :key="index" v-for="(item, index) in component_list">
        <component v-if="item.name" :is="item.name"></component>
      </ii-collapse-item>
    </ii-collapse>
  </div>
</template>

<script>
import Codes from './example-code/index.js'
import IiAuthServiceDemo from './demo/auth-service'
import DraggableDialogDemo from './demo/draggable-dialog'
import IiQuickInputDemo from './demo/ii-quick-input'
import IiKeyboardInputDemo from './demo/ii-keyboard-input'
import IiPanelDemo from './demo/ii-panel'
import IiSelectDemo from './demo/ii-select'
import IiMultiSelectDemo from './demo/ii-multi-select'
import IiRadioGroupDemo from './demo/ii-radio-group'
import IiCascaderDemo from './demo/ii-cascader'
import IiSelectUserDemo from './demo/ii-select-user'
import IiSelectDepartmentDemo from './demo/ii-select-department'
import IiFilterDemo from './demo/ii-filter'
import IiUploadDemo from './demo/ii-upload'
import I18n from './demo/i18n'
export default {
  name: 'App',
  components: {
    IiAuthServiceDemo,
    DraggableDialogDemo,
    IiSelectDemo,
    IiMultiSelectDemo,
    IiRadioGroupDemo,
    IiCascaderDemo,
    IiSelectUserDemo,
    IiSelectDepartmentDemo,
    I18n,
    IiUploadDemo,
    IiFilterDemo,
    IiQuickInputDemo,
    IiKeyboardInputDemo,
    IiPanelDemo
  },
  data () {
    return {
      component_list: [
        {title: 'i18n', name: 'I18n'},
        {title: '可拖动dialog', name: 'DraggableDialogDemo'},
        {title: '快速刷入控件', name: 'IiQuickInputDemo'},
        {title: '一体机通用弹出输入框', name: 'IiKeyboardInputDemo'},
        {title: '单选下拉', name: 'IiSelectDemo'},
        {title: '多选下拉', name: 'IiMultiSelectDemo'},
        {title: 'RadioGroup', name: 'IiRadioGroupDemo'},
        {title: '级联下拉', name: 'IiCascaderDemo'},
        {title: '权限服务接口', name: 'IiAuthServiceDemo'},
        {title: '用户选择', name: 'IiSelectUserDemo'},
        {title: '部门选择', name: 'IiSelectDepartmentDemo'},
        {title: '面板-编辑或显示内容分区', name: 'IiPanelDemo'},
        {title: '表数据维护grid', name: ''},
        {title: '内存数据维护grid', name: ''},
        {title: '绑定存储服务的上传控件', name: 'IiUploadDemo'},
        {title: '数据过滤选择dialog', name: 'IiFilterDemo'}
      ]
    }
  },
  methods: {
  },
  mounted () {
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    requireAll(Codes)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app {
  font-family: Source Han Sans CN,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,"sans-serif";
  box-sizing: border-box;
  height: 100%;
  .el-collapse-item__header {
    padding: 0 20px;
    background-color: #ecf9fd;
    font-size: 20px;
  }
  .el-collapse-item__content {
    padding: 20px;
    background-color: #e8f1f8;
  }
  .el-divider__text {
    background-color: transparent;
  }
}
</style>
