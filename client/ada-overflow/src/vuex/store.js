import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

let http = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    questions: [],
    userLogin: {
      token: '',
      username: '',
      email: ''
    },
    isLogin: false,
    userLoginQuestions: [],
    questionsAll: []
  },
  mutations: {
    setQuestions (state, data) {
      state.questions = data
      // console.log(state.articles)
    },
    setUserLogin (state, data) {
      state.userLogin.token = localStorage.getItem('ada-overflow')
      state.userLogin.username = data.username
      state.userLogin.email = data.email
      state.userLogin.id = data.id
      state.isLogin = true
    },
    setUserLoginQuestions (state, data) {
      state.userLoginQuestions = data
    },
    setQuestionsAll (state, data) {
      state.questionsAll = data
    },
    logout (state, data) {
      state.questions = []
      state.userLogin = {
        token: '',
        username: '',
        email: ''
      }
      state.isLogin = false
      state.userLoginQuestions = []
      state.questionsAll = []
    }
  },
  actions: {
    logout ({ commit }) {
      localStorage.removeItem('ada-overflow')
      commit('logout')
    },
    getAllQuestions ({ commit }) {
      http.get('/questions/all')
      .then(({ data }) => {
        commit('setQuestionsAll', data)
      })
      .catch(err => {
        commit('setQuestionsAll', err)
      })
    },
    getUserLogin ({ commit }, tokenUser) {
      http.get('/users/info', {
        headers: {
          token: tokenUser
        }
      })
      .then(({ data }) => {
        console.log('ini dari store', data)
        commit('setUserLogin', data)
      })
      .catch(err => {
        commit('setUserLogin', err)
      })
    },
    getUserLoginQuestions ({ commit }, tokenUser) {
      http.get('/questions', {
        headers: {
          token: tokenUser
        }
      })
      .then(({ data }) => {
        commit('setUserLoginQuestions', data)
        localStorage.setItem('userLoginQuestions', data)
      })
      .catch(err => {
        commit('setUserLoginQuestions', err)
      })
    },
    getQuestions ({ commit }) {
      http.get('/questions')
      .then(({ data }) => {
        commit('setQuestions', data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})

export default store
