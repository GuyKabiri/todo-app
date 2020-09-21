import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWOEjr1sJbPWtfQ2wXUsgJI6ljLnE7A5o",
  authDomain: "todo-app-132ab.firebaseapp.com",
  databaseURL: "https://todo-app-132ab.firebaseio.com",
  projectId: "todo-app-132ab",
  // storageBucket: "todo-app-132ab.appspot.com",
  // messagingSenderId: "446221338901",
  appId: "1:446221338901:web:201b323954bb867db2c11c"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
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

  export const logOutFunc = async (e) => {
    await auth.signOut();
    return true;
  };

  // export const logInFunc = async (userInfo) => {
  //     const { email, password } = userInfo;
  //     try {
  //         const { user } = await auth.signInWithEmailAndPassword(email, password);
  //         if (user) {
  //           const snapshot = await firestore.collection('users').doc(user.uid).get();
  //           //  TODO: change path
  //           auth.updateCurrentUser(user);
  //         }
  //         return user;
  //     } catch(err) {
  //         return err;
  //     }
  // };

  firebase.initializeApp(firebaseConfig);


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export default firebase;