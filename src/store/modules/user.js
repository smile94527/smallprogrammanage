import {
    getToken,
    setToken,
    removeToken,
    getUserId,

    setUserId,
    removeUserId,
} from '../../utils/auth'
import { userLoginController } from '../../services/index.js'
const user = {
    state: {
        token: '', //登录的token
        userId: '', // 登录的用户id
        userInfo: '', //登录人信息

    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },

        SET_USERINFO: (state, userInfo) => {
            state.userInfo = {...userInfo }
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        getToken(context, id) {
            context.commit('SET_TOKEN', id)
        },
        getUserid(context, id) {
            context.commit('SET_USERID', id)
        },


        // 登录
        // Login({ commit }, userInfo) {
        //   const username = userInfo.username.trim()    //去掉空格
        //   return new Promise((resolve, reject) => {
        //     userLoginController(username, userInfo.password).then(response => {     // 登录有获取token
        //       if(response.success){
        //         const data = response.result
        //         setToken(data.token);
        //         setUserId(data.userId)
        //         commit('SET_TOKEN', data.token)  // 将touken保存到全局
        //         commit('SET_USERID',data.userId)  // 将登录的用户id保存到全局

        //         resolve()
        //       }else{
        //         reject(response);
        //       }

        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // // 登出
        // LogOut({ commit, state }) {
        //   return new Promise((resolve, reject) => {
        //     logout(state.token).then(() => {
        //       commit('SET_TOKEN', '')
        //       commit('SET_ROLES', [])
        //       removeToken()
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // // 前端 登出
        // FedLogOut({ commit }) {
        //   return new Promise(resolve => {
        //     removeToken()
        //     commit('SET_TOKEN', '')
        //     resolve()
        //   })
        // }
    }
}

export default user