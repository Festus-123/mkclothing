import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartItem = ({
    cart,
    removeFromCart,
    addToCart
}) => {
  return (
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1">
          {cart.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-gray-400 gap-2 text-xs italic">
              <span>Your basket is completely empty.</span>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100"
              >
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls?.[0]}`}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    Size:{' '}
                    <span className="text-gray-600 font-semibold">
                      {item.size}
                    </span>
                  </p>
                  <span className="text-xs font-black text-orange-400">
                    ₦ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Counter Management Tools */}
                <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-md px-1.5 py-1">
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer text-[10px]"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-xs font-bold text-gray-700 min-w-3 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item, item.size)}
                    className="text-gray-500 hover:text-green-600 cursor-pointer text-[10px]"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
  )
}

export default CartItem
