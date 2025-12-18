import React, { useState, useEffect } from "react";
import styles from "./EditProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProduct, getProductById, clearProductState } from "../../../../redux/slices/productsSlice";
import { FaTag, FaListAlt, FaDollarSign, FaImage } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";

const EditProducts = () => {
  const { id } = useParams();
  console.log("id",id)

  const dispatch = useDispatch();
  const { product, loading, error, success } = useSelector((state) => state.products)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    oldPrice: "",
    quantity: "",
  });

  const [images, setImages] = useState([]);

  // Fetch product by ID
  useEffect(() => {
    // if(id) return;
    dispatch(getProductById(id))
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        quantity: product.quantity,
      });
    }
  }, [product])

  // Handle Text Fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image File Upload
  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Images (optional)
    images.forEach((img) => data.append("images", img));

    dispatch(updateProduct(id, data));
  };

  useEffect(() => {
    if(success){
      dispatch(clearProductState())
    }
  }, [success, dispatch])

  if (loading || !product) return <p>Loading product...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Product</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Existing Image Preview */}
        <div className={styles.previewContainer}>
          <div className={styles.imagesContainer}>
            {product.images.map((img, index) => (
              <img key={index} src={img} alt="preview" className={styles.preview} />
            ))}
          </div>

          <div className={styles.importImage}>
            <FaImage className={styles.icon} />
            <input type="file" multiple accept="image/*" onChange={handleImages} />
          </div>
        </div>

        {/* Name */}
        <div className={styles.inputGroup}>
          <FaTag className={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className={styles.description}>
          <FaListAlt className={styles.icon} />
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Category + Quantity */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
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
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Old Price */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <FaDollarSign className={styles.icon} />
            <input
              type="number"
              name="oldPrice"
              required
              value={formData.oldPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* New Price */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <FaDollarSign className={styles.icon} />
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className={styles.submitBtn}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
