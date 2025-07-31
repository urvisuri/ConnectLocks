// src/components/ProductsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const categories = [
  'Auto-hinges',
  'Cabinet-handle',
  'Door-handle',
  'Knob',
  'mortise-lock',
  'smart-lock',
  'Telescopic-channel',
];

const ProductsPage = () => {
  return (
    <div className="products-container">
      <h1>Our Product Categories</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category}`}
            className="category-card"
          >
            {category.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
