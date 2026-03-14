import React, { useState } from 'react';
import './credenciales.css';
import { useNavigate } from 'react-router-dom';

function CredencialesUsuario({ alComenzar, setDatosUsuario }) {
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");
  const navigate = useNavigate();

  const formularioValido = nombre.trim() !== "" && grado !== "";

  const manejarComienzo = (e) => {
    e.preventDefault();
    if (formularioValido) {
      // Guardamos localmente y pasamos a la prueba
      setDatosUsuario({ nombre, grado }); 
      alComenzar(); 
      navigate("/prueba"); 
    }
  };

  return (
    <div className="contenedor-padre">
      <div className="contenedor_credenciales_usuario">
        <h2 className="titulo-de-bloque-1">registro</h2>
        <div className="espacios_de_credenciales">
          <label className="label_credenciales">Nombre Completo:</label>
          <input 
            type="text" 
            placeholder="Escribe tu nombre" 
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
            <option value="" disabled>Selecciona tu Grado</option>
            <option value="4/5">Grado 4° y 5°</option>
            <option value="6/7">Grado 6° y 7°</option>
            <option value="8/9">Grado 8° y 9°</option>
            <option value="10/11">Grado 10° y 11°</option>
          </select>
        </div>
        <div className="opciones-de-sesion">
          <button 
            type="button" 
            className="btn_Comenzar"
            onClick={manejarComienzo}
            disabled={!formularioValido}
            style={{ opacity: formularioValido ? 1 : 0.5, cursor: formularioValido ? 'pointer' : 'not-allowed' }}
          >
            Iniciar Prueba
          </button>
        </div>
      </div>
    </div>
  );
}

export default CredencialesUsuario;