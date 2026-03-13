import React from "react";
import FormularioDePreguntasEstudiante from '../componentes/formulario-de-preguntas';
import ContadorDeTiempo from '../componentes/contador-de-tiempo';
import ControladorDePreguntas from '../componentes/Controladores-de-preguntas';

const Prueba = ({ cronometroActivo }) => {
    return (
        <div className="pagina-prueba-container">
            {/* El contador recibe la orden desde App.js */}
            <ContadorDeTiempo activo={cronometroActivo} />
            
            <FormularioDePreguntasEstudiante />
            
            <ControladorDePreguntas />
        </div>
    );
};

export default Prueba;