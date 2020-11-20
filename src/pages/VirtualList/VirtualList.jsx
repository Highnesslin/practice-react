import React from 'react';
import './VirtualList.css';

class VirtualList extends React.Component {
  /*
   * 假设每项数据的dom元素高度为30px
   * 实际项目可能每项高度不一样
   * */
  static itemH = 30;

  constructor(props) {
    super(props);

    // 可视区域dom结构
    this.virtualList = React.createRef();

    // 列表假数据
    this.serverData = Array.from({ length: 100000 }).map((_, i) => {
      return {
        key: i.toString(),
        val: 'Item' + i,
      };
    });

    // 计算总高度
    const totalH = this.serverData.length * VirtualList.itemH + 'px';

    this.state = {
      data: [], // 可视区域数据
      totalHeight: totalH, // 长列表总高度 列表中每一项数据高度总和
      transform: '',
    };
  }

  componentDidMount() {
    this.updateViewContent();
  }

  handleScroll = e => {
    /*
     * 获取scrollTop
     * 此属性可以获取或者设置对象的最顶部到对象在当前窗口显示的范围内的顶边的距离
     * 也就是元素滚动条被向下拉动的距离
     * */
    this.updateViewContent(e.target.scrollTop);
  };

  updateViewContent = (scrollTop = 0) => {
    // 计算可视区域里能放几个元素
    const viewCount = Math.ceil(this.virtualList.current.clientHeight / VirtualList.itemH);
    // 计算可视区域开始的索引
    const start = Math.floor(scrollTop / VirtualList.itemH);
    // 计算可视区域结束索引
    const end = start + viewCount;
    // 截取可视区域数据
    const viewData = this.serverData.slice(start, end);

    this.setState({
      data: viewData,

      // 把可见区域的 top 设置为起始元素在整个列表中的位置
      transform: `translate3d(0, ${start * VirtualList.itemH}px, 0)`,
    });
  };

  render() {
    const { totalHeight, transform, data } = this.state;

    return (
      <div className="virtual-list" onScroll={this.handleScroll} ref={this.virtualList}>
        <div className="virtual-list-height" style={{ height: totalHeight }} />
        <div className="view-content" style={{ transform: transform }}>
          {data.map(({ key, val }) => (
            <div className="view-item" key={key}>
              {val}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default VirtualList;
