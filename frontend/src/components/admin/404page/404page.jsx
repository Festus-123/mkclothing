import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageError = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PageError;
