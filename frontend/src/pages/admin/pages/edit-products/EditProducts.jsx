import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaPlus } from 'react-icons/fa';

const EditProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productData } = location.state || {};
  const [product, setProduct] = useState(productData);
  const [previewImages, setPreviewImages] = useState(product.image_urls || [])
  const [newImages, setNewImages] = useState([]);

  // console.log("Product data", product.id)

   const handleEdit = async (id) => {

    let updatedImagePaths = product.image_urls;

    if (newImages.length > 0) {
      await supabase.storage.from('product-images').remove(product.image_urls);
      updatedImagePaths = [];

      for (const file of newImages) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (error) {
          toast.error('Failed', error.message);
          return;
        }

        updatedImagePaths.push(fileName);
      }
    }

    const { error } = await supabase
      .from('products')
      .update({ ...product, image_urls: updatedImagePaths })
      .eq('id', id);

    console.log(product.image_urls[0]);
    // console.log(product.description);

    if (error) {
      console.error('error updating task', error.message);
      return;
    }

    toast.success('product edited succesfully');
    // console.log('i am actually working');
    navigate(-1);
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    if(files.length > 3) {
      toast.error("Maximum of 3 images allowed")
      return;
    }
    
    setNewImages(files);

    const previewUrl = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrl)

  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-2  backdrop-blur-md overflow-y-hidden">
      {/* Modal content */}
      <div className="bg-white/90 rounded-xl shadow-md p-6 w-full md:w-[80%] max-h-[90%] md:max-h-max flex flex-col gap-5">
        <div className="w-full">
          <h1 className="font-medium text-xl md:text-2xl text-amber-600">
            Edit Products
          </h1>
        </div>

        {/* <div className='overflow-y-scroll flex flex-col gap-2'> */}
        <div className="flex flex-col gap-5"></div>
        <fieldset className="border rounded-lg md:w-[30%]">
          <legend className="px-2 ">Product Name*</legend>
          <input
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 outline-none"
          />
        </fieldset>

        <fieldset className="border rounded-lg w-full">
          <legend className="px-2 ">Product Description*</legend>
          <textarea
            type="text"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
          />
        </fieldset>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Quntity*</legend>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
              className="w-full p-2 md:p-1 outline-none "
            />
          </fieldset>
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Price*</legend>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              className="w-full p-2 md:p-1 outline-none"
            />
          </fieldset>
          <fieldset className="border rounded-lg">
            <legend className="px-2 ">Discount (if any)*</legend>
            <input
              type="number"
              value={product.discount}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  discount: Number(e.target.value),
                }))
              }
              className="w-full p-2 md:p-2 outline-none"
            />
          </fieldset>
        </div>
        {/* Image preview */}
        <div className="overflow-x-scroll p-2 rounded-xl shadow-2xs flex flex-row items-center gap-5">
          {previewImages?.length > 0 && previewImages.map((fileName, index) => (
            <img
              key={index}
              src={
              fileName.startsWith("blob:") ?
              `${fileName}` :
              `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`}
              alt="preview"
              className="w-30 h-30 md:w-50 md:h-50 object-cover rounded-xl"
            />
          ))}
          <div className="bg-white cursor-pointer flex items-center justify-center shadow-md text-amber-800 text-center w-30 h-30 md:w-50 md:h-50">
            <input
              type="file"
              onChange={handleImage}
              multiple
              className="rounded-xl w-full "
            />
          </div>
        {/* </div> */}
        </div>


        <div className="flex flex-row items-center w-full gap-2 p-y-2 border-t border-gray-400 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl p-3 bg-red-400 w-full"
          >
            Close
          </button>
          <button
            onClick={() => handleEdit(product.id)}
            className="cursor-pointer rounded-xl p-3 bg-amber-400 w-full"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
