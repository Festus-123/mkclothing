import React from 'react';

const Placeholder = ({ count = 5 }) => {
  return (
    <div className="mt-6 flex flex-col gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-6">
            {/* Left */}
            <div className="flex-1">
              <div className="h-5 w-52 rounded bg-gray-200" />

              <div className="mt-4 h-4 w-full rounded bg-gray-100" />
              <div className="mt-2 h-4 w-5/6 rounded bg-gray-100" />
              <div className="mt-2 h-4 w-2/3 rounded bg-gray-100" />
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-4">
              <div className="h-4 w-24 rounded bg-gray-200" />

              <div className="flex gap-2">
                <div className="h-10 w-10 rounded-xl bg-gray-200" />
                <div className="h-10 w-10 rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Placeholder;