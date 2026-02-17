import React from 'react';

const EditProducts = ({
  onClick,
  onChangeName,
  onChangeDescription,
  onChangeQuantiy,
  onChangePrice,
  onChangeDiscount,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-md p-6 w-full md:w-{70%} flex flex-col">
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
            name=""
            onChange={onChangeName}
            className="w-full p-2 outline-none"
          />
        </fieldset>

        <fieldset className="border rounded-lg w-full">
          <legend className="px-2 ">Product Description*</legend>
          <textarea
            type="text"
            name=""
            onChange={onChangeDescription}
            className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Quntity*</legend>
            <input
              type="number"
              name=""
              onChange={onChangeQuantiy}
              className="w-full p-2 outline-none "
            />
          </fieldset>
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Price*</legend>
            <input
              type="number"
              name=""
              onChange={onChangePrice}
              className="w-full p-2 outline-none"
            />
          </fieldset>
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Discount (if any)*</legend>
            <input
              type="number"
              name=""
              onChange={onChangeDiscount}
              className="w-full p-2 outline-none"
            />
          </fieldset>
        </div>
        <button onClick={onClick} className="rounded-2xl p-3 bg-amber-400">
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditProducts;
