import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistroVendedor from "../components/RegistroVendedor";

const Register = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-3">🛒 Registro de Vendedores</h1>
      <p>Regístrate para vender en nuestro Marketplace</p>

      {}
      <button className="btn btn-primary me-2" onClick={() => setModalOpen(true)}>
        ✍️ Crear Cuenta
      </button>

      {}
      <button className="btn btn-outline-secondary" onClick={() => navigate("/login")}>
        ⬅️ Volver
      </button>

      {}
      <RegistroVendedor isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Register;
