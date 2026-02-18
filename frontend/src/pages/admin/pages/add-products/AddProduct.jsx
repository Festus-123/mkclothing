import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    discount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('products').insert(newProduct).single();

    if (error) {
      console.error('error adding task', error.message);
    }

    
    setNewProduct({
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      discount: 0,
    });
    
    toast.success("succesfully added task")
  };

  return (
    <div className="flex flex-col gap-10 h-full p-4">
      <h1 className="text-lg md:text-2xl text-amber-400">Add Product</h1>
      <div className=" md:w-[80%] w-full flex flex-col items-end place-self-center">
        <div className="max-h-full p-4 md:p-6 text-[#ffffffb5] border border-[#ffffff5e] shadow-xs w-full">
          <div className="flex flex-col gap-5">
            <fieldset className="border rounded-lg md:w-[30%]">
              <legend className="px-2 ">Product Name*</legend>
              <input
                type="text"
                name=""
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 outline-none"
              />
            </fieldset>

            <fieldset className="border rounded-lg w-full">
              <legend className="px-2 ">Product Description*</legend>
              <textarea
                type="text"
                name=""
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
              />
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
              <fieldset className="border rounded-lg">
                <legend className="px-2 ">Quntity*</legend>
                <input
                  type="number"
                  name=""
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }
                  className="w-full p-2 outline-none "
                />
              </fieldset>
              <fieldset className="border rounded-lg">
                <legend className="px-2 ">Price*</legend>
                <input
                  type="number"
                  name=""
                  onChange={(e) =>
                    setNewProduct((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="w-full p-2 outline-none"
                />
              </fieldset>
              <fieldset className="border rounded-lg">
                <legend className="px-2 ">Discount (if any)*</legend>
                <input
                  type="number"
                  name=""
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      discount: e.target.value,
                    }))
                  }
                  className="w-full p-2 outline-none"
                />
              </fieldset>
            </div>

            <fieldset className="border rounded-lg">
              <legend className="px-2 ">Products Images*</legend>
              <input
                type="file"
                name=""
                id=""
                className="w-full p-2 h-30 outline-none"
              />
            </fieldset>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="p-2 md:p-3 bg-linear-to-b from-orange-400 to-red-400 text-white w-20  md:w-40 cursor-pointer hover:opacity-60 my-1"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
