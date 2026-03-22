import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export function AdminAccountRoute() {
    const { currentUser } = useContext(AuthContext);
 

    if (currentUser && currentUser.securityLevel < 2) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
}