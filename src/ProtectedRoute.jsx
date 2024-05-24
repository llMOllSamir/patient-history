import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    if (user && (user.role === "doctor" || user.role === "admin"))
        return children;

    return <Navigate to={"/"} />;
}
