import React from 'react';
import { FiSearch } from 'react-icons/fi';

const RecordHeader = ({ searching, setSeaching }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Activity Logs
          </h1>

          <p className="mt-1 text-sm md:text-base text-gray-500">
            Monitor every product activity across your store. View product
            creations, updates and deletions in one place.
          </p>
        </div>

        {!searching && (
          <button
            onClick={() => setSeaching(true)}
            className="h-11 w-11 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition flex items-center justify-center"
          >
            <FiSearch
              size={18}
              className="text-gray-600"
            />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200" />
    </div>
  );
};

export default RecordHeader;