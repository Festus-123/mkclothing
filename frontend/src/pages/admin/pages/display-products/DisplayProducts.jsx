import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { Link, useLocation } from 'react-router-dom';
import Confirm from '../../../../components/confirm/Confirm';
import { FiSearch, FiX } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Placeholder from '../../../../components/admin/Placeholder';
import {
  RIgthArrow,
  LeftArrow,
} from '../../../../components/admin/arrows/Arrow';

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
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [close, setClose] = useState(false);
  const [product, setProduct] = useState();
  const [recent, setRecent] = useState([]);
  const [older, setOlder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [imgIndex, setImgIndex] = useState({});

  const fetchProducts = async () => {
    const { error, data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

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

    setLoading(false);
    setRecent(sortedRecent);
    setOlder(sortedOlder);
    setProducts(data);
  };

  const handleDelete = async (product) => {
    const toastId = toast.loading('Deleting product...');

    try {
      if (product.image_urls?.length > 0) {
        await supabase.storage
          .from('product-images')
          .remove(product.image_urls);
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) {
        toast.error('Failed to delete product', { id: toastId });
        console.error('error deleting proucts', error.message);
        return;
      }

      const { error: deletedErrorLog } = await supabase
        .from('products_logs')
        .insert({
          action: 'deleted',
          product_id: product.id,
          details: `deleted ${product.name} with quantity ${product.quantity}, price at ${product.price.toLocaleString()}, and discount ${product.discount} at ${new Date().toLocaleString()}`,
        })
        .order('created_at', { ascending: true })
        .eq();

      if (deletedErrorLog) {
        console.error('error message in display', deletedErrorLog.message);
        return;
      }

      setClose(false);
      fetchProducts();
      toast.success('product deleted successfully', { id: toastId });
    } catch (err) {
      console.error('error deleting product', err.message);
      toast.error('failed to delete product', { id: toastId });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.state?.refresh]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return <Placeholder />;
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });

    setSearchResult(filteredProducts);
    console.log('Search results', searchResult);
    console.log(searchResult.length);
  };

  const handleCloseSearch = () => {
    setSearching(false);
    setSearchResult([]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: screenWidth >= 768 ? 2 : 1,
    slidesToScroll: screenWidth >= 768 ? 2 : 1,
    adaptiveHeight: true,
    nextArrow: screenWidth > 768 && <RIgthArrow />,
    prevArrow: screenWidth > 768 && <LeftArrow />,
  };

  return (
    // container
    <div className="relative w-full flex flex-col gap-10 bg-black/3 ">
      <div
        className={`w-full flex items-center justify-between  ${searching ? 'flex-col sticky top-18 z-10' : 'flex-row px-4 py-4'}`}
      >
        <h1 className={`text-lg md:text-4xl ${searching && 'hidden'}`}>
          Products
        </h1>
        {/* Search bar */}
        <div
          className={`relative ${searching ? 'w-full h-15 bg-white border-b border-gray-300 rounded-none' : ''} rounded-full`}
        >
          <input
            type="text"
            onClick={() => setSearching(true)}
            onChange={handleSearch}
            placeholder="Search products..."
            className={`outline-none bg-[#d9b1b10c] w-full h-full ${!searching && 'hidden'} rounded-full py-1 md:py-2 px-4 text-sm md:text-base`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {searching ? (
              <FiX
                size={16}
                onClick={handleCloseSearch}
                className="cursor-pointer"
              />
            ) : (
              <FiSearch className="" onClick={() => setSearching(true)} />
            )}
          </div>
        </div>
        {/* Search Results */}
        {searchResult.length > 0 && searching && (
          <div className="w-full flex flex-col bg-white rounded-lg shadow-xs max-h-100 md:max-h-80 overflow-scroll hide-scrollbar absolute top-15">
            {searchResult.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedId(item.id)}
                className=" flex flex-row items-center justify-between px-2 md:px-4 py-1 md:py-2 hover:bg-gray-100 border-gray-200 p-2"
              >
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[0]}`}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-1 max-w-[80%] md:max-w-full">
                    <p>{item.name}</p>
                    <p className="font-light text-xs md:text-sm">
                      {item.description}{' '}
                      <span>
                        {' '}
                        <i className="text-xs">{`₦${item.price}`}</i>{' '}
                      </span>{' '}
                    </p>
                    {selectedId === item.id && (
                      <div className="flex flex-row items-center gap-10 p-1">
                        <p
                          className="text-red-500 text-sm cursor-pointer"
                          onClick={() => {
                            setClose(true);
                            setProduct(item);
                          }}
                        >
                          {' '}
                          Delete{' '}
                        </p>
                        <div className="text-sm">
                          <ProductItem product={item} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <FiX className="cursor-pointer" size={10} />
              </div>
            ))}
          </div>
        )}
        <div
          className={`flex items-center justify-end text-gray-300 text-sm p-2 z-10 absolute top-1/2 right-5 ${!searching && 'hidden'}`}
        >
          <p>
            {searchResult.length === 0
              ? 'No "items" found'
              : `Found ${searchResult.length} items`}
          </p>
        </div>
      </div>

      {close && (
        <Confirm
          close={() => setClose(false)}
          onClick={() => handleDelete(product)}
        />
      )}

      <div className="flex flex-col gap-10 overflow-x-hidden px-2 md:px-8">
        <h1 className={`text-sm md:text-xl p-2`}>Recent</h1>
        <div className="">
          {recent.length === 0 && <Placeholder />}
          <Slider key={screenWidth} {...settings} className="">
            {recent?.map((item, key) => (
              <div
                key={key}
                className="relative flex flex-col rounded-xl bg-white border border-gray-500 h-130 md:h-130 md:max-h-130 p-2"
              >
                {item.image_urls?.length > 0 && (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[imgIndex[item.id] ?? 0]}`}
                    alt={item.name}
                    className="w-full h-[60%] md:h-[70%] object-cover rounded-xl"
                  />
                )}
                <div className="flex flex-row flex-wrap gap-1 p-2 items-center">
                  <h1 className="text-sm font-bold  text-amber-900">
                    {item.name}
                  </h1>
                  <p className="text-xs md:text-sm">{item.description}</p>
                  <p className="text-sm font-medium">{`${item.quantity}~`}</p>
                  <p className="flex gap-5 text-sm font-bold text-amber-900">
                    {' '}
                    <span className="line-through text-gray-300 text-sm">
                      {`₦~ ${item.price.toLocaleString()}`}{' '}
                    </span>{' '}
                    <span className="">{`₦ ${(item.price - (item.price * item.discount) / 100).toLocaleString()}`}</span>{' '}
                  </p>
                  <p
                    className={`text-sm font-medium bg-black/4 ml-3`}
                  >{`${item.discount} % discount`}</p>

                  <div className="flex flex-row items-center gap-3 absolute bottom-5 right-5">
                    <p
                      onClick={() => {
                        console.log(item.discount);
                        setClose(true);
                        setProduct(item);
                      }}
                      className="text-red-600 text-xs cursor-pointer bg-white p-1 rounded-lg"
                    >
                      delete
                    </p>
                    <div className="bg-white py-1 px-4 text-xs text-black rounded-lg">
                      <ProductItem product={item} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                  {item.image_urls.map((img, index) => (
                    <img
                      onClick={() =>
                        setImgIndex((prev) => ({
                          ...prev,
                          [item.id]: index,
                        }))
                      }
                      className={`w-10 h-10 rounded-lg ${(imgIndex[item.id] ?? 0) === index && 'border-2 border-amber-400'}`}
                      src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${img}`}
                      alt={img}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="px-2 md:px-5 flex flex-col gap-10">
          <h1 className="text-sm md:text-xl p-2">3 days ago</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 rounded-xl items-center justify-center">
            {older.length === 0 && (
              <div className="md:col-span-3">
                {' '}
                <Placeholder />{' '}
              </div>
            )}
            {older.map((item, key) => (
              <div
                key={key}
                className="relative flex flex-col rounded-xl bg-white border border-gray-500 h-120 md:h-130 md:max-w-130 p-2"
              >
                {item.image_urls?.length > 0 && (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[imgIndex[item.id] ?? 0]}`}
                    alt={item.name}
                    className="w-full h-[60%] object-cover rounded-xl"
                  />
                )}
                <div className="flex flex-row flex-wrap gap-2 p-2 items-center">
                  <h1 className="text-sm font-bold text-amber-900">
                    {item.name}
                  </h1>
                  <p className="text-xs md:text-sm">{item.description}</p>
                  <p className="text-sm font-medium">{`${item.quantity}~`}</p>
                  <p className="flex gap-5 text-sm font-medium">
                    {' '}
                    <span className="line-through text-gray-300 ">
                      {`₦~ ${item.price.toLocaleString()}`}{' '}
                    </span>{' '}
                    <span className="">{`₦ ${(item.price - (item.price * item.discount) / 100).toLocaleString()}`}</span>{' '}
                  </p>
                  <p
                    className={`text-sm font-medium bg-black/4 ml-3`}
                  >{`${item.discount} % discount`}</p>

                  <div className="flex flex-row items-center gap-3 absolute bottom-5 right-5">
                    <p
                      onClick={() => {
                        setClose(true);
                        setProduct(item);
                      }}
                      className="text-red-600 text-xs cursor-pointer bg-white p-1 rounded-lg"
                    >
                      delete
                    </p>
                    <div className="bg-white py-1 px-4 text-xs text-black rounded-lg">
                      <ProductItem product={item} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                  {item.image_urls.map((img, index) => (
                    <img
                      onClick={() =>
                        setImgIndex((prev) => ({
                          ...prev,
                          [item.id]: index,
                        }))
                      }
                      className={`w-10 h-10 rounded-lg ${(imgIndex[item.id] ?? 0) === index && 'border-2 border-amber-400'}`}
                      src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${img}`}
                      alt={img}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProducts;
