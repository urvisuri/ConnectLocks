// CategoryProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryProducts = ({ selectedCategory }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      axios.get('/api/products')
        .then(res => {
          const filtered = res.data.filter(prod =>
            prod.category.toLowerCase() === selectedCategory.toLowerCase()
          );
          setFilteredProducts(filtered);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="category-products" style={{ marginLeft: '270px', padding: '2rem' }}>
      <h2>{selectedCategory}</h2>
      <div className="grid">
        {filteredProducts.map(product => (
          <div className="card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
