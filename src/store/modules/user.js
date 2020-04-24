import { login, logout, getInfo, checkToken } from '@/api/user'
import { getToken, setToken, removeToken, setTokenR, getRefreshToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  refresh_token: getRefreshToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  appSettings: [],
  isAdmin: false,
  perms: [],
  userInfo: {
    deptType: null,
    info: {},
    permissions: []
  },
  userInfoCollection: {}
}

const mutations = {
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_REFRESH_TOKEN: (state, refresh_token) => {
    state.refresh_token = refresh_token
    setTokenR(refresh_token)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USERINFO_COLLECTION: (state, value = {}) => {
    state.userInfoCollection = Object.assign(state.userInfoCollection, value)
  },
  SET_NAME: (state, user) => {
    state.name = user.userName
    state.isAdmin = user.userIsAdmin === 1
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_APP_SETTINGS: (state, appSettings) => {
    state.appSettings = appSettings
  },
  SET_Perms(state, perms) { // 用户权限标识集合
    state.perms = perms
  },
  SET_ALL_INFO: (state, value) => {
    state.userInfo = Object.assign(state.userInfo, value)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), password: password, captcha: captcha }).then(response => {
        // const { data } = response.data
        // commit('SET_TOKEN', data.access_token)
        // setToken(data.access_token)
        // resolve()
        const { data, success, msg } = response.data
        const { access_token, refresh_token } = data
        if (success) {
          // --- vuex ---
          commit('SET_TOKEN', access_token)
          commit('SET_REFRESH_TOKEN', refresh_token)
          // --- Cookies ---
          // setToken(access_token)
          // setTokenR(refresh_token)
          resolve()
        } else {
          reject({ success, data, msg })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // checkToken for login 验证成功之后应该走获取用户信息
  // {
  //   "expireSecond": 0,
  //   "refresh_token": "string",
  //   "token": "string"
  // }
  checkToken({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      checkToken(params).then(response => {
        // 下面是正常数据结构
        const { data, success, msg } = response.data
        const { access_token, refresh_token } = data
        if (success) {
          // --- vuex ---
          commit('SET_TOKEN', access_token)
          commit('SET_REFRESH_TOKEN', refresh_token)
          // --- Cookies ---
          // setToken(access_token)
          // setTokenR(refresh_token)
          setTimeout(() => {
            resolve(response.data)
          }, 200)
        } else {
          reject({ success, data, msg })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data.data) {
          reject('登录超时,请重新登录!')
        }
        const result = data.data
        const { info, perms } = data.data
        commit('SET_ALL_INFO', data.data)
        commit('SET_NAME', info)
        commit('SET_NAME', info)
        commit('SET_Perms', perms)

        const infoParams = result.info ? result.info : {}
        const params = {
          ...infoParams,
          permissions: result.permissions
        }
        commit('SET_USERINFO_COLLECTION', params)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_Perms', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
