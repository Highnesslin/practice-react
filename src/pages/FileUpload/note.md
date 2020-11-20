### 断点上传

1. 读取文件，因为 File 类是 Blob 类的子类，因此同样具有 slice 方法，可以拆分成多个 chunks
2. 调用 Promise.all 批量执行 chunks 上传 任务，
3. 批量上传中途有失败任务时，将失败任务存储在缓存（闭包作用域 or 全局），等待用户再次上传，
4. 任务全部上传成功时，再发请求通知服务端开始合并 chunks 为单文件，
5. chunks 存储形式

```
{
    [name]: [chunk1,chunk2,chunk3,chunk4,chunk5,chunk6...],
}
```

6. 服务端处理：将 chunk 存储在临时缓存文件，命名为[name uid date.index]，最后统一合并成[name uid date]

### base64

Base64 编码的思想是是采用 64 个基本的 ASCII 码字符对数据进行重新编码。它将需要编码的数据拆分成字节数组。以 3 个字节为一组。按顺序排列 24 位数据，再把这 24 位数据分成 4 组，即每组 6 位。再在每组的的最高位前补两个 0 凑足一个字节。这样就把一个 3 字节为一组的数据重新编码成了 4 个字节。当所要编码的数据的字节数不是 3 的整倍数，也就是说在分组时最后一组不够 3 个字节。这时在最后一组填充 1 到 2 个 0 字节。并在最后编码完成后在结尾添加 1 到 2 个"="。

从以上编码规则可以得知，通过 Base64 编码，原来的 3 个字节编码后将成为 4 个字节，即字节增加了 33.3%，数据量相应变大。所以 20M 的数据通过 Base64 编码后大小大概为 20M\*133.3%=26.67M。

优点：

- 减少 http 请求

缺点：

- 其体积比原图片更大
- base64 无法缓存，要缓存只能缓存包含 base64 的文件

### 文件压缩上传

- 拿到要上传的图片文件
- 将图片文件转化成 img 元素标签（用于改变宽高）
- 在 canvas 上压缩绘制该 HTMLImageElement
- 将 canvas 绘制的图像转成 blob 文件
- 最后将该 blob 文件传到服务端

```
export const changeimagesize = (el) => {
    if (!el) {
        return ''
    }

    const img = new Image()
    img.src = el.src

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 600 //压缩宽度
    canvas.height = img.height / img.width * canvas.width
    context.drawImage(el, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL()
}
```

### 获取 exif 信息

https://github.com/exif-js/exif-js
