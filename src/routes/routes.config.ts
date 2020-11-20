import { lazy } from 'react';
import BaseLayout from '../Layout/BaseLayout';

const RouteConfig = [
  {
    name: 'root',
    path: '/basic',
    component: BaseLayout,
    children: [
      {
        name: '首页',
        path: '/basic/home',
        component: lazy(() => import('../pages/Home/Home')),
      },
      {
        name: 'Context',
        path: '/basic/Context',
        component: lazy(() => import('../pages/Context/Context')),
      },
      {
        name: '命令式弹窗',
        path: '/basic/Layer',
        component: lazy(() => import('../pages/Layer/Layer')),
      },
      {
        name: 'http相关',
        path: '/basic/Network',
        component: lazy(() => import('../pages/Network/Network')),
      },
      {
        // name: '详情',
        path: '/basic/ReduxDetail/:detailId',
        component: lazy(() => import('../pages/ReduxDetail/ReduxDetail')),
      },
      {
        name: 'Redux和Thunk',
        path: '/basic/Redux&Thunk',
        component: lazy(() => import('../pages/ReduxThunk/ReduxThunk')),
      },
      {
        name: 'Redux状态设计规范',
        path: '/basic/Redux',
        component: lazy(() => import('../pages/Redux/Redux')),
      },
      {
        name: 'React-Route-dom 原理',
        path: '/basic/route',
        component: lazy(() => import('../pages/ImitateRoute/ImitateRoute')),
      },
      {
        name: '文件上传',
        path: '/basic/FileUpload',
        component: lazy(() => import('../pages/FileUpload/FileUpload')),
      },
      {
        name: '虚拟列表',
        path: '/basic/VirtualList',
        component: lazy(() => import('../pages/VirtualList/VirtualList')),
      },
      {
        name: 'RequestHostCallback',
        path: '/basic/RequestHostCallback',
        component: lazy(() => import('../pages/RequestHostCallback/RequestHostCallback')),
      },
      {
        path: '/',
        redirect: '/basic/home',
      },
    ],
  },
  {
    path: '/login',
    component: lazy(() => import('../pages/Login/Login')),
  },
  {
    path: '/',
    redirect: '/basic',
  },
];

// 给布局页面使用的路由菜单
const children = RouteConfig[0].children
  ?.filter(item => item.name)
  .map(item => {
    return {
      name: item.name,
      path: item.path,
    };
  });

export { children };
export default RouteConfig;
