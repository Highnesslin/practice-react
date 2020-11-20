import React, { useRef } from 'react';
import { IStoreState } from '@/store/types';
import { IProduce, updateDetail } from '../Redux/flow';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

type Props = {
  match: {
    params: {
      detailId: string;
    };
  };
};
export default function Redux({
  match: {
    params: { detailId },
  },
}: Props) {
  const dispatch = useDispatch();

  const detail = useSelector<IStoreState, IProduce>(state => {
    return state.reduxPage.byIds[detailId];
  }, shallowEqual);

  const changeDetail = () => {
    const nameVal = name.current?.value;
    const numVal = num.current?.value;
    if (!nameVal || !numVal) {
      console.log('名称和数量不能为空');
      return;
    }
    dispatch(
      updateDetail(detailId, {
        id: detailId,
        name: nameVal,
        num: Number(numVal),
      })
    );
  };

  const name = useRef<HTMLInputElement>(null);
  const num = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p>详情</p>

      <div>
        <div>
          <label>序号：</label>
          <span>{detail.id}</span>
        </div>
        <div>
          <label>名称：</label>
          <input type="text" defaultValue={detail.name} ref={name} />
        </div>
        <div>
          <label>数量：</label>
          <input type="text" defaultValue={detail.num} ref={num} />
        </div>
      </div>
      <button onClick={changeDetail}>保存</button>
    </div>
  );
}
