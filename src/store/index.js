import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  isLogin: localStorage.getItem('token') ? true : false
  },
  mutations: {
	  setLoginState(state, b) {
	        state.isLogin = b;
	      }
  },
  actions: {
	  login({commit}){
		  
	  }
  },
  modules: {
  }
})
