import React from "react";
import ProductCard from "../product-card/ProductCard";
import Placeholder from "../placeholder/Placeholder";

const ProductSection = ({
  loading,
  products,
  onDelete,
  onOpenSearch,
  onProductClick
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <Placeholder key={index} />
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-2 max-w-md">
          There are currently no products in your inventory.
          Click the search button or add a new product.
        </p>

        <button
          onClick={onOpenSearch}
          className="mt-6 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition"
        >
          Search Products
        </button>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
        key={product.id}
        onClick={() => onProductClick(product)}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default ProductSection;