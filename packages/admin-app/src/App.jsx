import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/useAuth.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import AdminLayout from './app/AdminLayout';
import Dashboard from './features/dashboard/Dashboard';
import FoodsList from './features/foods/FoodsList';
import TokenDebugger from './components/TokenDebugger';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="foods" element={<FoodsList />} />
            <Route path="partners" element={<div className="p-6">Partners feature coming soon...</div>} />
            <Route path="assignments" element={<div className="p-6">Assignments feature coming soon...</div>} />
            <Route path="customers" element={<div className="p-6">Customers feature coming soon...</div>} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        
        {/* Debug component - remove in production */}
        <TokenDebugger />
      </Router>
    </AuthProvider>
  );
}

export default App;
