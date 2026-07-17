import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()
function UserContext({children}) {
    let [userData,setUserData] = useState("")
    let {serverUrl} = useContext(authDataContext)


   const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser",{withCredentials:true})

            setUserData(result.data)
            console.log(result.data)

        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

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
    // No login cookie → user is simply not logged in
    if (error.response?.status === 400) {
      setUserData(null);
      return;
    }

    console.error(error);
    setUserData(null);
  }
};



    let value = {
     userData,setUserData,getCurrentUser
    }
    
   
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
