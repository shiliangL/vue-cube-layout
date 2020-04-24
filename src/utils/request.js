import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import {
  getToken, getRefreshToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['token'] = getToken()
      config.headers['refreshToken'] = getRefreshToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // if (response.status == 200 || response.data.success) {
    const contentType = response.headers['content-type']
    if (response.status === 200 && contentType && contentType.includes('excel')) {
      return response
    } else if (response.data.success) {
      return response
    } else {
      if (response.data.code === 3000) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else {
        const message = response.data.msg || '网络请求异常'
        Message({ message: message, type: 'error', duration: 5 * 1000 })
      }
      // Promise.reject(response.data)
    }
  },
  error => {
    console.log('err' + error) // for debug
    let status = 0
    if (error.response) {
      status = error.response.status
    }
    const statusText = {
      404: '找不到对应的请求资源',
      405: '请求方法禁用',
      403: '被拒绝的请求',
      400: '错误的请求',
      500: '服务器遇到错误，无响应',
      502: '无效响应',
      503: '服务不可用',
      'invalid_grant': '验证码错误'
    }
    Message({
      message: statusText[status] || '未知错误！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
