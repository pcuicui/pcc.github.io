# web 性能优化

可以从哪些方面来说呢？
1. 编码
   1. react 上的：pureComponent、React.memo、shouldComponentUpdate、key
   2. 图片懒加载
2. 浏览器
   1. 浏览器缓存
   2. 减少请求数：
      js、css放到html中
      用js实现图片异步加载或懒加载
      小图片使用data-uri
   3. 减少传输体积
      控制图片清晰度
      设计上避免大型背景图
   4. 回流与重绘
      1. 重绘：样式改变，color等
      2. 回流：涉及到页面布局的更新，一个节点的回流可能会导致其子节点、随后节点、祖先节点的回流
3. 构建打包
   1. tree-shaking
   2. 分包
   3. 压缩
   4. chunk hash、content hash
   5. 资源嵌入，小于10kb的图片以base64格式嵌入文件，减少http请求数量


### css
1. css文件放在head中
2. 合并css资源文件，减少http请求
3. 移除空的css规则
4. 避免选择器层级过深
5. 抽取公共样式
6. 属性为0不加单位
7. 属性小于1省略小数点前的0
8. 雪碧图

### js
1. 资源文件放在body底部
2. 节流、防抖
3. 图片懒加载
4. 动态加载
5. 批量绑定事件，用事件委托，冒泡
6. 对dom的样式操作记得减少回流重绘，可使用class、style.cssText

### 网络请求
1. 较少http请求量
2. 浏览器缓存，公共依赖包单独打包
3. cdn托管静态文件

### 构建
1. tree-shaking
2. 从js文件提取css，并用cententhash
3. 对公共依赖包单独打包
4. 小图可以base64形式打包入文件中，减少http请求

