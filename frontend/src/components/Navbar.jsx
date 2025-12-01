import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛍️ Marketplace
        </Link>
        
        <div className="navbar-links">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-link">
                Cart ({getCartItemsCount()})
              </Link>
              <span className="nav-user">
                Welcome, {user?.firstName || user?.email || 'User'}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

