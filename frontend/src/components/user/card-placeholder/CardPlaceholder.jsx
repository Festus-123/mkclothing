import React from 'react';

const CardPlaceholder = () => {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <div className="w-65 h-105 object-cover transition-all duration-700 group-hover:scale-110" />
      </div>

      {/* Product Info */}
      <div className="space-y-2 pt-4">
        <p className="line-clamp-2 text-sm leading-6 text-gray-700"></p>

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold"></span>

          <span className="text-sm text-gray-400 line-through"></span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-red-100 px-2 py-1 text-xs uppercase text-red-700">
            Sale
          </span>

          <span className="bg-gray-100 px-2 py-1 text-xs uppercase">New</span>
        </div>
      </div>
    </div>
  );
};

export default CardPlaceholder;
