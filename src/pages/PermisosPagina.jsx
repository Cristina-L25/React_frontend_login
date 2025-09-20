import { useState, useEffect } from "react";
import { ModalPermiso } from "../components/ui/ModalPermiso";
import { leerPermisos, crearPermiso, actualizarPermiso, eliminarPermiso } from "../services/permisoService";
import { Layout } from "../components/layout/Layout";
import "./Pagina.css";

export const PermisosPagina = () => {
    const [permisos, setPermisos] = useState([]);
    const [permisoSeleccionado, setPermisoSeleccionado] = useState(null);
    const [openModal, setOpenModel] = useState(false);

    useEffect(() => {
        fetchPermisos();
    }, []);
    const fetchPermisos = async () => setPermisos(await leerPermisos());

    const handleSavePermiso = async (permisoData) => {
        if (permisoSeleccionado) {
            await actualizarPermiso(permisoData.id_permiso, permisoData);
        } else {
            await crearPermiso(permisoData);
        }
        await fetchPermisos();
        setOpenModel(false);
        setPermisoSeleccionado(null);
    };
    return (
        <Layout>
            <div className="pagina-contenedor">
                <h2 className="pagina-titulo">Gestion de permisos</h2>

                <button
                    className="pagina-boton"
                    onClick={() => {
                        setPermisoSeleccionado(null);
                        setOpenModel(true);
                    }}
                >
                    crear permiso
                </button>
                <div className="tabla-contenedor">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="ocultar-columna">ID</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permisos.map((p)(
                                <tr>
                                    <td className="ocultar-columna">{p.id_permiso}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.descripcion}</td>
                                    <td className="tabla-acciones">
                                        <button
                                            onClick={() => {
                                                setPermisoSeleccionado(p);
                                                setOpenModel(true);
                                            }}
                                            className="boton-accion boton-eliminar"
                                        >
                                            eiminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {openModal && (
                    <ModalPermiso
                        onClose={() => {
                            setOpenModel(false);
                            setPermisoSeleccionado(null);
                        }}
                        onSave={handleSavePermiso}
                        permisoSeleccionado={permisoSeleccionado}
                    />
                )}
            </div>
        </Layout>
    );
};