import React from 'react';

export default function DownBinary() {
  const code = `
    axios({
        method: 'post',
        url: '/export',
        responseType: 'arraybuffer', // 表示服务端响应的类型
    })
    .then(res => {
        if (res instanceof ArrayBuffer) {
            const utf8decoder = new TextDecoder()
            const u8arr = new Uint8Array(res)
            // 将二进制数据转为字符串
            const temp = utf8decoder.decode(u8arr)
            if (temp.includes('{code:199999')) {
                Message({
                    // 字符串转为 JSON 对象
                    message: JSON.parse(temp).msg,
                    type: 'error',
                    duration: 5000,
                })
    
                return Promise.reject()
            }
        }
    })
    .then(res => {
        // 假设 data 是返回来的二进制数据
        const data = res.data
        const url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
  `;
  return (
    <div>
      <p>下载</p>
      <ul>
        <li>1、window.open(link)</li>
        <li>2、服务端返回二进制内容，前端进行组合</li>
      </ul>
      <div>
        <p>
          Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据
        </p>
        <p>{code}</p>
      </div>
    </div>
  );
}
