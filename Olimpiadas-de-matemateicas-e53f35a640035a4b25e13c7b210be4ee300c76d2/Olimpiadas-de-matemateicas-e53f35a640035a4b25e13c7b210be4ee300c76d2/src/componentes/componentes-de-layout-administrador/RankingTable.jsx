import React from 'react';

const RankingTable = ({ data }) => {
  return (
    <div style={{ padding: '0 20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#e0e0e0' }}>
        <thead>
          <tr style={{ backgroundColor: '#eeeeee' }}>
            <th style={{ padding: '15px', borderBottom: '1px solid #ccc' }}>Nombre</th>
            <th style={{ padding: '15px', borderBottom: '1px solid #ccc' }}>Aciertos</th>
            <th style={{ padding: '15px', borderBottom: '1px solid #ccc' }}>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((usuario, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{usuario.nombre || 'Sin nombre'}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{usuario.aciertos || 0}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{usuario.tiempo || '--:--'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
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