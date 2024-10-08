import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Logout = () => {
    const { logoutUser } = useAuth();

    useEffect(() => {
        const logout = async () => {
            try {
                await logoutUser();
                toast.success("Logged out successfully");
            } catch (error) {
                toast.error("Failed to log out");
            }
        };

        logout();
    }, [logoutUser]);

    return <Navigate to="/" />;
};
