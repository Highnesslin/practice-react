### 函数组件中使用 redux，注意优化

1. useSelector 每次只返回一个基本数据类型
2. 使用 shallowEqual
3. 使用 reselect

### Redux 的 state 树的设计方式

```
state: {
    byIds: {
        1: {},
        2: {}
    },
    allIds: [1,2],
    loading: true,
}

```

### 页面刷新 redux 数据丢失

1. 页面之间的数据不依赖其他页面，数据从接口拿
2. window.onunload 时缓存数据，页面加载时再取出

```
let initialState={};
if(localStorage.getItem('store')){
  initialState=JSON.parse(localStorage.getItem('store'));
}

// 1. Initialize
const app = dva({
  history: browserHistory,
  initialState:initialState
});

window.onunload=function () {
  localStorage.setItem('store',JSON.stringify(app._store.getState()));
};
```

3. redux-persist
