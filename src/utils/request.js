import axios from 'axios'
axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
  // 'CacheControl': 'no-cache'
})

// axios.defaults.headers['Content-Type']

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   config.headers['Authorization'] = 'bearer ' + getToken()
    //   config.headers['Content-Type'] = 'application/json'
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200 || response.data.success) {
      return response
    } else {
      console.log('')
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
