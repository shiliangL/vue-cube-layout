// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }

import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 修改用户密码
export function updateUser(data) {
  return request({
    url: '/updateUser',
    data,
    method: 'post'
  })
}

// 获取验证码
export function getCaptcha(params) {
  return request({
    url: '/captcha',
    method: 'get',
    params
  })
}
// 获取各个子系统菜单
export function getSelectMenu(params) {
  return request({
    url: '/menu/getSelectMenu',
    method: 'get',
    params
  })
}

export function UpdateUserMobile(params) {
  return request({
    url: '/user/updateUserMobile',
    data: params,
    method: 'post'
  })
}

export function checkToken(params) {
  return request({
    url: '/checkToken',
    method: 'get',
    params
  })
}
