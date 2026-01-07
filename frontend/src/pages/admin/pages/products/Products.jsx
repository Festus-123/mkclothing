import React from 'react';
// import styles from './Products.module.css';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import DisplayProducts from '../display-products/DisplayProducts';

const Products = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="">
        <div
          title="add new products"
          onClick={() => navigate('/dashboard/products/add')}
          className=""
        >
          <FiPlus color="white" size={24} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
