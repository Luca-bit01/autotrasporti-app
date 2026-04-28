import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZmtkCg-1_563z6xkgsc2zvK8vGpJvn1k",
  authDomain: "ottimizzazione-autotrasporti.firebaseapp.com",
  projectId: "ottimizzazione-autotrasporti",
  storageBucket: "ottimizzazione-autotrasporti.firebasestorage.app",
  messagingSenderId: "1058553600303",
  appId: "1:1058553600303:web:57ee2e0808f39442a9a9da"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
