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


### preload and prefetch

浏览器决定优先级，然后进行资源的加载、解析、渲染等，preload、prefetch可以控制浏览器加载资源的方法。

- preload，可以强制浏览器在不阻塞document的onload事件的情况下请求资源，页面关闭就会停止加载。预加载资源，用到时再执行
- prefetch，可以在浏览器空闲时预加载资源，通常用于加载非首页用到的资源。页面关闭请求不会中断

使用方法：`<link ref="prefetch" href="资源地址" as="script" />`

加载优先级：preload需要有as属性来获得优先级，有as属性将获得最高优先级，没有则是异步请求
   as的值有：style、script、image、font、fetch、document、audio、vedio等，其中style优先级最高，script优先级为中或低

二次加载：
   - 如果页面上使用这个资源时，preload资源还没下载完，不会造成二次加载，而是等待第一次下载并执行脚本。
   - 请求跨域资源时推荐加上crossorigin属性，不然可能会导致资源的二次加载，比如font资源

### defer and async

html会安装script顺序来加载执行脚本，在加载执行过程中会阻塞后续的dom渲染，script提供了async和defer这2个属性来解决dom渲染阻塞问题。

没有这2个属性，浏览器会在立即加载并执行脚本；

有 async，加载和渲染后续dom元素的过程和script的加载、执行是并行进行的（异步）

有 defer，加载和渲染后续dom元素的过程和script的加载是并行进行的（异步），但是script脚本的执行要在所有元素解析完成后，DOMContentLoaded(DOM构建完毕的时候触发, jQuery的ready方法包裹的就是这个事件) 事件触发前完成

defer、async 在网络读取上是一致的，相对于html解析来说都是异步的，defer是加载完后按顺序执行，async加载完后立即执行

适用场景：
   defer：依赖页面dom元素，会被其他脚本依赖
   async：百度统计。不关心页面中dom元素是否解析完毕，也不依赖其他脚本


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
2. 从js文件提取css，并用contenthash
3. 对公共依赖包单独打包
4. 小图可以base64形式打包入文件中，减少http请求



可以借鉴 [这里](https://leohxj.gitbooks.io/front-end-database/content/preference/code-style.html)

