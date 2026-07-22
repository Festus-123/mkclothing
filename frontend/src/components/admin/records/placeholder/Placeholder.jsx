import React from 'react';

const Placeholder = ({ rows = 6 }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: 6 }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-100"
              >
                {/* S/N */}
                <td className="px-6 py-5">
                  <div className="h-4 w-8 rounded bg-gray-200"></div>
                </td>

                {/* Product ID */}
                <td className="px-6 py-5">
                  <div className="h-4 w-28 rounded bg-gray-200"></div>
                </td>

                {/* Action */}
                <td className="px-6 py-5">
                  <div className="h-7 w-20 rounded-full bg-gray-200"></div>
                </td>

                {/* Date */}
                <td className="px-6 py-5">
                  <div className="h-4 w-40 rounded bg-gray-200"></div>
                </td>

                {/* Details */}
                <td className="px-6 py-5">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
                    <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Placeholder;