import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProducts();
      setProducts(response.data.data?.products || []);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        <div className="error">{error}</div>
        <button onClick={fetchProducts} className="btn-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.length === 0 ? (
        <p className="no-products">No products available</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

