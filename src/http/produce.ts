import http from '.';
import { IPageReq } from './type';

export interface IProduce {
  id: string;
  name: string;
  num: number;
}
export default function reqProduce(data: IPageReq) {
  return http({
    url: '/api/produce/list',
    method: 'GET',
    data: data,
  });
}
