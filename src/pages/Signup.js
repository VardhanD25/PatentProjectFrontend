// src/components/Signup.jsx
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation to check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light font-poppins">
      <div className="bg-white bg-opacity-20 backdrop-blur-xs rounded-xl shadow-lg p-8 max-w-md w-full border border-brand-lighter">
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-brand-dark text-center font-poppins">Sign Up</h3>
          
          <div className="flex flex-col">
            <label className="mb-2 text-brand-dark font-poppins">Name:</label>
            <input
              type="text"
              className="p-3 rounded-lg border border-brand-lighter focus:outline-none focus:ring-2 focus:ring-brand-primary font-poppins"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-brand-dark font-poppins">Email address:</label>
            <input
              type="email"
              className="p-3 rounded-lg border border-brand-lighter focus:outline-none focus:ring-2 focus:ring-brand-primary font-poppins"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-2 text-brand-dark font-poppins">Password:</label>
            <input
              type="password"
              className="p-3 rounded-lg border border-brand-lighter focus:outline-none focus:ring-2 focus:ring-brand-primary font-poppins"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-2 text-brand-dark font-poppins">Confirm Password:</label>
            <input
              type="password"
              className="p-3 rounded-lg border border-brand-lighter focus:outline-none focus:ring-2 focus:ring-brand-primary font-poppins"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              placeholder="Re-enter your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="py-3 rounded-lg bg-brand-primary text-white font-poppins font-semibold hover:bg-brand-dark transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          
          {error && <div className="text-red-500 text-center font-poppins">{error}</div>}

          <p className="text-center text-gray-700 font-poppins">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
