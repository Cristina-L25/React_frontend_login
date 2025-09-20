import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";

import "./Principal.css";

export const Principal = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="principal-dashboard">
                {/* 👇 bievenidos dentro del contenido (el header ya esta en layout*/}
                <h1 className="principal-bienvenida">bienvenida{user?.nombre}</h1>
                <p className="principal-rol">Rol: {user?.rol}</p>

                {/* cards */}
                <div className="principal-cards">
                    <Card
                        titulo="gestion de usuarios"
                        descripcion="crea edita y elimina usuarios del sistema"
                        onClick={() => navigate("/usuarios")}
                    />

                    <Card
                        titulo="gestion de roles"
                        descripcion="administra los diferentes roles disponibles"
                        onClick={() => navigate("/roles")}
                    />

                    <Card
                        titulo="gestion de permisos"
                        descripcion="definine y organiza los permisos del sistema"
                        onClick={() => navigate("/permisos")}
                    />

                    <Card
                        titulo="rol - permisos"
                        descripcion="Asingna permisos a cada rol"
                        onClick={() => navigate("/rol-permisos")}
                    />
                </div>
            </div>
        </Layout>
    )
}