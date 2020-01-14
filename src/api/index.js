import request from '@/utils/request'

export function fetchData(url, method = 'get', params) {
  return request({
    url,
    method,
    params
  })
}
