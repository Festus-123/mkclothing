import React from "react";

const Placeholder = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">

      {/* Image */}

      <div className="h-56 bg-gray-200" />

      {/* Content */}

      <div className="p-5 space-y-4">

        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>

        <div className="flex justify-between items-end">

          <div>
            <div className="h-3 bg-gray-200 rounded w-12 mb-2" />
            <div className="h-7 bg-gray-300 rounded w-24" />
          </div>

          <div>
            <div className="h-3 bg-gray-200 rounded w-10 mb-2" />
            <div className="h-5 bg-gray-300 rounded w-14" />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">

          <div className="h-11 bg-gray-200 rounded-xl" />

          <div className="h-11 bg-gray-200 rounded-xl" />

        </div>

      </div>

    </div>
  );
};

export default Placeholder;