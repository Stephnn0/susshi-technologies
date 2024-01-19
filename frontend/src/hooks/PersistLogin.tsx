import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react"
import useRefreshToken from "./useRefreshToken";
import { useContext } from "react";
import { AuthContext, TodoContextType } from "../context/AuthProvider";



export const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { accessToken } = useContext(AuthContext) as TodoContextType


    useEffect( () => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
            await refresh();
                } catch (err) {
                console.error(err);
            } finally {
                isMounted &&
                 setIsLoading(false);
            }}
        !accessToken?.accessToken  ? 
                 verifyRefreshToken() 
                 : setIsLoading(false);

        return () => { isMounted = false  }
    },[]);

    return (
        <>{
            isLoading
                ? <p>Loading...</p>
                : <Outlet />
        }</>
    )
}
export default PersistLogin