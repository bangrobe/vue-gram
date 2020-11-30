import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../firebase';
import router from '../router';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    SET_USER_PROFILE( state, payload) {
      state.userProfile = payload;
    }
  },
  actions: {
    async login( { dispatch }, form) {
      //sign user in
      try {
        const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
      //fetch User profile and set in userstate
      dispatch('fetchUserProfile', user)
      } catch(err) {
        console.log(err)
      }
    },
    async fetchUserProfile( { commit }, user ) {
      //fetch User profile from firebase
      const userProfile = await firebase.userCollection.doc(user.uid).get()

      //set user profile in state
      commit('SET_USER_PROFILE', userProfile.data())

      //Sau khi login thi thay doi route sang dashboard
      router.push('/')
    },
    async signup( { dispatch }, form) {
      //Dau tien la tao user tren firebase
      const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)

      //Tao user profile object trong userCollection
      await firebase.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      //Lay user profile va thay doi state
      dispatch('fetchUserProfile', user)
    }
  },
  modules: {
  }
})
