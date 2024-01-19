import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, TodoContextType } from "../context/AuthProvider";
// import jwt_decode from "jwt-decode";

// interface RequireAuthProps {
//     allowedRoles: string[]; 
//   }


// interface DecodedToken {
//     UserInfo: {
//       roles: string[];
//     };
//   }

//------------------------------------------------------------------------------

const RequireAuth: React.FC = () => {
  const { accessToken } = useContext(AuthContext) as TodoContextType

  const location = useLocation();

  // const decoded = accessToken?.accessToken ? (jwt_decode(accessToken.accessToken) as DecodedToken) : undefined;
  // const roles = decoded?.UserInfo?.roles || [];

  const isAuth = accessToken.accessToken
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace /> 
  }

  return <Outlet /> 
  
};

export default RequireAuth;








