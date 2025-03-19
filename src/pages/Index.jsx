import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap"; // Importamos el Modal de React-Bootstrap

const Index = () => {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: "",
    stock: "",
    precioMin: "",
    precioMax: "",
  });
  const [carrito, setCarrito] = useState([]);
  const [showCarrito, setShowCarrito] = useState(false); // Estado para mostrar el modal del carrito

  // Obtener todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // Manejar cambios en los filtros
  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  // Filtrar productos según los criterios de búsqueda
  const productosFiltrados = productos.filter((producto) => {
    const { nombre, stock, precioMin, precioMax } = filtros;
    const precio = parseFloat(producto.precio);
    const stockInput = filtros.stock.trim() ? parseInt(filtros.stock, 10) : null;

    return (
      (!nombre || producto.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
      (stockInput === null || producto.stock === stockInput) && // Comparación directa
      (!precioMin || precio >= parseFloat(precioMin)) &&
      (!precioMax || precio <= parseFloat(precioMax))
    );
  });

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item._id === producto._id);
    if (productoExistente) {
      // Si el producto ya está en el carrito, solo incrementamos la cantidad
      setCarrito(carrito.map((item) =>
        item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter((producto) => producto._id !== productoId));
  };

  // Actualizar cantidad de un producto en el carrito
  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId); // Eliminar si la cantidad es 0 o menor
    } else {
      setCarrito(carrito.map((producto) =>
        producto._id === productoId ? { ...producto, cantidad: cantidad } : producto
      ));
    }
  };

  // Mostrar/ocultar el modal del carrito
  const toggleCarrito = () => setShowCarrito(!showCarrito);

  return (
    <div className="container mt-4">
      <div className="navbar navbar-dark bg-dark mb-4 px-3 d-flex justify-content-between">
        <span className="navbar-brand text-light">📦 Marketplace</span>

        {/* Icono de carrito */}
        <button className="btn btn-outline-light" onClick={toggleCarrito}>
          🛒 Ver Carrito ({carrito.length})
        </button>

        <Link to="/login" className="btn btn-outline-light">
          🚀 Inicio de sesión como vendedor
        </Link>
      </div>

      <h1 className="text-center mb-4">🛒 Tienda de Productos</h1>

      {/* Filtros de búsqueda */}
      <div className="card shadow-sm p-3 mb-4">
        <h3 className="text-center">🔎 Buscar Productos</h3>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltroChange}
              className="form-control"
              placeholder="🔍 Nombre del producto"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="stock"
              value={filtros.stock}
              onChange={handleFiltroChange}
              className="form-control"
              placeholder="🔢 SKU"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="precioMin"
              value={filtros.precioMin}
              onChange={handleFiltroChange}
              className="form-control"
              placeholder="💰 Precio mínimo"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="precioMax"
              value={filtros.precioMax}
              onChange={handleFiltroChange}
              className="form-control"
              placeholder="💰 Precio máximo"
            />
          </div>
        </div>
      </div>

      {/* Lista de productos */}
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr key={producto._id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        🛍️ Agregar al Carrito
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal del carrito */}
      <Modal show={showCarrito} onHide={toggleCarrito}>
        <Modal.Header closeButton>
          <Modal.Title>🛒 Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {carrito.length === 0 ? (
            <p>No has agregado productos al carrito.</p>
          ) : (
            <ul className="list-group">
              {carrito.map((producto) => (
                <li key={producto._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    {producto.nombre} - ${producto.precio}
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => eliminarDelCarrito(producto._id)}
                    >
                      🗑️ Eliminar
                    </button>
                    <input
                      type="number"
                      value={producto.cantidad}
                      min="1"
                      max={producto.stock}
                      onChange={(e) =>
                        actualizarCantidad(producto._id, parseInt(e.target.value, 10))
                      }
                      className="form-control w-25"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={toggleCarrito}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={() => alert("Proceder al pago...")}>
            Proceder al pago
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Index;
