import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import NavBarVendedor from "../components/NavBarVendedor";


const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const vendedorID = localStorage.getItem("userID");

  useEffect(() => {
    if (!token || !vendedorID) {
      navigate("/login");
      return;
    }

    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get(`/products?vendedorID=${vendedorID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, [navigate, token, vendedorID]);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
      await axiosInstance.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProductos((prevProductos) => prevProductos.filter((producto) => producto._id !== id));

      alert("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="container mt-4">
      <div>
      <NavBarVendedor />
      <h1>📊 Bienvenido al Dashboard</h1>
      <p>Aquí puedes gestionar tus productos y ventas.</p>
    </div>
      <h1 className="text-center mb-4">Mis Productos</h1>

      <div className="text-center mb-3">
        <Link to="/agregar-producto" className="btn btn-primary">➕ Agregar Producto</Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Lista de Productos</h2>
          {productos.length === 0 ? (
            <p className="text-center">No tienes productos registrados.</p>
          ) : (
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto._id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.stock}</td>
                    <td>${producto.precio}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(producto._id)}>
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
