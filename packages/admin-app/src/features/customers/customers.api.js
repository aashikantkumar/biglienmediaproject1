import api from '../../api/http';
import endpoints from '../../api/endpoints';

export const customersApi = {
  // Get all customers - GET /admin/get-all-costumers
  getAllCustomers: async (adminId) => {
    const response = await api.get(`${endpoints.admin.getAllCustomers}?id=${adminId}`);
    return response.data; // This returns a JWT token containing customer data
  },

  // Get specific customer profile - GET /admin/costumer-profile
  getCustomerProfile: async (customerId) => {
    const response = await api.get(`${endpoints.admin.getCustomerProfile}?id=${customerId}`);
    return response.data; // This returns a JWT token containing customer data
  },

  // Update customer - PUT /admin/update-costumer
  updateCustomer: async (customerId, updates) => {
    const response = await api.put(`${endpoints.admin.updateCustomer}?id=${customerId}`, updates);
    return response.data;
  },
};
