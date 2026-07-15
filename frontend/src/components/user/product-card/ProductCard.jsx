import React from 'react';
import { FaCartPlus, FaPlus } from 'react-icons/fa';


const ProductCard = ({ item }) => {
  return (
    <div key={item.id} className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls?.[0]}`}
          alt={item.name}
          className="w-full h-105 object-cover transition-all duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10 cursor-pointer" />

        <button className="absolute bottom-5 right-5 flex h-11 w-11 items-center overflow-hidden rounded-full bg-white shadow-lg transition-all duration-300 hover:w-40 group/button">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center">
            <FaCartPlus className="text-md text-gray-700" />
          </div>

          <span className="whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 -translate-x-2 transition-all duration-300 group-hover/button:translate-x-0 group-hover/button:opacity-100">
            Add to Cart
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2 pt-4">
        <p className="line-clamp-2 text-sm leading-6 text-gray-700">
          {item.name}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">₦{item.price}</span>

          {item.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₦{Math.round(item.price / (1 - item.discount / 100))}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {item.discount > 0 && (
            <span className="bg-red-100 px-2 py-1 text-xs uppercase text-red-700">
              Sale
            </span>
          )}

          <span className="bg-gray-100 px-2 py-1 text-xs uppercase">New</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
