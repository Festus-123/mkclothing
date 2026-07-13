import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { FaBoxOpen, FaTruck, FaCheckCircle, FaClock, FaEye } from 'react-icons/fa';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // For viewing order details modal
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Fetch orders along with their nested items and product relations
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            size,
            price_at_purchase,
            products ( name, image_urls )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching admin orders:', error.message);
      toast.error('Failed to load orders snapshot.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast.success(`Order status updated to ${newStatus}`);
      
      // Update local state smoothly
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      toast.error('Failed to alter operational status.');
      console.error('Error updating order status:', error.message);
    } finally {
      setUpdatingId(null);
    }
  };

const getStatusBadge = (status) => {
  const base = "text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ";
  
  let classes = base + "bg-gray-50 text-gray-700";
  
  if (status === 'Pending') classes = base + "bg-amber-50 text-amber-700 border border-amber-200";
  if (status === 'Shipped') classes = base + "bg-blue-50 text-blue-700 border border-blue-200";
  if (status === 'Delivered') classes = base + "bg-green-50 text-green-700 border border-green-200";

  return (
    <span className={classes}>
      {status}
    </span>
  );
};

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50 mt-10">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">ORDER FULFILLMENT</h1>
          <p className="text-xs text-gray-500">Manage client pipeline requests and dispatch confirmations.</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="text-xs bg-white border border-gray-200 p-2 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
        >
          Refresh Feed
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs text-gray-400 italic">Compiling active orders ledger...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-xs text-gray-400 italic">No historical transactions logged.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-100 text-[10px]">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Dest. Details</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* <td className="p-4 font-mono font-bold text-gray-400">#{order.id.slice(0, 8)}</td> */}
                  <td className="p-4 font-mono font-bold text-gray-400">{`MK-${order.id.slice(0, 5).toUpperCase()}`}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{order.customer_name}</div>
                    <div className="text-[11px] text-gray-400">{order.customer_email}</div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-gray-600">{order.delivery_address}</td>
                  <td className="p-4 font-extrabold text-[#8b4a1f]">${order.total_price.toFixed(2)}</td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2 h-full">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 cursor-pointer"
                      title="Inspect Items"
                    >
                      <FaEye />
                    </button>
                    <select
                      disabled={updatingId === order.id}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="p-1.5 border border-gray-200 bg-white rounded-md text-[11px] outline-none focus:border-[#8b4a1f] text-gray-700"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Item Inspection Slide/Modal Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative flex flex-col max-h-[85vh]">
            <h3 className="font-black text-sm text-gray-800 border-b border-gray-100 pb-3 mb-4">
              {/* INSPECTING ORDER #{selectedOrder.id.slice(0, 8)} */}
              INSPECTING ORDER {`MK-${selectedOrder.id.slice(0, 5).toUpperCase()}`}
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {selectedOrder.order_items?.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs">
                  <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    {item.products?.image_urls?.[0] && (
                      <img 
                        src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.products.image_urls[0]}`}
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 truncate">{item.products?.name || 'Unknown Product'}</div>
                    <div className="text-[10px] text-gray-400">Size: <span className="text-gray-700 font-semibold">{item.size}</span> | Qty: {item.quantity}</div>
                  </div>
                  <div className="font-extrabold text-[#8b4a1f]">
                    ${(item.price_at_purchase * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-400">Total Charged: <span className="font-bold text-sm text-[#8b4a1f] block">${selectedOrder.total_price.toFixed(2)}</span></div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-xs font-bold tracking-wide hover:bg-gray-800 cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;