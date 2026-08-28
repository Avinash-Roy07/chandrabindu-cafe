import { initializeApp, getApps } from "firebase/app";
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

function getFirebaseApp() {
  if (getApps().length > 0) return getApps()[0];

  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  if (!apiKey || apiKey === "your_firebase_api_key") {
    throw new Error("Firebase is not configured. Please add your Firebase credentials to the .env file.");
  }

  return initializeApp({
    apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  });
}

export async function firebaseLogin(email, password) {
  const auth = getAuth(getFirebaseApp());
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();
  return { token, user: result.user };
}

export async function firebaseRegister(email, password, phoneNumber) {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: email.split("@")[0] });
  await setDoc(doc(db, "users", result.user.uid), {
    email,
    phoneNumber,
    displayName: email.split("@")[0],
    role: 1,
    createdAt: new Date().toISOString(),
  });
  return result.user;
}

export async function firebaseGoogleLogin() {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  const token = await result.user.getIdToken();
  await setDoc(doc(db, "users", result.user.uid), {
    email: result.user.email,
    displayName: result.user.displayName,
    role: 1,
    createdAt: new Date().toISOString(),
  }, { merge: true });
  return { token, user: result.user };
}

export async function firebaseLogout() {
  const auth = getAuth(getFirebaseApp());
  await signOut(auth);
}
