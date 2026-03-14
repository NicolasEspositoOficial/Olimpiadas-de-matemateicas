import React, { useState, useEffect } from "react";
import './Contador-de-tiempo.css';

// Recibe "activo" como prop desde el padre
function ContadorDeTiempo({ activo }) {
    const [tiempo, setTiempo] = useState(0); // Tiempo en milisegundos

    useEffect(() => {
        let intervalo;
        if (activo) {
            // Se ejecuta cada 10ms para actualizar las centésimas
            intervalo = setInterval(() => {
                setTiempo((prev) => prev + 10);
            }, 10);
        } else {
            clearInterval(intervalo);
        }
        return () => clearInterval(intervalo);
    }, [activo]);

    const formatearTiempo = () => {
        const minutos = Math.floor(tiempo / 60000);
        const segundos = Math.floor((tiempo % 60000) / 1000);
        const milisegundos = Math.floor((tiempo % 1000) / 10); // Centésimas

        return `${minutos.toString().padStart(2, '0')}:${segundos
            .toString().padStart(2, '0')}:${milisegundos.toString().padStart(2, '0')}`;
    };

    return (
        <div className="contenedorPadreDeContador">
            <div className="containerPadreContadorTiempo">
                {/* Agregamos el id="valor-cronometro" para que Prueba.jsx pueda leerlo */}
                <p>Tiempo <span id="valor-cronometro">{formatearTiempo()}</span></p>
            </div>
        </div>
    );
}

export default ContadorDeTiempo;