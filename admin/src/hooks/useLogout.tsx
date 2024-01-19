import axios from "../api/axios";
import { useContext } from "react";
import { AuthContext, TodoContextType } from "../context/AuthProvider";


const useLogout = (): (() => void) => {
    const { setAuthData } = useContext(AuthContext) as TodoContextType

    const logout = async (): Promise<void> => {

      setAuthData({ accessToken: null });

      try {
         await axios('/api/admin/logout', { withCredentials: true });
         console.log('logout successful')     
      } catch (err) {
        console.error(err);
      }
    };
  
    return logout;
  };
  
  export default useLogout;

  
  
  
  
  
  