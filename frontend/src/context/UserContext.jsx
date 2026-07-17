import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getcurrentuser`,
        {
          withCredentials: true,
        }
      );

      setUserData(result.data);
    } catch (error) {
      // User is simply not logged in
      if (error.response?.status === 400) {
        setUserData(null);
        return;
      }

      console.error(error);
      setUserData(null);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      getCurrentUser();
    }
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;