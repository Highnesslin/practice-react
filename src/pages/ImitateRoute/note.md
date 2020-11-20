## React-router 原理

[React-router](https://github.com/ReactTraining/react-router)
react-router-dom 是基于 react-router 再封装的一个带有 React DOM 组件的库，其中包括了 Link、HashRouter、BrowserRouter 等组件提供给开发者通过使用标签的方式控制路由跳转。

使用 React Router，第一个了解的就是 BrowserRouter 和 HashRouter 这两个内置组件。
通过源码发现其实两个组件的实现是完全一样的，只是内部调用创建 history 实例的方式不一样，一个调用 createHashHistory，另一个调用 createBrowserHistory。

### BrowersRouter

[BrowersRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js)

```
import { Router } from "react-router";
import { createBrowserHistory as createHistory } from "history";

class BrowserRouter extends React.Component {
  history = createHistory(this.props);
  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```

![React Router](https://user-gold-cdn.xitu.io/2020/7/17/1735b1c58080f47f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

重点在 Router 和 history 库

#### Router

```
import HistoryContext from "./HistoryContext.js";
import RouterContext from "./RouterContext.js";
```

Router 的构造函数

```
constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    };

    this.unlisten = props.history.listen(location => {
       this.setState({ location });
    });
}

componentWillUnmount() {
    if (this.unlisten) {
        this.unlisten();
    }
}

render() {
    return (
        <RouterContext.Provider
            value={{
                history: this.props.history,
                location: this.state.location,
                match: Router.computeRootMatch(this.state.location.pathname),
                staticContext: this.props.staticContext
            }}
        >
            <HistoryContext.Provider
                children={this.props.children || null}
                value={this.props.history}
            />
        </RouterContext.Provider>
    );
}

```

组件维护了一个 location 为内部 state 对象，初始值为 BrowersRouter 接收的 props：history

然后，监听 location，变化时更新当前组件的 location

在组件销毁时取消监听

组件树如下

![组件树](https://user-gold-cdn.xitu.io/2020/7/17/1735b1c58238c3fd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

总结：Router 是一个数据提供者，通过 context 让子组件共享这些数据

#### history

(history)[https://github.com/ReactTraining/history]

在 Router 组件可以看到已经用到了 createBrowserHistory 函数返回的 history 实例了，如：history.location 和 history.listen，

首先是咱们这个出镜率较高的 history 提供了哪些属性和方法
![history提供的属性与方法](https://user-gold-cdn.xitu.io/2020/7/17/1735b1c58296b30b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
push、replace、go 这些，都是 window 对象属性 history 所提供的。但有些属性其实是重写了的，如 push、replace，其它的是做了一个简单封装。
![window.history](https://user-gold-cdn.xitu.io/2020/7/17/1735b1c5889dc5a3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
function goBack() {
    go(-1);
}
function goForward() {
    go(1);
}
```

Router 内部状态 location 的初始数据，是使用 window.location 与 window.history.state 做的重组。

路由系统最为重要的两个切换页面动作，一个是 push，一个是 replace，我们平时只用 Link 组件的话，并没有确切的感受，其中 Link 接受一个 props 属性，to :string 或者 to : object

```
<link to='/course'>跳转</link>
<Link to='/course' replace>跳转</Link>
```

这两个方法主要用的是 pushState 和 replaceState 这两个 API，它们提供的能力就是可以增加新的 window.history 中的历史记录和浏览器地址栏上的 url，但是又不会发起真正的网络请求。
这是实现单页面应用的关键点。

![push方法](https://user-gold-cdn.xitu.io/2020/7/17/1735b1c5abdc6f1f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

入参 path，是接下来准备要跳转的路由地址。createLocation 方法先将这个 path，与当前的 location 做一个合并，返回一个更新的 loation。

首先看 transitionManager 的回调函数逻辑，通过更新后的 location，创建出将要跳转的 href，然后调用 pushState 方法，来更新 window.history 中的历史记录。

如果在 BrowserRouter 中传了 forceRefresh 这个属性，那么之后就会直接修改 window.lcoation.href 实现页面跳转，但这样就相当于要重新刷新来进行网络请求了。

如果没有传的话，直接调用 setState，这里的 setState 并不是 react 提供的，而是 history 库自己实现的。

```
function setState(nextState) {
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
}
```

当我们执行了 pushState 后，接下来所获取到的 window.history 都是已经更新的了。

接下来就剩 transitionManager 这最后的一个点了。

transitionManager 是通过 createTransitionManager 这个函数实例出的一个对象

```
function createTransitionManager() {
    var listeners = [];
    function appendListener(fn) {
        var isActive = true;
        function listener() {
            if (isActive) fn.apply(void 0, arguments);
        }
        listeners.push(listener);
        return function () {
            isActive = false;
            listeners = listeners.filter(function (item) {
                return item !== listener;
            });
        };
    }

    function notifyListeners() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        listeners.forEach(function (listener) {
            return listener.apply(void 0, args);
        });
    }

    return {    appendListener: appendListener,    notifyListeners: notifyListeners  };
}
```

回到开始，我们在 Router 组件中已经用过一个 history.listen 方法，其内部实现就是用的 transitionManager.appendListener 方法

当时我们给 listen 传入一个回调函数，这个回调函数通过 React 的 setState 来更新组件内部的 locaton，然后又因为这个 lcoation 传入了 Router-context 的 value 中，所以当它发生变化时，所有的消费组件，都会重新 render，以此来达到更新 UI 的目的。

listen 的执行细节是，把它的入参函数（这里指更新 Router 组件 state.location 的函数）会传入到 appendListener 中。

执行 appendListener 后，appendListener 将这个入参函数推到 listeners 这个数组中，保存起来。然后返回一个取消监听的函数，取消监听函数删掉了推进该数组的那个函数，以此来实现取消监听的功能。

所以当子组件使用 push，切换路由时，history 实例会执行 notifyListeners 并传入更新的 location。

然后就是遍历 listeners，执行我们在 listen 传入的回调，此时就是最终的去更新 Router 的 location 的过程了。
后面的流程，Router 里面的 Route 组件通过匹配 pathname 和 更新的 location ，来决定是否渲染该页面组件，到此整个的路由跳转的过程就结束了。
