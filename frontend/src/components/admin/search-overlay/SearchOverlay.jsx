import React, { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchOverlay = ({
  products,
  open,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;

    return products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-200 flex justify-center items-start pt-8 md:pt-16 px-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold">
            Search Products
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Search */}

        <div className="p-5">
          <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
            <FiSearch size={20} className="text-gray-500" />

            <input
              autoFocus
              type="text"
              placeholder="Search product..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Results */}

        <div className="max-h-100 overflow-y-auto">

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No matching products.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 transition text-left"
              >
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image_urls?.[0]}`}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </button>
            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default SearchOverlay;