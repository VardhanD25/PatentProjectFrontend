// src/components/SinglePieceEntry.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // Ensure Navbar is imported

function SinglePieceEntry({ 
  partMassAir,
  partMassFluid,
  partDensity,
  compactnessRatio,
  porosity,
  onPartMassAirChange,
  onPartMassFluidChange,
  onSubmit,
  validateEntry,
  date,
  selectedPartCode,
  partName,
  theoreticalDensity,
  densityType,
  attachmentExists,
  masterExists,
  masterAttachmentExists,
  densityOfFluid,
  densityOfMasterSample
}) {
  
  const [showResults, setShowResults] = useState(false);
  const [composition, setComposition] = useState([]);
  const [standardAlloyId, setStandardAlloyId] = useState('');
  const [standardAlloyName, setStandardAlloyName] = useState('');
  const [standardAlloyCountry, setStandardAlloyCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePartMassAirChange = (event) => {
    onPartMassAirChange(event.target.value);
  };

  const handlePartMassFluidChange = (event) => {
    onPartMassFluidChange(event.target.value);
  };

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const response = await fetch(`http://localhost:4000/parts/${selectedPartCode}`);
        const data = await response.json();

        if (response.ok) {
          if (data.part.standardAlloyId) {
            setStandardAlloyId(data.part.standardAlloyId);
          } else {
            setStandardAlloyId('');
          }

          const fetchedComposition = data.part.composition || [];
          setComposition(fetchedComposition.map(item => ({
            ...item,
            element: item.element || { symbol: '' } // Ensure element is initialized
          })));
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

  useEffect(() => {
    const fetchStandardAlloy = async () => {
      if (standardAlloyId) { // Only fetch if standardAlloyId is available
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:4000/standardAlloy/${standardAlloyId}`);
          const data = await response.json();

          if (response.ok) {
            setStandardAlloyCountry(data.alloy.country);
            setStandardAlloyName(data.alloy.name);
          } else {
            setError(data.message || 'Error fetching standard alloy response');
          }
        } catch (error) {
          setError('Error fetching standard alloy');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStandardAlloy();
  }, [standardAlloyId]);

  const handleFormSubmit = () => {
    const validation = validateEntry();
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    onSubmit();
    setShowResults(true);
  };

  const handleToggleForm = () => {
    setShowResults(!showResults);
  };

  const handleShowReport = () => {
    const reportData = {
      date,
      partCode: selectedPartCode,
      partName,
      theoreticalDensity,
      densityType,
      attachmentExists,
      masterExists,
      masterAttachmentExists,
      densityOfMasterSample,
      chemicalComposition: composition.reduce((acc, item) => {
        acc[item.element.symbol] = item.percentage;
        return acc;
      }, {}),
      partAttachments: attachmentExists === 'yes' ? 'yes' : 'no',
      massInAir: partMassAir,
      massInFluid: partMassFluid,
      fluidDensity: densityOfFluid,
      densityOfItem: partDensity,
      compactnessRatio,
      porosity,
      standardAlloyCountry,
      standardAlloyName,
      optionalReport: true,
      notes: '',
    };

    navigate('/reportpage', { state: { reportData } });
  };

  if (selectedPartCode === 'Select part code' || !partName || !date) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
        <Navbar />
        <div className="flex-grow flex justify-center items-center p-8">
          <p className="text-center text-gray-700">Please fill in the required fields in the previous steps to enter data on this screen.</p>
        </div>
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
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
        <Navbar />
        <div className="flex-grow flex justify-center items-center p-8">
          <p className="text-center text-gray-700">Loading...</p>
        </div>
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
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
        <Navbar />
        <div className="flex-grow flex justify-center items-center p-8">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
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
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
      {/* Navbar */}
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {/* Spacer to push content below Navbar */}
      <div className="flex-grow p-8">
        <div className="max-w-2xl mx-auto grid gap-12">
          {/* Form Container */}
         
            <h2 className="text-3xl font-semibold mb-6 text-brand-dark hover:text-brand-primary transition duration-300 text-center">
              Single Piece Entry Screen
            </h2>
            {showResults ? (
              <div className="bg-white p-8 rounded-lg shadow-lg border border-brand-lighter">
                <h2 className="text-xl font-bold mb-4 text-center">Results</h2>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 mb-6">
                  <p><strong>Compactness Ratio:</strong> {compactnessRatio}</p>
                  <p><strong>Porosity:</strong> {porosity}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    type="button"
                    onClick={handleToggleForm}
                    className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                  >
                    Edit Values
                  </button>
                  {compactnessRatio !== 'Incorrect input, compactness ratio cannot be greater than 100!' && (
                    <button
                      type="button"
                      onClick={handleShowReport}
                      className="w-full md:w-auto bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                    >
                      Show Report
                    </button>
                  )}
                </div>
                {compactnessRatio !== 'Incorrect input, compactness ratio cannot be greater than 100!' && (
                  <p className="text-red-500 text-sm text-center mt-4">
                    Verify entries before generating report, values cannot be edited later.
                  </p>
                )}
              </div>
            ) : (
              <form >
                {/* Part Mass in Air Field */}
                <div className="mb-6">
                  <label htmlFor="part-mass-air" className="block text-sm font-medium text-gray-700 mb-2">
                    Part Mass in Air (grams)
                  </label>
                  <input
                    type="number"
                    id="part-mass-air"
                    value={partMassAir}
                    onChange={handlePartMassAirChange}
                    className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                    placeholder="Enter part mass in air"
                    min="0"
                    step="any"
                  />
                </div>

                {/* Part Mass in Fluid Field */}
                <div className="mb-6">
                  <label htmlFor="part-mass-fluid" className="block text-sm font-medium text-gray-700 mb-2">
                    Part Mass in Fluid (grams)
                  </label>
                  <input
                    type="number"
                    id="part-mass-fluid"
                    value={partMassFluid}
                    onChange={handlePartMassFluidChange}
                    className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                    placeholder="Enter part mass in fluid"
                    min="0"
                    step="any"
                  />
                </div>

                {/* Part Density Field */}
                <div className="mb-6">
                  <label htmlFor="part-density" className="block text-sm font-medium text-gray-700 mb-2">
                    Part Density (grams/cm³)
                  </label>
                  <input
                    type="text"
                    id="part-density"
                    value={partDensity}
                    readOnly
                    className="border border-brand-lighter rounded-lg w-full p-3 bg-gray-200 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                    placeholder="Part density will be calculated"
                  />
                </div>

                {/* Submission Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 w-full md:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
         
        </div>
      </div>

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
}

export default SinglePieceEntry;
