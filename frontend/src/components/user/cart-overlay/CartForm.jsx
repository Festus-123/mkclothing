import React from 'react'

const CartForm = ({
    handleCheckout,
    formData,
    handleInputChange,
    checkoutLoading
}) => {
  return (
            <form onSubmit={handleCheckout} className="space-y-2 text-xs">
              <h4 className="font-bold text-gray-500 tracking-tight uppercase text-[10px]">
                Shipping Metadata
              </h4>

              <input
                type="text"
                name="customerName"
                required
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-[#8b4a1f] text-gray-800"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-[#8b4a1f] text-gray-800"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-[#8b4a1f] text-gray-800"
                />
              </div>

              <textarea
                name="address"
                required
                rows="2"
                placeholder="Full Delivery Address..."
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-[#8b4a1f] text-gray-800 resize-none"
              />

              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full py-3 bg-orange-400 text-white font-bold tracking-wider rounded-lg hover:bg-orange-600 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed mt-2"
              >
                {checkoutLoading
                  ? 'Processing Order...'
                  : 'Place Order'}
              </button>
            </form>
  )
}

export default CartForm
