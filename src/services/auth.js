import firebase, { auth, firestore } from './firebase'

export const logOutFunc = async (e) => {
    e.preventDefault();
    await auth.signOut();
    return true;
}

export const logInFunc = async (userInfo) => {
    const { email, password } = userInfo;
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        const snapshot = await firestore.collection('users').doc(user.uid).get();
        //  TODO: change path
        console.log(user)
        return { user, snapshot };
    } catch(err) {
        return err;
    }
}