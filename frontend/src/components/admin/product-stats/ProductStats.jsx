import React from 'react';
import {
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
} from 'react-icons/fi';

const ProductStats = ({ products = [] }) => {
  const totalProducts = products.length;

  const inStock = products.filter(
    (item) => item.quantity > 0
  ).length;

  const outOfStock = products.filter(
    (item) => item.quantity <= 0
  ).length;

  const inventoryValue = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      subtitle: 'Products',
      icon: <FiPackage size={22} />,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      title: 'In Stock',
      value: inStock,
      subtitle: 'Available',
      icon: <FiCheckCircle size={22} />,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Out of Stock',
      value: outOfStock,
      subtitle: 'Unavailable',
      icon: <FiXCircle size={22} />,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      title: 'Inventory Value',
      value: `₦${inventoryValue.toLocaleString()}`,
      subtitle: 'Estimated',
      icon: <FiDollarSign size={22} />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-amber-300/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-2 text-gray-800 w-fit">
                  {item.value}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`${item.bg} ${item.color} p-3 rounded-xl`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductStats;