import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './pageCSS/ReportPage.css';

function ReportPage() {
  const location = useLocation();
  const {
    date,
    partCode,
    partName,
    theoreticalDensity: density,
    chemicalComposition,
    partAttachments,
    massInAir,
    massInFluid,
    fluidDensity,
    densityOfItem,
    compactnessRatio,
    masterExists,
    masterAttachmentExists,
    densityOfMasterSample,
    optionalReport,
    standardAlloyCountry,
    standardAlloyName,
    notes: initialNotes,
  } = location.state.reportData; // Access the passed data

  const [notes, setNotes] = useState(initialNotes || ''); // Initialize state for notes
  const reportRef = useRef(); // Reference to the report div

  const handleNotesChange = (e) => {
    setNotes(e.target.value); // Update notes as user types
  };

  // Function to handle printing the report as PDF
  const handlePrintReport = () => {
    const element = reportRef.current; // Capture the report content
  
    html2pdf(element, {
      margin: [10, 10, 10, 10], // Adjust margins if needed
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Higher scale for better quality, CORS support
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // A4 page size
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div id="report-content" ref={reportRef} className="bg-white p-8 rounded-lg shadow-lg border-4 border-black max-w-4xl w-full mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Report</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Date:</p>
            <p>{date}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Part Code:</p>
            <p>{partCode}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Part Name:</p>
            <p>{partName}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Theoretical Density of Alloy:</p>
            <p>{density}</p>
          </div>
        </div>

        {/* Conditional Rendering: Chemical Composition Table or Standard Alloy Details */}
        {chemicalComposition && Object.keys(chemicalComposition).length > 0 ? (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Chemical Composition (Weight %)</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 border border-gray-300">Element</th>
                  {Object.keys(chemicalComposition).map((element) => (
                    <th key={element} className="py-2 border border-gray-300 text-center">
                      {element}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 border border-gray-300 text-center">Weight %</td>
                  {Object.values(chemicalComposition).map((weight, index) => (
                    <td key={index} className="py-2 border border-gray-300 text-center">
                      {weight}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Standard Alloy Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Standard Alloy Name:</p>
                <p>{standardAlloyName}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Standard Alloy Country:</p>
                <p>{standardAlloyCountry}</p>
              </div>
            </div>
          </div>
        )}

        {/* Part Attachments */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Part contains attachments:</p>
          <p>{partAttachments === 'yes' ? 'Yes' : 'No'}</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Part's Mass in Air (CMa):</p>
            <p>{massInAir}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Part's Mass in Fluid (CMf):</p>
            <p>{massInFluid}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Density of Fluid Used:</p>
            <p>{fluidDensity}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Density of the Item:</p>
            <p>{densityOfItem}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Compactness Ratio:</p>
          <p>{compactnessRatio}</p>
        </div>

        {/* Additional Notes */}
        {notes && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Notes:</p>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add any notes here..."
            />
          </div>
        )}

        {/* Master Sample Details */}
        {masterExists === 'yes' && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Master Sample Details</h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Master Sample has Attachment:</p>
              <p>{masterAttachmentExists ? 'Yes' : 'No'}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Density of Master Sample:</p>
              <p>{densityOfMasterSample}</p>
            </div>
          </div>
        )}
      </div>

      {/* Button to download the report as PDF */}
      <button
        onClick={handlePrintReport}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-4 my-6"
      >
        Download Report
      </button>
    </div>
  );
}

export default ReportPage;
