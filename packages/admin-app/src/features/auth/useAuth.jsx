import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/http';
import endpoints from '../../api/endpoints';

const AuthContext = createContext();

// Helper function to safely decode JWT payload
const safeDecodeJWT = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(normalizedPayload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Also decode JWT to get claims
        const claims = safeDecodeJWT(token);
        if (claims) {
          parsedUser.claims = claims;
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);
      
      const response = await api.post(endpoints.auth.login, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Login response:', response.data);
      
      let receivedToken = response.data;
      
      // Handle different response formats
      if (typeof receivedToken === 'object') {
        // If response is an object, look for token in common fields
        receivedToken = receivedToken.token || receivedToken.access_token || receivedToken.jwt || receivedToken.accessToken;
      }
      
      console.log('Extracted token:', receivedToken);
      
      // Validate the token format
      if (!receivedToken || typeof receivedToken !== 'string') {
        throw new Error('No valid token received from server');
      }
      
      // Clean the token (remove any whitespace/newlines)
      receivedToken = receivedToken.trim();
      
      // Check if it looks like a JWT (has at least 2 dots for 3 parts)
      const tokenParts = receivedToken.split('.');
      if (tokenParts.length < 2) {
        console.warn('Token does not appear to be a valid JWT format');
        // But let's try to use it anyway
      }
      
      // Try to decode JWT claims if possible
      let claims = null;
      try {
        claims = safeDecodeJWT(receivedToken);
        console.log('Decoded claims:', claims);
      } catch (error) {
        console.warn('Could not decode JWT claims, but proceeding with token:', error);
      }
      
      // Store token
      localStorage.setItem('adminToken', receivedToken);
      setToken(receivedToken);
      
      // Store user info with claims
      const userInfo = { 
        email, 
        role: 'ADMIN',
        claims: claims
      };
      localStorage.setItem('adminUser', JSON.stringify(userInfo));
      setUser(userInfo);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
