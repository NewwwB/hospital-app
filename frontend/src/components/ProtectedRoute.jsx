import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { auth } = useAuth();

    if (!auth.token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && auth.role !== requiredRole) {
        alert('privilege required');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
