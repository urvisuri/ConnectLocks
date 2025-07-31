import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  return <h1>Details for Product ID: {id}</h1>;
}

export default ProductDetails;
