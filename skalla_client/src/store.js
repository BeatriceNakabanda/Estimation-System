import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import AuthService from './services/AuthService'

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        role:''
    
    }
}

export default new Vuex.Store({
    strict: true,
    //intergrating vuex-persistedstate to get data even after reloading the page
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
            return state.token
        },
        getUser: state => {
            return state.user
        },
        // getRole: state => {
        //     return state.role
        // }


    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        // SET_ROLE:(state, role) => {
        //     state.user.role = role
        // },
        RESET: state => {
            Object.assign(state, getDefaultState)
        }
    },
    // creating login and logout actions
    actions: {
        login: ({ commit, dispatch }, { token, user}) => {
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            // commit('SET_ROLE', role)

            //setting Auth header
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        logout: ({ commit }) => {
            commit('RESET', '')
        }
    }
})
