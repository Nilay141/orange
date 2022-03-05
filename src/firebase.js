// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAJZT_mQB_mRwFVavPzCnJgEf2njNxZFgA",
	authDomain: "orange-7c8a5.firebaseapp.com",
	databaseURL: "https://orange-7c8a5-default-rtdb.firebaseio.com",
	projectId: "orange-7c8a5",
	storageBucket: "orange-7c8a5.appspot.com",
	messagingSenderId: "442204725093",
	appId: "1:442204725093:web:042fb483b205ede9370b8c",
	measurementId: "G-WDMMNSJ77G"
  };

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}
