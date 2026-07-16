// import React, { useState } from 'react';
// import { supabase } from '../../../../supabse/supabaseClient';
// import { toast } from 'sonner';
// import { FaTimes, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Slider from 'react-slick';

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState([]);
//   const [preview, setPreview] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     description: '',
//     quantity: 0,
//     price: 0,
//     discount: 0,
//   });

//   const handleImage = async (e) => {
//     const files = Array.from(e.target.files);

//     if (!files || files.length > 3) return;

//     setImageFile(files);

//     const previewUrl = files.map((file) => URL.createObjectURL(file));

//     setPreview(previewUrl);
//   };

//   const handleRemoveImagePreview = (indexToRemove) => {
//     setImageFile((prev) => prev.filter((_, index) => index !== indexToRemove));

//     setPreview((prev) => prev.filter((_, index) => index !== indexToRemove));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   const toastId = toast.loading('Adding product...');
//   let imageUrls = [];

//   try {
//   if (imageFile.length > 0 && preview.length <= 3 && preview.length > 0) {
//     for (const file of imageFile) {
//       const fileName = `${Date.now()}-${file.name}`;

//       console.log('file', file);

//       const { error: uploadError } = await supabase.storage
//         .from('product-images')
//         .upload(fileName, file);

//       if (uploadError) {
//         toast.error(uploadError.message, { id: toastId });
//         console.log('error message', uploadError.message);
//         return;
//       }

//       imageUrls.push(fileName);
//     }
//   } else {
//     toast.error('maximum of 3 images', { id: toastId });
//     return;
//   }

//   if(!newProduct.name.trim() || !newProduct.description.trim() || newProduct.quantity <= 0 || newProduct.price <= 0) {
//     toast.error('Please fill in all required fields with valid values', { id: toastId });
//     setLoading(false);
//     return;
//   }

//   const { error, data } = await supabase
//     .from('products')
//     .insert({ ...newProduct, image_urls: imageUrls })
//     .select()
//     .single();

//   if (error) {
//     console.error('error adding task', error.message);
//     toast.error('failed to add product', { id: toastId });
//     return;
//   }

//   const { error: createdErrorLog } = await supabase
//     .from('products_logs')
//     .insert({
//       action: 'created',
//       product_id: data.id,
//       details: `created ${newProduct.name} with quantity ${newProduct.quantity}, and price at ${newProduct.price.toLocaleString()} and discount ${newProduct.discount} at ${new Date().toLocaleString()}`,
//     })
//     .order('created_at', { ascending: true });

//   if (createdErrorLog) {
//     console.error('Create Log error', createdErrorLog.message);
//     return;
//   }

//   toast.success('succesfully added task', { id: toastId });
//   setLoading(false);
//   setNewProduct({
//     name: '',
//     description: '',
//     quantity: 0,
//     price: 0,
//     discount: 0,
//   });
//   setImageFile([]);
//   setPreview([]);
// } catch (err) {
//   console.error('error adding product', err.message);
//   toast.error('failed to add product', { id: toastId });
// }};

//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrow: true,
//   };

//   return (
//     <div className="fixed inset-0 z-400 bg-black/40 flex items-center justify-center p-2 backdrop-blur-md">
//       <div className="flex flex-col bg-white/90 rounded-xl p-4 w-full md:w-[60%] gap-2">
//         <h1 className="text-lg md:text-2xl text-amber-600">Add Product</h1>
//         <div className="w-full flex flex-col">
//           <div className="px-2 py-6 w-full">
//             <Slider {...settings}>
//               <div className="flex flex-col add-slider w-full text-black/90">
//                 <fieldset className="border rounded-lg border-black/60">
//                   <legend className="px-2 ">Product Name*</legend>
//                   <input
//                     type="text"
//                     value={newProduct.name}
//                     name=""
//                     onChange={(e) =>
//                       setNewProduct((prev) => ({
//                         ...prev,
//                         name: e.target.value,
//                       }))
//                     }
//                     className="w-full p-2 outline-none"
//                   />
//                 </fieldset>

//                 <fieldset className="border rounded-lg w-full border-black/60">
//                   <legend className="px-2 ">Product Description*</legend>
//                   <textarea
//                     type="text"
//                     value={newProduct.description}
//                     name=""
//                     onChange={(e) =>
//                       setNewProduct((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     className="w-full p-2 outline-none min-h-15 max-h-30 font-mono"
//                   />
//                 </fieldset>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-black/90">
//                   <fieldset className="border rounded-lg border-black/60">
//                     <legend className="px-2 ">Quntity*</legend>
//                     <input
//                       type="number"
//                       value={newProduct.quantity}
//                       name=""
//                       onChange={(e) =>
//                         setNewProduct((prev) => ({
//                           ...prev,
//                           quantity: e.target.value,
//                         }))
//                       }
//                       className="w-full p-2 outline-none "
//                     />
//                   </fieldset>
//                   <fieldset className="border rounded-lg border-black/60">
//                     <legend className="px-2 ">Price*</legend>
//                     <input
//                       type="number"
//                       value={newProduct.price}
//                       name=""
//                       onChange={(e) =>
//                         setNewProduct((prev) => ({
//                           ...prev,
//                           price: e.target.value,
//                         }))
//                       }
//                       className="w-full p-2 outline-none"
//                     />
//                   </fieldset>
//                   <fieldset className="border rounded-lg border-black/60">
//                     <legend className="px-2 ">Discount (if any)*</legend>
//                     <input
//                       type="number"
//                       value={newProduct.discount}
//                       name=""
//                       onChange={(e) =>
//                         setNewProduct((prev) => ({
//                           ...prev,
//                           discount: e.target.value,
//                         }))
//                       }
//                       className="w-full p-2 outline-none"
//                     />
//                   </fieldset>
//                 </div>
//               </div>

