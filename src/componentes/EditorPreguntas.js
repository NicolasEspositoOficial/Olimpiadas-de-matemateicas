import React, { useState, useEffect } from 'react';
import './EditorPreguntas.css';

const EditorPreguntas = ({ grado, alCerrar }) => {
    const [preguntas, setPreguntas] = useState([]); 
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);
    const [cargando, setCargando] = useState(true);

    // 1. CARGAR PREGUNTAS (Ruta corregida para Hostinger)
    const cargarPreguntas = () => {
        setCargando(true);
        fetch(`/preguntas?grado=${grado}`)
            .then(res => res.json())
            .then(data => {
                setPreguntas(data);
                if (data.length > 0) {
                    setPreguntaSeleccionada(data[0]);
                } else {
                    setPreguntaSeleccionada(null);
                }
                setCargando(false);
            })
            .catch(err => {
                console.error("Error cargando preguntas:", err);
                setCargando(false);
            });
    };

    useEffect(() => {
        cargarPreguntas();
    }, [grado]);

    // 2. CREAR NUEVA PREGUNTA
    const nuevaPregunta = () => {
        const nueva = {
            id: null, 
            titulo: '',
            enunciado: '',
            opcion_a: '',
            opcion_b: '',
            opcion_c: '',
            opcion_d: '',
            respuesta_correcta: 'a',
            grado: grado
        };
        setPreguntaSeleccionada(nueva);
        setPreguntas([...preguntas, { ...nueva, id: 'temp-' + Date.now() }]);
    };

    // 3. GUARDAR EN BD (Ruta corregida para Hostinger)
    const guardarEnBD = () => {
        if (!preguntaSeleccionada.enunciado || !preguntaSeleccionada.opcion_a) {
            alert("Por favor rellena al menos el enunciado y la opción A");
            return;
        }

        fetch('/guardar-pregunta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preguntaSeleccionada)
        })
        .then(res => res.json())
        .then(data => {
            alert("¡Pregunta guardada con éxito!");
            cargarPreguntas(); 
        })
        .catch(err => alert("Error al conectar con el servidor"));
    };

    // 4. ELIMINAR PREGUNTA (Ruta corregida para Hostinger)
    const eliminarPregunta = () => {
        if (!preguntaSeleccionada.id || String(preguntaSeleccionada.id).includes('temp')) {
            setPreguntas(preguntas.filter(p => p.id !== preguntaSeleccionada.id));
            setPreguntaSeleccionada(null);
            return;
        }

        if (window.confirm("¿Estás seguro de eliminar esta pregunta definitivamente?")) {
            fetch(`/eliminar-pregunta/${preguntaSeleccionada.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                alert("Pregunta eliminada");
                cargarPreguntas();
            })
            .catch(err => console.error(err));
        }
    };

    // 5. MANEJAR CAMBIOS
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        const actualizada = { ...preguntaSeleccionada, [name]: value };
        setPreguntaSeleccionada(actualizada);
        setPreguntas(preguntas.map(p => p.id === preguntaSeleccionada.id ? actualizada : p));
    };

    const cambiarCorrecta = (letra) => {
        const actualizada = { ...preguntaSeleccionada, respuesta_correcta: letra };
        setPreguntaSeleccionada(actualizada);
        setPreguntas(preguntas.map(p => p.id === preguntaSeleccionada.id ? actualizada : p));
    };

    return (
        <div className="contenedor-editor-modal">
            <div className="sidebar-editor">
                <h3 className="titulo-sidebar">Preguntas {grado}</h3>
                <button className="btn-add" onClick={nuevaPregunta} title="Nueva Pregunta">+</button>
                
                <div className="lista-preguntas-scroll">
                    {cargando ? <p>Cargando...</p> : 
                        preguntas.map((preg, index) => (
                            <button 
                                key={preg.id} 
                                onClick={() => setPreguntaSeleccionada(preg)}
                                className={`btn-pregunta-item ${preguntaSeleccionada?.id === preg.id ? 'activo' : ''}`}
                            >
                                {preg.titulo || `Pregunta ${index + 1}`}
                            </button>
                        ))
                    }
                </div>
                
                <button onClick={alCerrar} className="btn-salir">Cerrar Editor</button>
            </div>

            <div className="formulario-editor">
                {!preguntaSeleccionada ? (
                    <div className="aviso-seleccionar">
                        <p>Haz clic en <b>"+"</b> para crear una pregunta de {grado}.</p>
                    </div>
                ) : (
                    <>
                        <div className="input-group">
                            <label>Título:</label>
                            <input 
                                name="titulo"
                                type="text" 
                                className="input-texto" 
                                value={preguntaSeleccionada.titulo || ''}
                                onChange={manejarCambioInput}
                                placeholder="Ej: Suma básica"
                            />
                        </div>

                        <div className="input-group-vertical">
                            <label>Pregunta:*</label>
                            <textarea 
                                name="enunciado"
                                className="textarea-pregunta" 
                                value={preguntaSeleccionada.enunciado || ''}
                                onChange={manejarCambioInput}
                                placeholder="Escribe el problema aquí..."
                            ></textarea>
                        </div>

                        <div className="zona-drop-imagen">
                            <p>Imagen (Próximamente)</p>
                        </div>

                        <div className="seccion-respuestas">
                            <p className="label-respuestas">Respuestas* (Marca la correcta)</p>
                            <div className="grid-respuestas">
                                {['a', 'b', 'c', 'd'].map((letra) => (
                                    <div key={letra} className="respuesta-fila">
                                        <label>{letra.toUpperCase()}</label>
                                        <input 
                                            name={`opcion_${letra}`}
                                            className="input-respuesta" 
                                            type="text" 
                                            value={preguntaSeleccionada[`opcion_${letra}`] || ''}
                                            onChange={manejarCambioInput}
                                        />
                                        <input 
                                            type="radio" 
                                            name="respuesta_correcta" 
                                            className="radio-correcta"
                                            checked={preguntaSeleccionada.respuesta_correcta === letra}
                                            onChange={() => cambiarCorrecta(letra)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="acciones-editor">
                            <button className="btn-accion primary" onClick={guardarEnBD}>
                                Guardar en Base de Datos
                            </button>
                            <button className="btn-accion btn-eliminar" onClick={eliminarPregunta}>
                                Eliminar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditorPreguntas;