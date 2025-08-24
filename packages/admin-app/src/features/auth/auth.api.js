import api from '../../api/http';
import endpoints from '../../api/endpoints';

// Helper function to safely decode JWT payload
function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(normalized);
    return JSON.parse(json);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

export const authApi = {
  // Login user and return token
  login: async (email, password) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    
    const response = await api.post(endpoints.auth.login, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Store token in localStorage
    const token = response.data;
    if (token) {
      localStorage.setItem('adminToken', token);
    }
    
    return token;
  },

  // Register admin user
  registerAdmin: async (userData) => {
    const response = await api.post(endpoints.auth.registerAdmin, userData);
    
    // If registration returns a token, store it
    const token = response.data;
    if (token && typeof token === 'string' && token.split('.').length === 3) {
      localStorage.setItem('adminToken', token);
    }
    
    return token;
  },
  
  // Get current user profile from token
  getProfile: () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;
    
    return decodeJwt(token);
  },
  
  // Logout - clear token and storage
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
};
