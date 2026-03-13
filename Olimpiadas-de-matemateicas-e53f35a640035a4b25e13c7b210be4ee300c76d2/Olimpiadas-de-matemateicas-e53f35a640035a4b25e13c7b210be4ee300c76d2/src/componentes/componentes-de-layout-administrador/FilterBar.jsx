import React from 'react';

const FilterBar = ({ activeFilter, setFilter }) => {
  const opciones = ["4/5", "6/7", "8/9", "10/11"];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
      {opciones.map((opt) => (
        <button
          key={opt}
          onClick={() => setFilter(opt)}
          style={{
            padding: '10px 30px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeFilter === opt ? '#9e9e9e' : '#e0e0e0',
            color: activeFilter === opt ? 'white' : 'black',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {opt}
        </button>
      ))}
      <button 
        onClick={() => setFilter(null)}
        style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer' }}
      >
        Todos
      </button>
    </div>
  );
};

export default FilterBar;