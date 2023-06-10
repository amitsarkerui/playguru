import React, { createContext } from "react";
import app from "../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
export const AuthContextProvider = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const authInfo = { register };
  return (
    <AuthContextProvider.Provider value={authInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
