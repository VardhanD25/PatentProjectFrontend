// src/components/AddPart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddPart = () => {
  const [partCode, setPartCode] = useState('');
  const [partName, setPartName] = useState('');
  const [composition, setComposition] = useState([{ symbol: '', percentage: 0 }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [existingPartCodes, setExistingPartCodes] = useState([]);
  const [userId, setUserId] = useState('');
  const [elementSymbols, setElementSymbols] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState(new Set());
  const [standardAlloys, setStandardAlloys] = useState([]);
  const [selectedStandardAlloy, setSelectedStandardAlloy] = useState('');
  const [useStandardAlloy, setUseStandardAlloy] = useState(false);
  const navigate = useNavigate();

  const getEmailFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.email;
    }
    return null;
  };

  const email = getEmailFromLocalStorage();

  // Fetch user ID based on email
  useEffect(() => {
    const fetchUserId = async () => {
      if (email) {
        try {
          const response = await fetch(`http://localhost:4000/user/user-id/${email}`);
          const data = await response.json();
          setUserId(data.userId);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };

    fetchUserId();
  }, [email]);

  // Fetch existing part codes for the user
  useEffect(() => {
    const fetchPartCodes = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:4000/parts/part-codes/${userId}`);
          const data = await response.json();
          setExistingPartCodes(data.partCodes);
        } catch (error) {
          console.error('Error fetching part codes:', error);
        }
      }
    };

    fetchPartCodes();
  }, [userId]);

  // Fetch element symbols for the dropdown
  useEffect(() => {
    const fetchElementSymbols = async () => {
      try {
        const response = await fetch('http://localhost:4000/elements/');
        const data = await response.json();
        setElementSymbols(data.symbols);
      } catch (error) {
        console.error('Error fetching element symbols:', error);
      }
    };

    fetchElementSymbols();
  }, []);

  // Fetch standard alloys for the dropdown
  useEffect(() => {
    const fetchStandardAlloys = async () => {
      try {
        const response = await fetch('http://localhost:4000/standardAlloy/');
        const data = await response.json();
        setStandardAlloys(data.alloys);
      } catch (error) {
        console.error('Error fetching standard alloys:', error);
      }
    };

    fetchStandardAlloys();
  }, []);

  const handleAddElement = () => {
    setComposition([...composition, { symbol: '', percentage: 0 }]);
  };

  const handleRemoveElement = (index) => {
    const newComposition = [...composition];
    const removedSymbol = newComposition[index].symbol;
    newComposition.splice(index, 1);
    setComposition(newComposition);

    if (removedSymbol) {
      setSelectedSymbols((prevSymbols) => {
        const updatedSymbols = new Set(prevSymbols);
        updatedSymbols.delete(removedSymbol);
        return updatedSymbols;
      });
    }
  };

  const handleCompositionChange = (index, field, value) => {
    const newComposition = [...composition];
    const oldSymbol = newComposition[index].symbol;

    if (field === 'symbol') {
      if (oldSymbol && oldSymbol !== value) {
        setSelectedSymbols((prevSymbols) => {
          const updatedSymbols = new Set(prevSymbols);
          updatedSymbols.delete(oldSymbol);
          return updatedSymbols;
        });
      }

      if (value && !selectedSymbols.has(value)) {
        setSelectedSymbols((prevSymbols) => new Set(prevSymbols.add(value)));
      }
    }

    newComposition[index][field] = value;

    if (field === 'percentage') {
      const totalPercentage = newComposition.reduce((sum, el, i) => sum + (i === 0 ? 0 : parseFloat(el.percentage || 0)), 0);
      newComposition[0].percentage = 100 - totalPercentage;
    }

    setComposition(newComposition);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation: Ensure part code is unique
    if (existingPartCodes.includes(partCode)) {
      setErrorMessage('Part code already exists. Please enter a unique part code.');
      return;
    }

    if (useStandardAlloy) {
      // Validate that a standard alloy is selected
      if (!selectedStandardAlloy) {
        setErrorMessage('Please select a standard alloy.');
        return;
      }

      // Proceed with standard alloy submission
      try {
        const response = await fetch('http://localhost:4000/parts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ partCode, partName, userId, standardAlloyId: selectedStandardAlloy }),
        });

        if (response.ok) {
          // Reset form after successful submission
          setPartCode('');
          setPartName('');
          setSelectedStandardAlloy('');
          setUseStandardAlloy(false);
          setErrorMessage('');
          alert('Part created successfully!');
          navigate('/userinput');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'An error occurred.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Internal server error.');
      }
    } else {
      // Validation: Ensure all elements have a symbol
      const hasUnselectedSymbols = composition.some((el) => !el.symbol);
      if (hasUnselectedSymbols) {
        setErrorMessage('All elements must have a selected symbol.');
        return;
      }

      // Validation: Ensure all percentages add up to 100
      const totalPercentage = composition.reduce((sum, el) => sum + parseFloat(el.percentage || 0), 0);
      if (totalPercentage !== 100) {
        setErrorMessage('Total composition percentage must equal 100%.');
        return;
      }

      // Proceed with composition submission
      try {
        const response = await fetch('http://localhost:4000/parts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ partCode, partName, composition, userId }),
        });

        if (response.ok) {
          // Reset form after successful submission
          setPartCode('');
          setPartName('');
          setComposition([{ symbol: '', percentage: 0 }]);
          setSelectedSymbols(new Set());
          setErrorMessage('');
          alert('Part created successfully!');
          navigate('/userinput');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'An error occurred.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Internal server error.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-light font-poppins">
      {/* Navbar */}
      <Navbar />
      <br />
      <br />
      <br />
      
      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-brand-dark hover:text-brand-primary transition duration-300 text-center">
            Add Part
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Part Code Field */}
            <div>
              <label htmlFor="partCode" className="block text-sm font-medium text-gray-700 mb-1">
                Part Code:
              </label>
              <input
                type="text"
                id="partCode"
                value={partCode}
                onChange={(e) => setPartCode(e.target.value)}
                className="p-3 rounded-lg border border-brand-lighter w-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                required
                placeholder="Enter unique part code"
              />
            </div>

            {/* Part Name Field */}
            <div>
              <label htmlFor="partName" className="block text-sm font-medium text-gray-700 mb-1">
                Part Name:
              </label>
              <input
                type="text"
                id="partName"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                className="p-3 rounded-lg border border-brand-lighter w-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                required
                placeholder="Enter part name"
              />
            </div>

            {/* Use Standard Alloy Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="useStandardAlloy"
                checked={useStandardAlloy}
                onChange={(e) => setUseStandardAlloy(e.target.checked)}
                className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
              />
              <label htmlFor="useStandardAlloy" className="ml-2 block text-sm text-gray-700">
                Use Standard Alloy
              </label>
            </div>

            {/* Conditional Rendering: Standard Alloy Selection */}
            {useStandardAlloy ? (
              <div>
                <label htmlFor="standardAlloy" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Standard Alloy:
                </label>
                <select
                  id="standardAlloy"
                  value={selectedStandardAlloy}
                  onChange={(e) => setSelectedStandardAlloy(e.target.value)}
                  className="p-3 rounded-lg border border-brand-lighter w-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  required
                >
                  <option value="">Select Standard Alloy</option>
                  {standardAlloys.map((alloy) => (
                    <option key={alloy._id} value={alloy._id}>
                      {alloy.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* Composition Fields */
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Composition:</label>
                <div className="space-y-6">
                  {composition.map((element, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      {/* Inputs Row */}
                      <div className="flex space-x-4">
                        {/* Element Symbol Dropdown */}
                        <div className="flex-1">
                          <select
                            value={element.symbol}
                            onChange={(e) => handleCompositionChange(index, 'symbol', e.target.value)}
                            className={`p-3 rounded-lg border border-brand-lighter w-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300 ${
                              !element.symbol && errorMessage.includes('selected symbol') ? 'border-red-500' : ''
                            }`}
                            required
                          >
                            <option value="">Select Symbol</option>
                            {elementSymbols
                              .filter((symbol) => !selectedSymbols.has(symbol) || symbol === element.symbol)
                              .map((symbol) => (
                                <option key={symbol} value={symbol}>
                                  {symbol}
                                </option>
                              ))}
                          </select>
                        </div>

                        {/* Percentage Input */}
                        <div className="flex-1">
                          <input
                            type="number"
                            value={element.percentage}
                            onChange={(e) => handleCompositionChange(index, 'percentage', e.target.value)}
                            className={`p-3 rounded-lg border border-brand-lighter w-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300 ${
                              errorMessage.includes('percentage') ? 'border-red-500' : ''
                            }`}
                            placeholder="Percentage"
                            min="0"
                            max="100"
                            required
                          />
                        </div>
                      </div>

                      {/* Remove Button */}
                      {index > 0 && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveElement(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Element Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleAddElement}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Add Element
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-center">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 w-full py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-dark transition duration-300"
              >
                Add Part
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Compactness Calculator. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="/privacy" className="hover:text-brand-primary transition duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-brand-primary transition duration-300">
                Terms of Service
              </a>
              <a href="/contact" className="hover:text-brand-primary transition duration-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AddPart;
