import React from 'react';

const LitCollectionButton = () => {
  return (
    <div className="flex justify-center mt-6">
      <button className="bg-red-500 text-white text-sm px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition">
        View Collections
        <span className="text-lg">→</span>
      </button>
    </div>
  );
};

export default LitCollectionButton;
