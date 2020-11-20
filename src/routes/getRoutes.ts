import { lazy } from 'react';

// @ts-ignore 找到 router 文件夹下以 .js 命名的文件
const files = require.context('../pages/', true, /\.*?(?:.tsx|.jsx)$/);
const childRoutes = files.keys().map((file: string, index: number) => {
  const path = file.match(/\/.*?(?=.tsx|.jsx)/g); // 不包含结尾字符
  const name = file.match(/(?<=\/).*?(?=\/)/g);
  if (!path || path.length === 0 || !name) return;

  // console.log(path[0]);

  return {
    name: name[0],
    path: `/basic${path[0]}`,
    component: lazy(() => import(`../pages${path[0]}`)),
  };
});
// console.log('childRoutes', childRoutes);
export default childRoutes;
