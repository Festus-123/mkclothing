import React from 'react';

const AddProduct = () => {
  return (
    <div className="flex flex-col gap-10 h-full p-4">
      <h1 className="text-lg md:text-2xl text-amber-800">Add Product</h1>
      <div className=" md:w-[80%] w-full flex flex-col items-end place-self-center">
        <div className="max-h-full p-2 md:p-4 text-gray-600 border border-[#80808049] shadow-xs w-full">
          <div className="flex flex-col gap-5">
            <fieldset className="border rounded-lg md:w-[30%]">
              <legend className="px-2 text-gray-600">Product Name*</legend>
              <input
                type="text"
                name=""
                id=""
                className="w-full p-2 outline-none"
              />
            </fieldset>

            <fieldset className="border rounded-lg w-full">
              <legend className="px-2 text-gray-600">
                Product Description*
              </legend>
              <textarea
                type="text"
                name=""
                id=""
                className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
              />
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
              <fieldset className="border rounded-lg">
                <legend className="px-2 text-gray-600">Quntity*</legend>
                <input
                  type="number"
                  name=""
                  id=""
                  className="w-full p-2 outline-none "
                />
              </fieldset>
              <fieldset className="border rounded-lg">
                <legend className="px-2 text-gray-600">Price*</legend>
                <input
                  type="number"
                  name=""
                  id=""
                  className="w-full p-2 outline-none"
                />
              </fieldset>
              <fieldset className="border rounded-lg">
                <legend className="px-2 text-gray-600">
                  Discount (if any)*
                </legend>
                <input
                  type="number"
                  name=""
                  id=""
                  className="w-full p-2 outline-none"
                />
              </fieldset>
            </div>

            <fieldset className="border rounded-lg">
              <legend className="px-2 text-gray-600">Products Images*</legend>
              <input
                type="file"
                name=""
                id=""
                className="w-full p-2 h-30 outline-none"
              />
            </fieldset>
          </div>
        </div>
        <button className="p-2 md:p-3 bg-linear-to-b from-orange-400 to-red-400 text-white  w-20 cursor-pointer hover:opacity-60 my-1">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
