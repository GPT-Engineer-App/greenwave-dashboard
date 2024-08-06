import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">RecycleDetect</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
              <Link to="/statistics" className="text-white mr-4">Statistics</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
