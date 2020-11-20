import Mock from 'mockjs';

let id = 0;
Mock.mock('/api/produce/list', 'get', function () {
  return {
    success: true,
    data: Array.from({ length: 10 }).map(() => {
      return {
        id: String(++id),
        name: Math.random().toString(36).substr(2),
        num: parseInt(String(Math.random() * 100)),
      };
    }),
  };
});
