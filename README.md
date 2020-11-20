# react 常用 API 及使用心得

## 多个 loading 冲突问题

引入一个用于计数的变量，

loading 时先判断数量是否为 0，满足条件则+1，然后执行，

close 时先-1，若数量为 0，则执行

```
let loadingCount = 0
function open() {
    if(loadingCount > 0) return

    loadingCount++;
    loading.open();
}
function close() {
    loadingCount--
    if(loadingCount === 0) {
        loading.close()
    }
}
```

## 嵌套路由

```
<BrowserRouter>
    <Route
        path="/"
        component={() => (
            <BaseLayout>
                <Route path="/" component={Home} />
                <Route path="/Context" component={Context} />
            </BaseLayout>
        )}
    />
</BrowserRouter>
```

嵌套路由使用时，上一级路由和子级路由重名时该路由将一直存在

## 懒加载

1. lazy(() => import('../pages/Home'))
2. 路由组件使用了懒加载，外层路由用 `<Suspense>` 包裹

```
BaseLayout.tsx
    <Suspense fallback={<div>loading...</div>}>{props.children}</Suspense>
```

## React.cloneElement

- 第一个参数为必选参数：TYPE（ReactElement）
- 第二个参数为可选参数：[PROPS（object）]，
- 第三个参数为可选参数：[CHILDREN（ReactElement）]

第一个参数必须是 ReactElement，当参数为函数组件时，先执行或者第一个参数写成组件形式，否则函数组件会替换掉我们自定义的属性

[Difference between React Component and React Element](https://stackoverflow.com/questions/30971395/difference-between-react-component-and-react-element)

```
const getChildren(component) {
    return React.cloneElement(children, {
        ...children.props,
        onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            children.props.onClick && children.props.onClick(e);
        },
    });
}
const component = <span>tips</span>
const funComponent = () => {
    return (
        <span>tips-func</span>
    )
}
getChildren(component)                 √
getChildren(funComponent)              ×
getChildren(funComponent())            √
React.cloneElement(<children />, ...)  √
```

## ReactDOM.unmountComponentAtNode

销毁容器内的所有 react 实例

## 路径别名

- webpack.config.js
  alias
- tsconfig.json
  ```
  "paths": {
    "@/_": ["src/_"]
  }
  ```

## 正则

```
以.tsx或.jsx结尾的路径
/\.*?(?:.tsx|.jsx)$/
```
