import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkXdNwxkGhiTi5y8FQQdoq9EZa3gKvew0",
  authDomain: "vue-tiles.firebaseapp.com",
  databaseURL: "https://vue-tiles.firebaseio.com",
  projectId: "vue-tiles",
  storageBucket: "vue-tiles.appspot.com",
  messagingSenderId: "532009888547",
  appId: "1:532009888547:web:8fd5e2f6b2b43ad0e33a96"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// firebase utils
const auth = firebase.auth()
const db = firebase.firestore()
const currentUser = auth.currentUser

// firebase collections
const tileCollection = db.collection('tiles')

// allow other components to use  these
export default {
  auth,
  db,
  currentUser,
  tileCollection
}