

# CAIC

[TOC]



## 安装与使用

```js
//安装
npm install caic -S
//使用
import {组件名称} from 'caic'

※ 需要在 babel.config.js 中进行如下配置
	module.exports = {
      presets: ['@vue/app'],
      plugins: [
        'transform-vue-jsx',
        //写入如下配置。
        [
          'component',
          {
            libraryName: 'caic',
            styleLibrary: { name: 'theme', base: false }
          }
        ]
      ]
    }
```

## 组件

### ​BirthdayPicker  --选择出身日期

**使用**

```js
import {BirthdayPicker} from 'caic'
Vue.use(BirthdayPicker)
```

```html
<caic-birthday-picker></caic-birthday-picker>
```

**说明**

| 参数                  | 说明                                             | 类型    | 默认值     | 是否必传 | 其他 |
| --------------------- | :----------------------------------------------- | ------- | ---------- | -------- | ---- |
| border                | *是否显示内边框*                                 | Boolean | true       | no       |      |
| *label-align*         | *文本对齐方式，可选值为left center right *       | String  | left       | no       |      |
| *input-align*         | *输入框内容对齐方式，可选值为left center right * | String  | left       | no       |      |
| *blod-title*          | *是否加粗label*                                  | Boolean | false      | no       |      |
| disabled              | *是否禁用输入框*                                 | Boolean | false      |          |      |
| default-value         | 选择器默认显示的日期                             | Date    | 当前日期   | no       |      |
| min-date              | 可选的最小时间                                   | Date    | 100年前    | no       |      |
| date-format-rule      | 显示及返回日期的格式                             | String  | YYYY-DD-MM | no       |      |
| type                  | 类型，可选值为date,time,year-month，datetime     | String  | date       | no       |      |
| base-date             | 根据此日期进行年龄计算                           | Date    | 当前日期   | no       |      |
| *confirm-button-text* | *确认按钮文字*                                   | String  | *确认*     | no       |      |
| *cancel-button-text*  | *取消按钮文字*                                   | String  | *取消*     | no       |      |
| *visible-item-count*  | *可见的选项个数*                                 | Number  | 5          | no       |      |
| *item-height*         | *选项高度*                                       | Number  | 44         | no       |      |

------


| 方法    | 说明                     | 回调参数                                                     |
| ------- | ------------------------ | ------------------------------------------------------------ |
| confirm | 点击完成按钮时触发的事件 | dateObject：所选日期，<br />formatedDate：所选日期的格式化<br />age ：年龄<br />birthDays：出生的总天数} |
| cancel  | 取消按钮事件             | ——                                                           |
| change  | 当值变化时触发的事件     | picker 实例                                                  |

------

picker实例方法   

| 函数                           | 说明                                       |
| ------------------------------ | ------------------------------------------ |
| getColumnValue(index)          | 获取对应列中选中的值                       |
| setColumnValue(index, value)   | 设置对应列中选中的值                       |
| getColumnValues(index)         | 获取对应列中所有的备选值                   |
| setColumnValues(index, values) | 设置对应列中所有的备选值                   |
| getValues()                    | 获取所有列中被选中的值，返回一个数组       |
| setValues(values)              | `values`为一个数组，设置所有列中被选中的值 |

------

Slot

| 名称         | 说明                         |
| ------------ | ---------------------------- |
| *right-icon* | *自定义右侧图标，有默认图标* |

### CarNumberKeyboard -- 车牌号输入键盘

**使用**

```js
import {CarNumberKeyboard} from 'caic'
Vue.use(CarNumberKeyboard)
```

```html
<caic-car-number-keyboard v-model='京A12345'></caic-car-number-keyboard>
```

**说明**

| 参数     | 说明       | 类型   | 默认值 | 是否必传 | 其他 |
| -------- | ---------- | ------ | ------ | -------- | ---- |
| v-model  | 车牌号     | String | ----   | yes      |      |
| province | 省简称列表 | Array  | 有     | no       |      |

------



| slot | 说明             | 默认值 |      |
| ---- | ---------------- | ------ | ---- |
| icon | 输入框右侧的图标 | Y      |      |

------



| 方法    | 说明             | 回调参数 |
| ------- | ---------------- | -------- |
| confirm | 键盘收起时的事件 | 无       |



### CellStepper -- 步进器

**使用**

```js
import {CellStepper} from 'caic'
Vue.use(CellStepper)
```

```html
<caic-cell-stepper></caic-cell-stepper>
```

**说明**

| 参数      | 说明                           | 类型             | 默认值 | 是否必传 | 其他 |
| --------- | ------------------------------ | ---------------- | ------ | -------- | ---- |
| title     | 展示框的标题                   | String \| Number | ——     | no       |      |
| content   | 展示框的值                     | String \| Number | ——     | no       |      |
| label     | 标题下方的描述信息             | String           | ——     | no       |      |
| border    | 是否显示边框                   | Boolean          | true   | no       |      |
| clickable | 是否开启点击反馈               | Boolean          | false  | no       |      |
| is-link   | 是否展示右侧箭头并开启点击反馈 | Boolean          | false  | no       |      |
| v-model   | stepper当前输入值              | String \| Number | 最小值 | no       |      |
| disabled  | stepper是否禁用                | Boolean          | false  | no       |      |
| min       | stepper最小值                  | String \| Number | 1      | no       |      |
| max       | stepper最大值                  | String \| Number | ——     | no       |      |
| step      | stepper步数                    | String \| Number | 1      | no       |      |

