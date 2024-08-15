import React, { useState } from 'react';

function LotEntry({
  partMassAirArray,
  partMassFluidArray,
  partDensityArray,
  compactnessRatioArray,
  porosityArray,
  onPartMassAirChange,
  onPartMassFluidChange,
  onAddPart,
  onRemovePart,
  onSubmit,
  validateLotEntry
}) {
  const [showResults, setShowResults] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const handlePartMassAirChange = (index, value) => {
    onPartMassAirChange(value, index);
  };

  const handlePartMassFluidChange = (index, value) => {
    onPartMassFluidChange(value, index);
  };

  const handleAddPart = () => {
    onAddPart();
  };

  const handleRemovePart = (index) => {
    onRemovePart(index);
  };

  const handleFormSubmit = () => {
    const validation = validateLotEntry();
    if (!validation.isValid) {
      setValidationMessage(validation.message);
      return;
    }
    onSubmit();
    setShowResults(true);
  };

  const handleGoBack = () => {
    setShowResults(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="max-w-6xl w-full my-8">
        <h1 className="text-2xl font-bold text-center mb-6">Lot Entry Screen</h1>
        
        {showResults ? (
          <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
            <h2 className="text-xl font-bold mb-2">Results</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200 text-left font-bold">
                    <th className="py-2 px-4">Serial Number</th>
                    <th className="py-2 px-4">Part Mass in Air (grams)</th>
                    <th className="py-2 px-4">Part Mass in Fluid (grams)</th>
                    <th className="py-2 px-4">Part Density (grams/cm³)</th>
                    <th className="py-2 px-4">Compactness Ratio</th>
                    <th className="py-2 px-4">Porosity</th>
                  </tr>
                </thead>
                <tbody>
                  {partMassAirArray.map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{partMassAirArray[index]}</td>
                      <td className="py-2 px-4">{partMassFluidArray[index]}</td>
                      <td className="py-2 px-4">{partDensityArray[index]}</td>
                      <td className="py-2 px-4">{compactnessRatioArray[index]}</td>
                      <td className="py-2 px-4">{porosityArray[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={handleGoBack}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div>
            {validationMessage && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 border border-red-300">
                {validationMessage}
              </div>
            )}
            <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200 text-left font-bold">
                    <th className="py-2 px-4">Serial Number</th>
                    <th className="py-2 px-4">Part Mass in Air (grams)</th>
                    <th className="py-2 px-4">Part Mass in Fluid (grams)</th>
                    <th className="py-2 px-4">Part Density (grams/cm³)</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partMassAirArray.map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4">{index + 1}</td>
                      <td>
                        <input
                          type="number"
                          value={partMassAirArray[index]}
                          onChange={(e) => handlePartMassAirChange(index, e.target.value)}
                          className="border-gray-300 rounded-lg p-2 w-full"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={partMassFluidArray[index]}
                          onChange={(e) => handlePartMassFluidChange(index, e.target.value)}
                          className="border-gray-300 rounded-lg p-2 w-full"
                        />
                      </td>
                      <td>{partDensityArray[index]}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemovePart(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddPart}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
              >
                Add Part
              </button>
              <button
                type="button"
                onClick={handleFormSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LotEntry;
