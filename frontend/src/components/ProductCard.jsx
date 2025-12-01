import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={product.name}
            onError={() => setImageError(true)}
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

