import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './pageCSS/AddPart.css';

const AddPart = () => {
  const [partCode, setPartCode] = useState('');
  const [partName, setPartName] = useState('');
  const [composition, setComposition] = useState([{ symbol: '', percentage: 0 }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [existingPartCodes, setExistingPartCodes] = useState([]);
  const [userId, setUserId] = useState('');
  const [elementSymbols, setElementSymbols] = useState([]); // State for element symbols
  const [selectedSymbols, setSelectedSymbols] = useState(new Set()); // Track selected symbols using a Set
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

  const handleAddElement = () => {
    setComposition([...composition, { symbol: '', percentage: 0 }]);
  };

  const handleRemoveElement = (index) => {
    const newComposition = [...composition];
    const removedSymbol = newComposition[index].symbol;
    newComposition.splice(index, 1);
    setComposition(newComposition);

    if (removedSymbol) {
      setSelectedSymbols(prevSymbols => {
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
        setSelectedSymbols(prevSymbols => {
          const updatedSymbols = new Set(prevSymbols);
          updatedSymbols.delete(oldSymbol);
          return updatedSymbols;
        });
      }

      if (value && !selectedSymbols.has(value)) {
        setSelectedSymbols(prevSymbols => new Set(prevSymbols.add(value)));
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

    // Validation: Ensure all elements have a symbol
    const hasUnselectedSymbols = composition.some(el => !el.symbol);
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

    try {
      const response = await fetch('http://localhost:4000/parts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partCode, partName, composition, userId })
      });

      if (response.ok) {
        // Reset form after successful submission
        setPartCode('');
        setPartName('');
        setComposition([{ symbol: '', percentage: 0 }]);
        setSelectedSymbols(new Set());
        setErrorMessage(''); // Clear any previous error messages
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
  };

  return (
    <div className="add-part-container">
      <Navbar />
      <div className="add-part-content">
        <h2 className="add-part-title">Add Part</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Part Code:</label>
            <input
              type="text"
              value={partCode}
              onChange={(e) => setPartCode(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Part Name:</label>
            <input
              type="text"
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Composition:</label>
            <div className="element-list">
              {composition.map((element, index) => (
                <div key={index} className="element-item">
                  <select
                    value={element.symbol}
                    onChange={(e) =>
                      handleCompositionChange(index, 'symbol', e.target.value)
                    }
                    className="input-field"
                    required
                  >
                    <option value="">Select Symbol</option>
                    {elementSymbols
                      .filter(symbol => !selectedSymbols.has(symbol) || symbol === element.symbol)
                      .map(symbol => (
                        <option key={symbol} value={symbol}>
                          {symbol}
                        </option>
                      ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Percentage"
                    value={element.percentage}
                    onChange={(e) =>
                      handleCompositionChange(index, 'percentage', e.target.value)
                    }
                    className="input-field"
                    required
                    min="0"
                    max="100"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveElement(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddElement}
              className="add-element-btn"
            >
              Add Element
            </button>
          </div>
          {errorMessage && <p className="validation-message">{errorMessage}</p>}
          <button
            type="submit"
            className="submit-btn"
          >
            Add Part
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPart;
