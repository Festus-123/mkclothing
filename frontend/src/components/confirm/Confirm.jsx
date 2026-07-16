import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Confirm = ({ onClick, close }) => {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center px-6 pt-8">


          <h2 className="mt-5 text-2xl font-semibold text-gray-900">
            Delete Product?
          </h2>

          <p className="mt-3 text-center text-sm leading-6 text-gray-500">
            You are about to permanently delete this product from your
            inventory.
            <br />
            <span className="font-medium text-red-500">
              This action cannot be undone.
            </span>
          </p>

        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-3 border-t border-gray-200 p-5">

          <button
            onClick={close}
            className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onClick}
            className="flex-1 rounded-xl bg-red-50 py-3 font-medium text-black transition hover:bg-red-100/50 border cursor-pointer border-red-300 hover:border-red-400"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default Confirm;