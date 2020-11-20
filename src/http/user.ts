import http from '.';

export interface Ilogin {
  username: string;
  password: string;
}
export default function login(data: Ilogin) {
  return http({
    url: '/api/login',
    method: 'POST',
    data: data,
  });
}
