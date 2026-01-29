import React from 'react';

const AddProduct = () => {
  return (
    <div className="flex flex-col gap-10 h-full p-4">
      <h1 className="text-lg md:text-2xl">Add Product</h1>
      <div className="max-h-screen p-2 md:p-5  text-gray-600 bg-[#80808018] rounded-lg shadow-xl w-full place-self-center md:w-[80%]">
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
            <legend className="px-2 text-gray-600">Product Description*</legend>
            <textarea
              type="text"
              name=""
              id=""
              className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
            />
          </fieldset>

          <div className="grid drid-cols-1 md:grid-cols-3 gap-2 ">
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
              <legend className="px-2 text-gray-600">Discount (if any)*</legend>
              <input
                type="number"
                name=""
                id=""
                className="w-full p-2 outline-none"
              />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
