import React from 'react';
import { FiBellOff } from 'react-icons/fi';

const EmptyState = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <FiBellOff
          size={36}
          className="text-gray-500"
        />
      </div>

      {/* Title */}
      <h2 className="mt-6 text-xl font-semibold text-gray-900">
        No Announcements Yet
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
        There are currently no announcements available.
        Create announcements to notify customers about
        promotions, important updates, maintenance periods,
        shipping delays, or special events.
      </p>
    </div>
  );
};

export default EmptyState;