// src/components/UpdatePart.jsx
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import { useNavigate } from 'react-router-dom';

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

  const handleSave = async () => {
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
    <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
      {/* Navbar */}
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {/* Main Content */}
      <main className="flex-grow p-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-gray-700">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-red-500">Error: {error}</p>
          </div>
        ) : !part ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-gray-700">No part found.</p>
          </div>
        ) : part.standardAlloyId ? (
          <div className="flex flex-col items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
            <p className="text-center text-gray-700 mb-6">
              This part has a standard alloy associated with it. You cannot edit its composition.
            </p>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
              <h2 className="text-3xl font-semibold mb-6 text-center text-brand-dark hover:text-brand-primary transition duration-300">
                Update Part: {part.partName}
              </h2>
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-brand-lighter text-left text-sm font-semibold text-gray-700">Element Symbol</th>
                    <th className="py-2 px-4 bg-brand-lighter text-left text-sm font-semibold text-gray-700">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {composition.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition duration-300">
                      <td className="py-2 px-4 border-t border-brand-lighter">
                        <input
                          type="text"
                          value={item.element.symbol || ''}
                          onChange={(e) => handleCompositionChange(index, 'elementSymbol', e.target.value)}
                          className="border border-brand-lighter rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                          placeholder="Symbol"
                        />
                      </td>
                      <td className="py-2 px-4 border-t border-brand-lighter">
                        <input
                          type="number"
                          value={item.percentage || ''}
                          onChange={(e) => handleCompositionChange(index, 'percentage', e.target.value)}
                          className="border border-brand-lighter rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
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
              <p className={totalPercentage !== 100 ? 'error-message' : 'success-message'}>
                Total percentage: {totalPercentage}% (should equal 100%)
              </p>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Compactness Calculator. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="/privacy" className="hover:text-brand-primary transition duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-brand-primary transition duration-300">Terms of Service</a>
              <a href="/contact" className="hover:text-brand-primary transition duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpdatePart;
