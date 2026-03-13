import React from 'react';
// IMPORTACIONES CORREGIDAS (Añadido /componentes/ que faltaba en la ruta)
import FilterBar from '../componentes/componentes-de-layout-administrador/FilterBar';
import RankingTable from '../componentes/componentes-de-layout-administrador/RankingTable';

const DashboardAdmin = ({ results, filter, setFilter }) => {

    // LÓGICA: Filtrar por grado y luego ordenar
    const filteredData = results
        .filter(item => filter ? item.grado === filter : true)
        .sort((a, b) => {
            if (b.aciertos !== a.aciertos) {
                return b.aciertos - a.aciertos; // Primero por aciertos (Mayor a menor)
            }
            return a.tiempo.localeCompare(b.tiempo); // Si empatan, por tiempo (Menor a mayor)
        });

    return (
        <div style={{ flex: 1, padding: '40px' }}>
            <h2>Resultados</h2>
            <FilterBar activeFilter={filter} setFilter={setFilter} />
            <RankingTable data={filteredData} />
        </div>
    );
};

export default DashboardAdmin;