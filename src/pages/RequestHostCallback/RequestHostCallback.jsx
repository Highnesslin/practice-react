import React from 'react';

export default function RequestHostCallback() {
  function VNode2HTML(root) {
    let { type, props, children } = root;

    let sub = ''; // 获取子节点渲染的html片段
    Array.isArray(children) &&
      children.forEach(child => {
        sub += VNode2HTML(child);
      });

    let el = ''; // 当前节点渲染的html片段
    if (type) {
      let attrs = '';
      for (var key in props) {
        attrs += getAttr(key, props[key]);
      }
      el += `<${type}${attrs}>${sub}</${type}>`; // 将子节点插入当前节点
    } else {
      el += root; // 纯文本节点则直接返回
    }

    return el;
  }

  function getAttr(prop, val) {
    // 渲染HTML，假设我们不需要 事件 等props
    let isEvent = prop.indexOf('on') === 0;
    return isEvent ? '' : ` ${prop}="${val}"`;
  }

  return (
    <div>
      <p>
        requestIdleCallback会在每一帧结束后执行，去判断浏览器是否空闲，
        如果浏览器一直处于占用状态，则没有空闲时间，
        且如果requestIdleCallback没有设置timeout时间，那么callback的任务会一直推迟执行，
        如果在当前帧设置timeout，浏览器会在当前帧结束的下一帧开始判断是否超时执行callback。
        requestIdleCallback任务没有和浏览器的帧渲染对其，应用不当会造成掉帧卡顿，
        原则上requestIdleCallback的FPS只有20，所以有高FPS要求的、需要和渲染帧对齐执行任务，如DOM动画等，
        建议用requestAnimationFrame，才会达到最佳流畅效果。
      </p>
      <div>
        <button>start</button>
        <button>cancel</button>
      </div>
    </div>
  );
}
