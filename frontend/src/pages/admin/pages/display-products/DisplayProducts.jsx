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
    <div className="flex flex-col gap-5">
      <h2 className="lg:text-xl">Products & Collection</h2>
      {loading && <p className="">Loading...</p>}
      {error && <p className="">{error}</p>}

      <div className='w-full lg:w-[30%] p-1.5 rounded-xl flex flex-row items-center bg-[#80808022]'>
        <div onClick={() => navigate('/dashboard/products/add')} className='bg-green-600 py-2 px-6 text-white rounded-xl cursor-pointer'>
          <FiPlus className=''/>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product._id} className="relative bg-[#80808027] p-2 rounded-xl flex flex-col gap-2">
            <img
              src={
                product.images[0] ||
                'https://via.placeholder.com/300x300?text=No+Image'
              }
              alt={product.name}
              className="w-full h-full rounded-xl"
            />
            <div className="absolute bg-[#00000044] bottom-2 flex flex-col gap-5 p-2 text-white w-[95%] rounded-xl">
              <h3 className="font-medium text-xl lg:text-lg">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
              <p className="">${product.price}</p>
              <div className="flex flex-row items-center absolute gap-2 bottom-2 right-3">
                <FiEdit
                  color=""
                  size={20}
                  onClick={() =>
                    navigate(`/dashboard/products/edit/${product._id}`)
                  }
                  className="cursor-pointer"
                />
                <FiTrash
                  color=""
                  size={20}
                  onClick={() => navigate()}
                  className="cursor-pointer"
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
