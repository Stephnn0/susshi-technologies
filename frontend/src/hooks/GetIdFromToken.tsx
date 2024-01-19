import { useContext } from 'react';
import { AuthContext, TodoContextType } from '../context/AuthProvider';
import jwt_decode from 'jwt-decode';

type JwtPayload = {
  UserInfo: {
    user: Array<string>[],
    email: string,
  };
};

export const useIdFromToken = (): string | null => {
  const { accessToken } = useContext(AuthContext) as TodoContextType;

  if (accessToken && accessToken.accessToken) {
    try {
      const decodedToken = jwt_decode<JwtPayload>(accessToken.accessToken);
      const backTogether = decodedToken.UserInfo.user.join('');
      return backTogether;
    } catch (error) {
      console.error('JWT decoding error:', error);
    }
  }
  return null;
};


