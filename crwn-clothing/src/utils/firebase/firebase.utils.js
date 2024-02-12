import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
const firebaseApp = initializeApp(firebaseConfig); // eslint-disable-line

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) return userDocRef;
  const { displayName, email } = userAuth;
  const createdAt = new Date();
  try {
    const response = await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
    return response;
  } catch (e) {
    console.log('Error creating user.', e.message);
  }
};

export const createAuthUserWithEmailAndPassword = async ({
  email,
  password
} = {}) => {
  if (
    !email
    || !password
  ) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async ({
  email,
  password
} = {}) => {
  if (
    !email
    || !password
  ) return;
  return await signInWithEmailAndPassword(auth, email, password);
};