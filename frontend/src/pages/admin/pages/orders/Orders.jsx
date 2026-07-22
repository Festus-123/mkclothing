import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';

import {
  FiRefreshCw,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiX,
  FiDelete,
} from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';
import OrderModal from '../../../../components/admin/order-modal/OrderModal';
import { FaTrashCan } from 'react-icons/fa6';
import Confirm from "../../../../components/confirm/Confirm";
// import OrderDetailsModal from '../../../../components/admin/order-modal/OrderDetailsModal';


const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setRefreshing(true);

      const { data, error } = await supabase
        .from('orders')
        .select(
          `
          *,
          order_items(
            id,
            quantity,
            size,
            price_at_purchase,
            products(
              id,
              name,
              image_urls
            )
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (err) {
      console.error(err.message);
      toast.error('Unable to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

const handleDelete = async (order) => {
  const toastId = toast.loading("Deleting customer order...");

  try {

    // Delete all items belonging to this order first
    const { error: itemsError } = await supabase
      .from("order_items")
      .delete()
      .eq("order_id", order.id);

    if (itemsError) throw itemsError;

    // Delete the order
    const { error: orderError } = await supabase
      .from("orders")
      .delete()
      .eq("id", order.id);

    if (orderError) throw orderError;

    // Remove from local state immediately
    setOrders((prev) =>
      prev.filter((item) => item.id !== order.id)
    );

    // Close modals
    setDeleteOrder(null);
    setIsDelete(false)

    if (selectedOrder?.id === order.id) {
      setSelectedOrder(null);
    }

    toast.success("Customer order deleted successfully.", {
      id: toastId,
    });

  } catch (err) {
    console.error(err);

    toast.error("Unable to delete customer order.", {
      id: toastId,
    });
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  
  const sendProcessingEmail = async (order) => {
    const customerOrderId = `MK- ${order.id.slice(0, 5)}`
    try {
      const res = await fetch(
        'http://localhost:5000/api/emails/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'processing',
            customerEmail: order.customer_email,
            customerName: order.customer_name,
            customerOrderId: customerOrderId,
            totalAmount: order.total_price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success("Customer is being sent a processing Email")
      console.log('Processing email sent.');
    } catch (err) {
      console.error(err.message);

      toast.warning(
        'Order email could not be delivered.'
      );
    }
  };
  
  const sendShippedEmail = async (order) => {
    const customerOrderId = `MK- ${order.id.slice(0, 5)}`
    try {
      const res = await fetch(
        'http://localhost:5000/api/emails/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'shipped',
            customerEmail: order.customer_email,
            customerName: order.customer_name,
            customerOrderId: customerOrderId,
            totalAmount: order.total_price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success("Customer is being sent a Shipment Email")
      console.log('Shipment email sent.');
    } catch (err) {
      console.error(err.message);

      toast.warning(
        'Order email could not be delivered.'
      );
    }
  };
  
  const sendDeliveredEmail = async (order) => {
    const customerOrderId = `MK- ${order.id.slice(0, 5)}`
    try {
      const res = await fetch(
        'http://localhost:5000/api/emails/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'delivered',
            customerEmail: order.customer_email,
            customerName: order.customer_name,
            customerOrderId: customerOrderId,
            totalAmount: order.total_price,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success("Customer is being sent a Delivered Email")
      console.log('Delivered email sent.');
    } catch (err) {
      console.error(err.message);

      toast.warning(
        'Order email could not be delivered.'
      );
    }
  };

  const handleStatusChange = async (order, status) => {
    const toastId = toast.loading("updating order status...")
    try {
      setUpdatingId(order.id);

      const { error } = await supabase
        .from('orders')
        .update({
          status,
        })
        .eq('id', order.id);

      if (error) throw error;

      if (status === 'Processing') {
        await sendProcessingEmail(order);
      } else if( status === "Shipped"){
        await sendShippedEmail(order)
      }else if( status === "Delivered") {
        await sendDeliveredEmail(order)
      }

      toast.success(`Order marked as ${status}`, {id: toastId});

      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      console.log("SelectedOrder", selectedOrder)

      if (selectedOrder?.id === order.id) {
        setSelectedOrder({
          ...selectedOrder,
          status,
        });
      }
    } catch (err) {
      console.error(err.message);

      toast.error('Failed to update order.', {id: toastId});
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <FiClock />
            Pending
          </span>
        );

      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <FiTruck />
            Processing
          </span>
        );

      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-purple-300 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
            <FiCheckCircle />
            Shipped
          </span>
        );

      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            <FiCheckCircle />
            Delivered
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-8 ">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

          <p className="text-gray-500 mt-1">
            Track customer purchases and dispatch workflow.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={refreshing}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm hover:bg-gray-50 transition cursor-pointer"
        >
          <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>
      {/* ===================== Orders Table ===================== */}

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 h-72 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 h-72 flex flex-col items-center justify-center">
          <FaBoxOpen size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No orders yet</p>
          <p className="text-xs text-gray-400">
            Customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 flex-1 mt-8 overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-245 w-full">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Address</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-5 py-5">
                      <div className="font-semibold text-gray-800">
                        MK-{order.id.slice(0, 5).toUpperCase()}
                      </div>

                      <div className="text-xs text-gray-400">
                        {order.order_items.length} item(s)
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="font-semibold">{order.customer_name}</div>

                      <div className="text-xs text-gray-500">
                        {order.customer_email}
                      </div>
                    </td>

                    <td className="px-5 py-5 max-w-xs truncate">
                      {order.delivery_address}
                    </td>

                    <td className="px-5 py-5 font-bold text-amber-700">
                      ₦{order.total_price.toLocaleString()}
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-5">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer flex items-center justify-center"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => {
                            setDeleteOrder(order)
                            setIsDelete(true)
                          }}
                          className='w-10 h-10 text-xs rounded-lg bg-red-50 hover:bg-red-100/50 border border-red-300/50 transition-all cursor-pointer flex items-center justify-center'>
                          <FaTrashCan />
                        </button>

                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(order, e.target.value)
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                        >
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== Order Details Modal ===================== */}

      {selectedOrder && (
        <OrderModal 
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          getStatusBadge={getStatusBadge}/>
      )}

      {isDelete && (
        <Confirm 
          close={() => setIsDelete(false)}
          onClick={() => handleDelete(deleteOrder)}/>
      )}
    </div>
  );
};

export default OrdersManagement;
