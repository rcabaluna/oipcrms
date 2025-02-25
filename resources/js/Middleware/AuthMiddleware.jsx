import { usePage } from "@inertiajs/react";
import { Navigate } from "react-router-dom";

export default function AuthMiddleware({ children }) {
    const { auth } = usePage().props;

    if (!auth.user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
