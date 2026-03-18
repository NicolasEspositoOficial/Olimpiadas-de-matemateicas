import React, { useState, useEffect } from "react";
import FormularioDePreguntasEstudiante from '../componentes/formulario-de-preguntas';
import ContadorDeTiempo from '../componentes/contador-de-tiempo';
import ControladorDePreguntas from '../componentes/Controladores-de-preguntas';
import './prueba.css';

const Prueba = ({ cronometroActivo, datosUsuario }) => {
    const [preguntas, setPreguntas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [indiceActual, setIndiceActual] = useState(0);
    const [respuestasUsuario, setRespuestasUsuario] = useState({});

    useEffect(() => {
        if (datosUsuario && datosUsuario.grado) {
            fetch(`http://localhost:8081/preguntas?grado=${datosUsuario.grado}`)
                .then(res => res.json())
                .then(data => {
                    setPreguntas(data);
                    setCargando(false);
                })
                .catch(err => {
                    console.error("Error al cargar preguntas:", err);
                    setCargando(false);
                });
        }
    }, [datosUsuario]);

    const finalizarYEnviarResultados = () => {
        let aciertosCalculados = 0;
        preguntas.forEach(pregunta => {
            const respuestaDada = respuestasUsuario[pregunta.id];
            if (respuestaDada && 
                String(respuestaDada).trim().toLowerCase() === String(pregunta.respuesta_correcta).trim().toLowerCase()) {
                aciertosCalculados++;
            }
        });

        // --- CAPTURA DE TIEMPO CORREGIDA ---
        // Buscamos el elemento por el ID que pusimos en el componente ContadorDeTiempo
        const elementoTiempo = document.getElementById('valor-cronometro');
        const tiempoEmpleado = elementoTiempo ? elementoTiempo.innerText.trim() : "00:00:00";

        const datosFinales = {
            nombre: datosUsuario.nombre,
            grado: datosUsuario.grado, 
            aciertos: aciertosCalculados,
            tiempo: tiempoEmpleado 
        };

        fetch('http://localhost:8081/guardar-resultado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosFinales)
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.detalle || "Error al guardar");
            return data;
        })
        .then(data => {
            alert(`¡Prueba terminada, ${datosUsuario.nombre}!\nAciertos: ${aciertosCalculados}\nTiempo: ${tiempoEmpleado}`);
            window.location.href = "/"; 
        })
        .catch(err => {
            console.error("Error crítico:", err);
            alert("No se pudo guardar: " + err.message);
        });
    };

    const irSiguiente = () => {
        if (indiceActual < preguntas.length - 1) {
            setIndiceActual(indiceActual + 1);
        } else {
            if (window.confirm("¿Estás seguro de que quieres terminar la prueba?")) {
                finalizarYEnviarResultados();
            }
        }
    };

    const irAnterior = () => {
        if (indiceActual > 0) {
            setIndiceActual(indiceActual - 1);
        }
    };

    const manejarSeleccion = (letra) => {
        const preguntaId = preguntas[indiceActual].id;
        setRespuestasUsuario({ ...respuestasUsuario, [preguntaId]: letra });
    };

    if (cargando) return <div className="cargando">Cargando olimpiadas...</div>;

    return (
        <div className="pagina-prueba-container">
            <ContadorDeTiempo activo={cronometroActivo} />
            
            <FormularioDePreguntasEstudiante 
                preguntaActual={preguntas[indiceActual]} 
                total={preguntas.length}
                numeroActual={indiceActual + 1}
                onSeleccionar={manejarSeleccion}
                respuestaGuardada={respuestasUsuario[preguntas[indiceActual].id]}
            />
            
            <ControladorDePreguntas 
                onSiguiente={irSiguiente} 
                onAnterior={irAnterior}
                esPrimera={indiceActual === 0}
                esUltima={indiceActual === preguntas.length - 1} 
            />
        </div>
    );
};

export default Prueba;