
import request from '@/utils/request'

export const fetchDate = (params) => {
  return request({
    url: '/api/bigdata/xxxx',
    method: 'get',
    params
  })
}

export const save = (data) => {
  return request({
    url: '/api/bigdata/xxxx',
    method: 'post',
    data
  })
}

export const update = (data) => {
  return request({
    url: '/api/bigdata/xxxx',
    method: 'post',
    data
  })
}
