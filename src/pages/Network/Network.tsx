import React, { useEffect, useRef, useState } from 'react';
import axios, { Canceler } from 'axios';

export default function Network() {
  const [loading, setLoading] = useState<boolean>(true);
  const cancel = useRef<Canceler>();

  useEffect(() => {
    axios
      .get('/api/test', {
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel.current = c;
        }),
      })
      .then(res => {
        setLoading(false);
        console.log('res', res);
      });
    return () => {
      if (cancel.current) {
        console.log('取消请求');
        cancel.current();
      }
    };
  }, []);

  return (
    <div>
      <p>可中断的axios请求</p>
      <p>{loading ? '请求中' : '请求结束'}</p>
    </div>
  );
}
