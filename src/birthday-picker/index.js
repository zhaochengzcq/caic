import CaicBirthdayPicker from './src/CaicBirthdayPicker.vue'
import Vue from 'vue'

import {
  Field,
  CellGroup,
  Cell,
  Popup,
  DatetimePicker,
  RadioGroup,
  Radio,
  Picker,
  Button,
  Row,
  Col
} from 'vant'
Vue.use(CellGroup)
  .use(Cell)
  .use(Field)
  .use(Popup)
  .use(DatetimePicker)
  .use(RadioGroup)
  .use(Radio)
  .use(Picker)
  .use(Button)
  .use(Row)
  .use(Col)
const BirthdayPicker = {
  install: function (Vue) {
    Vue.component(CaicBirthdayPicker.name, CaicBirthdayPicker)
  }
}
export default BirthdayPicker
