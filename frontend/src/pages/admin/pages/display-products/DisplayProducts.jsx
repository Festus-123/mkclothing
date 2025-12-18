import React from 'react';
import { useEffect } from 'react';
import styles from './DisplayProducts.module.css';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { fetchProducts } from '../../../../redux/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DisplayProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products & Collection</h2>
      {loading && <p className={styles.success}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.productContainer}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <img
              src={
                product.images[0] ||
                'https://via.placeholder.com/300x300?text=No+Image'
              }
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.details}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>${product.price}</p>
            <div className={styles.updates}>
              <FiEdit color="white" size={24} onClick={() => navigate(`/dashboard/products/edit/${product._id}`)} className={styles.icon}/>
              <FiTrash color="white" size={24} onClick={() => navigate()} className={styles.icon}/>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
