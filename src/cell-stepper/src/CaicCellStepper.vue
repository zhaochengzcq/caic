<template>
  <div id='caic-cell-stepper'>
    <van-cell :value="content"
              :clickable="clickable"
              :is-link="isLink"
              :label='label'
              :border="border">
      <div slot="title"
           class="caic-cell__title">
        {{title}}
      </div>
      <div slot="right-icon"
           class="caic-cell__stepper">
        <van-stepper class="caic-cell__stepper-sty"
                     v-model="defaultValue"
                     :min="min"
                     :max="max"
                     :step="step"
                     :integer="integer"
                     :disabled="disabled"
                     :disable-input="disableInput"
                     @change="change"
                     @plus='plus'
                     @minus='minus'
                     @overlimit='overlimit'
                     @blur="blur">
        </van-stepper>
      </div>
    </van-cell>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Cell,
  Stepper
} from 'vant'
Vue.use(Cell).use(Stepper)
export default {
  /**
   * -------------done---------------
   * title : String | Number 展示框的标题
   * content : Sting | Number  展示框的值
   * label : Sting 标题下方的描述信息
   * border : Boolean 是否显示边框 默认--true
   * clickable : Boolean 是否开启点击反馈 默认--false
   * isLink : Boolean 是否展示右侧箭头并开启点击反馈 默认--false
   * v-model: String|Number stepper初始值
   * disabled Boolean stepper是否禁用 默认--false
   * disableInput Boolean 是否禁用输入框 false
   * min: String | Number stepper最小值 默认1
   * max: String | Number stepper最大值
   * step: String | Number stepper步数 默认1
   * @change() 当绑定值变化时触发的事件 回调参数 当前组件的值
   * @overlinit() 点击不可用的按钮时触发
   * @plus() 点击增加按钮时触发
   * @minus() 点击减少按钮时触发
   * @blur() 输入框失焦时触发
   * -------------doing--------------
   *
   */
  name: 'caic-cell-stepper',
  props: {
    value: {
      type: [String, Number],
      required: false
    },
    title: {
      type: [String, Number]
    },
    content: {
      type: [String, Number]
    },
    label: {
      type: String
    },
    border: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disableInput: {
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number]
    },
    step: {
      type: [String, Number],
      default: 1
    },
    integer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultValue: this.value
    }
  },
  watch: {
    defaultValue: function () {
      this.$emit('input', this.defaultValue)
    }
  },
  methods: {
    change () {
      this.$emit('change', this.defaultValue)
    },
    plus () {
      this.$emit('plus')
    },
    minus () {
      this.$emit('minus')
    },
    overlimit () {
      this.$emit('overlimit')
    },
    blur () {
      this.$emit('blur')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/caic.styl'

#caic-cell-stepper
  .van-cell, .caic-cell__title
    changeFontSize(14px)

  .caic-cell__stepper
    .van-switch-cell
      padding-top: 0
      padding-bottom: 0
      padding-right: 0

  .caic-cell__stepper
    input
      color: #333
      opacity: 1
      -webkit-text-fill-color: #333
      -webkit-opacity: 1
</style>
