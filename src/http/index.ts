import instance from './instance';
import { AxiosRequest, CustomResponse } from './type';

export default function ({
  url,
  method,
  params,
  data,
  responseType,
}: AxiosRequest): Promise<CustomResponse> {
  const headers: object = {
    ContentType: 'application/json;charset=UTF-8',
  };
  return new Promise((resolve, reject) => {
    instance({
      // baseURL,
      headers,
      url,
      method,
      params,
      data,
      responseType,
    })
      .then(res => {
        // 200:服务端业务处理正常结束
        if (res.status === 200) {
          if (res.data.success) {
            resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
          } else {
            resolve({
              status: false,
              message: res.data?.errorMessage || url + '请求失败',
              data: res.data?.data,
              origin: res.data,
            });
          }
        } else {
          resolve({
            status: false,
            message: res.data?.errorMessage || url + '请求失败',
            data: null,
          });
        }
      })
      .catch(err => {
        const message = err?.data?.errorMessage || err?.message || url + '请求失败';
        // eslint-disable-next-line
        reject({ status: false, message, data: null });
      });
  });
}
