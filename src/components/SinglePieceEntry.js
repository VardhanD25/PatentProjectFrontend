// src/components/SinglePieceEntry.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import Footer from "../components/Footer"; // Ensure Footer is imported
import { motion } from 'framer-motion'; // Ensure motion is imported

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
    <div className="min-h-screen bg-slate-900 relative">
      <Navbar />
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900 pointer-events-none" />
      
      <main className="container mx-auto px-4 py-32 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold text-slate-200 text-center mb-12">
            Single Piece Entry
          </h2>

          {showResults ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-semibold text-slate-200 text-center">Results</h3>
              
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 space-y-2">
                <p><span className="text-slate-400">Compactness Ratio:</span> {compactnessRatio}</p>
                <p><span className="text-slate-400">Porosity:</span> {porosity}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleForm}
                  className="px-6 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all duration-300"
                >
                  Edit Values
                </motion.button>

                {compactnessRatio !== 'Incorrect input, compactness ratio cannot be greater than 100!' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShowReport}
                    className="px-6 py-2 rounded-lg bg-slate-200 text-slate-900 hover:bg-white transition-all duration-300"
                  >
                    Show Report
                  </motion.button>
                )}
              </div>

              {compactnessRatio !== 'Incorrect input, compactness ratio cannot be greater than 100!' && (
                <p className="text-amber-500/80 text-sm text-center">
                  Verify entries before generating report, values cannot be edited later.
                </p>
              )}
            </div>
          ) : (
            <form className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 space-y-8 shadow-xl">
              {/* Part Mass in Air Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Part Mass in Air (grams)
                </label>
                <input
                  type="number"
                  value={partMassAir}
                  onChange={handlePartMassAirChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors duration-300"
                  placeholder="Enter part mass in air"
                  min="0"
                  step="any"
                />
              </div>

              {/* Part Mass in Fluid Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Part Mass in Fluid (grams)
                </label>
                <input
                  type="number"
                  value={partMassFluid}
                  onChange={handlePartMassFluidChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-colors duration-300"
                  placeholder="Enter part mass in fluid"
                  min="0"
                  step="any"
                />
              </div>

              {/* Part Density Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Part Density (grams/cm³)
                </label>
                <input
                  type="text"
                  value={partDensity}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-400 cursor-not-allowed"
                  placeholder="Part density will be calculated"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <motion.button
                  type="button"
                  onClick={handleFormSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-slate-200 text-slate-900 hover:bg-white transition-all duration-300 font-medium"
                >
                  Submit
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default SinglePieceEntry;
