import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const AddProduct = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const token = localStorage.getItem('token');
  const vendedorID = localStorage.getItem('userID'); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !vendedorID) {
      alert('No estás autenticado. Inicia sesión.');
      return;
    }

    try {
      console.log(vendedorID);
      await axiosInstance.post(
        '/products',
        { nombre, descripcion, precio, stock, vendedorID },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      alert('Producto agregado exitosamente');
      setNombre('');
      setDescripcion('');
      setCantidad('');
      setPrecio('');
    } catch (error) {
      alert('Error al agregar producto');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Agregar Producto</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre del producto" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Descripción del producto" 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Cantidad disponible" 
                    value={stock} 
                    onChange={(e) => setCantidad(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Precio en USD" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">Agregar Producto</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-danger w-100" onClick={() => window.history.back()}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
