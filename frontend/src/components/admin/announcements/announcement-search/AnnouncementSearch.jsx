import React from 'react';
import { motion } from 'motion/react';
import { FiSearch, FiX } from 'react-icons/fi';

const AnnouncementSearch = ({
  searching,
  searchResult,
  handleSearch,
  handleCLoseSearch,
}) => {
  if (!searching) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98, }}
      animate={{ opacity: 1, y: 0, scale: 1, }}
      exit={{ opacity: 0, y: -20, scale: 0.98, }}
      transition={{ duration: 0.25, ease: 'easeInOut', }}
      className="sticky top-18 z-20 mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search announcements..."
            onChange={handleSearch}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>

        <button
          onClick={handleCLoseSearch}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition"
        >
          <FiX size={18} />
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {searchResult.length > 0
          ? `${searchResult.length} result${
              searchResult.length > 1 ? 's' : ''
            } found`
          : 'Start typing to search announcements...'}
      </p>
    </motion.div>
  );
};

export default AnnouncementSearch;