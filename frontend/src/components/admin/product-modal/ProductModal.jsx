import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiX,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiPercent,
  FiCalendar,
} from 'react-icons/fi';

import ImagePreviewStrip from '../image-preview-strip/ImagePreviewStrip';

const ProductModal = ({ product, open, onClose, onDelete }) => {
  const location = useLocation();

  if (!open || !product) return null;

  const finalPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="fixed inset-0 z-300 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto">
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 bg-gray-50 rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        >
          <FiX size={22} />
        </button>

        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Images */}

          <div>
            <ImagePreviewStrip images={product.image_urls} alt="" />
          </div>

          {/* Details */}

          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {product.name}
              </h1>

              <p className="text-gray-500 mt-2">Product #{product.id}</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Current Price</p>

                <h2 className="text-4xl font-bold text-amber-600">
                  ₦{finalPrice.toLocaleString()}
                </h2>

                {product.discount > 0 && (
                  <p className="line-through text-gray-400">
                    ₦{product.price.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border p-4">
                  <FiPackage className="mb-2" />
                  <p className="text-sm text-gray-500">Quantity</p>

                  <h3 className="font-semibold">{product.quantity}</h3>
                </div>

                <div className="rounded-xl border p-4">
                  <FiPercent className="mb-2" />
                  <p className="text-sm text-gray-500">Discount</p>

                  <h3 className="font-semibold">{product.discount}%</h3>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>

              <p className="text-gray-600 leading-7">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="border rounded-xl p-4">
                <FiCalendar className="mb-2" />
                <p className="text-gray-500">Created</p>

                <p>{new Date(product.created_at).toLocaleDateString()}</p>
              </div>

              <div className="border rounded-xl p-4">
                <FiCalendar className="mb-2" />
                <p className="text-gray-500">Updated</p>

                <p>
                  {new Date(
                    product.updated_at ?? product.created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}

            <div className="flex gap-3 pt-5 border-t">
              <button
                onClick={() => onDelete(product)}
                className="flex-1 py-3 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 flex justify-center items-center gap-2"
              >
                <FiTrash2 />
                Delete
              </button>

              <Link
                to={`/dashboard/products/${product.id}/edit`}
                state={{
                  backgroundLocation: location,
                  productData: product,
                }}
                className="flex-1 py-3 rounded-xl bg-amber-50 hover:bg-amber-100/50 text-black border border-amber-200 hover:border-amber-300/50 flex justify-center items-center gap-2"
              >
                <FiEdit2 />
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
