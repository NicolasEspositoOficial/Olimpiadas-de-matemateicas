import React from 'react';
// IMPORTACIONES CORREGIDAS
import FilterBar from '../componentes/componentes-de-layout-administrador/FilterBar';
import RankingTable from '../componentes/componentes-de-layout-administrador/RankingTable';
import './ventana-de-administracion.css'

const DashboardAdmin = ({ results, filter, setFilter }) => {

    // LÓGICA: Añadimos (results || []) por seguridad si los datos tardan en cargar
    const filteredData = (results || [])
        .filter(item => filter ? item.grado === filter : true)
        .sort((a, b) => {
            if (b.aciertos !== a.aciertos) {
                return b.aciertos - a.aciertos; // Primero por aciertos (Mayor a menor)
            }
            // Aseguramos que tiempo sea un string para evitar errores con localeCompare
            const tiempoA = a.tiempo || "99:99:99";
            const tiempoB = b.tiempo || "99:99:99";
            return tiempoA.localeCompare(tiempoB); // Si empatan, por tiempo (Menor a mayor)
        });

    return (
        <div className='estilo-de-vetana-de-admin'>
            <h2 className='titulo-de-vetana-admin'>Resultados</h2>
            <FilterBar activeFilter={filter} setFilter={setFilter} />
            <RankingTable data={filteredData} />
        </div>
    );
};

export default DashboardAdmin;