# 组件按需加载

需要用到动态import()

babel 配置中的 modules 不能是 commonjs ，不然会发现动态加载的文件没有构建出来

## 方式一：React.lazy 、React.Suspense
它们不支持服务端渲染

```js
const Comp = React.lazy(() => import('./comp'))

export default () => {
  return (
    <div>
      <Comp>
    </div>
  )
}
```


## 方式二：@loadable/component
[@loadable/component](https://loadable-components.com/docs/loadable-vs-react-lazy/)

支持[服务端渲染](https://loadable-components.com/docs/server-side-rendering/)，此时依赖 @loadable/babel-plugin @loadable/webpack-plugin @loadable/server

```js
import loadable from '@loadable/component'
const Comp = loadable(() => import(/* webpackPrefetch: true */'./comp'))

export default () => {
  return (
    <div>
      <Comp>
    </div>
  )
}
```

```js
// 服务端render
const ReactDOMServer = require('react-dom/server')
const serverStatsFile = path.resolve(__dirname, '../../build/server/loadable-stats.json')
const clientStatsFile = path.resolve(__dirname, '../../build/client/loadable-stats.json')
const { ChunkExtractor } = require('@loadable/server')

const serverExtractor = new ChunkExtractor({ statsFile: serverStatsFile, entrypoints: [`${pathName}`] })
const clientExtractor = new ChunkExtractor({ statsFile: clientStatsFile, entrypoints: [`${pathName}`] })
const ClientPage = serverExtractor.requireEntrypoint().default
const props = Object.assign({}, data)
const element = clientExtractor.collectChunks(
  React.createElement(ClientPage, props)
)
const content = ReactDOMServer.renderToString(element)
// const scriptTags = clientExtractor.getScriptTags() // or extractor.getScriptElements();
const styles = clientExtractor.getStyleTags() // or extractor.getStyleElements();


```

服务端渲染时，webpack配置要有client端、server端2份配置

非开发环境，打包后的 loadable-stats.json 中的 outputPath 需要修改为真实服务器的路径，不能是打包机的路径



