import React, { useState } from 'react';
// import styles from './ImageCard.module.css';
// import { useDispatch, useSelector } from 'react-redux';
import { FaImage } from 'react-icons/fa';

const ImageCard = () => {
  //   const dispatch = useDispatch();
  //   const { loading, success, error } = useSelector((state) => state.products);

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

  const [preview, setPreview] = useState(false);

  const handleImages = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  return (
    <div>
      {!preview ? (
        <div className="">
          <FaImage className="" />
          <input
            type="file"
            //   multiple
            accept="image/*"
            onChange={handleImages}
          />
        </div>
      ) : (
        <div className="">
          {formData.images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt="preview"
              className=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
