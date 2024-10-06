// src/pages/ReportPage.jsx
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Navbar from '../components/Navbar';


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
  const navigate = useNavigate();

  const handleNotesChange = (e) => {
    setNotes(e.target.value); // Update notes as user types
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  // Function to handle printing the report as PDF
  const handlePrintReport = () => {
    const element = reportRef.current; // Capture the report content

    html2pdf().from(element).set({
      margin: [10, 10, 10, 10],
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css'] }  // Ensure proper page breaks
    }).save();
    
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
        <div className="max-w-4xl mx-auto">
          {/* Report Container */}
          <div
            id="report-content"
            ref={reportRef}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-brand-lighter hover:shadow-2xl transition duration-300"
          >
            <h1 className="text-3xl font-semibold mb-6 text-brand-dark text-center">
              Report
            </h1>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700">Date:</p>
                <p className="mt-1">{date}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Part Code:</p>
                <p className="mt-1">{partCode}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Part Name:</p>
                <p className="mt-1">{partName}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Theoretical Density of Alloy:</p>
                <p className="mt-1">{density}</p>
              </div>
            </div>

            {/* Conditional Rendering: Chemical Composition Table or Standard Alloy Details */}
            {chemicalComposition && Object.keys(chemicalComposition).length > 0 ? (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-brand-dark">
                  Chemical Composition (Weight %)
                </h2>
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
                      <td className="py-2 border border-gray-300 text-center font-medium">Weight %</td>
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
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-brand-dark">
                  Standard Alloy Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Standard Alloy Name:</p>
                    <p className="mt-1">{standardAlloyName}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Standard Alloy Country:</p>
                    <p className="mt-1">{standardAlloyCountry}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Part Attachments */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700">Part contains attachments:</p>
              <p className="mt-1">{partAttachments === 'yes' ? 'Yes' : 'No'}</p>
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700">Part's Mass in Air (CMa):</p>
                <p className="mt-1">{massInAir}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Part's Mass in Fluid (CMf):</p>
                <p className="mt-1">{massInFluid}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Density of Fluid Used:</p>
                <p className="mt-1">{fluidDensity}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Density of the Item:</p>
                <p className="mt-1">{densityOfItem}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700">Compactness Ratio:</p>
              <p className="mt-1">{compactnessRatio}</p>
            </div>

            {/* Additional Notes */}
            {notes && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">Notes:</p>
                <textarea
                  value={notes}
                  onChange={handleNotesChange}
                  className="w-full mt-2 p-3 border border-brand-lighter rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
                  rows="4"
                  placeholder="Add any notes here..."
                />
              </div>
            )}

            {/* Master Sample Details */}
            {masterExists === 'yes' && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-brand-dark">
                  Master Sample Details
                </h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Master Sample has Attachment:</p>
                  <p className="mt-1">{masterAttachmentExists ? 'Yes' : 'No'}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Density of Master Sample:</p>
                  <p className="mt-1">{densityOfMasterSample}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center mt-8 space-x-4">
              <button
                onClick={handlePrintReport}
                className="bg-brand-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
              >
                Download Report
              </button>
              <button
                onClick={handleGoToHome}
                className="bg-brand-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition duration-300"
              >
                Back to Home Page
              </button>
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

export default ReportPage;
