import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const EditProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productData } = location.state || {}
  const [product, setProduct] = useState(productData)

  // console.log("Product data", product.id)

  const handleEdit = async (id) => {

    const { error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id);

      console.log(product.name)
      console.log(product.description)

    if (error) {
      console.error('error updating task', error.message);
      return;
    }

    toast.success("product edited succesfully");
    console.log('i am actually working');
    navigate(-1)
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-2  backdrop-blur-md">

      {/* Modal content */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-[80%] flex flex-col gap-5">
        <div className="w-full">
          <h1 className="font-medium text-xl md:text-2xl text-amber-600">
            Edit Products
          </h1>
        </div>

        <div className="flex flex-col gap-5"></div>
        <fieldset className="border rounded-lg md:w-[30%]">
          <legend className="px-2 ">Product Name*</legend>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct((prev) => ({...prev, name: e.target.value})) }
            className="w-full p-2 outline-none"
          />
        </fieldset>

        <fieldset className="border rounded-lg w-full">
          <legend className="px-2 ">Product Description*</legend>
          <textarea
            type="text"
            value={product.description}
            onChange={(e) => setProduct((prev) => ({...prev, description: e.target.value}))}
            className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Quntity*</legend>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => setProduct((prev) => ({...prev, quantity: Number(e.target.value)}))}
              className="w-full p-2 outline-none "
            />
          </fieldset>
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Price*</legend>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct((prev) => ({...prev, price: Number(e.target.value)}))}
              className="w-full p-2 outline-none"
            />
          </fieldset>
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Discount (if any)*</legend>
            <input
              type="number"
              value={product.discount}
              onChange={(e) => setProduct((prev) => ({...prev, discount: Number(e.target.value)}))}
              className="w-full p-2 outline-none"
            />
          </fieldset>
        </div>

        <div className="flex flex-row items-center w-full gap-2 p-y-2 border-t border-gray-400 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl p-3 bg-red-400 w-full"
          >
            Close
          </button>
          <button onClick={() => handleEdit(product.id)} className="cursor-pointer rounded-xl p-3 bg-amber-400 w-full">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
