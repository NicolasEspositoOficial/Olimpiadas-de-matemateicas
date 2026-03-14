import React, { useState } from 'react';
import './LoginAdmin.css'

const LoginAdmin = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes poner la lógica real con Node.js después. 
    // Por ahora, usemos credenciales fijas:
    if (user === 'admin' && pass === '12345') {
      onLogin(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className='container-padre-credenciales-admin'>
      <form onSubmit={handleSubmit} className='estilo-de-formulario'>
        <h2 className='titulo-de-bloque-de-credencuales-admin'>Acceso Administrativo</h2>
        <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} className='input-credencial-admin'/>
        <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} className='input-credencial-admin'/>
        <button type="submit" className='btn-iniciar-admin'> Entrar </button>
      </form>
    </div>
  );
};

export default LoginAdmin;