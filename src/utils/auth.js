// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

import Cookies from 'js-cookie'

const TokenKey = 'Ty-Admin-Token'

const RefreshTokenKey = 'Ty-Admin-Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setTokenR(token) {
  return Cookies.set(RefreshTokenKey, token)
}

export function getTokenR(token) {
  return Cookies.get(RefreshTokenKey)
}

export function removeToken() {
  Cookies.remove(RefreshTokenKey)
  return Cookies.remove(TokenKey)
}

export function getCookiesByKey(key) {
  return Cookies.get(key)
}
