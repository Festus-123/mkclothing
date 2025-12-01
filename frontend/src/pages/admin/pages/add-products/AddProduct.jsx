import React, { useState, useEffect } from 'react';
import styles from './AddProduct.module.css';
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
    // Reset form fields
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      oldPrice: "",
      quantity: "",
      sizes: "",
      images: [],
    });

    // Clear Redux state after 2 seconds
    setTimeout(() => dispatch(clearProductState()), 2000);
  }

  if (error) {
    // Clear Redux state after 2 seconds (keep fields for correction)
    setTimeout(() => dispatch(clearProductState()), 2000);
  }
}, [success, error]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Product</h2>

      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>Unable to add product</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.previewContainer}>
          <div className={styles.imagesContainer}>
            {formData.images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className={styles.preview}
              />
            ))}
          </div>
          <div className={styles.importImage}>
            <FaImage className={styles.icon} />
            <input
              type="file"
              multiple
              accept="image/*"
              required
              onChange={handleImages}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <FaTag className={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required
            onChange={handleChange}
          />
        </div>

        <div className={styles.description}>
          <FaListAlt className={styles.icon} />
          <textarea
            name="description"
            placeholder="Product Description"
            required
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <select name="category" onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <AiOutlineStock className={styles.icon} />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <FaDollarSign className={styles.icon} />
            <input
              type="number"
              name="price"
              required
              placeholder="Price"
              onChange={handleChange}
            />
          </div>
        </div>

        <button className={styles.submitBtn} disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
