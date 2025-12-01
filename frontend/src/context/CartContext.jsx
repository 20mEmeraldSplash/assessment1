import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addToCartAPI, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCartItems(response.data.data?.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please login first' };
    }

    try {
      await addToCartAPI(productId, quantity);
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!isAuthenticated) return;

    try {
      await updateCartItemAPI(productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;

    try {
      await removeFromCartAPI(productId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCart,
    getCartItemsCount,
    getCartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

