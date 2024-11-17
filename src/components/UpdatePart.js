// src/components/UpdatePart.jsx
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UpdatePart = ({ selectedPartCode, onSave, onClose }) => {
  const [part, setPart] = useState(null);
  const [composition, setComposition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPercentage, setTotalPercentage] = useState(0); // State to track total percentage

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const response = await fetch(`http://localhost:4000/parts/${selectedPartCode}`);
        const data = await response.json();

        if (response.ok) {
          setPart(data.part);
          const initialComposition = data.part.composition.map(item => ({
            ...item,
            element: {
              symbol: item.element.symbol || '' // Ensure symbol is correctly assigned
            }
          })) || [];
          setComposition(initialComposition);
          calculateTotalPercentage(initialComposition); // Calculate total initially
        } else {
          setError(data.message || 'Error fetching part response');
        }
      } catch (error) {
        setError('Error fetching part');
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [selectedPartCode]);

  const calculateTotalPercentage = (updatedComposition) => {
    const total = updatedComposition.reduce((sum, item) => sum + (parseFloat(item.percentage) || 0), 0);
    setTotalPercentage(total);
  };

  const handleCompositionChange = (index, field, value) => {
    const updatedComposition = [...composition];
    if (field === 'elementSymbol') {
      updatedComposition[index] = {
        ...updatedComposition[index],
        element: {
          ...updatedComposition[index].element,
          symbol: value
        }
      };
    } else {
      updatedComposition[index] = { ...updatedComposition[index], [field]: value };
    }
    setComposition(updatedComposition);
    calculateTotalPercentage(updatedComposition); // Recalculate total after change
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (totalPercentage !== 100) {
      alert('The total percentage of all elements must add up to 100% before saving.');
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/parts/updatePart", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partCode: selectedPartCode, composition }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Part updated successfully!');
        onSave(); // Call the onSave callback if provided
      } else {
        alert(data.message || 'Error updating part');
      }
    } catch (error) {
      alert('Error updating part');
    }
  };

  return (
    <div 
      className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 max-w-2xl w-full mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-200">Part Composition</h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-200"></div>
        </div>
      ) : error ? (
        <div className="text-red-400 text-center py-8 bg-red-500/10 rounded-lg">
          Error: {error}
        </div>
      ) : !part ? (
        <div className="text-slate-400 text-center py-8">
          No part found.
        </div>
      ) : part.standardAlloyId ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <p className="text-slate-300 text-center mb-4">
            This part has a standard alloy associated with it. You cannot edit its composition.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-slate-200">
              {part.partName}
            </h3>
            
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 text-sm font-medium text-slate-400">Element Symbol</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-slate-400">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {composition.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        value={item.element.symbol || ''}
                        onChange={(e) => handleCompositionChange(index, 'elementSymbol', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                        placeholder="Symbol"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={item.percentage || ''}
                        onChange={(e) => handleCompositionChange(index, 'percentage', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                        placeholder="Percentage"
                        min="0"
                        max="100"
                        step="any"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={`text-center py-2 px-4 rounded-lg ${
              totalPercentage !== 100 
                ? 'bg-red-500/10 text-red-400' 
                : 'bg-green-500/10 text-green-400'
            }`}>
              Total percentage: {totalPercentage}% (should equal 100%)
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-slate-200 text-slate-900 rounded-lg font-medium hover:bg-white transition-all duration-300"
              >
                Save Changes
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-slate-800/50 text-slate-200 rounded-lg hover:bg-slate-800/70 transition-all duration-300"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePart;
