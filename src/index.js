import DatePicker from './date-picker/index'
import BirthdayPicker from './birthday-picker'
import SexRadio from './sex-radio'
import CommonPicker from './common-picker'
import CarNumberKeyboard from './car-number-keyboard'
import CellSwitch from './cell-switch'
import CellStepper from './cell-stepper'
// import Vue from 'vue'
// import {
//   Field,
//   CellGroup,
//   Cell,
//   Popup,
//   DatetimePicker,
//   RadioGroup,
//   Radio,
//   Picker,
//   Button,
//   Row,
//   Col,
//   Stepper,
//   SwitchCell
// } from 'vant'
// Vue.use(CellGroup)
//   .use(Cell)
//   .use(Field)
//   .use(Popup)
//   .use(DatetimePicker)
//   .use(RadioGroup)
//   .use(Radio)
//   .use(Picker)
//   .use(Button)
//   .use(Row)
//   .use(Col)
//   .use(Stepper)
//   .use(SwitchCell)
const components = [
  DatePicker,
  BirthdayPicker,
  CarNumberKeyboard,
  SexRadio,
  CommonPicker,
  CellSwitch,
  CellStepper
]
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
export {
  // 以下是具体的组件列表
  DatePicker,
  BirthdayPicker,
  CarNumberKeyboard,
  SexRadio,
  CommonPicker,
  CellSwitch,
  CellStepper
}
