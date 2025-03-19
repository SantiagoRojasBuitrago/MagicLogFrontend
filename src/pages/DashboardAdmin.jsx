import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [filtroVendedor, setFiltroVendedor] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login'); 
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get('/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltroVendedor(e.target.value);
  };

  const productosFiltrados = productos.filter((producto) => {
    const vendedor = producto.vendedor || ''; 
    return vendedor.toLowerCase().includes(filtroVendedor.toLowerCase());
  });

  return (
    <div>
      {}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {}
          <Link className="navbar-brand" to="/dashboard">
            🛍️ Marketplace - Admin
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
                <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>
                  🚪 Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {}
      <div className="container mt-4">
        <h1 className="text-center mb-4">📦 Productos del Marketplace</h1>

        {}
        <div className="mb-4">
          <input
            type="text"
            value={filtroVendedor}
            onChange={handleFiltroChange}
            className="form-control"
            placeholder="🔍 Filtrar por vendedor"
          />
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="text-center mb-3">📦 Lista de Productos</h2>
            {productosFiltrados.length === 0 ? (
              <p className="text-center">No hay productos disponibles.</p>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Vendedor</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((producto) => (
                    <tr key={producto._id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.stock}</td>
                      <td>{producto.descripcion}</td>
                      <td>${producto.precio}</td>
                      <td>{producto.vendedorID?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
