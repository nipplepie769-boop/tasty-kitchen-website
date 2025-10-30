import AuthService from './auth';

const CartService = {
  async getCart() {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          ...AuthService.getAuthHeader()
        }
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Get cart error:', error);
      throw error;
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader()
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      return await response.json();
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  async removeFromCart(productId) {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: AuthService.getAuthHeader()
      });
      if (!response.ok) throw new Error('Failed to remove from cart');
      return await response.json();
    } catch (error) {
      console.error('Remove from cart error:', error);
      throw error;
    }
  },

  async checkout(shippingAddress) {
    try {
      const response = await fetch('http://localhost:5000/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeader()
        },
        body: JSON.stringify({ shippingAddress })
      });
      if (!response.ok) throw new Error('Checkout failed');
      return await response.json();
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }
};