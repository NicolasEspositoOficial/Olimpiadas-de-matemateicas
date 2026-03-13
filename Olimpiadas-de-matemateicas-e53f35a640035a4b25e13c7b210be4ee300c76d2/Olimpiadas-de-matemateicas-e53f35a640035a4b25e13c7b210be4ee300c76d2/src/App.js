import React, { useEffect, useState } from 'react';
import './App.css';
import CredencialesUsuario from './componentes/credenciales'; 
import Prueba from './pages/prueba';
import { Routes, Route } from 'react-router-dom';

// IMPORTACIONES DE ADMINISTRADOR
import Sidebar from './componentes/componentes-de-layout-administrador/Sidebar';
import DashboardAdmin from './pages/ventana-de-administracion'; 
import LoginAdmin from './componentes/LoginAdmin'; // <-- Nuevo componente de acceso

function App() {
  const [data, setData] = useState([]);
  const [examenActivo, setExamenActivo] = useState(false);

  // ESTADOS DE ADMINISTRACIÓN
  const [isAuthorized, setIsAuthorized] = useState(false); // Controla el acceso
  const [filterGrade, setFilterGrade] = useState(null);
  const [editGrade, setEditGrade] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/usuarios')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* RUTA DE REGISTRO */}
        <Route path="/" element={
          <div className="ventana-de-registro">
            <div className="lado-derecho-registro">
              <CredencialesUsuario alComenzar={() => setExamenActivo(true)} />
            </div>
            <div className="lado-izquierdo-registro">
              <p className="estilo-de-texto-de-formulario-registro">¡Bienvenidos!</p>
              <p className="estilo-de-texto-de-formulario-registro">Nos alegra muchísimo que estés aquí. Este es un espacio pensado para ti...</p>
              <p className="estilo-de-texto-de-formulario-registro">Completa el formulario y comienza esta nueva experiencia.</p>
              <p className="estilo-de-texto-de-formulario-registro">¡Te esperamos!</p>
            </div>
          </div>
        } />

        {/* RUTA DE LA PRUEBA */}
        <Route path="/prueba" element={<Prueba cronometroActivo={examenActivo} />} />

        {/* RUTA DE ADMINISTRACIÓN PROTEGIDA */}
        <Route path="/admin" element={
          !isAuthorized ? (
            /* Si NO está autorizado, muestra el Login */
            <LoginAdmin onLogin={setIsAuthorized} />
          ) : (
            /* Si SÍ está autorizado, muestra el Panel */
            <div className="admin-layout" style={{ display: 'flex' }}>
              <Sidebar onSelectGrade={setEditGrade} />
              
              <DashboardAdmin 
                results={data} 
                filter={filterGrade} 
                setFilter={setFilterGrade} 
              />

              {/* Modal/Aviso de edición de preguntas */}
              {editGrade && (
                <div style={{
                  position: 'fixed', right: '20px', bottom: '20px', 
                  background: '#fff', padding: '15px', border: '2px solid #333',
                  borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000
                }}>
                  <strong>Modo Edición:</strong> Preguntas {editGrade}
                  <br />
                  <button 
                    onClick={() => setEditGrade(null)}
                    style={{ marginTop: '10px', cursor: 'pointer' }}
                  >
                    Cerrar Editor
                  </button>
                </div>
              )}
            </div>
          )
        } />
      </Routes>
    </div>
  );
}

export default App;