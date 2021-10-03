
import  firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyB6yQB03AQkT0UY_uynOloodXldVszI0Yc",
    authDomain: "crwn-db-ecom.firebaseapp.com",
    projectId: "crwn-db-ecom",
    storageBucket: "crwn-db-ecom.appspot.com",
    messagingSenderId: "990766519252",
    appId: "1:990766519252:web:619e55fc76a124413e7c41",
    measurementId: "G-9YEQJTWH2E"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot);

    if(!snapShot){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            
        }catch(error){
            console.log('error creating users', error.message);
        }
    }

    return userRef;
  };


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;