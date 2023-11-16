import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdk2xRuBFlCR5WkrmqBFt7_seaGn1k6QA",
  authDomain: "crwn-clothing-db-a46ea.firebaseapp.com",
  projectId: "crwn-clothing-db-a46ea",
  storageBucket: "crwn-clothing-db-a46ea.appspot.com",
  messagingSenderId: "936225499208",
  appId: "1:936225499208:web:cb5aa68d19fbe03406507d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) return userDocRef;
  const { displayName, email } = userAuth;
  const createdAt = new Date();
  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
    });
  } catch (e) {
    console.log('Error creating user.', e.message);
  }
};