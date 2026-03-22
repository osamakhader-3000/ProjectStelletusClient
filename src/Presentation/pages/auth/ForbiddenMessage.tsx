import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router";

export function ForbiddenMessage() {

    const { currentUser } = useContext(AuthContext);

    if (currentUser && currentUser.securityLevel >= 2) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <h2>Forbidden</h2>
            <p>You do not have permission to access this page.</p>
        </div>
    );
}