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

export const partnersApi = {
  // Get all food partners - GET /api/admin/get-all-food-partner
  getAllPartners: async (adminId) => {
    const response = await api.get(`${endpoints.admin.getAllFoodPartners}?id=${adminId}`);
    const decodedData = safeDecodeJWT(response.data);
    return decodedData?.partners || [];
  },

  // Get specific partner profile - GET /api/admin/food-partner-profile
  getPartnerProfile: async (partnerId) => {
    const response = await api.get(`${endpoints.admin.getFoodPartnerProfile}?id=${partnerId}`);
    const decodedData = safeDecodeJWT(response.data);
    return decodedData || null;
  },

  // Update food partner - PUT /api/admin/update-food-partner
  updatePartner: async (partnerId, updates) => {
    const response = await api.put(`${endpoints.admin.updateFoodPartner}?id=${partnerId}`, updates);
    return response.data;
  },
};
