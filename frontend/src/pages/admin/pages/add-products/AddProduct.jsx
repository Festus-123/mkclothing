import React, { useState, useEffect } from 'react';
// import styles from './AddProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  clearProductState,
} from '../../../../redux/slices/productsSlice';
import { FaTag, FaListAlt, FaDollarSign, FaImage } from 'react-icons/fa';
import { AiOutlineStock } from 'react-icons/ai';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    oldPrice: '',
    quantity: '',
    sizes: '',
    images: [],
  });

  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        oldPrice: '',
        quantity: '',
        sizes: '',
        images: [],
      });

      setTimeout(() => dispatch(clearProductState()), 1000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearProductState()), 2000);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LIMIT TO 5 IMAGES
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert('You can upload a maximum of 5 images');
      return;
    }

    setFormData({ ...formData, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData.images.forEach((img) => data.append('images', img));
      } else {
        data.append(key, formData[key]);
      }
    });

    dispatch(createProduct(data));
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl">Add New Product</h2>

      {success && <p className="">{success}</p>}
      {error && <p className="">Unable to add product</p>}

      <form className="p-2 grid grid-cols-4 gap-3" onSubmit={handleSubmit}>
        {/* Image Preview */}
        <div className="bg-[#8080801e] p-2 lg:p-4 w-full flex flex-col gap-5 rounded-xl col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 items-center gap-2">
            {formData.images.map((img, index) => (
              <img
                key={index}cd mkclothing
                
                src={URL.createObjectURL(img)}
                alt="preview"
                className="rounded-xl"
              />
            ))}
          </div>

          <div className="flex flex-row items-center gap-5">
            <FaImage className="" />
            <input
              type="file"
              multiple
              accept="image/*"
              className='text-amber-700 text-md'
              onChange={handleImages}
            />
            <p className="text-sm">{formData.images.length} / 5 images</p>
          </div>
        </div>

        <div className="flex flex-row items-center  bg-[#80808020] ">
          <FaTag className="" />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required
            className='border-none outline-none'
            onChange={handleChange}
          />
        </div>

        <div className="">
          <FaListAlt className="" />
          <textarea
            name="description"
            placeholder="Product Description"
            required
            onChange={handleChange}
          />
        </div>

        <div className="">
          <div className="">
            <select name="category" onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className="">
            <AiOutlineStock className="" />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <FaDollarSign className="" />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
