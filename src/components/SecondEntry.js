// src/components/SecondEntry.jsx
import React, { useEffect } from 'react';
import Navbar from "../components/Navbar"; // Ensure Navbar is imported

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
  onDensityOfFluidChange,
 
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
    <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
      {/* Navbar */}
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Spacer to push content below Navbar */}
      <div className="flex-grow p-8">
        <div className="max-w-2xl mx-auto grid gap-12">
          {/* Form Container */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
            <h2 className="text-3xl font-semibold mb-6 text-brand-dark hover:text-brand-primary transition duration-300 text-center">
              Second Entry Screen
            </h2>
            <form>
              {/* Mass of Fluid Field */}
              <div className="mb-6">
                <label htmlFor="mass-of-fluid" className="block text-sm font-medium text-gray-700 mb-2">
                  Mass of Fluid (grams)
                </label>
                <input
                  type="number"
                  id="mass-of-fluid"
                  value={massOfFluid}
                  onChange={handleMassOfFluidChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  placeholder="Enter mass of fluid"
                  min="0"
                  step="any"
                />
              </div>

              {/* Volume of Fluid Field */}
              <div className="mb-6">
                <label htmlFor="volume-of-fluid" className="block text-sm font-medium text-gray-700 mb-2">
                  Volume of Fluid (cm³)
                </label>
                <input
                  type="number"
                  id="volume-of-fluid"
                  value={volumeOfFluid}
                  onChange={handleVolumeOfFluidChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  placeholder="Enter volume of fluid"
                  min="0"
                  step="any"
                />
              </div>

              {/* Density of Fluid Field */}
              <div className="mb-6">
                <label htmlFor="density-of-fluid" className="block text-sm font-medium text-gray-700 mb-2">
                  Density of Fluid (grams/cm³)
                </label>
                <input
                  type="text"
                  id="density-of-fluid"
                  value={densityOfFluid}
                  readOnly
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-gray-200 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  placeholder="Density of fluid will be calculated"
                />
              </div>

              {/* Conditional Fields for Attachments */}
              {(attachmentExists === "yes" || masterAttachmentExists === "yes") && (
                <>
                  {/* Attachment Mass in Air Field */}
                  <div className="mb-6">
                    <label htmlFor="attachment-mass-air" className="block text-sm font-medium text-gray-700 mb-2">
                      Attachment Mass in Air (grams)
                    </label>
                    <input
                      type="number"
                      id="attachment-mass-air"
                      value={attachmentMassAir}
                      onChange={handleAttachmentMassAirChange}
                      className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                      placeholder="Enter attachment mass in air"
                      min="0"
                      step="any"
                    />
                  </div>

                  {/* Attachment Mass in Fluid Field */}
                  <div className="mb-6">
                    <label htmlFor="attachment-mass-fluid" className="block text-sm font-medium text-gray-700 mb-2">
                      Attachment Mass in Fluid (grams)
                    </label>
                    <input
                      type="number"
                      id="attachment-mass-fluid"
                      value={attachmentMassFluid}
                      onChange={handleAttachmentMassFluidChange}
                      className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                      placeholder="Enter attachment mass in fluid"
                      min="0"
                      step="any"
                    />
                  </div>
                </>
              )}

              {/* Conditional Fields for Master Sample */}
              {masterExists === 'yes' && (
                <>
                  {/* Master Sample Mass in Air Field */}
                  <div className="mb-6">
                    <label htmlFor="master-sample-mass-air" className="block text-sm font-medium text-gray-700 mb-2">
                      Master Sample Mass in Air (grams)
                    </label>
                    <input
                      type="number"
                      id="master-sample-mass-air"
                      value={masterSampleMassAir}
                      onChange={handleMasterSampleMassAirChange}
                      className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                      placeholder="Enter master sample mass in air"
                      min="0"
                      step="any"
                    />
                  </div>

                  {/* Master Sample Mass in Fluid Field */}
                  <div className="mb-6">
                    <label htmlFor="master-sample-mass-fluid" className="block text-sm font-medium text-gray-700 mb-2">
                      Master Sample Mass in Fluid (grams)
                    </label>
                    <input
                      type="number"
                      id="master-sample-mass-fluid"
                      value={masterSampleMassFluid}
                      onChange={handleMasterSampleMassFluidChange}
                      className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                      placeholder="Enter master sample mass in fluid"
                      min="0"
                      step="any"
                    />
                  </div>

                  {/* Density of Master Sample Field */}
                  <div className="mb-6">
                    <label htmlFor="density-of-master-sample" className="block text-sm font-medium text-gray-700 mb-2">
                      Density of Master Sample (grams/cm³)
                    </label>
                    <input
                      type="text"
                      id="density-of-master-sample"
                      value={densityMasterSample}
                      readOnly
                      className="border border-brand-lighter rounded-lg w-full p-3 bg-gray-200 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                      placeholder="Density of master sample will be calculated"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
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

export default SecondEntry;
