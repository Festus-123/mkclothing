import React from 'react';
import { FiFileText } from 'react-icons/fi';

const EmptyState = ({
    title,
    des
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <FiFileText
          size={36}
          className="text-gray-500"
        />
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {des}
      </p>
    </div>
  );
};

export default EmptyState;