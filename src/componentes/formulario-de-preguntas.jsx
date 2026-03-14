import React, { useState, useEffect } from 'react';
import './formulario-de-preguntas.css';

function FormularioDePreguntasEstudiante({ preguntaActual, total, numeroActual, onSeleccionar, respuestaGuardada }) {
  
  // Función para manejar el clic y avisar al componente Prueba.jsx
  const manejarSeleccion = (letra) => {
    onSeleccionar(letra);
  };

  if (!preguntaActual) return null;

  return (
    <div className="contenedorPadrePregunta">
      <div className="contenedor-de-pregunta">      
        <div className="texto-de-pregunta">
          <div className="contador-de-preguntas">
            <span>{numeroActual}/{total}</span>
          </div>
          <p className="estilo-de-pregunta">{preguntaActual.enunciado}</p>
        </div>

        {preguntaActual.imagen && (
          <div className="imagen">
            <img src={preguntaActual.imagen} alt="Pregunta" className="imagen-de-pregunta"/>
          </div>
        )}

        <div className="respuestas">
          <div className="bloque-de-respuestas">
            <button 
              className={`estilo-de-respuesta ${respuestaGuardada === 'A' ? 'seleccionada' : ''}`}
              onClick={() => manejarSeleccion('A')}
            >
              A: <span>{preguntaActual.opcion_a}</span>
            </button>
            <button 
              className={`estilo-de-respuesta ${respuestaGuardada === 'B' ? 'seleccionada' : ''}`}
              onClick={() => manejarSeleccion('B')}
            >
              B: <span>{preguntaActual.opcion_b}</span>
            </button>
          </div>
          <div className="bloque-de-respuestas">
            <button 
              className={`estilo-de-respuesta ${respuestaGuardada === 'C' ? 'seleccionada' : ''}`}
              onClick={() => manejarSeleccion('C')}
            >
              C: <span>{preguntaActual.opcion_c}</span>
            </button>
            <button 
              className={`estilo-de-respuesta ${respuestaGuardada === 'D' ? 'seleccionada' : ''}`}
              onClick={() => manejarSeleccion('D')}
            >
              D: <span>{preguntaActual.opcion_d}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioDePreguntasEstudiante;