import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userID', response.data.user.id);
      console.log(response)
      if (response.data.user.rol === 'admin') {
        navigate('/dashboardAdmin'); 
      } else {
        navigate('/dashboard'); 
      }
    } catch (error) {
      alert('⚠️ Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">🔑 Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="📧 Ingresa tu email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="🔒 Ingresa tu contraseña"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">🚀 Iniciar Sesión</button>
        </form>

        {}
        <div className="mt-3 text-center">
          <button className="btn btn-outline-secondary w-100 mb-2" onClick={() => navigate('/')}>
            ⬅️ Volver al Inicio
          </button>
          <button className="btn btn-outline-success w-100" onClick={() => navigate('/register')}>
            📝 Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
