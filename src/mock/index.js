import Mock from 'mockjs';
import './produce';

Mock.setup({
  timeout: '1000-2000',
});

Mock.mock('/api/test', 'get', {
  success: true,
  data: [
    {
      id: 0,

      username: 'admin',

      password: '123456',
    },
    {
      id: 1,

      username: 'user1',

      password: '123456',
    },
    {
      id: 2,

      username: 'user2',

      password: '123456',
    },
  ],
});

Mock.mock('/api/login', 'post', {
  success: true,
  data: {
    username: 'root',
    mobile: '17866673125',
    avator: 'kkkkk',
  },
});
