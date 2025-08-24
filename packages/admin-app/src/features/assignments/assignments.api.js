import api from '../../api/http';
import endpoints from '../../api/endpoints';

export const assignmentsApi = {
  // Get all assigned foods - GET /admin/get-all-assigned-food-details
  getAllAssignments: async () => {
    const response = await api.get(endpoints.admin.getAllAssignedFood);
    return response.data; // This returns a JWT token containing assignment data
  },

  // Assign food to partner - POST /admin/assign-food
  assignFood: async (foodId, foodPartnerId) => {
    const params = new URLSearchParams();
    params.append('foodId', foodId);
    params.append('foodPartnerId', foodPartnerId);
    
    const response = await api.post(endpoints.admin.assignFood, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  // Note: Backend doesn't have delete/update assignment endpoints
  // Only create and list operations are available
};
