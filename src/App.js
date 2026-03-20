import React, { useEffect, useState } from 'react';
import './App.css';
import CredencialesUsuario from './componentes/credenciales'; 
import Prueba from './pages/prueba';
import { Routes, Route } from 'react-router-dom';

// IMPORTACIONES DE ADMINISTRADOR
import Sidebar from './componentes/componentes-de-layout-administrador/Sidebar';
import DashboardAdmin from './pages/ventana-de-administracion'; 
import LoginAdmin from './componentes/LoginAdmin';
import EditorPreguntas from './componentes/EditorPreguntas'; 

function App() {
  const [data, setData] = useState([]);
  const [examenActivo, setExamenActivo] = useState(false);

  // --- NUEVO ESTADO PARA LOS DATOS DEL ESTUDIANTE ---
  const [datosUsuario, setDatosUsuario] = useState({ nombre: "", grado: "" });

  // ESTADOS DE ADMINISTRACIÓN
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const [filterGrade, setFilterGrade] = useState(null);
  const [editGrade, setEditGrade] = useState(null);

  useEffect(() => {
    // CAMBIO REALIZADO: Ahora usa ruta relativa '/usuarios' en lugar de localhost
    fetch('/usuarios')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log("Error cargando usuarios:", err));
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* RUTA DE REGISTRO */}
        <Route path="/" element={
          <div className="ventana-de-registro">
            <div className="lado-derecho-registro">
              <CredencialesUsuario 
                setDatosUsuario={setDatosUsuario} 
                alComenzar={() => setExamenActivo(true)} 
              />
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
        <Route path="/prueba" element={
          <Prueba 
            cronometroActivo={examenActivo} 
            datosUsuario={datosUsuario} 
          />
        } />

        {/* RUTA DE ADMINISTRACIÓN PROTEGIDA */}
        <Route path="/admin" element={
          !isAuthorized ? (
            <LoginAdmin onLogin={setIsAuthorized} />
          ) : (
            <div className="admin-layout" style={{ display: 'flex', position: 'relative' }}>
              <Sidebar onSelectGrade={setEditGrade} />
              
              <DashboardAdmin 
                results={data} 
                filter={filterGrade} 
                setFilter={setFilterGrade} 
              />

              {/* VENTANA MODAL DEL EDITOR DE PREGUNTAS */}
              {editGrade && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2000
                }}>
                  <EditorPreguntas 
                    grado={editGrade} 
                    alCerrar={() => setEditGrade(null)} 
                  />
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