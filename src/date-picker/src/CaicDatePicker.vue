<template>
  <div id="caic-date-picker">
    <van-cell-group>
      <van-field v-model="effectiveDate"
                 :readonly='true'
                 :border='border'
                 :input-align="inputAlign"
                 :disabled="disabled"
                 @click="selDate">
        <div slot="label"
             :class="{'date-title':boldTitle}">起保日期</div>
        <div slot="right-icon"
             :class="{'display-none':!isSel}"
             @click="selDate">
          <slot name="right-icon">
            <span @click="selDate">
              <svg class="icon svgIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-date"></use>
              </svg>
            </span>
          </slot>
        </div>
      </van-field>
    </van-cell-group>
    <van-popup v-model="selDatePopup"
               position="bottom"
               :class="{'display-none':!isSel}">
      <van-datetime-picker v-model="defaultPickerDate"
                           :type='type'
                           :min-date='minDate'
                           :max-date='maxDate'
                           :min-hour='minHour'
                           :max-hour='maxHour'
                           :min-minute='minMinute'
                           :max-minute='maxMinute'
                           :item-height='itemHeight'
                           :confirm-button-text='confirmButtonText'
                           :cancel-button-text='cancelButtonText'
                           :visible-item-count='visibleItemCount'
                           @cancel='selDateCancel'
                           @confirm="selDateSure"
                           @change="selDateChange"
                           class="sel-date-picker">
      </van-datetime-picker>
    </van-popup>
  </div>

</template>
<script>
/**
 * **********************done*********************
 * 传入参数：
 *  1.minDate (Date)可选的最小时间，精确到分钟 十年前
 *  2.maxDate (Date)可选的最大时间，精确到分钟 十年后
 *  3.minHour Number 可选的最小小时，针对 time 类型  0
 *  4.maxHour Number 可选的最大小时，针对 time 类型  23
 *  5.minMinute Number 可选的最小分钟，针对 time 类型  0
 *  6.maxMinute Number 可选的最大分钟，针对 time 类型  59
 *  7.dateFormateRule (String) 日期格式化格式
 *  8.type (String) 日期选择器类型，可选值为 date-time date time year-month date-time
 *  9.itemHeight Number 选项高度 44
 *  10.confirmButtonText String 确认按钮文字  确认
 *  11.cancelButtonText String 取消按钮文字	取消
 *  12.visibleItemCount Number 可见的选项个数 5
 *  13.defaultDate(Date) 日期弹出层的默认显示值
 *  14.isSel (Boolean)日期是否可选 true
 *  15.border Boolean 是否显示内边框 true
 *  16.labelAlign String 文本对齐方式，可选值为left center right --left
 *  17.inputAlign String 输入框内容对齐方式，可选值为left center right  --left
 *  18.disabled Boolean 是否禁用输入框 --false
 *  19.boldTitle (boolean) title是否加粗显示 false
 *  20.v-model (String) 显示框的默认值
 * 
 *  21.@confirm() Function 点击完成按钮时触发的事件 回传数值 dateObject--日期对象, formatedDate--格式化后的日期
 *  22.@cancel() Function 点击取消按钮时触发的事件
 *  23.@change() Function 当值变化时触发的事件  picker 实例
 * 
 *  24.right-icon 自定义输入框尾部图标
 * ===================doing==========
 *  1.spanTime (Object)时间跨度
 * *******************except***************
 * 关于传入 spanTime 的规则和计算？？
 * 测试
 */
import Vue from 'vue'
import {
  Popup,
  DatetimePicker,
  CellGroup,
  Field,
} from 'vant'
Vue.use(DatetimePicker).use(Popup).use(Field).use(CellGroup)
import '../../font/iconfont.js'
// import { format } from 'date-fns'
import dayjs from 'dayjs'
export default {
  // inheritAttrs: false,
  name: 'caic-date-picker',
  props: {
    //v-model 双向绑定传入值
    value: {
      type: String,
      required: true
    },
    // label加粗
    boldTitle: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 日期是否可选,默认值为 true
    isSel: {
      type: Boolean,
      default: true
    },
    // dateTimePicker 的默认显示值；
    defaultDate: {
      type: Date,
      default: new Date()
    },
    // van-datetime-picker的起始日期，日期可选时，必填；日期不可选时，此属性不生效
    minDate: Date,
    // van-datetime-picker的截止日期，日期可选时，endDate 与 spanTime 二选一；日期不可选时，此属性不生效
    maxDate: Date,
    minHour: Number,
    maxHour: Number,
    minMinute: Number,
    maxMinute: Number,
    itemHeight: {
      type: Number,
      default: 44
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancellButtonText: {
      type: String,
      default: '取消'
    },

    // 时间格式化规则
    dateFormateRule: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: 'date'
    },

  },
  data () {
    return {
      effectiveDate: null,
      selDatePopup: false,
      defaultPickerDate: this.defaultDate
    }
  },
  created () {
    // this.effectiveDate = format(this.defaultValue, this.dateFormateRule)
    this.effectiveDate = dayjs(this.value).format(this.dateFormateRule)
    // this.returnMsg(this.defaultValue, this.effectiveDate)
  },
  watch: {
    effectiveDate: function () { this.$emit('input', this.effectiveDate) }
  },
  methods: {
    // 回传参数函数
    returnMsg: function (dateObject, formatedDate) {
      this.$emit('confirm', dateObject, formatedDate)
    },
    selDate: function () {
      if (this.isSel) {
        this.selDatePopup = true
      }
    },
    selDateCancel: function () {
      this.selDatePopup = false
      this.$emit('cancel')
    },
    selDateSure: function (value) {
      this.selDatePopup = false
      // this.effectiveDate = format(value, this.dateFormateRule)
      this.effectiveDate = dayjs(value).format(this.dateFormateRule)
      this.returnMsg(value, this.effectiveDate)
      // console.log(this.defaultPickerDate)
    },
    selDateChange: function (picker) {
      this.$emit('change', picker)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/caic.styl'

#caic-date-picker
  .van-cell
    changeFontSize(14px)

  .date-title
    font-weight: 600
    changeFontSize(15px)

  .icon
    width: 1em
    height: 1em
    vertical-align: -0.15em
    fill: currentColor
    overflow: hidden
    changeFontSize(20px)
    color: #333

  .display-none
    display: none
</style>
