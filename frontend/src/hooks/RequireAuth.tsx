import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, TodoContextType } from "../context/AuthProvider";


const RequireAuth: React.FC = () => {
  const { accessToken } = useContext(AuthContext) as TodoContextType

  const location = useLocation();


  const isAuth = accessToken.accessToken
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace /> 
  }

  return <Outlet /> 
  
};

export default RequireAuth;