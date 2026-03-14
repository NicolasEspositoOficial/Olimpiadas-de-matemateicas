import React from 'react';
import './FilterBar.css'

const FilterBar = ({ activeFilter, setFilter }) => {
  const opciones = ["4/5", "6/7", "8/9", "10/11"];

  return (
    <div  className='container-padre-filterbar'>
      {opciones.map((opt) => (
        <button
          key={opt}
          onClick={() => setFilter(opt)}
          className="btn-filtrobar-grado"
          style={{
            backgroundColor: activeFilter === opt ? '#9e9e9e' : '#e0e0e0',
            color: activeFilter === opt ? 'white' : 'black'
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