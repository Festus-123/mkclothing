import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from "sonner"
import { Link, useLocation } from "react-router-dom";
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
  const [close, setClose] = useState(false)
  const [id, setId] = useState()
  // const [loading, setLoading] = useState(false)
  // const [newValues, setNewValues] = useState({})


  const fetchProducts = async () => {

    // setLoading(true)

    const { error, data } = await supabase
      .from('products')
      .select("*")
      .order('created_at', { ascending: true });


      
      console.log("working successfuly");

    if (error) {
      console.error('error message', error.message);
      // setLoading(false)
      return;
    }

    setProducts(data);
    // setLoading(false)
  };

  const handleDelete = async (id) => {

    const { error } = await supabase.from("products").delete().eq("id", id)

    setClose(false)
    
    if(error) {
      console.error("error deleting proucts", error.message)
      return;
    }

    console.log("i worked the way you wanted")
    toast.error("product deleted successfully")
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    // container
    <div
      className="w-full p-4 flex flex-col gap-10">
      <h1 className='text-lg md:text-4xl text-white'>Products</h1>

    { close && <Confirm close={() => setClose(false)} onClick={() => handleDelete(id)}/>}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-2 border rounded-xl border-white items-center justify-center'>
      { 
      products.map((item, key) => (
        <div 
          key={key}
          className="flex flex-col items-center gap-3 border border-white p-2 rounded-xl">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
          <p>{item.discount}</p>
          <p
            onClick={() =>  {
              setClose(true)
              setId(item.id)
            }} 
            className='text-red-600 cursor-pointer bg-white p-1 rounded-xl'>
              DELETE
          </p>
          <ProductItem 
            product={item} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
