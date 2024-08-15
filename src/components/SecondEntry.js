import React, { useState, useEffect } from 'react';

function SecondEntry({ 
  attachmentExists, 
  masterExists, 
  masterAttachmentExists,
  attachmentMassAir,
  attachmentMassFluid,
  masterSampleMassAir,
  masterSampleMassFluid,
  densityMasterSample,
  onAttachmentMassAirChange, 
  onAttachmentMassFluidChange,
  onMasterSampleMassAirChange,
  onMasterSampleMassFluidChange,
  onDensityMasterSampleChange,
  massOfFluid,
  volumeOfFluid,
  densityOfFluid,
  onMassOfFluidChange,
  onVolumeOfFluidChange,
  onDensityOfFluidChange  
}) {
  useEffect(() => {
    if (massOfFluid && volumeOfFluid && volumeOfFluid !== '0') {
      const density = (massOfFluid / volumeOfFluid).toFixed(2);
      onDensityOfFluidChange(density);
    } else {
      onDensityOfFluidChange('');
    }
  }, [massOfFluid, volumeOfFluid, onDensityOfFluidChange]);

  useEffect(() => {
    if (masterExists === 'yes') {
      const fetchDensityOfMasterSample = async () => {
        if (masterSampleMassAir && masterSampleMassFluid) {
          try {
            const response = await fetch(`http://localhost:4000/parts/master-sample-density?masterSampleMassAir=${masterSampleMassAir}&attachmentMassAir=${attachmentMassAir}&masterSampleMassFluid=${masterSampleMassFluid}&attachmentMassFluid=${attachmentMassFluid}&densityOfFluid=${densityOfFluid}&masterAttachmentExists=${masterAttachmentExists}`);
            const data = await response.json();
            onDensityMasterSampleChange(data.density || '0');
          } catch (error) {
            console.error('Error fetching master sample density:', error);
            onDensityMasterSampleChange('0');
          }
        }
      };
  
      fetchDensityOfMasterSample();
    } else {
      onDensityMasterSampleChange('0');
    }
  }, [masterExists, masterSampleMassAir, masterSampleMassFluid, masterAttachmentExists, attachmentMassAir, attachmentMassFluid, densityOfFluid, onDensityMasterSampleChange]);

  const handleMassOfFluidChange = (event) => {
    const value = event.target.value;
    onMassOfFluidChange(value);
  };

  const handleVolumeOfFluidChange = (event) => {
    const value = event.target.value;
    onVolumeOfFluidChange(value);
  };

  const handleAttachmentMassAirChange = (event) => {
    const value = event.target.value;
    onAttachmentMassAirChange(value);
  };

  const handleAttachmentMassFluidChange = (event) => {
    const value = event.target.value;
    onAttachmentMassFluidChange(value);
  };

  const handleMasterSampleMassAirChange = (event) => {
    const value = event.target.value;
    onMasterSampleMassAirChange(value);
  };

  const handleMasterSampleMassFluidChange = (event) => {
    const value = event.target.value;
    onMasterSampleMassFluidChange(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="max-w-md w-full my-8">
        <h1 className="text-2xl font-bold text-center mb-6">Second Entry Screen</h1>
        <form className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
          <div className="mb-4">
            <label htmlFor="mass-of-fluid" className="block text-sm font-medium text-gray-700 mb-1">
              Mass of Fluid (grams)
            </label>
            <input
              type="number"
              id="mass-of-fluid"
              value={massOfFluid}
              onChange={handleMassOfFluidChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mass of fluid"
              min="0"
              step="any"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="volume-of-fluid" className="block text-sm font-medium text-gray-700 mb-1">
              Volume of Fluid (cm³)
            </label>
            <input
              type="number"
              id="volume-of-fluid"
              value={volumeOfFluid}
              onChange={handleVolumeOfFluidChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter volume of fluid"
              min="0"
              step="any"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="density-of-fluid" className="block text-sm font-medium text-gray-700 mb-1">
              Density of Fluid (grams/cm³)
            </label>
            <input
              type="text"
              id="density-of-fluid"
              value={densityOfFluid}
              readOnly
              className="border-gray-300 rounded-lg w-full p-2 bg-gray-200"
            />
          </div>
          {(attachmentExists==="yes" || masterAttachmentExists==="yes") && (
            <>
          <div className="mb-4">
            <label htmlFor="attachment-mass-air" className="block text-sm font-medium text-gray-700 mb-1">
              Attachment Mass in Air (grams)
            </label>
            <input
              type="number"
              id="attachment-mass-air"
              value={attachmentMassAir}
              onChange={handleAttachmentMassAirChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter attachment mass in air"
              min="0"
              step="any"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="attachment-mass-fluid" className="block text-sm font-medium text-gray-700 mb-1">
              Attachment Mass in Fluid (grams)
            </label>
            <input
              type="number"
              id="attachment-mass-fluid"
              value={attachmentMassFluid}
              onChange={handleAttachmentMassFluidChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter attachment mass in fluid"
              min="0"
              step="any"
            />
          </div>
          </>
          )}
          {masterExists === 'yes' && (
            <>
              <div className="mb-4">
                <label htmlFor="master-sample-mass-air" className="block text-sm font-medium text-gray-700 mb-1">
                  Master Sample Mass in Air (grams)
                </label>
                <input
                  type="number"
                  id="master-sample-mass-air"
                  value={masterSampleMassAir}
                  onChange={handleMasterSampleMassAirChange}
                  className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter master sample mass in air"
                  min="0"
                  step="any"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="master-sample-mass-fluid" className="block text-sm font-medium text-gray-700 mb-1">
                  Master Sample Mass in Fluid (grams)
                </label>
                <input
                  type="number"
                  id="master-sample-mass-fluid"
                  value={masterSampleMassFluid}
                  onChange={handleMasterSampleMassFluidChange}
                  className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter master sample mass in fluid"
                  min="0"
                  step="any"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="density-of-master-sample" className="block text-sm font-medium text-gray-700 mb-1">
                  Density of Master Sample (grams/cm³)
                </label>
                <input
                  type="text"
                  id="density-of-master-sample"
                  value={densityMasterSample}
                  readOnly
                  className="border-gray-300 rounded-lg w-full p-2 bg-gray-200"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SecondEntry;
