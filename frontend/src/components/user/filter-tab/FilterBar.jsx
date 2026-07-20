import React from 'react';
import { FaX } from 'react-icons/fa6';

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  selectedAvailability,
  setSelectedAvailability,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {selectedCategory !== 'All' && (
        <button
          onClick={() => setSelectedCategory('All')}
          className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
        >
          {selectedCategory}
          <FaX className="text-xs" />
        </button>
      )}

      {selectedPrice !== 0 && (
        <button
          onClick={() => setSelectedPrice('All')}
          className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
        >
          {selectedPrice.toLocaleString()} Above
          <FaX className="text-xs" />
        </button>
      )}

      {selectedAvailability !== 'All' && (
        <button
          onClick={() => setSelectedAvailability('All')}
          className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
        >
          {selectedAvailability}
          <FaX className="text-xs" />
        </button>
      )}

      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
        >
          "{searchQuery}"
          <FaX className="text-xs" />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
