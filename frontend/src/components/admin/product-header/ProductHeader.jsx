import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus, FiX } from 'react-icons/fi';

const ProductHeader = ({ products = [], onOpenSearch }) => {
  return (
    <section className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your store inventory
          <span className="ml-2 font-semibold text-amber-700">
            ({products.length} Products)
          </span>
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <div 
            className="w-full flex items-center gap-4 rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100 cursor-pointer"
            onClick={onOpenSearch} >
            <FiSearch />

            <span>Search products...</span>
          </div>
        </div>

        {/* Add Product */}
        <Link
          to="/dashboard/add-product"
          className=" flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 font-medium transition whitespace-nowrap"
        >
          <FiPlus size={18} />
          Add Product
        </Link>
      </div>
    </section>
  );
};

export default ProductHeader;
