import React from "react";
import './Controladores-de-preguntas.css'
function ControladorDePreguntas (){
    return(
        <div className="container-botones-control">
            <div className="botones-control">
                <button className="btnControl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-left" className="estiloControlador"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 15l-3 -3l3 -3" /><path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0" /></svg>
                </button>
                <button className="btnControl">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-chevron-right" className="estiloControlador"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 9l3 3l-3 3" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /></svg>
                </button>
            </div>
        </div>
    );
};

export default ControladorDePreguntas;