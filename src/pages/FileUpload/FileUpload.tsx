import React, { useState } from 'react';
import { Typography } from 'antd';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import { mergeChunks, slice, uploadAllChunks } from './Upload';
const { Paragraph } = Typography;

export default function FileUpload() {
  const [state, setState] = useState<any>({
    successList: [],
    errList: [],
  });
  // 上传文件
  const onChangeFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    if (!files || files.length === 0) return;

    const LENGTH = 1024 * 1024 * 0.1;
    const chunks = slice(files[0], LENGTH);

    // 上传chunks分片
    uploadAllChunks(chunks).then(res => {
      console.log('uploadAllChunks', res);
      setState({
        successList: res.successList,
        errList: res.errList,
      });

      // 通知服务端开始合并chunks分片
      mergeChunks().then(res => {
        console.log('服务端合并文件分片', res);
      });
    });
  };

  return (
    <div>
      <div>
        <p>断点上传</p>
        <div>
          <input type="file" onChange={onChangeFile} />
          <p>成功：{state.successList.length}个</p>
          <p>失败：{state.errList.length}个</p>
        </div>
        <div>
          <p>base64编码的缺点在于其体积比原图片更大</p>
        </div>
      </div>
      <hr />
      <div>
        <p>压缩上传</p>
        <ul>
          <li>通过原生的input标签拿到要上传的图片文件</li>
          <li>将图片文件转化成img元素标签</li>
          <li>在canvas上压缩绘制该HTMLImageElement</li>
          <li>将canvas绘制的图像转成blob文件</li>
          <li>最后将该blob文件传到服务端</li>
          <li>完成！</li>
        </ul>
        <Paragraph
          copyable={{
            icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
            tooltips: ['click here', 'you clicked!!'],
          }}
        >
          Custom Copy icon and replace tooltips text.
        </Paragraph>
        {`
            // 前端图片压缩 
            export const changeimagesize = (div) => { 
              if (!div) {
                return ''
              } 
              
              let img = new Image() 
              img.src = div.src 
              var canvas = document.createElement('canvas') 
              var context = canvas.getContext('2d') 
              canvas.width = 600 //压缩宽度 
              canvas.height = img.height / img.width * canvas.width 
              context.drawImage(div, 0, 0, canvas.width, canvas.height) 
              return canvas.toDataURL() 
            }
        `}
      </div>
      <hr />
      <div>
        <p>获取照片的exif信息</p>
        <div>
          <a href="https://github.com/exif-js/exif-js"></a>
        </div>
      </div>
    </div>
  );
}
