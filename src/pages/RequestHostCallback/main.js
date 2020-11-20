// 记录需要发送的数据队列
const eventStack = [];
// requestIdleCallback是否已经调度
let isRequestIdleCallbackScheduled = false;

// 模拟发送数据
const sendData = (...arg) => {
  console.log('发送数据', arg);
};

// 休眠
function sleep(date) {
  let flag = true;
  const now = Date.now();
  while (flag) {
    if (Date.now() - now > date) {
      flag = false;
    }
  }
}
function work() {
  sleep(2000); // 模拟主线程任务执行时间

  window.requestIdleCallback(() => {
    console.log('空闲时间1');
    sleep(1000);
    console.log('空闲时间1回调任务执行完成');
  });

  window.requestIdleCallback(() => {
    console.log('空闲时间2');
  });
}

export { sleep, work };
