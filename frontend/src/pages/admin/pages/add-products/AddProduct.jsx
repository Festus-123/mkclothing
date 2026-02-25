import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { FaTimes } from 'react-icons/fa';

const AddProduct = () => {
  const [imageFile, setImageFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    discount: 0,
  });

  // console.log(preview, "preview")
  // console.log("imageFile", imageFile);

  const handleImage = async (e) => {
    const files = Array.from(e.target.files);

    if (!files && files.length > 3) return;

    setImageFile(files);

    const previewUrl = files.map((file) => URL.createObjectURL(file));

    setPreview(previewUrl);
  };

  const handleRemoveImagePreview = (indexToRemove) => {
    setImageFile((prev) => prev.filter((_, index) => index !== indexToRemove));

    setPreview((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  // console.log(preview.length)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrls = [];

    if (imageFile.length > 0 && preview.length <= 3 && preview.length > 0) {
      for (const file of imageFile) {
        const fileName = `${Date.now()}-${file.name}`;

        console.log('file', file);

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (uploadError) {
          toast.error(uploadError.message);
          console.log('error message', uploadError.message);
          return;
        }

        // const { data } = supabase.storage
        //   .from('product-images')
        //   .getPublicUrl(fileName);

        imageUrls.push(fileName);
      }
    }else {
      toast.error("maximum of 3 images")
      return;
    }

    const { error } = await supabase
      .from('products')
      .insert({ ...newProduct, image_urls: imageUrls })
      .single();

    if (error) {
      console.error('error adding task', error.message);
      toast.error('failed to add product');
      return;
    }

    toast.success('succesfully added task');

    setNewProduct({
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      discount: 0,
    });
    setImageFile([]);
    setPreview([]);
  };

  // useEffect(() => {
  //   preview.length > 3 ? toast.error("maximum of 3 images") : null;
  // }, [preview]);

  return (
    <div className="flex flex-col gap-10 h-full p-4">
      <h1 className="text-lg md:text-2xl text-amber-800">Add Product</h1>
      <div className=" md:w-[80%] w-full flex flex-col items-end place-self-center">
        <div className="max-h-full p-4 md:p-6 bg-[#8080800a] rounded-lg shadow-md w-full">
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
                    setNewProduct((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
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
              <legend className="">Products Images*</legend>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImage}
                className="w-full p-2 h-30 outline-none"
              />
              <div className="grid grid-cols-2 md:grid-cols-6 p-2 gap-5 overflow-y-auto">
                {preview.map((src, index) => (
                  <div key={index} className="relative">
                    <div
                      onClick={() => handleRemoveImagePreview(index)}
                      className="flex items-center justify-center rounded-full p-1 cursor-pointer text-red-400 bg-amber-50 text-sm absolute right-2 top-2"
                    >
                      <FaTimes />
                    </div>
                    <img
                      src={src}
                      alt="preview"
                      className=" object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="p-2 md:p-3 bg-amber-400 w-20  md:w-40 cursor-pointer hover:opacity-60 my-1"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
