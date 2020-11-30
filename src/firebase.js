
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBOfmRQMgpXqCXs0GgUpU_03bB80EkIVqo",
    authDomain: "vue-gram-3fdcf.firebaseapp.com",
    databaseURL: "https://vue-gram-3fdcf.firebaseio.com",
    projectId: "vue-gram-3fdcf",
    storageBucket: "vue-gram-3fdcf.appspot.com",
    messagingSenderId: "309589547809",
    appId: "1:309589547809:web:408e878ad9d2b313853c60"
  };
  // Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	
	//utils

	const db = firebase.firestore()
	const auth = firebase.auth()

	//collection ref
	const usersCollection = db.collection('users')
	const postsCollection = db.collection('posts')
	const commentsCollection = db.collection('comments')
	const likesCollection = db.collection('likes')

	//Export utils ref
	export {
		db,
		auth,
		usersCollection,
		postsCollection,
		commentsCollection,
		likesCollection
	}