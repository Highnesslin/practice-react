import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('text');
  return (
    <div>
      <p>组件state初始值使用props</p>
      <p>text:{text}</p>
      <button
        onClick={() => {
          setText('Abc123');
        }}
      >
        change Text
      </button>
      <Child text={text} />
    </div>
  );
}

function Child({ text }: any) {
  const [val, setVal] = useState('text');
  return (
    <div>
      <input
        type={val}
        onInput={(e: any) => {
          setVal(e.target.value);
        }}
      />
      <p>input:{val}</p>
    </div>
  );
}
