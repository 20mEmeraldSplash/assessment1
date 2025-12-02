import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = product.images[0];
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProduct(id);
      // Backend returns data structure: response.data.data contains the product object directly
      setProduct(response.data.data);
    } catch (err) {
      setError('Failed to load product details');
      console.error('Failed to fetch product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    const result = await addToCart(id, quantity);
    
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert(result.message || 'Failed to add to cart');
    }
    
    setAddingToCart(false);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error">{error || 'Product not found'}</div>
        <button onClick={() => navigate('/products')} className="btn-back">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate('/products')} className="btn-back">
        ← Back
      </button>
      
      <div className="product-detail">
        <div className="product-detail-image">
          {product.images && product.images.length > 0 && imageLoaded && !imageError ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
            />
          ) : (
            <div className="product-image-placeholder">📦</div>
          )}
        </div>
        
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          
          <div className="product-price-large">
            ${product.price?.toFixed(2) || '0.00'}
          </div>
          
          {product.description && (
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}
          
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="quantity-input"
              />
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="btn-add-to-cart"
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

