<template>
  <div id="caic-common-picker">
    <van-field v-model="value"
               :label="label"
               is-link
               :readOnly="true"
               :border="border"
               :label-align="labelAlign"
               :input-align="inputAlign"
               :placeholder="tipMsg"
               @click="selectType">
      <div slot="right-icon"
           @click="selectType">
        <slot name="right-icon">
        </slot>
      </div>
    </van-field>
    <van-popup v-model="selTypePicker"
               position="bottom">
      <van-picker :columns='columns'
                  show-toolbar
                  :title="pickerTitle"
                  :item-height="itemHeight"
                  :confirm-button-text="confirmButtonText"
                  :cancel-button-text="cancelButtonText"
                  :visible-item-count="visibleItemCount"
                  @cancel='selTypeCancel'
                  @confirm='selTypeSure'
                  @change="selTypeChange">
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
/**
 * ===============done=======================
 * 通用的底部弹出层列表
 * v-model 要显示的值
 * label(String)输入框的标题
 * border Boolean  是否显示内边框 true
 * labelAlign String 文本对齐方式，可选值为left center right  left
 * inputAlign String 输入框内容对齐方式，可选值为left center right  left
 * placeholder String 输入框提示语
 * title String picker顶部栏标题
 * itemHeight Number 选项高度 44
 * confirmButtonText String 确认按钮文字 确认
 * cancelButtonText String 消按钮文字 取消
 * visibleItemCount Number 可见的选项个数 5
 * columns(Array)对象数组，配置每一列显示的数据
 * 
 * @confirm() (Function) 点击完成按钮时触发
 * @cancel() Function 点击取消按钮时触发
 * @change() Function 选项改变时触发
 * 
 * right-icon 自定义尾部图标
 * ==============doing=======================
 * 
 * 
 * ==============hope=========================
 * 测试
 */
import Vue from 'vue'
import {
  Picker,
  Popup,
  Field,
} from 'vant'
Vue.use(Picker).use(Popup).use(Field)
export default {
  name: 'caic-common-picker',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: true
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

    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
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
    columns: {
      type: Array,
      required: true
    }

  },
  data () {
    return {
      selTypePicker: false,
      tipMsg: null
    }
  },
  created () {
    this.tipMsg = this.placeholder
  },
  methods: {
    selectType: function () {
      this.selTypePicker = true
    },
    selTypeCancel: function (value, index) {
      this.selTypePicker = false
      this.$emit('cancel', value, index)
    },
    selTypeSure: function (value, index) {
      this.selTypePicker = false
      this.$emit('confirm', value, index)
    },
    selTypeChange: function (picker, index) {
      this.$emit('change', picker, index)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../css/caic.styl'

#caic-common-picker
  .van-cell.van-cell--clickable.van-field
    changeFontSize(14px)
</style>
