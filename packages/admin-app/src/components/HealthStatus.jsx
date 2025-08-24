import { useState, useEffect } from 'react';
import api from '../api/http';
import endpoints from '../api/endpoints';

const HealthStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await api.get(endpoints.health.status);
      setStatus(response.data);
    } catch (error) {
      console.error('Health check failed:', error);
      setStatus({ status: 'Failed', error: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        <span className="w-2 h-2 rounded-full mr-2 bg-gray-400 animate-pulse"></span>
        Checking...
      </div>
    );
  }

  const isHealthy = status?.status === 'Running';

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      isHealthy 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${
        isHealthy ? 'bg-green-400' : 'bg-red-400'
      }`}></span>
      Backend: {status?.status || 'Unknown'}
    </div>
  );
};

export default HealthStatus;
