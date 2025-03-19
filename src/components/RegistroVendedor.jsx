import React, { useState } from 'react';
import Modal from 'react-modal';
import axiosInstance from '../api/axiosConfig';

Modal.setAppElement('#root');

const RegistroVendedor = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axiosInstance.post('/users/register', {
        email,
        password,
        role: 'vendedor',
      });
      alert('Registro exitoso');
      onClose(); 
      console.log(response);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('El usuario ya existe');
        console.log(err);
      } else {
        setError('Error en el registro');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: {
          width: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
        },
      }}
    >
      <h2>Registro de Vendedor</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control my-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control my-2"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control my-2"
          required
        />
        <button type="submit" className="btn btn-success w-100 my-2">Registrarse</button>
      </form>
      <button onClick={onClose} className="btn btn-danger w-100">Cerrar</button>
    </Modal>
  );
};

export default RegistroVendedor;
