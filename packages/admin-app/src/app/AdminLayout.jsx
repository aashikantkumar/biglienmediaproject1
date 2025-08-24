import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth.jsx';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Foods', href: '/foods', icon: '🍽️' },
    { name: 'Partners', href: '/partners', icon: '🤝' },
    { name: 'Assignments', href: '/assignments', icon: '📋' },
    { name: 'Customers', href: '/customers', icon: '👥' },
  ];

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200">
        {/* Logo/Header */}
        <div className="flex h-16 items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍴</span>
            <h1 className="text-lg font-bold text-white">BigLine Kitchen</h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link ${
                  isActive(item.href)
                    ? 'sidebar-link-active bg-indigo-100 text-indigo-900 border-r-2 border-indigo-600'
                    : 'sidebar-link-inactive text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-xl flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.claims?.name?.[0] || user?.claims?.email?.[0] || 'A'}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">
                {user?.claims?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.claims?.role || 'ADMIN'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb or page title */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 capitalize">
                {location.pathname.replace('/', '') || 'Dashboard'}
              </h1>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <span className="sr-only">View notifications</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5L15 17zm1.5-13h-9l-3 9h9l3-9z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.claims?.email || 'admin@example.com'}
                </span>
                <button
                  onClick={logout}
                  className="btn-secondary text-xs py-1 px-3 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
