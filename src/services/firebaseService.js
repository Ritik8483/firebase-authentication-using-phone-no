import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const userAuthContext = createContext();

export const FirebaseServiceProvider = ({ children }) => {
  const [user, setUser] = useState();
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  const signInWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };
  const forgetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const signInWithNumber = (number) => {
    const capatcheVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    capatcheVerifier.render();
    return signInWithPhoneNumber(auth,number,capatcheVerifier)
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      return () => {
        unSubscribe();
        console.log("unSubscribe called");
      };
    });
  }, []);

  //   const contextValue={

  //   }
  return (
    <userAuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logout,
        signInWithGoogle,
        forgetPass,
        signInWithNumber,
      }}
      //   value={contextValue}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuthContext = () => {
  return useContext(userAuthContext);
};
