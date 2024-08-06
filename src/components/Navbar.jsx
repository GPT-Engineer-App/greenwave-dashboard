import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-white mr-4 hover:text-green-200 transition-colors ${
          isActive ? 'font-bold' : ''
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold hover:text-green-200 transition-colors">RecycleDetect</Link>
        <div>
          {isAuthenticated ? (
            <>
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/statistics">Stats</NavLink>
              <NavLink to="/settings">Settings</NavLink>
              <button onClick={handleLogout} className="text-white hover:text-green-200 transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-green-200 transition-colors">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
