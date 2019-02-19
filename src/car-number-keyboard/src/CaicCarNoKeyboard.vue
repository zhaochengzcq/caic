<template>
  <div id="license-plate-number-field"
       ref="keybored">
    <van-field :value='licensePlateNumber'
               @click="showKeyboard"
               @focus="disblur"
               :label-align="labelAlign"
               :input-align="inputAlign"
               :placeholder='placeholder'
               readOnly>
      <div slot="label"
           class="field-title">
        {{title}}
      </div>
      <div slot="icon"
           @click="showKeyboard">
        <slot name=icon>
          <svg class="icon"
               aria-hidden="true">
            <use xlink:href="#icon-keyboard"></use>
          </svg>
        </slot>
      </div>
    </van-field>
    <!-- 键盘弹出层遮罩 -->
    <van-popup v-model="isShow"
               position="bottom"
               class="province-block"
               :overlay-style='popupSty'>
      <!-- 输出显示 -->
      <div class="show-content">
        {{licensePlateNumber}}
      </div>
      <!-- 循环输出生成省键盘 -->
      <div class="province-item"
           v-show="isShowKeyboard">
        <van-row class="row-sty"
                 type='flex'
                 justify="space-around"
                 v-for="(rowItem,rowIndex ) in rows"
                 :key="'row'+rowIndex">
          <van-col span='3'
                   v-for="(colItem,colIndex) in rowItem"
                   :key="'col'+colIndex"
                   class="col-sty">

            <span class="van-button"
                  @touchstart.stop="btnTouchStart"
                  @touchend.stop='btnTouchEnd'>
              {{colItem}}
            </span>
          </van-col>
        </van-row>
        <van-row class="row-sty"
                 type='flex'
                 justify="space-around">
          <van-col span='3'
                   v-for="(colItem,colIndex) in extraRow"
                   :key="'col'+colIndex"
                   class="col-sty">

            <span class="van-button"
                  @touchstart.stop="btnTouchStart"
                  @touchend.stop='btnTouchEnd'
                  :class="{'btn-display':colItem==null}">
              <svg class="icon"
                   aria-hidden="true"
                   :class="{'icon-font-display':colItem !== 'del'}">
                <use xlink:href="#icon-delete"></use>
              </svg>
              {{colItem === "del"?"":colItem}}
            </span>
          </van-col>
        </van-row>
      </div>
      <!-- 循环输出数字字母键盘 -->
      <div class="alphanumeric-item"
           v-show="!isShowKeyboard">
        <van-row class="row-sty"
                 type='flex'
                 justify="space-around"
                 v-for="(rowItem,rowIndex ) in alphanumericKeyboardArr"
                 :key="'row'+rowIndex">
          <van-col :span='colItem === "done"?"6":"3"'
                   v-for="(colItem,colIndex) in rowItem"
                   :key="'col'+colIndex"
                   class="col-sty">

            <span class="van-button"
                  @touchstart="btnTouchStart"
                  @touchend='btnTouchEndAlphanumeric'>
              <svg class="icon"
                   aria-hidden="true"
                   :class="{'icon-font-display':colItem !== 'del'}">
                <use xlink:href="#icon-delete"></use>
              </svg>
              {{colItem === "del"||colItem === "done"?(colItem === "done"?"完成":''):colItem}}
            </span>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>
<script>
import '../../font/iconfont_keyboard.js'
import '../../font/iconfont_del.js'
import { provinceAbbreviationList, carTableKeyboard } from '../js/dataStorage.js'
/**
 * ------------------done--------------
 * slot: icon 输入框右侧的图标，如不设置将显示默认值
 * value: String 传入车牌号默认null. v-model绑定
 * input: Function 传出车牌号 v-model绑定
 * province: Array 传入省简称
 * confirm: function 当键盘收起时需要处理的事件，需自定义
 * 优化点击反馈
 * 禁用移动端长按复制以及弹出菜单
 * 添加按键震动反馈（仅限安卓）
 * 在键盘上添加一个显示区域用于显示车牌号
 * 可输入字符长度进行了限制在10个以内的处理
 * -----------------not done-----------
 * 按钮样式有待优化
 * 性能优化（事件委托？）
 * ----------------hope-----------------
 * 测试
 */
