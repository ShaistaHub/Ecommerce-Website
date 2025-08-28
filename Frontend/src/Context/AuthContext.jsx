import { Children, createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
   const [user, setUser] = useState([]);
   
    return (
        <>
          <AuthContext.Provider value={{ user, setUser }}>
            {children}
          </AuthContext.Provider>
        </>
    )
}

export default AuthContextProvider;