import request from '@/axios/index'
export function login(data: any) {
  return request({
    url: '/api/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
