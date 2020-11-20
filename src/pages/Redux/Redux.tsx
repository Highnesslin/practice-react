import { IPageReq } from '@/http/type';
import { IStoreState } from '@/store/types';
import React, { useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IProduce, asyncUpdateList } from './flow';

type Selector = {
  list: Array<IProduce>;
};
export default function Redux(props: any) {
  // 类型
  const { list } = useSelector<IStoreState, Selector>(state => {
    return {
      list: Object.values(state.reduxPage.byIds),
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const pageInfo = useRef<IPageReq>({
    current: 0,
    size: 10,
  });

  const load = () => {
    pageInfo.current.current++;
    dispatch(asyncUpdateList(pageInfo.current));
  };

  return (
    <div>
      <div>
        <button onClick={load}>load</button>
        <div>
          {Object.values(list)?.map(item => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  props.history.push(`/basic/ReduxDetail/${item.id}`);
                }}
              >
                <span>序号：{item.id}</span>
                <span>数量：{item.num}</span>
                <span>姓名：{item.name}</span>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}
