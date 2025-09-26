import { useState, useEfect } from "react";
import "./modalRolPermiso.css";

export const ModalPermiso = ({ OnClose, onSave, permisoSeleccionado }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEfect(() => {
        if (permisoSeleccionado) {
            setNombre(permisoSeleccionado.nombre || "");
            setDescripcion(permisoSeleccionado.descripcion || "");
        } else {
            setNombre("");
            setDescripcion("");
        }
    }, [permisoSeleccionado]);

    const handleSutmit = (e) => {
        e.preventDefault();
        onSave({
            id_permiso: permisoSeleccionado?.id_permiso,
            nombre,
            descripcion
        });
    }

    return (
        <div className="modal-fondo">
            <div className="model-container">
                <h2 className="modal-titulo">
                    {permisoSeleccionado ? "Editar Permiso" : "Crear Permiso"}
                </h2>
                <form className="modal-formulario" onClick={handleSutmit}>
                    <input className="modal-entrada" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del permiso"
                    required 
                    />
                    <textarea 
                    className="modal-textarea"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripcion del permiso"
                    rows={3}
                    />
                    <div className="modal-acciones">
                        <button type="button" className="modal-boton modal-boton-cancelar" onClick={onclose}>
                            Cancelar
                        </button>
                        <button type="submit" className="modal-boton modal-boton-guardar">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};