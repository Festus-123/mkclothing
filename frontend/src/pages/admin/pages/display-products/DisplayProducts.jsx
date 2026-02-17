import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import EditProducts from '../edit-products/EditProducts';

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [newValues, setNewValues] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    discount: 0
  })



  const fetchProducts = async () => {

    setLoading(true)

    const { error, data } = await supabase
      .from('products')
      .select("*")
      .order('created_at', { ascending: true });

      
      console.log("working successfuly");

    if (error) {
      console.error('error message', error.message);
      setLoading(false)
      return;
    }

    setProducts(data);
    setLoading(false)
  };

  const handleDelete = async (id) => {

    const { error } = await supabase.from("products").delete().eq("id", id)
    
    if(error) {
      console.error("error deleting proucts", error.message)
      return;
    }

    console.log("i worked the way you wanted")
  }

  const handleEdit = async (id) => {

    const { error, data } = supabase.from("products").update({newProduct: newValues}).eq("id", id)

    setNewValues({
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount
    })

    if(error){
      console.error("error updating task", error.message)
      return
    }

    console.log("i am actually working")
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


      <div className='grid grid-cols-1 md:grid-cols-3 p-2 border rounded-xl border-white items-center justify-center'>
      { loading ? ( <span className='p-4 rounded-full col-span-1 border-white border-b-2 border-r-2 border-l-2 text-center animate-spin'></span> ) :
      products.map((item, key) => (
        <div 
          key={key}
          className="flex flex-col items-center gap-3">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
          <p>{item.discount}</p>
          <p
            onClick={() =>  handleDelete(item.id)} 
            className='text-red-600 cursor-pointer bg-white p-1 rounded-xl'>
              DELETE
          </p>
          <p
            className='text-amber-600 cursor-pointer bg-white p-1 rounded-xl'>
              EDIT
          </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
