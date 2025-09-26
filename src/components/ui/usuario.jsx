import { useState,useEffect } from "react";

export const ModelUsuario = ({onClose, onSave,usuarioSeleccionado, roles}) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [idRol, setIdRol] = useState("");

    useEffect(() => {
        if (usuarioSeleccionado) {
            setNombre(usuarioSeleccionado.nombre);
            setEmail(usuarioSeleccionado.email);
            setIdRole(usuarioSeleccionado.idrol);
            setClave(""); // en edicion la clave inica vacia
        }else{
            setNombre("");
            setEmail("");
            setClave("");
            setIdRol("");
        }
    }, [usuarioSeleccionado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ...usuarioSeleccionado,
            nombre,
            email,
            id_rol:idRol,
        };

        onSave(data);
    };

    return (
        <div className="modal-fonda">
            <div className="modal-contenedor">
                <h2 className="modal-titulo">
                    {usuarioSeleccionado ? "Editar Usuario" : "Crear Usuario"}
                </h2>

                <form action="" className="modal-formulario" onSubmit={handleSubmit}>
                    <input type="text" 
                    className="modal-entrada" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    required
                    />

                    <input type="text" 
                    className="modal-entrada"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    />

                    <input type="password" 
                    className="modal-entrada" 
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder={usuarioSeleccionado ? "Nueva clave" : "Clave"}
                    required={!usuarioSeleccionado}
                    />

                    <select className="modal-select" 
                    value={idRol}
                    onChange={(e) => setIdRol(e.target.value)}
                    required
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map((r) => (
                            <option key={r.id_rol} value={r.id_rol}>
                                {r.nombre}
                            </option>
                        ))}
                    </select>

                    <div className="modal-acciones">
                        <button
                        type="submit"
                        className="modal-boton-cancelar"
                        onClick={onClose}
                        >
                            calcelar
                        </button>
                        <button
                        type="submit"
                        className="modal-boton-guardar"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};