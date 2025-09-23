import { useEffect, useState } from "react";
import './modalRol.css';

export const ModalRol = ({ onClose, onSave, rolSeleccionado }) => {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (rolSeleccionado) {
            setNombre(rolSeleccionado.nombre || "");
        }
    }, [rolSeleccionado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const rolData = { nombre };

        if (rolSeleccionado) {
            onSave({ ...rolSeleccionado, ...rolData });
        } else {
            onSave(rolData);
        }
    }
    return (
        <div className="modal-fondo">
            <div className="modal-contenido">
                <h2 className="modal-titulo">
                    {rolSeleccionado ? "Editar Rol" : "Crear Rol"}
                </h2>

                <form className="modal-titulo" onSubmit={handleSubmit}>
                    <input className="modal-entrada"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="nombre del rol"
                        required />

                    <div className="modal-acciones">
                        <button type="button" className="modal-boton-cancelar" onClick={onClose}>
                            cancelar
                        </button>
                        <button type="submit" className="modal-boton-guardar">
                            guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

