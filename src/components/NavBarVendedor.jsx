import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBarVendedor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid"> {}
        
        {}
        <Link className="navbar-brand" to="/dashboard">
          🛍️ Marketplace - Vendedor
        </Link>

        {}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/agregar-producto">➕ Agregar Producto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">📊 Dashboard</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>
                🚪 Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default NavBarVendedor;
