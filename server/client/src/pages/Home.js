import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Connect Locks Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product._id} style={{
            border: '1px solid #ddd',
            margin: '10px',
            padding: '15px',
            width: '250px',
            borderRadius: '10px'
          }}>
            <img src={product.image} alt={product.name} width="200" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <Link to={`/product/${product._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
