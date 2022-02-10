import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, createContext } from "react";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged(getAuth(), (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = async (email, password) => {
    setIsLoading(true);
    await loginRequest(email, password)
      .then((u) => {
        setUser(u);
      })
      .catch((e) => {
        setError(messageGenerator(e.code));
      });
    setIsLoading(false);
  };

  const onRegister = async (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Passwords do not match.");
      return;
    }
    await registerRequest(email, password)
      .then((u) => {
        setUser(u);
      })
      .catch((e) => {
        setError(messageGenerator(e.code));
      });
    setIsLoading(false);
  };

  const onLogout = async () => {
    setIsLoading(true);
    await logoutRequest().then(() => {
      setUser(null);
      setError(null);
    });
    setIsLoading(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        setError,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const messageGenerator = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Your email is not valid.\nPlease enter a valid email.";
    case "auth/user-disabled":
      return "This account has been banned.\nPlease contact with us for more information.";
    case "auth/user-not-found":
      return "There is no user with your email.\nPlease register a new account instead.";
    case "auth/wrong-password":
      return "Your password is incorrect.";
    case "auth/email-already-in-use":
      return "Your email is already in use.\nPlease try to login instead.";
    case "auth/weak-password":
      return "Your password must have at least 6 characters.";

    default:
      return "Sorry, something is wrong!";
  }
};
