<template>
  <div id='caic-cell'>
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
           class="caic-cell__switch">
        <van-switch-cell v-model="checked"
                         :size="size"
                         :active-color="activeColor"
                         :inactive-color="inactiveColor"
                         :disabled='disabled'>
        </van-switch-cell>
      </div>
    </van-cell>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Cell,
  SwitchCell
} from 'vant'
Vue.use(Cell).use(SwitchCell)
export default {
  /**
   * -------------done---------------
   * title : String | Number 展示框的标题
   * content : Sting | Number  展示框的值
   * label : Sting 标题下方的描述信息
   * border : Boolean 是否显示边框 默认--true
   * clickable : Boolean 是否开启点击反馈 默认--false
   * isLink : Boolean 是否展示右侧箭头并开启点击反馈 默认--false
   * value: Boolean switch状态 默认--false
   * disabled Boolean switch是否禁用 默认--false
   * size: String switch大小 默认20px
   * activeColor: String switch激活时的背景色 默认--#1989fa
   * inactiveColor:String switch未激活时的背景色 默认--#fff
   * @change Function 开关状态切换回调  回调参数 checked 是否选中开关
   * -------------doing--------------
   *
   */
  name: 'caic-cell-switch',
  props: {
    value: {
      type: Boolean,
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
    size: {
      type: String,
      default: '20px'
    },
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    inactiveColor: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {
      checked: this.value
    }
  },
  watch: {
    checked: function () {
      this.$emit('input', this.checked)
      this.$emit('change', this.checked)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/caic.styl'

#caic-cell
  .van-cell, .caic-cell__title
    changeFontSize(14px)

  .caic-cell__switch
    .van-switch-cell
      padding-top: 0
      padding-bottom: 0
      padding-right: 0
</style>
