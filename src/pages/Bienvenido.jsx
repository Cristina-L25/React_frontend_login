import { useAuthContext } from "../context/AuthCotext";
import { useNavigate } from "react-router-dom";
import { layout } from "../components/layout/Layout";

import "./principal.css";

export const Bienvenido = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <layout>
            <div className="bienvenido-dashboard">
                <h1 className="bienvenido-saludo">Bienvenido {user?.nombre}</h1>
                <p className="bienvenido-rol">Rol: {user?.rol}</p>
            </div>
        </layout>
    );
};