import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/FirebaseConfig";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const AuthContextProvider = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Create User-----------------
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Login User -----------------
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Google login ----------------
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //   Logout ---------------------
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, []);
  const authInfo = { user, createUser, googleLogin, login, loading, logOut };
  return (
    <AuthContextProvider.Provider value={authInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
