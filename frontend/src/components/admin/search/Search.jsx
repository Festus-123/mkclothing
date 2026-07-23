import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'motion/react';

const Search = ({
  searching,
  searchResults,
  handleSearch,
  handleCloseSearch,
}) => {
  if (!searching) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{
        duration: 0.25,
        ease: 'easeInOut',
      }}
      className="sticky top-18 z-20 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by Product ID or Details..."
            onChange={handleSearch}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-sm outline-none focus:border-gray-400 focus:bg-white transition"
          />
        </div>

        {/* Close */}
        <button
          onClick={handleCloseSearch}
          className="h-11 w-11 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Result Count */}
      <div className="mt-3 text-sm text-gray-500">
        {searchResults.length > 0
          ? `${searchResults.length} result${
              searchResults.length > 1 ? 's' : ''
            } found`
          : 'Start typing to search logs'}
      </div>
    </motion.div>
  );
};

export default Search;
