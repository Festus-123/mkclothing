import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPackage, FiPercent } from 'react-icons/fi';

const ProductCard = ({ product, onDelete, onClick }) => {
  const location = useLocation();

  const image =
    product.image_urls?.length > 0
      ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image_urls[0]}`
      : '/placeholder.png';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-amber-300/50 transition-all duration-300">
      {/* Image */}

      <div 
        onClick={onClick}
        className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Quantity */}

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow">
          <FiPackage className="inline mr-1" />
          {product.quantity} left
        </div>

        {/* Discount */}

        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 text-xs flex items-center gap-1 shadow">
            <FiPercent />
            {product.discount}%
          </div>
        )}
      </div>

      {/* Content */}

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h2 className="font-semibold text-lg line-clamp-1">{product.name}</h2>

          <p className="text-gray-500 text-sm line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Price */}

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400">Price</p>

            <h3 className="text-2xl font-bold text-amber-600">
              ₦{Number(product.price).toLocaleString()}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">Product ID</p>

            <p className="font-medium text-sm">#{product.id}</p>
          </div>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-2">
          <Link
            to={`/dashboard/products/${product.id}/edit`}
            state={{
              backgroundLocation: location,
              productData: product,
            }}
            onClick={(e) => e.stopPropagation}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-50 border border-amber-200 hover:border-amber-300/50 hover:bg-amber-100/50 text-black transition"
          >
            <FiEdit2 />
            Edit
          </Link>

          <button
            onClick={(e) => { 
                e.stopPropagation()
                onDelete(product)
            }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 transition"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
