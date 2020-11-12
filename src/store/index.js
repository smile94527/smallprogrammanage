import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
// import { login } from '@/api/index.js'
// import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    }
})