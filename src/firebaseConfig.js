import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfxBDps_Tja75eCnP_TeUZ8kY5c-nqBiY",
  authDomain: "auth-7b6a8.firebaseapp.com",
  projectId: "auth-7b6a8",
  storageBucket: "auth-7b6a8.appspot.com",
  messagingSenderId: "58504870941",
  appId: "1:58504870941:web:03b2cc97cf3fe444665af4",
  measurementId: "G-LDSCVYEELZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
