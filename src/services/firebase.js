// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWOEjr1sJbPWtfQ2wXUsgJI6ljLnE7A5o",
  authDomain: "todo-app-132ab.firebaseapp.com",
  databaseURL: "https://todo-app-132ab.firebaseio.com",
  projectId: "todo-app-132ab",
  storageBucket: "todo-app-132ab.appspot.com",
  messagingSenderId: "446221338901",
  appId: "1:446221338901:web:201b323954bb867db2c11c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch (err) {
        console.log('Error creating user ', err.message);
      }
    }
    return userRef;
  };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

  export default firebase;