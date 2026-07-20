import React from 'react';
import { FaX } from 'react-icons/fa6';

const FilterMobile = ({
  showFilters,
  setShowFilters,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  selectedAvailability,
  setSelectedAvailability,
  prices,
  availability,
  clearFilters,
}) => {
  return (
    <div>
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full w-[90%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className=" mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Filters</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <FaX />
              </button>
            </div>

            {/* Category */}

            <div className="mb-8">
              <h3 className="mb-4 text-gray-500 tracking-wider uppercase">Category</h3>

              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <button
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        // setShowFilters(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                        selectedCategory === category.name
                          ? 'border border-orange-500 text-black'
                          : ''
                      }`}
                    >
                      <Icon />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price */}

            <div className="mb-8">
              <h3 className="mb-4  text-gray-500 tracking-wider uppercase">Price Range</h3>

              <div className="space-y-2">
                {prices.map((price) => (
                  <button
                    key={price}
                    onClick={() => {
                      setSelectedPrice(price);
                      // setShowFilters(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      selectedPrice === price
                        ? 'border border-orange-500 text-black'
                        : ''
                    }`}
                  >
                    {price.toLocaleString()} Above
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}

            <div>
              <h3 className="mb-4 text-gray-500 tracking-wider uppercase">Availability</h3>

              <div className="space-y-2">
                {availability.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedAvailability(item);
                      // setShowFilters(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      selectedAvailability === item
                        ? 'border border-orange-500 text-black'
                        : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

              <button
                onClick={() => {
                  setShowFilters(false);
                }}
                className="mt-10 w-full rounded-full border text-white bg-orange-400 py-3 font-medium transition hover:bg-orange-300"
              >
                Add Filters
              </button>
              <button
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                className="mt-4 w-full rounded-full border border-gray-300 py-3 font-medium transition hover:bg-black hover:text-white"
              >
                Clear All Filters
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMobile;
