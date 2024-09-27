import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      partAttachments: attachmentExists==='yes' ? 'yes' : 'no',
      massInAir: partMassAir,
      massInFluid: partMassFluid,
      fluidDensity: densityOfFluid,
      densityOfItem: partDensity,
      compactnessRatio,
      porosity,
      standardAlloyCountry,
      standardAlloyName,
      optionalReport: true,
      notes:'',
    };

    navigate('/reportpage', { state: { reportData } });
  };

  if (selectedPartCode==='Select part code' || !partName || !date) {
    return <p>Please fill in the required fields in the previous steps to enter data on this screen.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="max-w-md w-full my-8">
        <h1 className="text-2xl font-bold text-center mb-6">Single Piece Entry Screen</h1>
        
        {showResults ? (
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
              <h2 className="text-xl font-bold mb-2">Results</h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300">
                <p><strong>Compactness Ratio:</strong> {compactnessRatio}</p>

              </div>
              <button
                type="button"
                onClick={handleToggleForm}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Edit Values
              </button>
              {compactnessRatio !== 'Incorrect input, compactness ratio cannot be greater than 100!' && (
  <div className="flex items-center mt-4">
    <button
      type="button"
      onClick={handleShowReport}
      className="bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      Show Report
    </button>
    <p className="text-red-500 text-sm ml-4">
      Verify entries before generating report, values cannot be edited later.
    </p>
  </div>
)}

            </div>
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
