import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB9809ivmvYkuodMYOO1EMJHtL8Xvf2S8Q",
  authDomain: "appchatpps.firebaseapp.com",
  projectId: "appchatpps",
  storageBucket: "appchatpps.appspot.com",
  messagingSenderId: "675864230922",
  appId: "1:675864230922:web:1287b57e5393b3d7e0b3f3",
});

const authentication = firebase.auth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Create a storage reference from our storage service
//const storageRef = ref(storage);
export { authentication, firebase, app, db, storage };
