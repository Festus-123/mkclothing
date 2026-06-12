import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabse/supabaseClient';
import { toast } from 'sonner';
import {
  FaTshirt,
  FaShoePrints,
  FaArrowRight,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { GiClothes, GiArmorVest } from 'react-icons/gi';

const CollectionItems = ({ mapLenght = 50 }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [lenght] = useState(mapLenght)

  const categories = [
    { name: 'Jackets', icon: GiClothes },
    { name: 'cargo pants', icon: GiArmorVest },
    { name: 'Tops', icon: FaTshirt },
    { name: 'sport wears', icon: FaShoePrints },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { error, data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        // console.log(data);
        setProducts(data);
      }
    } catch (error) {
      console.error('error message in display', error.message);
      toast.error("Can't seem to connect to server", { id: 'fetch error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      {/* Collections */}
      <div className="w-full h-full flex flex-col gap-8 items-center justify-center mt-20 p-4 md:p-8">
        {/* Categories */}

        {/* nav */}
        <div className="relative w-full flex flex-wrap items-center justify-between gap-10 text-[#8b4a1f]">
          {/* title */}
          <h1 className="text-[#8b4a1f] italic text-xl tracking-tight border-b-2 border-orange-700">
            Collections
          </h1>

          <div className="relative flex items-cener gap-4 ">
            {/* Search bar */}
            <div className="relative border border-amber-950/80 rounded-lg w-full md:w-sm">
              <input
                type="text"
                placeholder="Search...."
                className="p-2  border-none outline-none"
              />

              <div className="absolute top-1/4 right-2">
                <FaSearch />
              </div>
            </div>

            {/* button to hde and show categories filter */}
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="text-xs border border-[#8b4a1f] p-3 rounded-lg hover:scale-105 cursor-pointer"
            >
              {showCategory ? <FaX /> : <FaFilter />}
            </button>

            {/* categories navigation*/}
            {showCategory && (
              <div className="flex flex-col absolute top-full right-0 z-10 rounded-lg bg-white/40 backdrop-blur-md p-4  items-end justify-between gap-4 mt-4 group-hover:-trnalate-y-5 transition-all duration-300">
                {categories.map((category, index) => {
                  let Icon = category.icon;
                  return (
                    <div
                      key={index}
                      className="border p-3 rounded-lg hover:scale-105 cursor-pointer text-xs flex items-center gap-1 grow group-hover:translate-y-1 transition-all duration-300"
                    >
                      <Icon />
                      {category.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* category items */}
        {loading ? (
          <div className="w-full h-145 bg-gray-200/40 rounded-lg animate-pulse flex items-center justify-center">
            <h1 className="flex items-center gap-4">
              <span>Loading collections</span>
              <span className="border border-t-blue-300 border-b-gray-500 animate-spin p-2 rounded-full"></span>
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
            {products.slice(0, mapLenght).map((item, index) => (
              <div key={index} className="relative flex flex-col gap-2 group min-h-90">
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[0]}`}
                  alt={item.name}
                  loading="lazy"
                  className="w-full max-h-75 object-cover rounded-lg shadow-md group-hover:-translate-y-2 transition-all duration-300"
                />
                <h2 className="text-lg font-semibold mt-2 group-hover:-translate-y-3 transition-all duration-300 flex justify-between ">
                  <span>{item.name}</span>
                  <span className="text-xs italic text-gray-700">
                    {item.quantity}
                  </span>
                </h2>
                <p className="text-gray-500 text-xs md:text-sm group-hover:-translate-y-5 transition-all duration-300">
                  {item.description}
                </p>
                <p className="w-full flex items-center justify-between group-hover:-translate-y-5 transition-all duration-300">
                  <span className=" italic text-xs flex flex-wrap">
                    {/* Main price */}
                    <span className="font-bold">
                      ${item.price.toFixed(2)}USD
                    </span>
                    {/* Discounted price */}
                    {item.discount > 0 && (
                      <span className="line-through text-gray-400 ml-2">
                        ${(item.price * (1 + item.discount)).toFixed(2)}USD
                      </span>
                    )}
                  </span>
                </p>
                <button className="absolute top-2 right-2 bg-white/80 group-hover:bg-white text-sm py-2 px-4 cursor-pointer rounded-md group-hover:-translate-y-2 transition-all duration-300">
                  Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default CollectionItems;
