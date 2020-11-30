import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

//SCSS
import './assets/scss/app.scss'

Vue.config.productionTip = false

//set up the Firebase method onAuthStateChanged. 
//This ensures Firebase initializes before loading the app when a user refreshes a page.

let app
auth.onAuthStateChanged ( user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
}) 

