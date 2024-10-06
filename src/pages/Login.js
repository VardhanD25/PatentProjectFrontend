// src/components/Login.jsx
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light">
      <div className="bg-white bg-opacity-20 backdrop-blur-xs rounded-xl shadow-lg p-8 max-w-md w-full border border-brand-lighter">
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-brand-dark text-center font-poppins">Log In</h3>
          
          <div className="flex flex-col">
            <label className="mb-2 text-brand-dark font-poppins">Email address:</label>
            <input
              type="email"
              className="p-3 rounded-lg border border-brand-lighter focus:outline-none focus:ring-2 focus:ring-brand-primary font-poppins"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
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
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="py-3 rounded-lg bg-brand-primary text-white font-poppins font-semibold hover:bg-brand-dark transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          
          {error && <div className="text-red-500 text-center font-poppins">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
