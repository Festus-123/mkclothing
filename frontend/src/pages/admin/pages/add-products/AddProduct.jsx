import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { FaTimes, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const AddProduct = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    discount: 0,
  });

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
    const toastId = toast.loading('Adding product...');

    let imageUrls = [];

    try {
    if (imageFile.length > 0 && preview.length <= 3 && preview.length > 0) {
      for (const file of imageFile) {
        const fileName = `${Date.now()}-${file.name}`;

        console.log('file', file);

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (uploadError) {
          toast.error(uploadError.message, { id: toastId });
          console.log('error message', uploadError.message);
          return;
        }

        imageUrls.push(fileName);
      }
    } else {
      toast.error('maximum of 3 images', { id: toastId });
      return;
    }

    const { error, data } = await supabase
      .from('products')
      .insert({ ...newProduct, image_urls: imageUrls })
      .single();

    if (error) {
      console.error('error adding task', error.message);
      toast.error('failed to add product', { id: toastId });
      return;
    }

    const { error: createdErrorLog } = await supabase
      .from('products_logs')
      .insert({
        action: 'created',
        product_id: data?.id,
        details: `created ${newProduct.name} with quantity ${newProduct.quantity}, and price at ${newProduct.price.toLocaleString()} and discount ${newProduct.discount} at ${new Date().toLocaleString()}`,
      })
      .order('created_at', { ascending: true });

    if (createdErrorLog) {
      console.error('Create Log error', createdErrorLog.message);
      return;
    }

    toast.success('succesfully added task', { id: toastId });

    setNewProduct({
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      discount: 0,
    });
    setImageFile([]);
    setPreview([]);
  } catch (err) {
    console.error('error adding product', err.message);
    toast.error('failed to add product', { id: toastId });
  }};

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-2 backdrop-blur-md">
      <div className="flex flex-col bg-white/90 rounded-xl p-4 w-full md:w-[60%] gap-2">
        <h1 className="text-lg md:text-2xl text-amber-600">Add Product</h1>
        <div className="w-full flex flex-col">
          <div className="px-2 py-6 w-full">
            <Slider {...settings}>
              <div className="flex flex-col add-slider w-full text-black/90">
                <fieldset className="border rounded-lg border-black/60">
                  <legend className="px-2 ">Product Name*</legend>
                  <input
                    type="text"
                    value={newProduct.name}
                    name=""
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full p-2 outline-none"
                  />
                </fieldset>

                <fieldset className="border rounded-lg w-full border-black/60">
                  <legend className="px-2 ">Product Description*</legend>
                  <textarea
                    type="text"
                    value={newProduct.description}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-black/90">
                  <fieldset className="border rounded-lg border-black/60">
                    <legend className="px-2 ">Quntity*</legend>
                    <input
                      type="number"
                      value={newProduct.quantity}
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
                  <fieldset className="border rounded-lg border-black/60">
                    <legend className="px-2 ">Price*</legend>
                    <input
                      type="number"
                      value={newProduct.price}
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
                  <fieldset className="border rounded-lg border-black/60">
                    <legend className="px-2 ">Discount (if any)*</legend>
                    <input
                      type="number"
                      value={newProduct.discount}
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
              </div>

              <div className="">
                <input
                  type="file"
                  value=""
                  accept="image/*"
                  multiple
                  onChange={handleImage}
                  className="w-full rounded-xl border border-gray-300 text-gray-500 cursor-pointer p-2 h-10 outline-none"
                />
                <div className="hide-scrollbar flex flex-row p-2 gap-2 mt-4 overflow-x-auto">
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
                        className=" object-cover rounded-xl w-40 h-40 md:w-60 md:h-60 "
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Slider>
          </div>
          <div className="flex flex-row items-center w-full gap-2 py-1 border-t border-gray-400 pt-4">
            <button
              onClick={() => navigate(-1, { state: { refresh: true } })}
              className="rounded-xl p-3 bg-red-400 w-full"
            >
              Go Back
            </button>
            <button
              onClick={handleSubmit}
              className="cursor-pointer rounded-xl p-3 bg-amber-400 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
