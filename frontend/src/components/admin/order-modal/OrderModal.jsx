import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { FiCopy, FiX } from 'react-icons/fi';
import { toast } from 'sonner';

const OrderModal = ({ selectedOrder, setSelectedOrder, getStatusBadge }) => {
  const copyToClipboard = async (item) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${item}`);
        toast.success('Copied to clipboard');
      } else {
        return;
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}

        <div className="px-8 py-6 border-b border-gray-300 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">
              Order MK-
              {selectedOrder?.id
                ? `MK-${selectedOrder.id.slice(0, 5).toUpperCase()}`
                : 'Loading...'}{' '}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {selectedOrder.customer_name}
            </p>
          </div>

          <button
            onClick={() => setSelectedOrder(null)}
            className="p-4 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <FiX />
          </button>
        </div>

        {/* Customer */}

        <div className="grid md:grid-cols-2 gap-6 px-8 py-6 border-b border-gray-300">
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-gray-500 tracking-wider">
              Customer Information
            </h3>

            <p>{selectedOrder.customer_name}</p>
            <p className="italic flex items-center ">
              {selectedOrder.customer_email}{' '}
              <span
                onClick={() => copyToClipboard(selectedOrder.customer_email)}
                className="inline-block bg-gray-100 p-2 rounded-full ml-5 hover:scale-105 cursor-pointer"
              >
                <FiCopy />{' '}
              </span>
            </p>
            <p className="flex items-center">
              {selectedOrder.customer_phone}{' '}
              <span
                onClick={() => copyToClipboard(selectedOrder.customer_phone)}
                className="inline-block bg-gray-100 p-2 rounded-full ml-5 hover:scale-105 cursor-pointer"
              >
                <FiCopy />{' '}
              </span>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-gray-500 tracking-wider">
              Delivery Address
            </h3>

            <p>{selectedOrder.delivery_address}</p>

            <div className="mt-3">{getStatusBadge(selectedOrder.status)}</div>
          </div>
        </div>

        {/* Products */}

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {selectedOrder.order_items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-300 rounded-xl p-4"
            >
              <img
                src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.products.image_urls[0]}`}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.products.name}</h4>

                <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="font-bold text-amber-700 mt-3">
                  ₦{(item.price_at_purchase * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}

        <div className="border-t px-8 py-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>

            <p className="text-2xl font-bold text-amber-700">
              ₦{selectedOrder.total_price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => setSelectedOrder(null)}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
