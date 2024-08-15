import React, { useState } from 'react';

function SinglePieceEntry({ 
  partMassAir,
  partMassFluid,
  partDensity,
  compactnessRatio,
  porosity,
  onPartMassAirChange,
  onPartMassFluidChange,
  onSubmit,
  validateEntry
}) {
  const [showResults, setShowResults] = useState(false);
  
  const handlePartMassAirChange = (event) => {
    onPartMassAirChange(event.target.value);
  };

  const handlePartMassFluidChange = (event) => {
    onPartMassFluidChange(event.target.value);
  };

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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="max-w-md w-full my-8">
        <h1 className="text-2xl font-bold text-center mb-6">Single Piece Entry Screen</h1>
        
        {showResults ? (
          <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
            <h2 className="text-xl font-bold mb-2">Results</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
              <p><strong>Compactness Ratio:</strong> {compactnessRatio}</p>
              <p><strong>Porosity:</strong> {porosity}</p>
            </div>
            <button
              type="button"
              onClick={handleToggleForm}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Edit Values
            </button>
          </div>
        ) : (
          <form className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
            <div className="mb-4">
              <label htmlFor="part-mass-air" className="block text-sm font-medium text-gray-700 mb-1">
                Part Mass in Air (grams)
              </label>
              <input
                type="number"
                id="part-mass-air"
                value={partMassAir}
                onChange={handlePartMassAirChange}
                className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter part mass in air"
                min="0"
                step="any"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="part-mass-fluid" className="block text-sm font-medium text-gray-700 mb-1">
                Part Mass in Fluid (grams)
              </label>
              <input
                type="number"
                id="part-mass-fluid"
                value={partMassFluid}
                onChange={handlePartMassFluidChange}
                className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter part mass in fluid"
                min="0"
                step="any"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="part-density" className="block text-sm font-medium text-gray-700 mb-1">
                Part Density (grams/cm³)
              </label>
              <input
                type="text"
                id="part-density"
                value={partDensity}
                readOnly
                className="border-gray-300 rounded-lg w-full p-2 bg-gray-200"
              />
            </div>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SinglePieceEntry;
