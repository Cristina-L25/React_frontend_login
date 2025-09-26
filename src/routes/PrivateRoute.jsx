import { Naviagte } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children, allwedRoles }) => {
    const { user } = useAuthContext();

    if (!user) return <Naviagte to="/" />;
    if (allwedRoles && !allwedRoles.includes(user.rol)) return <Naviagte to="/bienvenido" />;

    return children;
};