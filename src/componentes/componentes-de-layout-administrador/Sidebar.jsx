import React from 'react';
import './Sidebar.css'
const Sidebar = ({ onSelectGrade }) => {
  const grados = ["4/5", "6/7", "8/9", "10/11"];

  return (
    <div className="sidebar-admin">
      <h2 className='titulo-de-preguntas'>Preguntas</h2>
      <div style={{ marginTop: '5rem' }}>
        {grados.map((grado) => (
          <button key={grado} onClick={() => onSelectGrade(grado)} className='btn-preguntas-grados'>Preguntas <br /> {grado}</button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;