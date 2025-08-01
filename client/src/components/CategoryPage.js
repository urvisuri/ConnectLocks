// src/components/CategoryPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
  const { name } = useParams();
  const [modalSrc, setModalSrc] = useState(null);

  const imageCount = 10;
  const formats = ['jpg', 'png'];
  const images = [];

  for (let i = 1; i <= imageCount; i++) {
    formats.forEach((ext) => {
      images.push(`${process.env.PUBLIC_URL}/assets/${name}/img${i}.${ext}`);
    });
  }

  const openModal = (src) => setModalSrc(src);
  const closeModal = () => setModalSrc(null);

  return (
    <div className="category-page">
      <h2>{name.replace(/-/g, ' ')}</h2>
      <div className="image-grid">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt=""
            onClick={() => openModal(src)}
            onError={(e) => (e.target.style.display = 'none')}
            className="grid-image"
          />
        ))}
      </div>

      {modalSrc && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img src={modalSrc} alt="Fullscreen" className="modal-content" />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
