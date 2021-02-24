import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDBFYgqMCXwyhU5_m2pAo01JzuytQvgk24",
  authDomain: "slack-clone-cbc08.firebaseapp.com",
  projectId: "slack-clone-cbc08",
  storageBucket: "slack-clone-cbc08.appspot.com",
  messagingSenderId: "574252883614",
  appId: "1:574252883614:web:62a86981b2623845a6258f",
  measurementId: "G-44KZC9LQBH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
