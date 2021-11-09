# React

## v16

### 生命周期
1. `static getDerivedStateFromProps(nextProps, prevState)` 替换 `componentWillReceiveProps`
2. `static getSnapshotBeforeUpdate` 替换 `componentWillUpdate`
3. 避免使用 componentWillReceiveProps，因为fiber将组件的更新分为2个阶段：render parse（渲染解析）、commit parse（提交解析）。第一阶段会调用 componentWillMount 、 componentWillReceiveProps 、 componentWillUpdate ；第二阶段会调用 componentDidMount 、 componentDidUpdate 、 componentWillUnmount 。
### fiber

### hooks
好处：
1. 跨组件复用；
2. 状态与UI隔离；
3. 使状态逻辑更细粒化；
4. 相比类组件较简化
缺点：
1. 避免在循环、条件判断、嵌套函数内调用hooks
2. 只能在函数定义组件和hooks中调用hooks
3. 不能在useEffect中使用useState

钩子函数：
1. useEffect(callback, deps) ，可以实现 componentDidMount 、 didupdate 、willUnmount ，deps不存在则相当于 didUpdate （而且每次render时会调用2次回调，先调用上次保存的回调中返回的函数，再重新调用回调），deps为空数组则相当于 didMount ，回调函数中返回的函数会在 willUnmount 时调用。
2. useCallback(callback, deps) ， 缓存函数引用，依赖的变量未变则函数引用不变，空数组则会永久缓存。如果函数会变，当函数作为props传给起亚组件时，pureComponent、shouldUpdateComponent 、 React.memo 会失效
3. useMemo(callback, deps) ， 缓存第一个入参函数执行后返回的值，依赖的变量未变则第一个入参函数不会被调用
4. useRef
5. useContext



