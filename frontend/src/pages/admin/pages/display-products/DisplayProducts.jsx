import React from 'react';
import { useEffect } from 'react';
// import styles from './DisplayProducts.module.css';
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
    <div className="">
      <h2 className="">Products & Collection</h2>
      {loading && <p className="">Loading...</p>}
      {error && <p className="">{error}</p>}

      <div className="">
        {products.map((product) => (
          <div key={product._id} className="">
            <img
              src={
                product.images[0] ||
                'https://via.placeholder.com/300x300?text=No+Image'
              }
              alt={product.name}
              className=""
            />
            <div className="">
              <h3 className="">{product.name}</h3>
              <p className="">{product.description}</p>
              <p className="">${product.price}</p>
              <div className="">
                <FiEdit
                  color="white"
                  size={24}
                  onClick={() =>
                    navigate(`/dashboard/products/edit/${product._id}`)
                  }
                  className=""
                />
                <FiTrash
                  color="white"
                  size={24}
                  onClick={() => navigate()}
                  className=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
