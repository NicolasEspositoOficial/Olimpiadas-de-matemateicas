import React, { useState } from 'react';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2>Acceso Administrativo</h2>
        <input 
          type="text" 
          placeholder="Usuario" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          style={{ display: 'block', width: '100%', marginBottom: '20px', padding: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;