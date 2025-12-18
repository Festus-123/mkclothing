import React from 'react';

const MiniCard = ({ title }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-6 py-6 text-center hover:shadow-md transition">
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
          <img src="/assets/stars_filled.svg" alt="star" className="w-5 h-5" />
        </div>
      </div>
      <h4 className="text-sm font-semibold text-orange-700 mb-2">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">
        Handpicked luxurious fabric and exceptional craftsmanship in every piece
        we make
      </p>
    </div>
  );
};

export default MiniCard;
