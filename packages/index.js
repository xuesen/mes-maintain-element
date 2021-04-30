import DraggableDialog from './draggable-dialog/index.js'
import EditForm from './edit-form/index.js'
import AttributeForm from './attribute-form/index.js'
import ImportExcel from './import-excel/index.js'
import ListWithFilter from './list-with-filter/index.js'
import MaintainPage from './maintain-page/index.js'
import MaintainTable from './maintain-table/index.js'
import Filter from './filter/index.js'
import DataTable from './data-table/index.js'
import MenuItem from './menu-item/index.js'
import VirtualTableMix from './virtual-table-mix/index.js'
import VirtualScroller from 'vue-virtual-scroller'
import MessagesBase from './i18n/index.js'
import SelectDepartment from './select-department/index.js'
import SelectUser from './select-user/index.js'
import SelectUserOnly from './select-user-only/index.js'
import IiTextOverflowTooltip from './ii-text-overflow-tooltip'
import IiElement, {MsgBox, SvgIcon, Cascader, KeyboardInput, QuickInput, RadioGroup, SingleSelect, MultiSelect, Upload,UploadMinio, Panel} from 'mes-common'
import VueSession from 'vue-session'
import fileSaver from 'file-saver'
import { IfUserInRole, GetUsersByRoleName, GetRolesByUser, FindUser, init_application } from './employee/src/api'
const components = [
  DraggableDialog,
  ImportExcel,
  ListWithFilter,
  MaintainPage,
  Filter,
  MaintainTable,
  EditForm,
  AttributeForm,
  DataTable,
  MenuItem,
  SelectDepartment,
  SelectUser,
  SelectUserOnly,
  IiTextOverflowTooltip
]

const install = function (Vue, opts = {}) {
  Vue.use(VueSession)
  Vue.use(VirtualScroller)
  Vue.use(IiElement, {locale: opts.locale, i18n: opts.i18n_handler})
  require('./styles/index.scss')
  require('./vue-virtual-scroller/src/vue-virtual-scroller.css')
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Object.defineProperty(Vue.prototype, '$ii_download', {
    get () {
      return (file) => {
        fileSaver.saveAs('./storageservice/api/asset/' + file.storageId, file.name)
      }
    }
  })
  /* istanbul ignore if */
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export const AuthService = {
  init_application,
  IfUserInRole,
  GetUsersByRoleName,
  GetRolesByUser,
  FindUser
}
export const Messages = {
  ...MessagesBase
}
export default {
  version: '2.13.0',
  locale: IiElement.locale,
  i18n: IiElement.i18n,
  en_locale: IiElement.en_locale,
  tw_locale: IiElement.tw_locale,
  cn_ocale: IiElement.cn_ocale,
  MessagesBase,
  install,
  Cascader,
  DraggableDialog,
  EditForm,
  AttributeForm,
  Filter,
  KeyboardInput,
  ImportExcel,
  ListWithFilter,
  MaintainPage,
  MaintainTable,
  DataTable,
  MenuItem,
  MsgBox,
  RadioGroup,
  SingleSelect,
  MultiSelect,
  SvgIcon,
  VirtualTableMix,
  VirtualScroller,
  QuickInput,
  Upload,
  UploadMinio
}
