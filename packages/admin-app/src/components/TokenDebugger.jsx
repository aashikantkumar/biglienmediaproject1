import React from 'react';

const TokenDebugger = () => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');
  
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

  const claims = token ? safeDecodeJWT(token) : null;

  const clearTokens = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
      <h3 className="font-bold text-lg mb-2">Token Debug Info</h3>
      
      <div className="mb-2">
        <strong>Token exists:</strong> {token ? 'Yes' : 'No'}
      </div>
      
      {token && (
        <>
          <div className="mb-2">
            <strong>Token preview:</strong> {token.substring(0, 30)}...
          </div>
          
          <div className="mb-2">
            <strong>Token parts:</strong> {token.split('.').length}
          </div>
          
          <div className="mb-2">
            <strong>Claims decoded:</strong> {claims ? 'Yes' : 'No'}
          </div>
          
          {claims && (
            <div className="mb-2">
              <strong>Claims:</strong>
              <pre className="text-xs bg-gray-100 p-1 rounded">
                {JSON.stringify(claims, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
      
      <div className="mb-2">
        <strong>User data:</strong> {user ? 'Yes' : 'No'}
      </div>
      
      {user && (
        <div className="mb-2">
          <pre className="text-xs bg-gray-100 p-1 rounded">
            {user}
          </pre>
        </div>
      )}
      
      <button 
        onClick={clearTokens}
        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
      >
        Clear Tokens & Reload
      </button>
    </div>
  );
};

export default TokenDebugger;