------



| 方法      | 说明                     | 回调参数      | 其他 |
| --------- | ------------------------ | ------------- | ---- |
| change    | 当绑定值变化时触发的事件 | stepper当前值 |      |
| overlinit | *点击不可用的按钮时触发* | ——            |      |
| plus      | *点击增加按钮时触发*     | ——            |      |
| minus     | *点击减少按钮时触发*     | ——            |      |
| blur      | *输入框失焦时触发*       | ——            |      |
|           |                          |               |      |

### CellSwitch -- 开关

**使用**

```js
import {CellSwitch} from 'caic'
Vue.use(CellSwitch)
```

```html
<caic-cell-switch></caic-cell-switch>
```

**说明**

| 参数           | 说明                             | 类型             | 默认值    | 是否必传 | 其他 |
| -------------- | -------------------------------- | ---------------- | --------- | -------- | ---- |
| title          | *展示框的标题*                   | String \| Number | ——        | no       |      |
| content        | *展示框的值*                     | String \| Number | ——        | no       |      |
| label          | *标题下方的描述信息*             | String           | ——        | no       |      |
| border         | *是否显示边框*                   | Boolean          | true      | no       |      |
| clickable      | *是否开启点击反馈*               | Boolean          | false     | no       |      |
| is-link        | *是否展示右侧箭头并开启点击反馈* | *Boolean*        | false     | no       |      |
| v-model        | 开关选中状态                     | Boolean          | false     | no       |      |
| disabled       | *switch是否禁用*                 | Boolean          | false     | no       |      |
| size           | *switch大小*                     | String           | 20px      | no       |      |
| active-color   | *switch激活时的背景色*           | String           | *#1989fa* | no       |      |
| inactive-color | *switch未激活时的背景色*         | String           | *#fff*    | no       |      |

------



| 方法   | 说明               | 回调参数               | 其他 |
| ------ | ------------------ | ---------------------- | ---- |
| change | *开关状态切换回调* | *checked 是否选中开关* |      |
|        |                    |                        |      |

### CommonPicker  -- 底部弹出选择器

**使用**

```js
import {CommonPicker } from 'caic'
Vue.use(CommonPicker )
```

```html
<caic-common-picker :columns='columns' @getMsg='sure'></caic-common-picker>
```

```js
export default {
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },
  methods: {
    sure(value) {
      Toast(`当前值：${value.value}, 当前索引：${value.index}`);
    }
  }
};
```



**说明**

| 参数              | 说明                                          | 类型             | 默认值 | 是否必传 | 其他 |
| ----------------- | --------------------------------------------- | ---------------- | ------ | -------- | ---- |
| v-model           | 将要显示的值                                  | String \| Number | ——     | yes      |      |
| label             | 输入框的标题                                  | String           | ——     | yes      |      |
| *border*          | *是否显示内边框*                              | *Boolean*        | true   | no       |      |
| labelAlign        | 文本对齐方式，可选值为left center right       | String           | left   | no       |      |
| inputAlign        | 输入框内容对齐方式，可选值为left center right | String           | left   | no       |      |
| placeholder       | 输入框提示语                                  | String           | ——     | no       |      |
| columns           | 对象数组，配置每一列显示的内容                | Array            | ——     | yes      |      |
| title             | picker顶部栏标题                              | String           | ——     | no       |      |
| itemHeight        | 选项高度                                      | Number           | 44     | no       |      |
| confirmButtonText | 确认按钮文字                                  | String           | *确认* | no       |      |
| cancelButtonText  | 取消按钮文字                                  | String           | *取消* | no       |      |
| visibleItemCount  | 可见的选项个数                                | Number           | 5      | no       |      |

------



| 方法    | 说明               | 参数                                                         |
| ------- | ------------------ | ------------------------------------------------------------ |
| confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引<br/>多列：所有列选中值，所有列选中值对应的索引 |
| cancel  | 点击取消按钮时触发 | 单列：选中值，选中值对应的索引<br/>多列：所有列选中值，所有列选中值对应的索引 |
| change  | *选项改变时触发*   | 单列：Picker 实例，选中值，选中值对应的索引<br/>多列：Picker 实例，所有列选中值，当前列对应的索引 |

------

picker 实例方法

