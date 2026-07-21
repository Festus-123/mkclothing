import React, { useState } from 'react';
import { UseCart } from '../../../context/CartContext';
import { supabase } from '../../../supabse/supabaseClient';
import { toast } from 'sonner';
// import { sendOrderConfirmation } from '../../../utils/resend';
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaTimes,
  FaShoppingBag,
} from 'react-icons/fa';
import CartItem from './CartItem';
import CartForm from './CartForm';
// import resend from "../../../utils/resend"

const CartOverlayModal = ({ isOpen, onClose, }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  } = UseCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Checkout Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    try {
      setCheckoutLoading(true);

      // 1. Passwordless Magic Link Enforcer
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!session) {
        // Trigger passwordless magic link registration/login
        const { error: authError } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
            // Redirects them back to the shop page once they click the email link
            emailRedirectTo: window.location.origin + '/collection',
          },
        });

        if (authError) throw authError;

        toast.success('✨ Magic link transmitted!', {
          description:
            'Verify your email inbox to authenticate and complete your order confirmation.',
          duration: 8000,
        });
        return; // Halt placement execution until they return verified
      }

      // 2. Insert into 'orders' table (Includes authenticated user tracking id)
      // 2. Insert into 'orders' table
      const totalAmount = getCartTotal();
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: session.user.id,
            customer_name: formData.customerName,
            customer_email: formData.email,
            customer_phone: formData.phone,
            delivery_address: formData.address,
            total_price: totalAmount,
            status: 'Pending',
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // --- CREATE THE CUSTOM M&K ORDER DISPLAY ID ---
      // Grabs the first 5 characters of the UUID, forces uppercase, and prefixes it
      const customOrderId = `MK-${orderData.id.slice(0, 5).toUpperCase()}`;

      // 3. Map items for 'order_items'
      const orderItemsPayload = cart.map((item) => ({
        order_id: orderData.id, // Keeps the database foreign key intact
        product_id: item.id,
        quantity: item.quantity,
        size: item.size,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsPayload);

      if (itemsError) throw itemsError;

      // 4. Fire the confirmation email using your dedicated Node.js custom backend
      try {
        // Replace with your real backend port/host URL config
        const apiUrl = 'http://localhost:5000/api/emails/send';

        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailType: 'confirmation',
            customerEmail: formData.email,
            customerName: formData.customerName,
            customerOrderId: customOrderId,
            totalAmount: totalAmount
          }),
        });

        const backendData = await res.json();

        if (!res.ok) {
          throw new Error(
            backendData.error || 'Backend failed to dispatch email'
          );
        }

        console.log('Backend confirmation sequence executed:', backendData);
      } catch (emailError) {
        // Graceful safeguard fallback
        console.error('Email delivery route failed:', emailError.message);
      }

      // 5. Copy Custom Order ID to Clipboard with strict focus check & crash safeguards
      try {
        if (navigator.clipboard && document.hasFocus()) {
          await navigator.clipboard.writeText(`${customOrderId}`);
          toast.success('Order logged safely!', {
            description: `Order ID ${customOrderId} has been copied to your clipboard.`,
          });
        } else {
          // Fallback if document isn't focused or clipboard API is missing
          toast.success(`Order logged! ID: ${customOrderId}`);
        }
      } catch (clipboardError) {
        // Prevent clipboard errors from crashing checkout state resets
        console.warn(
          'Clipboard write blocked by browser security:',
          clipboardError.message
        );
        toast.success(`Order logged! ID: ${customOrderId}`);
      }
      
      // Clear state and close modal
      clearCart();
      setFormData({ customerName: '', email: '', phone: '', address: '' });
      onClose();
    } catch (error) {
      console.error('Checkout failed:', error.message);
      toast.error(error.message || 'Failed to complete transaction.');
    } finally {
      setCheckoutLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex justify-end  backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col p-6 animate-slide-in relative overflow-y-auto">
        {/* Header Grid Section */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-orange-500">
            <FaShoppingBag />
            <span className="font-extrabold text-sm tracking-wide">
              YOUR CART ({getCartCount()})
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 cursor-pointer p-1 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Dynamic Items Iteration Scroll Box */}
        <CartItem 
          cart={cart}
          removeFromCart={removeFromCart}
          addToCart={addToCart}/>

        {/* Dynamic Billing Footer Context */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <div className="flex items-center justify-between font-black text-sm text-gray-800">
              <span>Est. Total Amount:</span>
              <span className="text-orange-500 text-base">
                ₦{getCartTotal().toLocaleString()}
              </span>
            </div>

            {/* Order Form Context */}
            <CartForm 
              formData={formData}
              checkoutLoading={checkoutLoading}
              handleCheckout={handleCheckout}
              handleInputChange={handleInputChange}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOverlayModal;
