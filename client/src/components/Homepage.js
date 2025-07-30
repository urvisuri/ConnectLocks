// src/components/Homepage.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CategoryProducts from './CategoryProducts';

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Smart lock");

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onCategorySelect={setSelectedCategory} />
      <div style={{ marginLeft: '230px', padding: '2rem', flex: 1 }}>
        <CategoryProducts selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Homepage;
