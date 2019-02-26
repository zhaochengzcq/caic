<template>
  <div id="caic-birthday-picker">
    <van-field v-model="birthday"
               :readonly='true'
               :border="border"
               label='出生日期'
               :label-align="labelAlign"
               :input-align="inputAlign"
               :disabled="disabled"
               placeholder="请选择出生日期"
               @click="selBirthday">
      <!-- <div slot="label"
           :class="{'date-title':boldTitle}">
        <span>
          出生日期
        </span>
      </div> -->
      <div slot="right-icon">
        <slot name="right-icon">
          <span class=""
                @click="selBirthday">
            <svg class="icon svgIcon"
                 aria-hidden="true">
              <use xlink:href="#icon-date"></use>
            </svg>
          </span>
        </slot>
      </div>
    </van-field>
    <van-popup v-model="selBirthdayPopup"
               position="bottom">
      <van-datetime-picker v-model="defaultDate"
                           :type='type'
                           :min-date='minDate'
                           :max-date='maxDate'
                           @cancel='selDateCancel'
                           @confirm="selDateSure"
                           @change='selDateChange'
                           class="sel-date-picker">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>
<script>
/**
 * ****************Done**********************
 * 1.defaultValue(Date) van-datetime-picker 默认显示的日期
 * 2.blodTitle (Boolean) title 是否加粗
 * 3.minDate (Date) van-datetime-picker 起始时间
 * 4.itemHeight Number 选项高度 44
 * 5.dateFormatRule（String） 日期格式化格式
 * 6.type（String） van-datetime-picker 显示日期的类型
 * 7.baseDate (Date) 用于年龄计算的基准日期,当传入的日期发生改变时会重新计算年龄
 * 8.confirmButtonText String 确认按钮文字 确认
 * 9.cancelButtonText String 取消按钮文字 取消
 * 10.visibleItemCount Number 可见的选项个数 5	
 * 11. @confirm() (function) 返回参数 birthday--出身日期 formatedDate--格式化得日期, age--年龄, birthDays--出生的天数
 * 12. @cancel() Funccton 取消按钮事件
 * 13. @change() Function 当值变化时触发的事件 picker 实例
 * 
 * 14.border Boolean 是否显示内边框 true
 * 15.labelAlign String 文本对齐方式，可选值为left center right left
 * 16.inputAlign String 输入框内容对齐方式，可选值为left center right left
 * 17.disabled Boolean 是否禁用输入框 --false
 * 17.right-icon 自定义右侧图标，有默认图标
 * ***************v1.0.1******************
 * v-model 设置field显示的初始值
 * ***************doing********************
 * 如何传入自定义事件? 离焦事件 (暂不实现)
 * ***************except*******************
 * 测试
 */
import '../../font/iconfont.js'
// import { format, addYears } from 'date-fns'
import dayjs from 'dayjs'
import Vue from 'vue'
import {
  Field,
  Popup,
  DatetimePicker,
} from 'vant'
Vue.use(Field).use(Popup).use(DatetimePicker)

export default {
  name: 'caic-birthday-picker',
  props: {
    // field初始值
    value: {
      type: [String, Number],
      default: ''
    },
    // 标题加粗样式
    boldTitle: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    labelAlign: {
      type: String
    },
    inputAlign: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // van-datetime-picker 默认显示的日期
    defaultValue: {
      type: Date,
      default: function () {
        return new Date()
      }
    },

    // 用于计算年龄的基准日期，理论上传入的应该为起保日期,默认值为程序执行时的日期
    baseDate: {
      type: Date,
      default: function () {
        return new Date()
      }
    },

    // van-datetime-picker的起始日期.
    minDate: {
      type: Date,
      default: function () {
        return dayjs().subtract(100, 'year').toDate();
      }
    },

    // van-datetime-picker的日期显示类型.
    type: {
      type: String,
      default: 'date'
    },

    // 处理日期的格式
    dateFormatRule: {
      type: String,
      default: 'YYYY-MM-DD'
    },

    itemHeight: {
      type: Number,
      default: 44
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
  },
  data () {
    return {
      birthday: this.value,
      birthdayObject: null,
      comparedDate: null,
      age: null,
      birthDays: null,
      selBirthdayPopup: false,
      defaultDate: this.defaultValue,
      maxDate: new Date()
    }
  },
  watch: {
    baseDate: function () {
      if (this.birthday !== null && this.birthday !== undefined && this.birthday !== '') {
        this.getAge()
        this.returnMsg(this.birthdayObject, this.birthday, this.age, this.birthDays)
      }
    },
    value: function () {
      this.birthday = this.value
    }
  },
  methods: {
    blurFun: function () {
      this.blur()
    },
    // 年龄计算,年龄 + 基准日期距离上一个生日的天数计算
    getAge: function () {
      let birthY = this.birthdayObject.getFullYear()
      let birthM = this.birthdayObject.getMonth()
      let birthD = this.birthdayObject.getDate()

      let comparedY = this.baseDate.getFullYear()
      let comparedM = this.baseDate.getMonth()
      let comparedD = this.baseDate.getDate()

      this.age = comparedY - birthY - 1
      // 到出生日期周岁+1
      if (birthM < comparedM || (birthM === comparedM && birthD <= comparedD)) {
        this.age += 1
      }
      // age>0时出生的那一天按0天算
      // this.birthDays = (new Date(comparedY, comparedM, comparedD) - new Date(birthY + this.age, birthM, birthD)) / (24 * 60 * 60 * 1000)
      this.birthDays = (new Date(comparedY, comparedM, comparedD) - new Date(birthY, birthM, birthD)) / (24 * 60 * 60 * 1000)
      this.birthDays += 1
      // if (this.age === 0) {
      //   this.birthDays += 1
      // }
    },
    returnMsg: function (birthday, formatedBirthday, age, birthDays) {
      this.$emit('confirm', birthday, formatedBirthday, age, birthDays)
    },
    selBirthday: function () {
      this.selBirthdayPopup = true
    },
    selDateCancel: function () {
      this.selBirthdayPopup = false
      this.$emit('cancel')
    },
    selDateSure: function (value) {
      this.birthdayObject = value
      // this.birthday = format(value, this.dateFormatRule)
      this.birthday = dayjs(value).format(this.dateFormatRule)
      this.getAge()
      this.returnMsg(value, this.birthday, this.age, this.birthDays)
      this.selBirthdayPopup = false
    },
    selDateChange: function (picker) {
      this.$emit('change', picker)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/caic.styl'

#caic-birthday-picker
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
</style>
