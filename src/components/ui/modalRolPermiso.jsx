import { useState, useEffect } from "react";
import './modalRolPermiso.css'

export const ModalRolPermiso = ({ onClose, onSave, roles = [], permisos = [], relaccionSeleccionada, }) => {
    const [idRol, setIdRol] = useState('');
    const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

    useEffect(() => {
        if (relaccionSeleccionada) {
            setIdRol(Number(relaccionSeleccionada.id_rol || relaccionSeleccionada.idRol || ''));
            setPermisosSeleccionados(relaccionSeleccionada.permisosSeleccionados || [].map((x) => number(x))
            );
        } else {
            setIdRol('');
            setPermisosSeleccionados([]);
        }
    }, [relaccionSeleccionada]);

    const handleCheck = (idPermiso) => {
        const id = Number(idPermiso);
        setPermisosSeleccionados((prev) =>
            prev.incluides(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!idRol) {
            alert('seleccione un rol.');
            return;
        }
        onSave({ idRol: Number(idRol), permisos: permisosSeleccionados });
    };

    return (
        <div className="modal-fondo">
            <div className="modal-contenedor">
                <h2 className="modal-titulo">
                    {relaccionSeleccionada ? 'Editar permisos del Rol' : 'Asignar permisos al Rol'}
                </h2>
                <form className="modal-formulario" onSubmit={handleSubmit}>
                    <select
                        className="modal-select"
                        value={idRol || ''}
                        onChange={(e) => setIdRol(Number(e.target.value))}
                        required
                        disabled={!!relaccionSeleccionada}
                    >
                        <option value="">Seleccionar rol</option>
                        {roles.map((r) => (
                            <option key={r.id_rol} value={r.id_rol}>
                                {r.nombre}
                            </option>
                        ))}
                    </select>

                    <div className="modal-seccion">
                        <label className="modal-etiqueta">Permiso:</label>
                        <div className="modal-lista-permiso">
                            {permisos.map((p) => {
                                const pid = Number(p.id_permiso ?? p.id ?? p.permiso_id ?? p.permiso_id);
                                return (
                                    <label key={pid} className="modal-item-permiso">
                                        <input
                                            type="checkbox"
                                            checked={permisosSeleccionados.includes(pid)}
                                            onChange={() => handleCheck(pid)}
                                            className="modal-checkbox"
                                        />
                                        {p.nombre}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="modal-acciones">
                        <button
                            type="button"
                            className="modal-boton-cancelar"
                            onClick={onClose}
                        >
                            cnacelar
                        </button>
                        <button type="submit" className="modal-boton-guardar">
                            guardar
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}