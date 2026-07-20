import React from 'react';
import { FaFilter, FaChevronUp, FaChevronDown, FaCheck } from 'react-icons/fa';

const Filter = ({
  setShowFilters,
  selectedCategory,
  clearFilters,
  toggleSection,
  openSection,
  categories,
  setSelectedCategory,
  prices,
  availability,
  setSelectedPrice,
  selectedPrice,
  setSelectedAvailability,
  selectedAvailability,
}) => {
  return (
    <div>
      {/* Mobile Filter Button */}

      <div className="lg:hidden mb-8">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium hover:shadow-md transition"
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {/* Layout */}

      <div className="grid lg:grid-cols-[290px_1fr] gap-10">
        {/* Sidebar */}

        <aside className="hidden lg:block sticky top-28 h-fit rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Refine Results</h2>

            <button
              onClick={clearFilters}
              className="text-xs uppercase tracking-wider text-orange-500 hover:text-black transition"
            >
              Clear
            </button>
          </div>

          {/* CATEGORY */}

          <div className="border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleSection('category')}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Category</span>

              {openSection === 'category' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openSection === 'category' && (
              <div className="mt-5 space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition ${
                        selectedCategory === category.name
                          ? 'border border-orange-500 text-black'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon />

                        <span className="text-sm">{category.name}</span>
                      </div>

                      {selectedCategory === category.name && <FaCheck />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PRICE */}

          <div className="border-b border-gray-200 py-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Price Range</span>

              {openSection === 'price' ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openSection === 'price' && (
              <div className="mt-5 space-y-3">
                {prices.map((price) => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      selectedPrice === price
                        ? 'border border-orange-500 text-black'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {price.toLocaleString()} Above
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AVAILABILITY */}

          <div className="pt-6">
            <button
              onClick={() => toggleSection('availability')}
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium">Availability</span>

              {openSection === 'availability' ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>

            {openSection === 'availability' && (
              <div className="mt-5 space-y-3">
                {availability.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedAvailability(item)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      selectedAvailability === item
                        ? 'border border-orange-500 text-black'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Filter;
