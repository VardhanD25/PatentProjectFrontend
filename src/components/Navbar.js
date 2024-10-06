// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-brand-dark text-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://via.placeholder.com/70" // External placeholder image URL
              alt="Logo" 
              className="h-12 w-12 mr-2 rounded-full" 
            />
            <h4>Name</h4>
            {/* Optionally, include text next to the logo */}
            {/* <span className="text-2xl font-bold">BrandName</span> */}
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/addpart">Add Part Page</NavLink>
                <NavLink to="/userinput">User Input Page</NavLink>
                <span className="text-sm text-gray-300">{user.email}</span>
                <button
                  onClick={handleClick}
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-dark rounded-full transition-colors duration-300"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

// Reusable NavLink component with hover effect
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative px-3 py-2 text-white font-medium rounded-full group transition-colors duration-300"
    >
      {/* Background capsule */}
      <span className="absolute inset-0 bg-brand-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
      {/* Link text */}
      <span className="relative">{children}</span>
    </Link>
  );
};

export default Navbar;
