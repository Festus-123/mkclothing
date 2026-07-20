import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';

const SearchModal = ({ onClose }) => {
  const [products, setProducts] = useState([])
  
  return (
    <div
      className=" fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start p-8 md:p-16 z-50"
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden "
      >
        <div className="relative flex items-center px-5 py-4 border-b border-gray-200">
          {/* Search Icon */}
          <FiSearch className="text-gray-400 text-xl mr-3" />

          {/* Input */}
          <input
            type="text"
            placeholder="Search products, collections, eccentrics..."
            className=" flex-1 outline-none text-lg placeholder:text-gray-400"
            autoFocus
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className=" ml-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition "
          >
            <IoClose className="text-2xl text-gray-500" />
          </button>
        </div>

        {/* Suggestions */}
        <div className="max-h-96 overflow-y-auto">
          <p className="px-5 py-4 text-sm text-gray-500">
            Start typing to search...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
