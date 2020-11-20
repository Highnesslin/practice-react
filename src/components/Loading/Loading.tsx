import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Loading.module.css';

const container = document.createElement('div');
document.body.appendChild(container);

function Loading() {
  return (
    <div className={styles['loading']}>
      <div className={styles['wrapper']}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

let loadingCount = 0;
function open() {
  loadingCount++;
  return ReactDOM.render(<Loading />, container);
}

function close() {
  loadingCount--;
  if (loadingCount === 0) {
    return ReactDOM.unmountComponentAtNode(container);
  }
}

export default {
  open,
  close,
};
