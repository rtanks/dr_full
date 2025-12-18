import { Navigate } from "react-router-dom";
import CheckAuth from "./services/hook/CheckAuth"

export default function ProtectedRoute({children}) {
    const {checkAuthUser} = CheckAuth();
    return(
        <>
            {
                checkAuthUser() ? (
                    children
                ) : (
                    <Navigate to={'/'} replace/>

                )
            }
        </>
    )
}