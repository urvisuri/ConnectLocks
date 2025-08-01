import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!categoryName) return;

    const imagePaths = [];
    const extensions = ['jpg', 'png'];

    for (let i = 1; i <= 30; i++) {
      for (let ext of extensions) {
        imagePaths.push(`/assets/${categoryName}/img${i}.${ext}`);
      }
    }

    const checkImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
      });

    Promise.all(imagePaths.map(checkImage)).then((results) => {
      const validImages = results.filter(Boolean);
      setImages(validImages);
    });
  }, [categoryName]);

  return (
    <div className="category-page">
      <h2>{categoryName.replace(/-/g, ' ').toUpperCase()}</h2>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`img-${index}`}
              onClick={() => setModalImage(src)}
              className="category-image"
            />
          ))
        ) : (
          <p>No images found in this category.</p>
        )}
      </div>

      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Full View" />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
