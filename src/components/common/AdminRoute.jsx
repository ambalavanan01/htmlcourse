import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute({ children }) {
    const { currentUser, loading } = useAuth();
    const ADMIN_EMAIL = "ambalavanan1501@gmail.com";

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (currentUser.email !== ADMIN_EMAIL) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
