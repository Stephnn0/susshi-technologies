// import axios from "../api/axios";
import { useContext } from "react";
import { AuthContext, TodoContextType } from "../context/AuthProvider";
import APIEndpoints from "../utilities/urls";
import axios from "axios";
import { useLoading } from "../context/LoadingScreenContext";

const useLogout = (): (() => void) => {
    const { setAuthData } = useContext(AuthContext) as TodoContextType
    const { showLoading, hideLoading } = useLoading();
    showLoading()

    const logout = async (): Promise<void> => {
  
      setAuthData({ accessToken: null });

      try {
         await axios(`${APIEndpoints.auth}/logout`, { withCredentials: true });
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading()
      }
    };
  
    return logout;
  };
  
  export default useLogout;