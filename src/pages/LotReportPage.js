import React from 'react';
import { useLocation } from 'react-router-dom';

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
    optionalReport = true
  } = location.state;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black max-w-5xl w-full mx-4 my-6">
        <h1 className="text-2xl font-bold text-center mb-6">Lot Report</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={date}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="partCode" className="block text-sm font-medium text-gray-700 mb-1">Part Code</label>
            <input
              type="text"
              id="partCode"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={partCode}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="partName" className="block text-sm font-medium text-gray-700 mb-1">Part Name</label>
            <input
              type="text"
              id="partName"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={partName}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-1">Theoretical Density (g/cm³)</label>
            <input
              type="text"
              id="density"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={density}
              readOnly
            />
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
                <label htmlFor="standardAlloyName" className="block text-sm font-medium text-gray-700 mb-1">Standard Alloy Name</label>
                <input
                  type="text"
                  id="standardAlloyName"
                  className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={standardAlloyName}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="standardAlloyCountry" className="block text-sm font-medium text-gray-700 mb-1">Standard Alloy Country</label>
                <input
                  type="text"
                  id="standardAlloyCountry"
                  className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={standardAlloyCountry}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="partAttachments" className="block text-sm font-medium text-gray-700 mb-1">Part contains attachments:</label>
          <select
            id="partAttachments"
            className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={partAttachments ? 'yes' : 'no'}
            readOnly
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
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
          <label htmlFor="optionalReport" className="block text-sm font-medium text-gray-700 mb-1">Optional Report Elements</label>
          <input
            type="checkbox"
            id="optionalReport"
            className="focus:ring-2 focus:ring-blue-500"
            checked={optionalReport}
            readOnly
          />
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
                  <label htmlFor="densityOfMasterSample" className="block text-sm font-medium text-gray-700 mb-1">Density of Master Sample (g/cm³)</label>
                  <input
                    type="text"
                    id="densityOfMasterSample"
                    className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={densityOfItem}
                    readOnly
                  />
                </div>
              )}
              {masterAttachmentExists && (
                <div>
                  <label htmlFor="masterAttachmentExists" className="block text-sm font-medium text-gray-700 mb-1">Master Attachment Exists</label>
                  <input
                    type="text"
                    id="masterAttachmentExists"
                    className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value="Yes"
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default LotReportPage;
