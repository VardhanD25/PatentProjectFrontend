import React from 'react';

function ReportLotPage() {
  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
    //   <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-black max-w-5xl w-full mx-4 my-6">
    //     <h1 className="text-2xl font-bold text-center mb-6">Report Lot</h1>

    //     <div className="mb-4 grid grid-cols-2 gap-4">
    //       <div>
    //         <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
    //           Date
    //         </label>
    //         <input
    //           type="date"
    //           id="date"
    //           className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           defaultValue="2024-08-18"
    //           readOnly
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="partCode" className="block text-sm font-medium text-gray-700 mb-1">
    //           Part Code
    //         </label>
    //         <input
    //           type="text"
    //           id="partCode"
    //           className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           defaultValue="A0003002030"
    //           readOnly
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="partName" className="block text-sm font-medium text-gray-700 mb-1">
    //           Part Name
    //         </label>
    //         <input
    //           type="text"
    //           id="partName"
    //           className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           defaultValue="ABC Casing"
    //           readOnly
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-1">
    //           Theoretical Density of Alloy
    //         </label>
    //         <input
    //           type="text"
    //           id="density"
    //           className="border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           defaultValue="2.75 g/cm³"
    //           readOnly
    //         />
    //       </div>
    //     </div>

    //     {/* Chemical Composition Table */}
    //     <div className="mb-4">
    //       <h2 className="text-lg font-semibold mb-2">Chemical Composition (Weight %)</h2>
    //       <table className="min-w-full bg-white border border-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th className="py-2 border border-gray-300">Element</th>
    //             <th className="py-2 border border-gray-300">Al</th>
    //             <th className="py-2 border border-gray-300">Si</th>
    //             <th className="py-2 border border-gray-300">Fe</th>
    //             <th className="py-2 border border-gray-300">Cu</th>
    //             <th className="py-2 border border-gray-300">Mn</th>
    //             <th className="py-2 border border-gray-300">Mg</th>
    //             <th className="py-2 border border-gray-300">Zn</th>
    //             <th className="py-2 border border-gray-300">Ni</th>
    //             <th className="py-2 border border-gray-300">Ti</th>
    //             <th className="py-2 border border-gray-300">Pb</th>
    //             <th className="py-2 border border-gray-300">Sn</th>
    //             <th className="py-2 border border-gray-300">Cr</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td className="py-2 border border-gray-300">Weight %</td>
    //             <td className="py-2 border border-gray-300">83.95</td>
    //             <td className="py-2 border border-gray-300">10.25</td>
    //             <td className="py-2 border border-gray-300">0.9</td>
    //             <td className="py-2 border border-gray-300">1.75</td>
    //             <td className="py-2 border border-gray-300">0.4</td>
    //             <td className="py-2 border border-gray-300">0.25</td>
    //             <td className="py-2 border border-gray-300">1.7</td>
    //             <td className="py-2 border border-gray-300">0.3</td>
    //             <td className="py-2 border border-gray-300">0.2</td>
    //             <td className="py-2 border border-gray-300">0.15</td>
    //             <td className="py-2 border border-gray-300">0.1</td>
    //             <td className="py-2 border border-gray-300">0.05</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>

    //     {/* Report Lot Table */}
    //     <div className="mb-4">
    //       <h2 className="text-lg font-semibold mb-2">Part Details</h2>
    //       <table className="min-w-full bg-white border border-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th className="py-2 border border-gray-300">Part ID</th>
    //             <th className="py-2 border border-gray-300">Mass in Air (CMa)</th>
    //             <th className="py-2 border border-gray-300">Mass in Fluid (CMf)</th>
    //             <th className="py-2 border border-gray-300">Density of Fluid</th>
    //             <th className="py-2 border border-gray-300">Density of Item</th>
    //             <th className="py-2 border border-gray-300">Compactness Ratio</th>
    //             <th className="py-2 border border-gray-300">Porosity Index</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {partsData.map((part, index) => (
    //             <tr key={index}>
    //               <td className="py-2 border border-gray-300">{part.partId}</td>
    //               <td className="py-2 border border-gray-300">{part.massInAir}</td>
    //               <td className="py-2 border border-gray-300">{part.massInFluid}</td>
    //               <td className="py-2 border border-gray-300">{part.fluidDensity}</td>
    //               <td className="py-2 border border-gray-300">{part.densityOfItem}</td>
    //               <td className="py-2 border border-gray-300">{part.compactnessRatio}</td>
    //               <td className="py-2 border border-gray-300">{part.porosityIndex}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
    //     >
    //       Generate Report
    //     </button>
    //   </div>
    // </div>
    <h1>Meow</h1>
  );
}

export default ReportLotPage;
