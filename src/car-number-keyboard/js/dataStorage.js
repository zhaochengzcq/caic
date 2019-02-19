/**
 * 存储一些用于初始化车牌号键盘的数据
 */
var provinceAbbreviationList = [
  '京',
  '沪',
  '津',
  '苏',
  '黑',
  '辽',
  '浙',
  '赣',
  '湘',
  '晋',
  '豫',
  '云',
  '冀',
  '皖',
  '鲁',
  '新',
  '鄂',
  '桂',
  '甘',
  '蒙',
  '陕',
  '吉',
  '闽',
  '贵',
  '粤',
  '川',
  '渝',
  '琼',
  '青',
  '宁'
]

var keyboardOne = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
var keyboardTwo = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
var keyboardThree = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
var keyboardFour = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'done', 'del']
var carTableKeyboard = {
  one: keyboardOne,
  two: keyboardTwo,
  three: keyboardThree,
  four: keyboardFour
}
export { provinceAbbreviationList, carTableKeyboard }
