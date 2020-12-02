import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '../firebase';
import router from '../router';


Vue.use(Vuex)

//Real-time Firebase
firebase.postsCollection.orderBy('createdOn', 'desc').onSnapshot( snapshot => {
  let postsArray = []

  snapshot.forEach( doc => {
    let post = doc.data()
    post.id = doc.id;

    postsArray.push(post)
  })

  store.commit('SET_POSTS', postsArray)
})

const store =  new Vuex.Store({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    SET_USER_PROFILE( state, payload) {
      state.userProfile = payload;
    },
    SET_POSTS (state, payload) {
      state.posts = payload;
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
      const userProfile = await firebase.usersCollection.doc(user.uid).get()

      //set user profile in state
      commit('SET_USER_PROFILE', userProfile.data())

      //Sau khi login thi thay doi route sang dashboard
      // Neu khong co dong if thi se bao loi trung duong dan
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async signup( { dispatch }, form) {
      //Dau tien la tao user tren firebase
      const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)

      //Tao user profile object trong userCollection
      await firebase.usersCollection.doc(user.uid).set({
        email: form.email,
        password: form.password,
        name: form.name,
        title: form.title,
      })

      //Lay user profile va thay doi state
      dispatch('fetchUserProfile', user)
    },
    async logout ({ commit }) {
      await firebase.auth.signOut()

      //clear userprofile
      commit('SET_USER_PROFILE', {})
      router.push('/login')
    },
    //POST
    async createPost( {state}, post) {
      await firebase.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: firebase.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    //LIKES
    async likePost( _, post) {
      const userId = firebase.auth.currentUser.uid

      const docId = `${userId}_${post.id}`

      //Kiem tra xem user da like post hay chua
      const doc = await firebase.likesCollection.doc(docId).get()
      if(doc.exists) { return}

      // Tao like
      await firebase.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // Update post likes count
      firebase.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
    })
    },
     async updateProfile ({ dispatch }, user){
      const userId = firebase.auth.currentUser.uid

      //update user object
      await firebase.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', {uid: userId})

      //Update all posts by user
      const postDocs = await firebase.postsCollection.where('userId','==',userId).get()
      postDocs.forEach( doc => {
        firebase.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      const commentsDoc = await firebase.commentsCollection.where('userId','==',userId).get()
      commentsDoc.forEach( doc=> {
        firebase.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    },  
        
  },
  modules: {
  }
})

export default store