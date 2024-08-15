import React, { useState, useEffect } from 'react';

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
  const [partCode, setPartCode] = useState(selectedPartCode ||'');
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="max-w-md w-full my-8">
        <h1 className="text-2xl font-bold text-center mb-6">First Entry Screen</h1>
        <form className="bg-white p-8 rounded-lg shadow-lg border-4 border-black">
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="part-code" className="block text-sm font-medium text-gray-700 mb-1">
              Part Code
            </label>
            <select
              id="part-code"
              value={partCode}
              onChange={handlePartCodeChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select part code</option>
              {partCodes.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="part-name" className="block text-sm font-medium text-gray-700 mb-1">
              Part Name
            </label>
            <input
              type="text"
              id="part-name"
              value={partName}
              readOnly
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Part name will be autofilled"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="single-or-lot" className="block text-sm font-medium text-gray-700 mb-1">
              Single Piece or Lot
            </label>
            <select
              id="single-or-lot"
              value={pieceOrLot}
              onChange={handleSingleOrLotChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select option</option>
              <option value="single">Single Piece</option>
              <option value="lot">Lot</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="density-type" className="block text-sm font-medium text-gray-700 mb-1">
              Calculated Density or Specified Density
            </label>
            <select
              id="density-type"
              value={density}
              onChange={handleDensityTypeChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select option</option>
              <option value="calculated">Calculated Density</option>
              <option value="specified">Specified Density</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="theoretical-density" className="block text-sm font-medium text-gray-700 mb-1">
              Theoretical Density
            </label>
            <input
              type="text"
              id="theoretical-density"
              value={theoreticalDensity}
              readOnly
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Theoretical density will be autofilled"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="attachment-exists" className="block text-sm font-medium text-gray-700 mb-1">
              Does the part have attachments?
            </label>
            <select
              id="attachment-exists"
              value={attachment}
              onChange={handleAttachmentChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="master-exists" className="block text-sm font-medium text-gray-700 mb-1">
              Does the master sample exist?
            </label>
            <select
              id="master-exists"
              value={master}
              onChange={handleMasterChange}
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {master === 'yes' && (
            <div className="mb-4">
              <label htmlFor="master-attachment-exists" className="block text-sm font-medium text-gray-700 mb-1">
                Does the master sample have attachments?
              </label>
              <select
                id="master-attachment-exists"
                value={masterAttachment}
                onChange={handleMasterAttachmentChange}
                className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
}

export default FirstEntry;
