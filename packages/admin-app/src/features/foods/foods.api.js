import api from '../../api/http';
import endpoints from '../../api/endpoints';

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

export const foodsApi = {
  // Get all foods - GET /api/admin/get-all-food
  getAllFoods: async () => {
    const response = await api.get(endpoints.admin.getAllFood);
    return response.data || [];
  },

  // Upload/Create new food - POST /api/admin/upload-food
  createFood: async (foodData) => {
    const response = await api.post(endpoints.admin.uploadFood, foodData);
    return response.data;
  },

  // Assign food to partner - POST /api/admin/assign-food
  assignFood: async (foodId, foodPartnerId) => {
    const response = await api.post(`${endpoints.admin.assignFood}?foodId=${foodId}&foodPartnerId=${foodPartnerId}`);
    return response.data;
  },

  // Get all assigned food details - GET /api/admin/get-all-assigned-food-details
  getAllAssignedFoods: async () => {
    const response = await api.get(endpoints.admin.getAllAssignedFood);
    return response.data || [];
  },
};
