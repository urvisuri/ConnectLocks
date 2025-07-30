import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // 🆗 extract product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        console.log("✅ Product detail fetched:", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch product details:", err);
      });
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '300px' }} />
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
