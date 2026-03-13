import React, { useState } from 'react';
import './credenciales.css';
import { useNavigate } from 'react-router-dom';

function CredencialesUsuario({ alComenzar }) {
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");
  const navigate = useNavigate();

  const formularioValido = nombre.trim() !== "" && grado !== "";

  const manejarComienzo = (e) => {
    e.preventDefault();
    if (formularioValido) {
      alComenzar(); // Activa el estado global en App.js
      navigate("/prueba"); // Salta a la siguiente página
    }
  };

  return (
    <div className="contenedor-padre">
      <div className="contenedor_credenciales_usuario">
        <h2 className="titulo-de-bloque-1">registro</h2>
        
        <div className="espacios_de_credenciales">
          <label className="label_credenciales">Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre" 
            className="estilo_de_input_1"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="espacios_de_credenciales">
          <label className="label_credenciales">Grado:</label>
          <select 
            className="estilo_de_input_2"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
          >
            <option value="" disabled>Selecciona Grado</option>
            <option value="4/5">4/5</option>
            <option value="6/7">6/7</option>
            <option value="8/9">8/9</option>
            <option value="10/11">10/11</option>
          </select>
        </div>

        <div className="opciones-de-sesion">
          <button 
            type="button" 
            className="btn_Comenzar"
            onClick={manejarComienzo}
            disabled={!formularioValido}
            style={{ 
              opacity: formularioValido ? 1 : 0.5,
              cursor: formularioValido ? 'pointer' : 'not-allowed' 
            }}
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CredencialesUsuario;