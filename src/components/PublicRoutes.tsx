import React from "react";
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('token')
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    if(isAuthenticated()) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default PublicRoute;