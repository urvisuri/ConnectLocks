import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css'; // Ensure this exists and is styled properly




const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName); // Handles encoded names

  // 🔁 Map display category to actual folder name
  const categoryToFolderMap = {
    'Smart lock': 'smart-lock',
    'Auto hinges': 'auto-hinges',
    'Knob': 'Knob',
    'Mortise lock': 'mortise-lock',
    'Door handle': 'door-handle',
    'Telescopic channel': 'telescopic-channel',
    'Cabinet handle': 'cabinet-handle',
    'Ms': 'Ms',
    'Ss': 'Ss',
  };

  const folderCategory = categoryToFolderMap[decodedCategory] || decodedCategory;

  const [imageFilenames, setImageFilenames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const importImages = async () => {
      try {
        // ✅ Dynamically import images using the resolved folder name
        const imagesContext = require.context(
          `../assets/${folderCategory}`,
          false,
          /\.(png|jpe?g)$/i
        );

        const files = imagesContext.keys().map((key) => key.replace('./', ''));
        setImageFilenames(files);
      } catch (err) {
        console.error('Error loading images:', err);
        setImageFilenames([]);
      }
    };

    importImages();
  }, [folderCategory]);

  return (
    <div className="category-page">
      <h2 className="category-title">{decodedCategory}</h2>

      <div className="image-grid">
        {imageFilenames.map((file, index) => (
          <img
            key={index}
            src={`/assets/${folderCategory}/${file}`}
            alt={`img-${index}`}
            className="category-img"
            onClick={() => setSelectedImage(`/assets/${folderCategory}/${file}`)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Fullscreen" className="modal-img" />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
