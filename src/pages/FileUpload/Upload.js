// 上传所有的分片
const uploadAllChunks = chunks => {
  const successList = []; // 成功的任务
  const errList = []; // 异常的任务

  return Promise.all(chunks.map(uploadFileChunk)).then(res => {
    res.forEach(item => {
      const { success, data } = item;
      if (!success) {
        errList.push(data);
      } else {
        successList.push(data);
      }
    });
    return {
      successList,
      errList,
    };
  });
};

// 上传某一个文件分片
const uploadFileChunk = chunk => {
  return new Promise((resolve, rejects) => {
    const isSuccess = Math.floor(Math.random() * (1 - 0 + 1) + 0); // Math.floor(Math.random()*(m-n+1)+n)

    setTimeout(() => {
      isSuccess
        ? resolve({
            success: true,
            data: chunk,
          })
        : rejects({
            success: false,
            data: chunk,
          });
    }, Math.random() * 3000);
  }).catch(err => err);
};

// 通知服务端开始合并分片
const mergeChunks = () => {
  return new Promise(resolve => {
    resolve({
      code: 200,
      data: {},
    });
  });
};

// 将文件分成多个片
function slice(file, piece = 1024 * 1024 * 5) {
  console.log(file.name);
  const totalSize = file.size;
  const chunks = [];
  let start = 0;
  let end = start + piece;

  while (start < totalSize) {
    // file是Blob对象的子类，Blob对象包含一个slice方法，通过这个方法，可以对二进制文件进行拆分
    const blob = file.slice(start, end);
    chunks.push(blob);

    start = end;
    end = start + piece;
  }
  return chunks;
}

export { slice, uploadAllChunks, mergeChunks };
