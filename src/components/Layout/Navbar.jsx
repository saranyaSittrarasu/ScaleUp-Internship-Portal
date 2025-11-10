import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600">
              Internship Hub
            </span>
          </Link>

          {state.userRole && (
            <div className="flex items-center gap-6">
              {state.userRole === 'candidate' ? (
                <>
                  <Link
                    to="/candidate/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/candidate/dashboard')
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/candidate/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/candidate/profile')
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/candidate/matching"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/candidate/matching')
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Find Internships
                  </Link>
                  <Link
                    to="/candidate/experience"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/candidate/experience')
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Experience Card
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/employer/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/employer/dashboard')
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/employer/projects"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/employer/projects')
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    My Projects
                  </Link>
                </>
              )}
              {state.currentUser && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {state.currentUser.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


