import firebase from "firebase";// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBVwKM2dqazlZLNElEe0T1C9lrggQ2rorw",
  authDomain: "classroom-ca6d8.firebaseapp.com",
  projectId: "classroom-ca6d8",
  storageBucket: "classroom-ca6d8.appspot.com",
  messagingSenderId: "596753673361",
  appId: "1:596753673361:web:a45f5d7f30ac91446b6330",
  measurementId: "G-4KR6X2HTDM"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

// Sign in and check or create or create account in firestore

const signInWithGoogle = async () => {
    try {
        const response = await auth.signInWithPopup(googleProvider);
        console.log(response.user);
        const user = response.user;
        console.log(`User ID - ${user.uid}`);
        const querySnapshot = await db
        .collection("users")
        .where("uid", "==" , user.uid)
        .get();
        if (querySnapshot.docs.length === 0){
            // create a new user
            await db.collection("users").add({
                uid: user.uid,
                enrolledClassrooms: [],
            });
        }
    }
    catch (err) {
        alert(err.message);
    }
};

const logout = () => {
 auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout};