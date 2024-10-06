// src/components/FirstEntry.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Ensure Navbar is imported

function FirstEntry({ 
  partCodes, 
  onPartCodeChange, 
  partName, 
  selectedDate, 
  onDateChange,
  singleOrLot, 
  onSingleOrLotChange,
  densityType,
  onDensityTypeChange,
  theoreticalDensity,
  attachmentExists,
  onAttachmentExistsChange,
  masterExists,
  onMasterExistsChange,
  masterAttachmentExists,
  onMasterAttachmentExistsChange,
  selectedPartCode
}) {
  const [date, setDate] = useState(selectedDate);
  const [partCode, setPartCode] = useState(selectedPartCode || '');
  const [pieceOrLot, setPieceOrLot] = useState(singleOrLot);
  const [density, setDensity] = useState(densityType);
  const [attachment, setAttachment] = useState(attachmentExists);
  const [master, setMaster] = useState(masterExists);
  const [masterAttachment, setMasterAttachment] = useState(masterAttachmentExists);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setPieceOrLot(singleOrLot);
  }, [singleOrLot]);

  useEffect(() => {
    setDensity(densityType);
  }, [densityType]);

  useEffect(() => {
    setAttachment(attachmentExists);
  }, [attachmentExists]);

  useEffect(() => {
    setMaster(masterExists);
  }, [masterExists]);

  useEffect(() => {
    setMasterAttachment(masterAttachmentExists);
  }, [masterAttachmentExists]);

  const handlePartCodeChange = (event) => {
    const code = event.target.value;
    setPartCode(code);
    onPartCodeChange(event);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  const handleSingleOrLotChange = (event) => {
    const value = event.target.value;
    setPieceOrLot(value);
    onSingleOrLotChange(value);
  };

  const handleDensityTypeChange = (event) => {
    const value = event.target.value;
    setDensity(value);
    onDensityTypeChange(value);
  };

  const handleAttachmentChange = (event) => {
    const value = event.target.value;
    setAttachment(value);
    onAttachmentExistsChange(value);
  };

  const handleMasterChange = (event) => {
    const value = event.target.value;
    setMaster(value);
    onMasterExistsChange(value);
    if (value === 'no') {
      setMasterAttachment(''); // Clear master attachment field if master sample does not exist
      onMasterAttachmentExistsChange(''); // Ensure the state is updated
    }
  };

  const handleMasterAttachmentChange = (event) => {
    const value = event.target.value;
    setMasterAttachment(value);
    onMasterAttachmentExistsChange(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-poppins">
      {/* Navbar */}
      <Navbar />
      <br />
      <br />
      <br />
      {/* Spacer to push content below Navbar */}
      <div className="flex-grow p-8">
        <div className="max-w-2xl mx-auto grid gap-12">
          {/* Form Container */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300">
            <h2 className="text-3xl font-semibold mb-6 text-brand-dark hover:text-brand-primary transition duration-300 text-center">
              First Entry Screen
            </h2>
            <form>
              {/* Date Field */}
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  placeholder="Select a date"
                />
              </div>

              {/* Part Code Field */}
              <div className="mb-6">
                <label htmlFor="part-code" className="block text-sm font-medium text-gray-700 mb-2">
                  Part Code
                </label>
                <select
                  id="part-code"
                  value={partCode}
                  onChange={handlePartCodeChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                >
                  <option value="">Select part code</option>
                  {partCodes.map(code => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>

              {/* Part Name Field */}
              <div className="mb-6">
                <label htmlFor="part-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Part Name
                </label>
                <input
                  type="text"
                  id="part-name"
                  value={partName}
                  readOnly
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  placeholder="Part name will be autofilled"
                />
              </div>

              {/* Single Piece or Lot Field */}
              <div className="mb-6">
                <label htmlFor="single-or-lot" className="block text-sm font-medium text-gray-700 mb-2">
                  Single Piece or Lot
                </label>
                <select
                  id="single-or-lot"
                  value={pieceOrLot}
                  onChange={handleSingleOrLotChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                >
                  <option value="">Select option</option>
                  <option value="single">Single Piece</option>
                  <option value="lot">Lot</option>
                </select>
              </div>

              {/* Density Type Field */}
              <div className="mb-6">
                <label htmlFor="density-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Calculated Density or Specified Density
                </label>
                <select
                  id="density-type"
                  value={density}
                  onChange={handleDensityTypeChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                >
                  <option value="">Select option</option>
                  <option value="calculated">Calculated Density</option>
                  <option value="specified">Specified Density</option>
                </select>
              </div>

              {/* Theoretical Density Field */}
              <div className="mb-6">
                <label htmlFor="theoretical-density" className="block text-sm font-medium text-gray-700 mb-2">
                  Theoretical Density
                </label>
                <input
                  type="text"
                  id="theoretical-density"
                  value={theoreticalDensity}
                  readOnly
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-gray-200 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  placeholder="Theoretical density will be autofilled"
                />
              </div>

              {/* Attachment Exists Field */}
              <div className="mb-6">
                <label htmlFor="attachment-exists" className="block text-sm font-medium text-gray-700 mb-2">
                  Does the part have attachments?
                </label>
                <select
                  id="attachment-exists"
                  value={attachment}
                  onChange={handleAttachmentChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Master Exists Field */}
              <div className="mb-6">
                <label htmlFor="master-exists" className="block text-sm font-medium text-gray-700 mb-2">
                  Does the master sample exist?
                </label>
                <select
                  id="master-exists"
                  value={master}
                  onChange={handleMasterChange}
                  className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Conditional Master Attachment Exists Field */}
              {master === 'yes' && (
                <div className="mb-6">
                  <label htmlFor="master-attachment-exists" className="block text-sm font-medium text-gray-700 mb-2">
                    Does the master sample have attachments?
                  </label>
                  <select
                    id="master-attachment-exists"
                    value={masterAttachment}
                    onChange={handleMasterAttachmentChange}
                    className="border border-brand-lighter rounded-lg w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
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

export default FirstEntry;
