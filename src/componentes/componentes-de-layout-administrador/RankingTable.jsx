import React from 'react';
import './RankingTable.css';

const RankingTable = ({ data }) => {
  return (
    <div className='container-padre-ranking'>
  <table className='tabla-ranking'>
    <thead>
      <tr>
        <th className='estilo-de-informacion-tabla-rankin'>Nombre</th>
        <th className='estilo-de-informacion-tabla-rankin'>Aciertos</th>
        <th className='estilo-de-informacion-tabla-rankin'>Grado</th>
        <th className='estilo-de-informacion-tabla-rankin'>Tiempo</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((usuario, index) => (
          <tr key={index} style={{ textAlign: 'center' }}>
            <td className='estilo-de-informacion-tabla-rankin-usuarios'>
              {usuario.nombre || 'Sin nombre'}
            </td>
            <td className='estilo-de-informacion-tabla-rankin-usuarios'>
              {usuario.aciertos || 0}
            </td>
            <td className='estilo-de-informacion-tabla-rankin-usuarios'>
              {usuario.grado || '--'}
            </td>
            <td className='estilo-de-informacion-tabla-rankin-usuarios'>
              {usuario.tiempo || '--:--'}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className='texto-de-datos-vacios' colSpan="4">
            No hay resultados para mostrar
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
};

export default RankingTable;