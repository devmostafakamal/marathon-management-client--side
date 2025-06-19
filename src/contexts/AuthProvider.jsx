import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
// import axios from "axios";

const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoaing] = useState(true);

  const createUser = (email, password) => {
    setLoaing(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoaing(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoaing(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoaing(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoaing(false);

      // Optional: JWT logic
      // if (currentUser?.email) {
      //   const userData = { email: currentUser.email };
      //   axios
      //     .post("https://marathon-management-server-eta.vercel.app/jwt", userData, {
      //       withCredentials: true,
      //     })
      //     .then((res) => console.log("token after jwt", res.data))
      //     .catch((err) => console.log(err));
      // }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    loading,
    signInUser,
    user,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
