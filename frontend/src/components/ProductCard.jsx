import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = imageUrl;
    }
  }, [imageUrl]);

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        {imageUrl && imageLoaded && !imageError ? (
          <img 
            src={imageUrl} 
            alt={product.name}
          />
        ) : (
          <div className="product-image-placeholder">📦</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price?.toFixed(2) || '0.00'}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

