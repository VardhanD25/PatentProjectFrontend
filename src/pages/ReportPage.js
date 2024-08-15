import React from 'react';

function ReportPage({ partAttachments }) {
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
              defaultValue="2024-08-18"
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
              defaultValue="A0003002030"
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
              defaultValue="ABC Casing"
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
              defaultValue="2.75 g/cm³"
              readOnly
            />
          </div>
        </div>

        {/* Chemical Composition Table */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Chemical Composition (Weight %)</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 border border-gray-300">Element</th>
                <th className="py-2 border border-gray-300">Al</th>
                <th className="py-2 border border-gray-300">Si</th>
                <th className="py-2 border border-gray-300">Fe</th>
                <th className="py-2 border border-gray-300">Cu</th>
                <th className="py-2 border border-gray-300">Mn</th>
                <th className="py-2 border border-gray-300">Mg</th>
                <th className="py-2 border border-gray-300">Zn</th>
                <th className="py-2 border border-gray-300">Ni</th>
                <th className="py-2 border border-gray-300">Ti</th>
                <th className="py-2 border border-gray-300">Pb</th>
                <th className="py-2 border border-gray-300">Sn</th>
                <th className="py-2 border border-gray-300">Cr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border border-gray-300">Weight %</td>
                <td className="py-2 border border-gray-300">83.95</td>
                <td className="py-2 border border-gray-300">10.25</td>
                <td className="py-2 border border-gray-300">0.9</td>
                <td className="py-2 border border-gray-300">1.75</td>
                <td className="py-2 border border-gray-300">0.4</td>
                <td className="py-2 border border-gray-300">0.25</td>
                <td className="py-2 border border-gray-300">1.7</td>
                <td className="py-2 border border-gray-300">0.3</td>
                <td className="py-2 border border-gray-300">0.2</td>
                <td className="py-2 border border-gray-300">0.15</td>
                <td className="py-2 border border-gray-300">0.1</td>
                <td className="py-2 border border-gray-300">0.05</td>
              </tr>
            </tbody>
          </table>
        </div>

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
              defaultValue="476.0 g"
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
              defaultValue="301.0 g"
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
              defaultValue="1.04 g/cm³"
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
              defaultValue="2.68 g/cm³"
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
              defaultValue="97.39%"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="porosityIndex" className="block text-sm font-medium text-gray-700 mb-1">
              Porosity Index
            </label>
            <input
              type="text"
              id="porosityIndex"
              className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="1.18%"
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
            defaultValue="No additional notes."
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default ReportPage;
