import React from 'react'

const AddProduct = () => {
  return (
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-10'>
      {/* title */}
      <h1 className='text-xl md:text-2xl md:col-span-2'>Add Products</h1>

      {/* Product Namee */}
      <div className='flex flex-col gap-3'>
        <label htmlFor="">Product Name</label>
        <input type="text"className=' bg-[#80808028] p-3 rounded-xl ' />
      </div>

      <div className='flex flex-col gap-3 md:col-span-2'>
        <label htmlFor="">Description</label>
        <textarea type="text"className='bg-[#80808028] p-3 rounded-xl ' />
      </div>

      {/* Product Quantity */}
      <div className='flex flex-col gap-3'>
        <label htmlFor="">Price</label>
        <input type="text"className=' bg-[#80808028] p-3 rounded-xl ' />
      </div>

      {/* Product Price */}
      <div className='flex flex-col gap-3'>
        <label htmlFor="">Quantity</label>
        <input type="text"className=' bg-[#80808028] p-3 rounded-xl ' />
      </div>

      {/* Submit */}
      <button
        className='bg-linear-to-b from-orange-300 to-orange-600 p-2 md:p-3 rounded-2xl mt-5 text-white'>
        Submit
      </button>
    </div>
  )
}

export default AddProduct
