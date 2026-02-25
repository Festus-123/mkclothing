import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { Link, useLocation } from 'react-router-dom';
import Confirm from '../../../../components/confirm/Confirm';

function ProductItem({ product }) {
  const location = useLocation();

  return (
    <Link
      to={`/dashboard/products/${product.id}/edit`}
      state={{ backgroundLocation: location, productData: product }}
    >
      Edit
    </Link>
  );
}

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [close, setClose] = useState(false);
  const [product, setProduct] = useState();
  // const [loading, setLoading] = useState(false)
  // const [newValues, setNewValues] = useState({})

  const fetchProducts = async () => {
    // setLoading(true)

    const { error, data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    console.log('working successfuly');

    if (error) {
      console.error('error message in display', error.message);
      // setLoading(false)
      return;
    }

    setProducts(data);
    // setLoading(false)
  };

  const handleDelete = async (product) => {
  if(product.image_urls?.length > 0){
    await supabase.storage.from("product-images").remove(product.image_urls)
  }

    const { error } = await supabase.from('products').delete().eq('id', product.id);

    setClose(false);

    if (error) {
      console.error('error deleting proucts', error.message);
      return;
    }

    console.log('i worked the way you wanted');
    toast.error('product deleted successfully');

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    // container
    <div className="w-full p-4 flex flex-col gap-10">
      <h1 className="text-lg md:text-4xl ">Products</h1>

      {close && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDelete(product)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2 rounded-xl items-center justify-center">
        {products.map((item, key) => (
          <div
            key={key}
            className="relative rounded-xl border-2 border-gray-500  h-120"
          >
            {item.image_urls?.length > 0 && (
              <div className="rounded-xl w-full h-full">
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[0]}`}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
            <div className='absolute bottom-0 w-full h-60 bg-black/60 text-white/80 rounded-xl p-4 flex flex-col gap-2'>
            <h1 className='text-xl '>{item.name}</h1>
            <p>{item.description}</p>
            <p>{item.quantity}</p>
            <p>{ `#~ ${item.price.toLocaleString()}`}</p>
            <p>{`${item.discount} %`}</p>
            <div className='flex flex-row items-center gap-5 place-self-end'>
            <p
              onClick={() => {
                setClose(true);
                setProduct(item);
              }}
              className="text-red-600 cursor-pointer bg-white p-1 rounded-xl"
            >
              DELETE
            </p>
            <div className='bg-white py-1 px-4 text-black rounded-xl '>
            <ProductItem product={item} />
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
