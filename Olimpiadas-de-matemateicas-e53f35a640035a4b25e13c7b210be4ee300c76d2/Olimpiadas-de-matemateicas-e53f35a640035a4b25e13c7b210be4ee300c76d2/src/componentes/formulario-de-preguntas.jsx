import React from "react";
import './formulario-de-preguntas.css';

function FormularioDePreguntasEstudiante() {
  return (
    <div className="contenedorPadrePregunta">
      <div className="contenedor-de-pregunta">      
      <div className="texto-de-pregunta">
        <div className="contador-de-preguntas">
          <span>1/10</span>
        </div>
        <p className="estilo-de-pregunta"><span>{}</span>Si 3𝑥+5=20, ¿cuál es el valor de 𝑥?</p>
      </div>
      <div className="imagen">
        <img src="https://www.fisymat.com/wp-content/uploads/2022/10/Empuje-1024x579.webp" alt="" className="imagen-de-pregunta"/>
      </div>
      <div className="respuestas">
        <div className="bloque-de-respuestas">
          <button className="estilo-de-respuesta">A: <span>{}3</span></button>
          <button className="estilo-de-respuesta">B: <span>{}5</span></button>
        </div>
        <div className="bloque-de-respuestas">
          <button className="estilo-de-respuesta">C: <span>{}7</span></button>
          <button className="estilo-de-respuesta">D: <span>{}15</span></button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FormularioDePreguntasEstudiante;