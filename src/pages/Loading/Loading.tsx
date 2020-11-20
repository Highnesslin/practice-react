import React from 'react';

export default function Loading() {
  return (
    <div>
      <p>多个loading的展示与关闭</p>
      <div>
        <p>新增计数器</p>
        <p>展示时+1</p>
        <p>关闭时-1，如果数量===0，则关闭</p>
      </div>
    </div>
  );
}
