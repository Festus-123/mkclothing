import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { Link, useLocation } from 'react-router-dom';
import Confirm from '../../../../components/confirm/Confirm';
import { FiSearch } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Placeholder from '../../../../components/admin/Placeholder';

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
  const [recent, setRecent] = useState([]);
  const [older, setOlder] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);

    const { error, data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    console.log('working successfuly');

    if (error) {
      console.error('error message in display', error.message);
      setLoading(true);
      return;
    }

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const recentProducts = data.filter((product) => {
      return new Date(product.created_at) >= threeDaysAgo;
    });

    const olderProducts = data.filter((product) => {
      return new Date(product.created_at) < threeDaysAgo;
    });

    const sortedRecent = [...recentProducts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const sortedOlder = [...olderProducts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    console.log('sorted recent', sortedRecent);
    console.log('sorted older', sortedOlder);

    setLoading(false);
    setRecent(sortedRecent);
    setOlder(sortedOlder);
    setProducts(data);
  };

  const handleDelete = async (product) => {
    if (product.image_urls?.length > 0) {
      await supabase.storage.from('product-images').remove(product.image_urls);
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id);

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
    console.log('component mounted  successfully');
  }, []);

  if(loading) {
    return <Placeholder />
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });

    if(query.trim() === "") {
      fetchProducts();
      return;
    }

    setRecent(filteredProducts);
    setOlder([]);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  console.log(products);

  return (
    // container
    <div className="w-full flex flex-col gap-10 overflow-x-hidden">
      <div className="w-full flex flex-row items-center justify-between p-2">
      <h1 className="text-lg md:text-4xl ">Products</h1>
      {/* Search bar */}
      <div className="w-[60%] md:w-[20%] rounded-full relative">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search products..."
          className="outline-none bg-[#9e646421] w-full rounded-full py-1 md:py-2 px-4 text-sm md:text-base"
        />  
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <FiSearch />
        </div>
      </div>
      </div>

      {close && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDelete(product)}
        />
      )}

      <h1 className="text-lg md:text-2xl p-2">Recent</h1>
      <div className="">
        <Slider {...settings} className="">
          {recent.length === 0 && ( <Placeholder /> )}
          {recent?.map((item, key) => (
            <div
              key={key}
              className="relative rounded-xl border-gray-500 h-80 md:h-100 w-full "
            >
              {item.image_urls?.length > 0 && (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[0]}`}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
              )}
              {/* <div className="absolute bottom-0 w-full h-60 bg-black/60 text-white/80 rounded-xl p-4 flex flex-col gap-2">
                <h1 className="text-xl ">{item.name}</h1>
                <p className="text-xs md:text-sm">{item.description}</p>
                <p
                  style={{
                    width: `${item.quantity > 100 ? '100%' : item.quantity < 10 ? '20%' : (item.quantity / 100) * 100}%`,
                  }}
                  className="bg-white/10 "
                >{`${item.quantity}~`}</p>
                <p
                  style={{
                    width: `${item.price >= 100_000 ? '100%' : item.price <= 30_000 ? "50%" : (item.price / 100_000) * 100}%`,
                  }}
                  className="flex gap-5 bg-white/10"
                >
                  {' '}
                  <span className="line-through text-gray-300 ">
                    {`₦~ ${item.price.toLocaleString()}`}{' '}
                  </span>{' '}
                  <span className="">{`₦ ${(item.price - (item.price * item.discount) / 100).toLocaleString()}`}</span>{' '}
                </p>
                <p
                  style={{ width: `${item.discount >= 10 ? item.discount : "20" }%` }}
                  className={`bg-white/10 `}
                >{`${item.discount} %`}</p>

                <div className="flex flex-row items-center gap-3 absolute bottom-5 right-5">
                  <p
                    onClick={() => {
                      console.log(item.discount);
                      setClose(true);
                      setProduct(item);
                    }}
                    className="text-red-600 text-xs cursor-pointer bg-white p-1 rounded-lg"
                  >
                    DELETE
                  </p>
                  <div className="bg-white py-1 px-4 text-xs text-black rounded-lg">
                    <ProductItem product={item} />
                  </div>
                </div>
              </div> */}
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="text-lg md:text-2xl p-2">3 days ago</h1>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-5 p-2 rounded-xl items-center justify-center">
        {older.length === 0 && ( <div className='md:col-span-3'> <Placeholder /> </div> )}
          {older.map((item, key) => (
            <div
              key={key}
              className="relative rounded-xl border-gray-500  h-100 "
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
              <div className="absolute bottom-0 w-full h-60 bg-black/60 text-white/80 rounded-xl p-4 flex flex-col gap-2">
                <h1 className="text-xl ">{item.name}</h1>
                <p className="text-xs md:text-sm">{item.description}</p>
                <p
                  style={{
                    width: `${item.quantity > 100 ? '100%' : item.quantity < 10 ? '20%' : (item.quantity / 100) * 100}%`,
                  }}
                  className="bg-white/10 "
                >{`${item.quantity}~`}</p>
                <p
                  style={{
                    width: `${item.price >= 100_000 ? '100%' : item.price <= 30_000 ? "40%" : (item.price / 100_000) * 100}%`,
                  }}
                  className="flex gap-5 bg-white/10"
                >
                  {' '}
                  <span className="line-through text-gray-300 ">
                    {`₦~ ${item.price.toLocaleString()}`}{' '}
                  </span>{' '}
                  <span className="">{`₦ ${(item.price - (item.price * item.discount) / 100).toLocaleString()}`}</span>{' '}
                </p>
                <p
                  style={{ width: `${item.discount >= 10 ? item.discount : "20" }%` }}
                  className={`bg-white/10 `}
                >{`${item.discount} %`}</p>

                <div className="flex flex-row items-center gap-3 absolute bottom-5 right-5">
                  <p
                    onClick={() => {
                      console.log(item.discount);
                      setClose(true);
                      setProduct(item);
                    }}
                    className="text-red-600 text-xs cursor-pointer bg-white p-1 rounded-lg"
                  >
                    DELETE
                  </p>
                  <div className="bg-white py-1 px-4 text-xs text-black rounded-lg">
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
