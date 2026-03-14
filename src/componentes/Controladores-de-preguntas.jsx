import React from "react";
import './Controladores-de-preguntas.css';

const ControladorDePreguntas = ({ onSiguiente, onAnterior, esPrimera, esUltima }) => {
    return (
        <div className="container-botones-control">
            <div className="botones-control">
                {/* Botón Anterior */}
                <button 
                    className="btnControl" 
                    onClick={onAnterior} 
                    disabled={esPrimera}
                    style={{ 
                        opacity: esPrimera ? 0.3 : 1, 
                        cursor: esPrimera ? 'not-allowed' : 'pointer' 
                    }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="estiloControlador"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 15l-3 -3l3 -3" />
                        <path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0" />
                    </svg>
                </button>

                {/* Botón Siguiente / Enviar */}
                <button 
                    className={`btnControl ${esUltima ? 'btn-finalizar' : ''}`} 
                    onClick={onSiguiente}
                    // IMPORTANTE: Quitamos el disabled={esUltima} para que deje hacer clic al final
                    style={{ 
                        cursor: 'pointer',
                        background: esUltima ? '#4CAF50' : '' // Un color verde si es el último
                    }}
                >
                    {esUltima ? (
                        /* Icono de Check o Enviar para la última pregunta */
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="white" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="estiloControlador"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                    ) : (
                        /* Icono de Flecha Siguiente normal */
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"  
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="estiloControlador"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M11 9l3 3l-3 3" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ControladorDePreguntas;