//               <div className="">
//                 <input
//                   type="file"
//                   value=""
//                   accept="image/*"
//                   multiple
//                   onChange={handleImage}
//                   className="w-full rounded-xl border border-gray-300 text-gray-500 cursor-pointer p-2 h-10 outline-none"
//                 />
//                 <div className="hide-scrollbar flex flex-row p-2 gap-2 mt-4 overflow-x-auto">
//                   {preview.map((src, index) => (
//                     <div key={index} className="relative">
//                       <div
//                         onClick={() => handleRemoveImagePreview(index)}
//                         className="flex items-center justify-center rounded-full p-1 cursor-pointer text-red-400 bg-amber-50 text-sm absolute right-2 top-2"
//                       >
//                         <FaTimes />
//                       </div>
//                       <img
//                         src={src}
//                         alt="preview"
//                         className=" object-cover rounded-xl w-40 h-40 md:w-60 md:h-60 "
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Slider>
//           </div>
//           <div className="flex flex-row items-center w-full gap-2 py-1 border-t border-gray-400 pt-4">
//             <button
//               onClick={() => navigate(-1, { state: { refresh: true } })}
//               className="rounded-xl p-3 bg-red-400 w-full"
//             >
//               Go Back
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="cursor-pointer rounded-xl p-3 bg-amber-400 w-full"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { FiX } from 'react-icons/fi';

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState([]);
  const [preview, setPreview] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    discount: '',
    category: ''
  });

  const updateField = (field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error('Maximum of 3 images.');
      return;
    }

    setImageFile(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreview(previews);
  };

  const handleRemoveImagePreview = (index) => {
    setImageFile((prev) => prev.filter((_, i) => i !== index));

    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      if (
        !newProduct.name.trim() ||
        !newProduct.description.trim() ||
        newProduct.quantity <= 0 ||
        newProduct.price <= 0
      ) {
        toast.error('Please fill in all required fields with valid values', {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      const { error, data } = await supabase
        .from('products')
        .insert({ ...newProduct, image_urls: imageUrls })
        .select()
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
          product_id: data.id,
          details: `created ${newProduct.name} with quantity ${newProduct.quantity}, and price at ${newProduct.price.toLocaleString()} and discount ${newProduct.discount} at ${new Date().toLocaleString()}`,
        })
        .order('created_at', { ascending: true });

      if (createdErrorLog) {
        console.error('Create Log error', createdErrorLog.message);
        return;
      }

      toast.success('succesfully added task', { id: toastId });
      setLoading(false);
      setNewProduct({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        discount: 0,
        category: ""
      });
      setImageFile([]);
      setPreview([]);
    } catch (err) {
      console.error('error adding product', err.message);
      toast.error('failed to add product', { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-400 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Header */}

        <div className="border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>

          <p className="text-gray-500 mt-2">
            Create a new product for your clothing catalogue.
          </p>
        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto p-8 space-y-8">
          {/* Product Information */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Product Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Cargo Trouser"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-300 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={newProduct.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe this product..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:border-amber-300  transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <select name="" id=""
                  value={newProduct.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className='w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-300 cursor-pointer transition'>
                  <option value="tops">Tops</option>
                  <option value="jackets">Jackets</option>
                  <option value="sports">Sports</option>
                  <option value="cargo">Cargo</option>
                </select> 
              </div>
            </div>
          </section>

          {/* Inventory */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Inventory & Pricing</h2>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => updateField('quantity', e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-300  transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price (₦)
                </label>

                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-300  transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Discount (%)
                </label>

                <input
                  type="number"
                  value={newProduct.discount}
                  onChange={(e) => updateField('discount', e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-300  transition"
                />
              </div>
            </div>
          </section>

          {/* Image Upload Card comes in Part B */}
          {/* Images */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Product Images</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Upload up to 3 high-quality product images.
                </p>
              </div>

              <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                {preview.length}/3 Uploaded
              </span>
            </div>

            {/* Upload Area */}

            <label
              htmlFor="product-images"
              className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
                />
              </svg>

              <h3 className="mt-4 text-lg font-semibold">
                Click to upload images
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG or WEBP • Maximum 3 Images
              </p>

              <input
                id="product-images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>

            {/* Preview */}

            {preview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
                {preview.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-2xl border border-gray-200"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-52 object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImagePreview(index)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}

        <div className=" border-t border-gray-200 px-8 py-5 flex justify-end gap-4 bg-gray-50">
          <button
            onClick={() => navigate(-1, { state: { refresh: true } })}
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-amber-50 hover:bg-amber-100/50 border border-amber-200 hover:border-amber-300/50 cursor-pointer text-black font-medium transition disabled:opacity-60"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
