import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Dropdown from '../dropdown/Dropdown';

const DeleteOrderReason = ({ onClick, close }) => {
  const [reason, setReason] = useState(
    'Product is out of stock'
  );

  const reasons = [
    'Product is out of stock',
    'Requested quantity is unavailable',
    'Payment could not be verified',
    'Delivery location is unavailable',
    'Shipping information is incomplete',
    'Customer requested cancellation',
    'Duplicate order detected',
    'Item has been discontinued',
    'Pricing discrepancy',
    'Other administrative reason',
  ];

  const handleProceed = () => {
    onClick(reason);
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-7">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <FaTrashAlt
              className="text-red-600"
              size={24}
            />
          </div>

          <h2 className="mt-5 text-center text-2xl font-semibold text-gray-900">
            Delete Customer Order
          </h2>

          <p className="mt-3 text-center text-sm leading-7 text-gray-500">
            This action permanently removes the order from your
            records.

            <br />

            The customer will automatically receive an email
            explaining why their order was cancelled.
          </p>

        </div>

        {/* Form */}

        <div className="space-y-6 px-8 py-7 overflow-y-auto">

          <Dropdown
            label="Reason for Deletion"
            placeholder="Select a reason"
            value={reason}
            options={reasons}
            onChange={setReason}
          />

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

            <p className="text-sm leading-6 text-amber-800">
              <span className="font-semibold">
                Selected Reason:
              </span>

              <br />

              {reason}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-4 border-t border-gray-200 p-6">

          <button
            type="button"
            onClick={close}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
          >
            Delete & Notify Customer
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteOrderReason;