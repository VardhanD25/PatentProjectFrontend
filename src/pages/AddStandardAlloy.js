import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddStandardAlloy() {
  const [formData, setFormData] = useState({
    country: '',
    name: '',
    density: '',
    reference: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate density is a number
    const densityNum = parseFloat(formData.density);
    if (isNaN(densityNum)) {
      setError('Density must be a valid number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/standardAlloy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          density: densityNum
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add standard alloy');
      }

      setSuccess('Standard alloy added successfully!');
      setFormData({
        country: '',
        name: '',
        density: '',
        reference: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-quicksand">
      <Navbar />
      
      {/* Background with Grid */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800/50 p-6"
        >
          <h1 className="text-2xl font-semibold text-slate-200 mb-6">Add New Standard Alloy</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Country Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors duration-300"
                placeholder="Enter country name"
                required
              />
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Alloy Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors duration-300"
                placeholder="Enter alloy name"
                required
              />
            </div>

            {/* Density Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Density (g/cm³)
              </label>
              <input
                type="number"
                name="density"
                value={formData.density}
                onChange={handleChange}
                step="0.001"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors duration-300"
                placeholder="Enter density"
                required
              />
            </div>

            {/* Reference Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Reference
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors duration-300"
                placeholder="Enter reference"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm bg-red-500/10 p-2 rounded"
              >
                {error}
              </motion.p>
            )}

            {/* Success Message */}
            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm bg-green-500/10 p-2 rounded"
              >
                {success}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 
                transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Standard Alloy'}
            </motion.button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default AddStandardAlloy;