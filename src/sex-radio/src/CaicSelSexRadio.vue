<template>
  <div id="caic-sel-sex-picker">
    <van-cell>
      <div slot="title"
           class="caic-title">
        <span>性别</span>
      </div>
      <div slot="right-icon">
        <van-radio-group v-model="defSex"
                         class="caic-selSex"
                         @change="selSex">
          <van-radio name="1">男 </van-radio>
          <van-radio name="2">女 </van-radio>
        </van-radio-group>
      </div>
    </van-cell>
  </div>
</template>
<script>
/**
 * 此组件用于证件类型/人员类型的选择
 * defaultSex 性别显示的默认值，默认值为‘1’
 * @getMsg 将选择结果返回给父组件 1——> 男性 2——>女性
 */
import Vue from 'vue'
import {
  Cell,
  RadioGroup,
  Radio,
} from 'vant'
Vue.use(Cell).use(RadioGroup).use(Radio)
export default {
  name: 'caic-sex-radio',
  props: {
    defaultSex: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      defSex: null
    }
  },
  created () {
    this.defSex = this.defaultSex
  },
  watch: {
    defaultSex: function () {
      this.defSex = this.defaultSex
    }
  },
  methods: {
    returnMsg: function (sexCode) {
      this.$emit('getMsg', sexCode)
    },
    selSex: function (value) {
      this.returnMsg(value)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../css/caic.styl'

#caic-sel-sex-picker
  .van-cell
    changeFontSize(14px)

  .caic-title
    text-align: left

  .caic-selSex.van-radio-group
    display: flex
    align-content: space-between

  .caic-selSex .van-radio
    margin: 0 15px
</style>
