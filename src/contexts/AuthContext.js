import React from "react";
import { useContext, useEffect, useState } from "react";
import { auth, database } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, username) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        database.usernames.doc(username).set({ email: email });
        database.users.doc(userCredential.user.uid).set({
          username: username,
          plannedModules: Array(8).fill({
            acadSemester: [{ moduleCode: "", title: "Add Modules" }],
          }),
        });
      });
  }

  function login(input, password) {
    const emailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(emailFormat)) {
      return auth.signInWithEmailAndPassword(input, password);
    } else {
      return database.usernames
        .doc(input)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return auth.signInWithEmailAndPassword(doc.data().email, password);
          } else {
            throw Error("This username does not exist");
          }
        });
    }
  }

  function signout() {
    return auth.signOut();
  }

  function isUsernameValid(username) {
    return database.usernames
      .doc(username)
      .get()
      .then((doc) => {
        return !doc.exists;
      });
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signout,
    isUsernameValid,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