import Vue from 'vue'
import {
  Field,
  Popup,
  DatetimePicker,
  Row,
  Col,
} from 'vant'
Vue.use(Field).use(Popup).use(DatetimePicker).use(Row).use(Col)
export default {
  name: 'caic-car-number-keyboard',
  props: {
    value: {
      type: String | Object,
      required: true
    },
    placeholder: {
      type: String,
      default: '请输入车牌号'
    },
    province: {
      type: Array,
      default: () => { return provinceAbbreviationList }
    }

  },
  data () {
    return {
      popupSty: {
        'background-color': 'rgba(0, 0, 0, 0)'
      },
      // 初始化所用的数据数组
      provinceKeyboardArr: null,
      alphanumericKeyboardArr: carTableKeyboard,
      // field相关的数据
      title: '车牌号',
      licensePlateNumber: null,
      // 控制遮罩层的显隐
      isShow: false,
      // 控制两类键盘的显隐
      isShowKeyboard: true,

      // 将传入的省简称以每七个为一组进行分割，填入row[]中，最后不满7个的填入extraRow[]
      rows: [],
      extraRow: []
    }
  },
  created () {
    // 将传入的省简称进行处理
    let arrLen = Math.floor(this.province.length / 7)
    for (let i = 0; i < arrLen; i++) {
      this.rows[i] = this.province.slice(7 * i, 7 * (i + 1))
    }
    if (this.province.length % 7 !== 0) {
      this.extraRow = this.province.slice(7 * arrLen, this.province.length + 1)
      this.extraRow[6] = 'del'
    }
    // 初始化
    this.value === null ? this.licensePlateNumber = '' : this.licensePlateNumber = this.value
  },
  mounted () {
    // 解决长按弹出菜单问题
    this.$refs.keybored.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
  },
  watch: {
    licensePlateNumber: function () {
      this.$emit('input', this.licensePlateNumber)
    },
    // 键盘收起时触发的事件
    isShow: function () {
      if (!this.isShow) {
        this.$emit('confirm')
      }
    }
  },
  methods: {
    disblur (event) {
      event.target.blur()
    },
    showKeyboard () {
      if (this.licensePlateNumber !== null && this.licensePlateNumber !== '' && this.licensePlateNumber.length > 0) {
        this.isShowKeyboard = false
      }
      this.isShow = true
    },
    btnTouchStart (event) {
      event.currentTarget.className = 'van-button click'
      // this.isClick = true
      if ('vibrate' in navigator) {
        navigator.vibrate(16)
      }
    },
    btnTouchEnd (event) {
      event.currentTarget.className = 'van-button unclick'
      this.getProvince(event.currentTarget.innerText)
      // setTimeout(() => { this.isClick = false }, 80)
    },
    btnTouchEndAlphanumeric (event) {
      event.currentTarget.className = 'van-button unclick'
      this.getAlphanumerValue(event.currentTarget.innerText)
      // setTimeout(() => { this.isClick = false }, 80)
    },
    getProvince (value) {
      if (value !== '') {
        this.licensePlateNumber += value
        this.isShowKeyboard = false
      } else {
        if (this.licensePlateNumber.length !== 0) {
          this.licensePlateNumber = this.licensePlateNumber.substring(0, this.licensePlateNumber.length - 1)
        }
      }
    },
    getAlphanumerValue (value) {
      if (value !== '' && value !== '完成') {
        if (this.licensePlateNumber === null || this.licensePlateNumber === '' || this.licensePlateNumber.length < 8) {
          this.licensePlateNumber += value
        }
      } else if (value === '') {
        if (this.licensePlateNumber.length !== 0) {
          if (this.licensePlateNumber.length === 1) {
            this.isShowKeyboard = true
          }
          this.licensePlateNumber = this.licensePlateNumber.substring(0, this.licensePlateNumber.length - 1)
        }
      } else if (value === '完成') {
        this.isShow = false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/caic.styl'

#license-plate-number-field
  -webkit-touch-callout: none
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

  .icon
    width: 1em
    height: 1em
    vertical-align: -0.15em
    fill: currentColor
    overflow: hidden
    changeFontSize(20px)
    color: #323233

  .field-title
    changeFontSize(14px)

  .show-content
    position: relative
    width: 100%
    height: 40px
    background-color: #e0e0e0
    text-align: center
    line-height: 40px
    border-top: 1px solid rgba(0, 0, 0, 0.3)
    border-bottom: 1px solid rgba(0, 0, 0, 0.3)

  .province-item
    padding: 15px 8px
    background-color: #e0e0e0

    .row-sty
      padding-bottom: 6px

      .van-col
        float: none
        display: flex
        justify-content: center

        .van-button
          border-radius: pxToVW(10px)
          width: pxToVW(36px)
          height: pxToVW(44px)
          line-height: normal
          display: flex
          justify-content: center
          align-items: center
          background-color: #fff
          changeFontSize(14px)

        .van-button::before
          display: none

        .click
          background-color: rgba(0, 0, 0, 0.4)

        .unclick
          background-color: #fff

        .btn-display, .icon-font-display
          display: none

  .alphanumeric-item
    padding: 15px 8px
    background-color: #e0e0e0

    .row-sty
      padding-bottom: 6px

      .van-col
        float: none
        display: flex
        justify-content: center

        .van-button
          border-radius: pxToVW(8px)
          width: pxToVW(30px)
          height: pxToVW(38px)
          line-height: normal
          display: flex
          justify-content: center
          align-items: center
          background-color: #fff
          changeFontSize(15px)

        .van-button::before
          display: none

        .click
          background-color: rgba(0, 0, 0, 0.4)

        .unclick
          background-color: #fff

        .btn-display, .icon-font-display
          display: none

      .van-col--6
        .van-button
          width: pxToVW(60px)
</style>
