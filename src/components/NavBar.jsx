import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaBookmark, FaClipboardList } from 'react-icons/fa';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-400 border-b border-green-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                {user ? (
                  <>
                    <NavLink to="/add-job" className={linkClass}>
                      Add Job
                    </NavLink>
                    <div className="relative">
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                      >
                        <FaUser className="mr-2" />
                        <span className="hidden md:inline">{user.name}</span>
                      </button>
                      
                      {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu">
                            <Link
                              to="/dashboard"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <FaClipboardList className="mr-2" />
                              Dashboard
                            </Link>
                            <Link
                              to="/dashboard?saved=true"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <FaBookmark className="mr-2" />
                              Saved Jobs
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FaSignOutAlt className="mr-2" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
