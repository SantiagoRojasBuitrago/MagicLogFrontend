import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.nombre} - ${product.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
