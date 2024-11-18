import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function UpdateStandardAlloy({ partCode, onClose, onSave }) {
  const [standardAlloys, setStandardAlloys] = useState([]);
  const [selectedAlloy, setSelectedAlloy] = useState('');
  const [currentAlloy, setCurrentAlloy] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch the part to get its current standardAlloyId
        //console.log('Fetching part details for partCode:', partCode);
        const partResponse = await fetch(`http://localhost:4000/parts/${partCode}`);
        const partData = await partResponse.json();
        //console.log('Part data received:', partData);

        // If part has a standardAlloyId, fetch that specific alloy
        if (partData.part && partData.part.standardAlloyId) {
          const alloyResponse = await fetch(`http://localhost:4000/standardAlloy/${partData.part.standardAlloyId}`);
          const alloyData = await alloyResponse.json();
          //console.log('Current alloy data:', alloyData);
          if (alloyData.alloy) {
            setCurrentAlloy(alloyData.alloy);
          }
        }

        // Fetch all available standard alloys
        const alloysResponse = await fetch('http://localhost:4000/standardAlloy/');
        const alloysData = await alloysResponse.json();
        //console.log('All available alloys:', alloysData);
        setStandardAlloys(alloysData.alloys);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      }
    };

    if (partCode) {
      fetchData();
    }
  }, [partCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedAlloy === currentAlloy?._id) {
      setError('Please select a different alloy');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/parts/${partCode}/standardAlloy`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          standardAlloyId: selectedAlloy
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update standard alloy');
      }

      onSave();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">Update Standard Alloy</h2>
      
      {/* Display current alloy info */}
      <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-2">Current Standard Alloy</h3>
        {currentAlloy ? (
          <>
            <p className="text-slate-200">
              {currentAlloy.name}
              {currentAlloy.country && ` (${currentAlloy.country})`}
            </p>
            {currentAlloy.density && (
              <p className="text-slate-400 text-sm mt-1">
                Density: {currentAlloy.density} g/cm³
              </p>
            )}
          </>
        ) : (
          <p className="text-slate-400">No standard alloy currently assigned</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Select New Standard Alloy</label>
          <select
            value={selectedAlloy}
            onChange={(e) => {
              setSelectedAlloy(e.target.value);
              setError('');
            }}
            className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 
              text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 
              focus:ring-slate-600 transition-colors duration-300 
              ${selectedAlloy === currentAlloy?._id ? 'border-orange-500/50' : ''}`}
            required
          >
            <option value="">Select Standard Alloy</option>
            {standardAlloys
              .filter(alloy => alloy._id !== currentAlloy?._id)
              .map((alloy) => (
                <option key={alloy._id} value={alloy._id}>
                  {alloy.name} {alloy.country && `(${alloy.country})`}
                  {alloy.density && ` - ${alloy.density} g/cm³`}
                </option>
              ))}
          </select>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm bg-red-500/10 p-2 rounded"
          >
            {error}
          </motion.p>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800/70 transition-colors duration-300"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading || !selectedAlloy || selectedAlloy === currentAlloy?._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 
              transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStandardAlloy;