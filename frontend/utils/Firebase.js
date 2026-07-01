import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1edXIb2524NAkb25H-AYdewzEhCT5mLc",
  authDomain: "gsfashion-42d84.firebaseapp.com",
  projectId: "gsfashion-42d84",
  storageBucket: "gsfashion-42d84.firebasestorage.app",
  messagingSenderId: "457975430241",
  appId: "1:457975430241:web:279638524083b33c21be20",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };