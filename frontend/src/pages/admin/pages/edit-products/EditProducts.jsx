import React, { useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FiX } from 'react-icons/fi';

const EditProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productData } = location.state || {};
  const [product, setProduct] = useState(productData);
  const [originalProduct] = useState(productData);
  const [previewImages, setPreviewImages] = useState(product.image_urls || []);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (id) => {
    setLoading(true);
    const toastId = toast.loading('Editing product...');

    let updatedImagePaths = [...product.image_urls];

    try {
      if (newImages.length > 0) {
        await supabase.storage
          .from('product-images')
          .remove(product.image_urls);

        updatedImagePaths = [];

        for (const file of newImages) {
          const fileName = `${Date.now()}-${file.name}`;

          const { error } = await supabase.storage
            .from('product-images')
            .upload(fileName, file);

          if (error) throw error;

          updatedImagePaths.push(fileName);
        }
      }

      const { error } = await supabase
        .from('products')
        .update({ ...product, image_urls: updatedImagePaths })
        .eq('id', id);

      if (error) throw error;

      const { error: logError } = await supabase.from('products_logs').insert({
        action: 'updated',
        product_id: product.id,
        details: `updated ${originalProduct.name} to ${product.name} with quantity ${originalProduct.quantity} to ${product.quantity}, price at ${originalProduct.price.toLocaleString()} to ${product.price.toLocaleString()}, and discount ${originalProduct.discount} to ${product.discount} at ${new Date().toLocaleString()}`,
      });

      if (logError) throw logError;

      setLoading(false);
      toast.success('Product Item edited successfully', { id: toastId });
      navigate('/dashboard', { state: { refresh: true } });
    } catch (err) {
      console.error(err.message);
      toast.error('Error Editing Product item', { id: toastId });
    }
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error('Maximum of 3 images allowed');
      return;
    }

    setNewImages(files);

    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const removePreview = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    if (newImages.length > 0) {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setProduct((prev) => ({
        ...prev,
        image_urls: prev.image_urls.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-400 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
        {/* Header */}

        <div className="border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>

          <p className="text-gray-500 mt-2">
            Update product information and save your changes.
          </p>
        </div>

        {/* Body */}

        <div className="max-h-[75vh] overflow-y-auto p-8 space-y-8">
          {/* Product Information */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Product Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={product.description}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name=""
                  id=""
                  value={product.category}
                  onChange={(e) => setProduct((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-300 cursor-pointer transition"
                >
                  <option value="tops">Tops</option>
                  <option value="jackets">Jackets</option>
                  <option value="sport wears">Sports Wears</option>
                  <option value="cargo pants">Cargo Pants</option>
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
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price</label>

                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Discount %
                </label>

                <input
                  type="number"
                  value={product.discount}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      discount: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </section>

          {/* Image section goes here (Part B) */}
          {/* Images */}

          <section className="rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Product Images</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Upload new images to replace the current ones.
                </p>
              </div>

              <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full">
                {previewImages.length}/3 
              </span>
            </div>

            {/* Upload */}

            <label
              htmlFor="edit-product-images"
              className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition"
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

              <h3 className="text-lg font-semibold mt-4">
                Replace Product Images
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Click here to choose up to 3 new images.
              </p>

              <input
                id="edit-product-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>

            {/* Preview */}

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden border border-gray-200 group"
                  >
                    <img
                      src={
                        image.startsWith('blob:')
                          ? image
                          : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${image}`
                      }
                      alt=""
                      className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                    />

                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-red-700 hover:bg-red-500 hover:text-white transition"
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

        <div className="border-t border-gray-200 bg-gray-50 px-8 py-5 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => handleEdit(product.id)}
            className="px-8 py-3 rounded-xl bg-amber-50 hover:bg-amber-100/50 border border-amber-200 hover:border-amber-300/50 text-black cursor-pointer transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
