import React, { useState, useEffect } from 'react';
import './css/UpdatePart.css'; // Ensure this is imported

const UpdatePart = ({ selectedPartCode, onSave, onClose }) => {
  const [part, setPart] = useState(null);
  const [composition, setComposition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const response = await fetch(`http://localhost:4000/parts/${selectedPartCode}`);
        const data = await response.json();

        if (response.ok) {
          setPart(data.part);
          setComposition(data.part.composition.map(item => ({
            ...item,
            element: {
              symbol: item.element.symbol || '' // Ensure symbol is correctly assigned
            }
          })) || []);
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
  };

  const handleSave = async () => {
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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!part) return <p className="error">No part found.</p>;

  // Conditional rendering based on part.standardAlloyId
  return (
    <div className="update-part-container">
      {part.standardAlloyId ? (
        <div>
          <p className="message">This part has a standard alloy associated with it. You cannot edit its composition.</p>
          <div className="button-container">
            <button className="close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Update Part: {part.partName}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Element Symbol</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {composition.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.element.symbol || ''}
                      onChange={(e) => handleCompositionChange(index, 'elementSymbol', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.percentage || ''}
                      onChange={(e) => handleCompositionChange(index, 'percentage', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePart;
