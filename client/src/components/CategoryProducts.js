// CategoryProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryProducts.css'; // ✅ Ensure this CSS file is imported

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
        })
        .catch(err => console.error("❌ Error fetching products:", err));
    }
  }, [selectedCategory]);

  return (
    <div className="category-products">
      <h2>{selectedCategory}</h2>
      <div className="grid">
        {filteredProducts.map(product => (
          <div className="card" key={product._id}>
            <img
              className="product-image"
              src={`/assets/${product.image}`} // ✅ Proper relative image path
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
