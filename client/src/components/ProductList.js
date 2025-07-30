// components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-list">
      <h2>{selectedCategory} Products</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map(product => (
            <div className="card" key={product._id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