| 方法名          | 参数                     | 返回值      | 介绍                       |
| --------------- | ------------------------ | ----------- | -------------------------- |
| getValues       | -                        | values      | 获取所有列选中的值         |
| setValues       | values                   | -           | 设置所有列选中的值         |
| getIndexes      | -                        | indexes     | 获取所有列选中值对应的索引 |
| setIndexes      | indexes                  | -           | 设置所有列选中值对应的索引 |
| getColumnValue  | columnIndex              | value       | 获取对应列选中的值         |
| setColumnValue  | columnIndex, value       | -           | 设置对应列选中的值         |
| getColumnIndex  | columnIndex              | optionIndex | 获取对应列选中项的索引     |
| setColumnIndex  | columnIndex, optionIndex | -           | 设置对应列选中项的索引     |
| getColumnValues | columnIndex              | values      | 获取对应列中所有选项       |
| setColumnValues | columnIndex, values      | -           | 设置对应列中所有选项       |

------

Slot

| 名称         | 说明             |
| ------------ | ---------------- |
| *right-icon* | *自定义尾部图标* |



### DatePicker -- 日期选择器

**使用**

```js
import {DatePicker} from 'caic'
Vue.use(DatePicker)
```

```html
<caic-date-picker :default-value='now'></caic-date-picker>
<script>
    export default {
        data () {
            retrun {
                now:new Date()
            }
        }
    }
</script>
```

**说明**

| 参数                | 说明                                            | 类型     | 默认值     | 是否必传 | 其他 |
| ------------------- | ----------------------------------------------- | -------- | ---------- | -------- | ---- |
| min-date            | *可选的最小时间，精确到分钟*                    | Date     | *十年前*   | no       |      |
| max-date            | *可选的最大时间，精确到分钟*                    | Date     | *十年后*   | no       |      |
| min-hour            | *可选的最小小时，针对 time 类型*                | *Number* | 0          | no       |      |
| max-hour            | *可选的最大小时，针对 time 类型*                | *Number* | 23         | no       |      |
| min-minute          | *可选的最小分钟，针对 time 类型*                | *Number* | 0          | no       |      |
| max-minute          | *可选的最大分钟，针对 time 类型*                | *Number* | 59         | no       |      |
| item-height         | *选项高度*                                      | Number   | 44         | no       |      |
| confirm-button-text | *确认按钮文字*                                  | String   | 确认       | no       |      |
| cancel-button-text  | *取消按钮文字*                                  | String   | 取消       | no       |      |
| visible-item-count  | *可见的选项个数*                                | Number   | 5          | no       |      |
| date-formate-rule   | 日期格式化规则                                  | String   | YYYY-MM-DD | no       |      |
| type                | 类型，可选值为date,time,year-month,datetime     | String   | Date       | no       |      |
| default-date        | 日期弹出层的默认显示日期                        | Date     | 当前时间   | no       |      |
| is-sel              | 是否可以选择日期                                | Boolean  | true       | no       |      |
| *border*            | *是否显示内边框*                                | Boolean  | true       | no       |      |
| *label-align*       | *文本对齐方式，可选值为left center right*       | String   | left       | no       |      |
| *input-align*       | *输入框内容对齐方式，可选值为left center right* | String   | left       | no       |      |
| *disabled*          | *是否禁用输入框*                                | Boolean  | false      | no       |      |
| bold-title          | 标题是否加粗                                    | Boolean  | false      | no       |      |
| v-model             | *显示框的默认值*                                | String   | ——         | yes      |      |

------



| 方法    | 说明                       | 回调参数                                             | 其他 |
| ------- | -------------------------- | ---------------------------------------------------- | ---- |
| confirm | *点击完成按钮时触发的事件* | *dateObject--日期对象, formatedDate--格式化后的日期* |      |
| cancel  | *点击取消按钮时触发的事件* | ——                                                   |      |
| change  | *当值变化时触发的事件*     | *picker 实例*                                        |      |

------

picker 实例方法

| 函数                           | 说明                                       |
| ------------------------------ | ------------------------------------------ |
| getColumnValue(index)          | 获取对应列中选中的值                       |
| setColumnValue(index, value)   | 设置对应列中选中的值                       |
| getColumnValues(index)         | 获取对应列中所有的备选值                   |
| setColumnValues(index, values) | 设置对应列中所有的备选值                   |
| getValues()                    | 获取所有列中被选中的值，返回一个数组       |
| setValues(values)              | `values`为一个数组，设置所有列中被选中的值 |

------

Slot

| 名称       | 说明                 |
| ---------- | -------------------- |
| right-icon | 自定义输入框尾部图标 |



### SexRadio -- 性别选择器

**使用**

```js
import {SexRadio} from 'caic'
Vue.use(SexRadio)
```

```html
<caic-sex-radio></caic-sex-radio>
```

**说明**

| 参数        | 说明                            | 类型   | 默认值 | 是否必传 | 其他 |
| ----------- | ------------------------------- | ------ | ------ | -------- | ---- |
| default-sex | 默认性别 '1'——> 男性 '2'——>女性 | String | '1'    | no       |      |

------



| 方法   | 说明                              | 回调参数 |
| ------ | --------------------------------- | -------- |
| getMsg | 将选择结果返回 1——> 男性 2——>女性 | sexCode  |
