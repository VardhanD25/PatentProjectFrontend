import React from 'react';
import { useLocation } from 'react-router-dom';

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
    notes,
  } = location.state.reportData; // Access the passed data

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black max-w-5xl w-full mx-4 my-6">
        <h1 className="text-2xl font-bold text-center mb-6">Report</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={date}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="partCode" className="block text-sm font-medium text-gray-700 mb-1">
              Part Code
            </label>
            <input
              type="text"
              id="partCode"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={partCode}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="partName" className="block text-sm font-medium text-gray-700 mb-1">
              Part Name
            </label>
            <input
              type="text"
              id="partName"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={partName}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-1">
              Theoretical Density of Alloy
            </label>
            <input
              type="text"
              id="density"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={density}
              readOnly
            />
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
                <label htmlFor="standardAlloyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Alloy Name
                </label>
                <input
                  type="text"
                  id="standardAlloyName"
                  className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={standardAlloyName}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="standardAlloyCountry" className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Alloy Country
                </label>
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

        {/* Static Dropdown Field for Part Attachments */}
        <div className="mb-4">
          <label htmlFor="partAttachments" className="block text-sm font-medium text-gray-700 mb-1">
            Part contains attachments:
          </label>
          <select
            id="partAttachments"
            className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={partAttachments}
            readOnly
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="massInAir" className="block text-sm font-medium text-gray-700 mb-1">
              Part's Mass in Air (CMa)
            </label>
            <input
              type="text"
              id="massInAir"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={massInAir}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="massInFluid" className="block text-sm font-medium text-gray-700 mb-1">
              Part's Mass in Fluid (CMf)
            </label>
            <input
              type="text"
              id="massInFluid"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={massInFluid}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="fluidDensity" className="block text-sm font-medium text-gray-700 mb-1">
              Density of Fluid Used
            </label>
            <input
              type="text"
              id="fluidDensity"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={fluidDensity}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="densityOfItem" className="block text-sm font-medium text-gray-700 mb-1">
              Density of the Item
            </label>
            <input
              type="text"
              id="densityOfItem"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={densityOfItem}
              readOnly
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="compactnessRatio" className="block text-sm font-medium text-gray-700 mb-1">
              Compactness Ratio
            </label>
            <input
              type="text"
              id="compactnessRatio"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={compactnessRatio}
              readOnly
            />
          </div>
        </div>

        {/* Additional Notes and Checkboxes */}
        <div className="mb-4">
          <label htmlFor="optionalReport" className="block text-sm font-medium text-gray-700 mb-1">
            Optional Report Elements
          </label>
          <input
            type="checkbox"
            id="optionalReport"
            className="focus:ring-2 focus:ring-blue-500"
            checked={optionalReport}
            readOnly
          />
        </div>

        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            //defaultValue={notes}
            placeholder='Add additional notes'
            
          />
        </div>

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

export default ReportPage;
