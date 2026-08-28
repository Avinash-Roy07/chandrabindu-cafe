import { getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

function getApp() {
  return getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
}

export async function firebaseLogin(email, password) {
  const auth = getAuth(getApp());
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();
  return { token, user: result.user };
}

export async function firebaseRegister(email, password, displayName) {
  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });
  await setDoc(doc(db, "users", result.user.uid), {
    uid: result.user.uid,
    email,
    displayName,
    role: 1,
    createdAt: new Date().toISOString(),
  });
  return result.user;
}

export async function firebaseGoogleLogin() {
  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  const token = await result.user.getIdToken();
  await setDoc(
    doc(db, "users", result.user.uid),
    {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      role: 1,
      createdAt: new Date().toISOString(),
    },
    { merge: true }
  );
  return { token, user: result.user };
}

export async function firebaseLogout() {
  await signOut(getAuth(getApp()));
}
