import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9809ivmvYkuodMYOO1EMJHtL8Xvf2S8Q",
  authDomain: "appchatpps.firebaseapp.com",
  projectId: "appchatpps",
  storageBucket: "appchatpps.appspot.com",
  messagingSenderId: "675864230922",
  appId: "1:675864230922:web:1287b57e5393b3d7e0b3f3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default {
  firebase,
  db,
};
