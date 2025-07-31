import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        console.log("Fetched products:", res.data); // ✅ Add this to confirm
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  

  return (
    <div className="product-list">
      <h2>Connect Locks Products 🔒</h2>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid">
          {products.map(product => (
            <div className="card" key={product._id}>
              <img src={product.image} alt={product.name} className="product-image"/>
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
              <Link to={`/product/${product._id}`}>
                <button className="details-btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
