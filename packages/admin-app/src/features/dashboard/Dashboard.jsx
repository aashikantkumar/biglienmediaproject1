import { useState, useEffect } from 'react';
import api from '../../api/http';
import endpoints from '../../api/endpoints';
import { useAuth } from '../auth/useAuth.jsx';

// Safe JWT decode function
const safeDecodeJWT = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = parts[1];
    // Handle URL-safe base64
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(normalizedPayload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [healthStatus, setHealthStatus] = useState(null);
  const [stats, setStats] = useState({
    foods: 0,
    partners: 0,
    customers: 0,
    assignments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Check health status
      const healthResponse = await api.get(endpoints.health.status);
      setHealthStatus(healthResponse.data);

      // Load counts of each entity type
      const adminId = user?.claims?.id; // Extract ID from JWT claims
      
      // Get foods count
      try {
        const foodsResponse = await api.get(endpoints.admin.getAllFood);
        if (foodsResponse.data && Array.isArray(foodsResponse.data)) {
          setStats(prev => ({ ...prev, foods: foodsResponse.data.length }));
        }
      } catch (e) {
        console.error('Failed to load foods:', e);
      }
      
      // Get customers count
      try {
        const customersResponse = await api.get(`${endpoints.admin.getAllCustomers}?id=${adminId}`);
        const decodedToken = safeDecodeJWT(customersResponse.data);
        const customers = decodedToken?.costumers || [];
        setStats(prev => ({ ...prev, customers: customers.length }));
      } catch (e) {
        console.error('Failed to load customers:', e);
      }
      
      // Get food partners count
      try {
        const partnersResponse = await api.get(`${endpoints.admin.getAllFoodPartners}?id=${adminId}`);
        const decodedToken = safeDecodeJWT(partnersResponse.data);
        const partners = decodedToken?.partners || [];
        setStats(prev => ({ ...prev, partners: partners.length }));
      } catch (e) {
        console.error('Failed to load partners:', e);
      }
      
      // Get assigned foods count (for assignments)
      try {
        const assignmentsResponse = await api.get(endpoints.admin.getAllAssignedFood);
        const decodedData = safeDecodeJWT(assignmentsResponse.data);
        const assignments = decodedData?.Assigned_food_details || [];
        setStats(prev => ({ ...prev, assignments: assignments.length }));
      } catch (e) {
        console.error('Failed to load assignments:', e);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Health Status */}
      {healthStatus && (
        <div className="mb-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            healthStatus.status === 'Running' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${
              healthStatus.status === 'Running' ? 'bg-green-400' : 'bg-red-400'
            }`}></span>
            Backend Status: {healthStatus.status}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🍽️</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Foods
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.foods}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Food Partners
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.partners}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Customers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.customers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Assignments
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.assignments}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Welcome */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Welcome, {user?.claims?.name || user?.claims?.email || 'Admin'}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {user?.claims?.role || 'ADMIN'} Dashboard
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="mr-2 -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href="/foods"
              className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="text-2xl mb-2 block">🍽️</span>
              <span className="text-sm font-medium text-gray-900">
                Manage Foods
              </span>
            </a>
            
            <a
              href="/partners"
              className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="text-2xl mb-2 block">🤝</span>
              <span className="text-sm font-medium text-gray-900">
                Manage Partners
              </span>
            </a>
            
            <a
              href="/assignments"
              className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="text-2xl mb-2 block">📋</span>
              <span className="text-sm font-medium text-gray-900">
                Create Assignments
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
