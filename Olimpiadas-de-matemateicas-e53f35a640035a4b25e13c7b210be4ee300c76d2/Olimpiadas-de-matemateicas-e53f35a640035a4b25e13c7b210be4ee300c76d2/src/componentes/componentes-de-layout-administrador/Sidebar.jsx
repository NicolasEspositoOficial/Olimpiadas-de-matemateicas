import React from 'react';

const Sidebar = ({ onSelectGrade }) => {
  const grados = ["4/5", "6/7", "8/9", "10/11"];

  return (
    <div className="sidebar-admin" style={{ width: '250px', background: '#e0e0e0', height: '100vh', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Preguntas</h2>
      <div style={{ marginTop: '50px' }}>
        {grados.map((grado) => (
          <button 
            key={grado} 
            onClick={() => onSelectGrade(grado)}
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '15px', 
              marginBottom: '20px', 
              borderRadius: '15px', 
              border: 'none', 
              backgroundColor: '#bdbdbd',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Preguntas para {grado}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;