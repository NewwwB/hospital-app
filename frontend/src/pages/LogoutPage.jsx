import { useEffect } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function LogoutPage() {
    const { logout } = useAuth();

    useEffect(() => {
        logout(); // Call the logout function when the component is mounted
    }, []);

    return (<Navigate to={'/'} replace/>);
}
