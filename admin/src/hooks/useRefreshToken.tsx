import { AxiosResponse } from 'axios'; 
import axios from '../api/axios';
import { useContext } from "react";
import { AuthContext, TodoContextType } from "../context/AuthProvider";

const useRefreshToken = (): (() => Promise<string | undefined>) => {
  const {  setAccessToken} = useContext(AuthContext) as TodoContextType

  const refresh = async (): Promise<string | undefined> => {
    try {
      const response: AxiosResponse<{ accessToken: string }> 
      = await axios.get('/api/admin/refresh', {
        withCredentials: true,
      });
      console.log('responseeee', response.data.accessToken)

      const accessToken: string | null = response?.data?.accessToken;

            setAccessToken(accessToken)


      return response.data.accessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      return undefined;
    }
  };
  return refresh;
};

export default useRefreshToken;
