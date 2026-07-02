import React, { createContext } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {

  const serverUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;