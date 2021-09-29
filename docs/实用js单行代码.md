# 实用的js单行代码

转自[20个杀手级JavaScript单行代码](https://mp.weixin.qq.com/s/ZrjDGucu24jK6HWN7iCy8g)

## 获取浏览器cookie的值
```js
const getCookie = (name) => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

getCookie('token')
```

## 清除全部cookie
测试没成功。

```js

const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/,`=;expires=${new Date(0).toUTCString()};path=/`))

```

## 颜色RGB转十六进制
```js
const rgbToHex = (r,g,b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

rgbToHex(0,0,0) // #000000
```

## 生成随机十六进制颜色
padEnd 字符串补全，padEnd(6, "0") 表示不满足6位则从后用0补全

Number.prototype.toString() 返回指定number对象的字符串表示形式

```js
const randomHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")

console.log(randomHex())
```


## 复制到剪贴板
借助 `navigator.clipboard.writeText` 可以很容易的将文本复制到剪贴板，但规范要求写入剪贴板前需使用[Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API)获取写入权限，这各个浏览器要求不同。可查看 compatibility table and Clipboard availability in Clipboard。 [Navigator.clipboard](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/clipboard)

```js
const clipToClipboard = (text) => navigator.clipboard.writeText(text)

clipToClipboard('hello world')
```

## 获取用户选择的文本
使用内置的 getSelection 属性
```js
const getSelectionText = () => window.getSelection().toString()

getSelectionText()
```


## 检查日期是否合法

```js
const isDateValid = (val) => !Number.isNaN(new Date(val).valueOf()) 

isDateValid('December 17, 1995 03:24:00') // true
```

## 查找日期位于一年中的第几天

```js
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24 )

dayOfYear(new Date())
```

## 时间处理
给定日期处理成 HH:mm:ss 格式

```js
const timeFromDate = (date) => date.toTimeString().slice(0, 8)

timeFromDate(new Date())
```

## 计算2个日期之间相差多少天

```js
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24 )

dayDiff(new Date('2021-09-29'), new Date('2021-10-01'))
```

## 英文字符串首字母大写

```js
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

capitalize('hello') // Hello
```

## 数组去重
```js
const removeDuplicates = arr => [...new Set(arr)]

removeDuplicates([1,1,2,3,3,3,5,5,3]) // [1, 2, 3, 5]
```

## 打乱数组
```js
const shuffleArray = arr => arr.sort((a,b) => 0.5 - Math.random())

shuffleArray([1,1,2,3,3,3,5,5,3])
```


## 从URL获取查询参数
Object.fromEntries 把键值对列表转为对象
```js
Object.fromEntries(new URLSearchParams(window.location.search))

```

## 求数字的平均值

```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length
average(1,2,3,4)
```

## 翻转字符串
使用 split、reverse、join
```js
const reverse = (str) => str.split('').reverse().join('')
reverse('hello world')
```

## 回到顶部

```js
const gotoTop = () => window.scrollTo(0,0)
gotoTop()
```

## 检查用户的设备是否是暗模式

```js
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
console.log(isDarkMode)
```











