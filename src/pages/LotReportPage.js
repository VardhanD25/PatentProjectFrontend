import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './pageCSS/LotReportPage.css';

function LotReportPage() {
  const location = useLocation();
  const {
    date,
    selectedPartCode: partCode,
    partName,
    theoreticalDensity: density,
    chemicalComposition,
    partAttachments,
    partMassAirArray: massInAir,
    partMassFluidArray: massInFluid,
    densityOfFluid: fluidDensity,
    densityOfMasterSample: densityOfItem,
    compactnessRatioArray: compactnessRatio,
    porosityArray,
    masterExists,
    masterAttachmentExists,
    standardAlloyCountry,
    standardAlloyName,
    optionalReport = true,
  } = location.state;

  const reportRef = useRef();

  const handleDownloadReport = () => {
    const element = reportRef.current; // Capture the report content
  
    html2pdf().from(element).set({
      margin: [10, 10, 10, 10], // Adjust margins if needed
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true, allowTaint: true }, // Higher scale for better quality
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // A4 page size
      pagebreak: { mode: ['css', 'legacy'] }, // Handle page breaks based on CSS
    }).save();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-lg border-4 border-black max-w-5xl w-full mx-4 my-6" id="reportRef">
        <h1 className="text-2xl font-bold text-center mb-6">Lot Report</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{date}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Part Code</label>
            <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{partCode}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Part Name</label>
            <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{partName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theoretical Density (g/cm³)</label>
            <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{density}</p>
          </div>
        </div>

        {chemicalComposition && Object.keys(chemicalComposition).length > 0 ? (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Chemical Composition (Weight %)</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 border border-gray-300">Element Symbol</th>
                  {Object.keys(chemicalComposition).map((symbol, index) => (
                    <th key={index} className="py-2 border border-gray-300">{symbol}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 border border-gray-300">Percentage (%)</td>
                  {Object.values(chemicalComposition).map((percentage, index) => (
                    <td key={index} className="py-2 border border-gray-300">{percentage}</td>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard Alloy Name</label>
                <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{standardAlloyName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard Alloy Country</label>
                <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{standardAlloyCountry}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Part contains attachments:</label>
          <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{partAttachments ? 'Yes' : 'No'}</p>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b">Serial Number</th>
                <th className="py-2 px-4 border-b">Part Mass in Air (grams)</th>
                <th className="py-2 px-4 border-b">Part Mass in Fluid (grams)</th>
                <th className="py-2 px-4 border-b">Density of Fluid (g/cm³)</th>
                <th className="py-2 px-4 border-b">Density of Master Sample (g/cm³)</th>
                <th className="py-2 px-4 border-b">Compactness Ratio</th>
                {porosityArray && <th className="py-2 px-4 border-b">Porosity</th>}
              </tr>
            </thead>
            <tbody>
              {massInAir.map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{massInAir[index]}</td>
                  <td className="py-2 px-4 border-b">{massInFluid[index]}</td>
                  <td className="py-2 px-4 border-b">{fluidDensity}</td>
                  <td className="py-2 px-4 border-b">{densityOfItem}</td>
                  <td className="py-2 px-4 border-b">{compactnessRatio[index]}</td>
                  {porosityArray && <td className="py-2 px-4 border-b">{porosityArray[index]}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Optional Report Elements</label>
          <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{optionalReport ? 'Yes' : 'No'}</p>
        </div>

        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            id="notes"
            className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Add additional notes"
          />
        </div>

        {/* Master Details Logic */}
        {(masterExists || masterAttachmentExists) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Master Sample Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {masterExists && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Density of Master Sample (g/cm³)</label>
                  <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">{densityOfItem}</p>
                </div>
              )}
              {masterAttachmentExists && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Master Attachment Exists</label>
                  <p className="border-gray-300 rounded-lg w-full p-2 bg-gray-100">Yes</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleDownloadReport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

export default LotReportPage;
