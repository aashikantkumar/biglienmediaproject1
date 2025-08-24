// API endpoints based on backend controllers
export const endpoints = {
  // Auth endpoints (AuthController)
  auth: {
    login: '/api/auth/login',
    registerAdmin: '/api/auth/register-admin',
    registerCustomer: '/api/auth/register-costumer',
    registerFoodPartner: '/api/auth/register-food-partner',
  },

  // Health endpoints (HealthController)
  health: {
    status: '/api/health/status',
    database: '/api/health/database',
  },

  // Admin endpoints (AdminController)
  admin: {
    // Foods management
    uploadFood: '/api/admin/upload-food',
    getAllFood: '/api/admin/get-all-food',
    
    // Food assignments
    assignFood: '/api/admin/assign-food',
    getAllAssignedFood: '/api/admin/get-all-assigned-food-details',
    
    // Customer management
    getAllCustomers: '/api/admin/get-all-costumers',
    getCustomerProfile: '/api/admin/costumer-profile',
    updateCustomer: '/api/costumer/update-costumer',
    
    // Food partner management
    getAllFoodPartners: '/api/admin/get-all-food-partner',
    getFoodPartnerProfile: '/api/admin/food-partner-profile',
    updateFoodPartner: '/api/food-partner/update-food-partner',
  },
};

export default endpoints;
