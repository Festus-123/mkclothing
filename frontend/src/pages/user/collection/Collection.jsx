// import React from 'react';
// import { useState, useEffect } from 'react';
// import { supabase } from '../../../supabse/supabaseClient';
// import { toast } from 'sonner';
// import {
//   FaTshirt,
//   FaShoePrints,
//   FaArrowRight,
//   FaSearch,
//   FaFilter,
// } from 'react-icons/fa';
// import Navbar from '../../../components/user/Navbar/Navbar';
// import FooterMain from '../../../components/user/Footer/FooterMain';
// import { FaX } from 'react-icons/fa6';
// import { GiClothes, GiArmorVest } from 'react-icons/gi';
// import CardPlaceholder from '../../../components/user/card-placeholder/CardPlaceholder';

// const Collection = () => {
//   const [showCategory, setShowCategory] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // const [lenght] = useState(mapLenght)

//   const categories = [
//     { name: "All", icon: GiClothes},
//     { name: 'Jackets', icon: GiClothes },
//     { name: 'cargo pants', icon: GiArmorVest },
//     { name: 'Tops', icon: FaTshirt },
//     { name: 'sport wears', icon: FaShoePrints },
//   ];

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);

//       const { error, data } = await supabase
//         .from('products')
//         .select('*')
//         .order('created_at', { ascending: true });

//       if (error) throw error;

//       if (data) {
//         // console.log(data);
//         setProducts(data);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('error message in display', error.message);
//       toast.error("Can't seem to connect to server", { id: 'fetch error' });
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="overflow-hidden">
//       <Navbar />
//       <section className="flex flex-col gap-4">
//         {/* Collections */}
//         <div className="w-full h-full flex flex-col gap-4 items-start mt-20 p-4 md:p-8">
//           {/* Categories */}

//           {/* nav */}
//           <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 text-[#8b4a1f] border-b border-orange-700 pb-4">
//             {/* title */}
//             <h1 className="text-[#8b4a1f] italic text-xl tracking-tight ">
//               M & K COLLECTIONS
//             </h1>

//             <div className="w-full md:w-auto flex flex-row items-center gap-4 ">
//               {/* Search bar */}
//               <div className="relative border border-amber-950/80 rounded-lg w-full md:w-sm">
//                 <input
//                   type="text"
//                   placeholder="Search...."
//                   className="p-2  border-none outline-none"
//                 />

//                 <div className="absolute top-1/4 right-2">
//                   <FaSearch />
//                 </div>
//               </div>

//               {/* button to hde and show categories filter */}
//               <button
//                 onClick={() => setShowCategory(!showCategory)}
//                 className="text-xs border border-[#8b4a1f] p-3 rounded-lg hover:scale-105 cursor-pointer"
//               >
//                 {showCategory ? <FaX /> : <FaFilter />}
//               </button>
//             </div>

//           </div>
//             {/* categories navigation*/}
//             {showCategory && (
//               <div className="flex flex-row flex-wrap items-center justify-center  gap-2 md:gap-4 group-hover:-trnalate-y-5 transition-all duration-300">
//                 {categories.map((category, index) => {
//                   let Icon = category.icon;
//                   return (
//                     <div
//                       key={index}
//                       className=" border border-amber-950/80 text-[#8b4a1f] p-2 rounded-full hover:scale-105 cursor-pointer text-xs flex items-center gap-1 group-hover:translate-y-1 transition-all duration-300"
//                     >
//                       <Icon />
//                       {category.name}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//           {/* category items */}
//           {loading ? (
//             <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-center place-items-center">
//               {[
//                 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
//                 19, 20, 21, 22, 23, 24,
//               ].map((index) => (
//                 <CardPlaceholder key={index} />
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 ">
//               {products.slice().map((item, index) => (
//                 <div
//                   key={index}
//                   className="relative flex flex-col gap-2 group min-h-40"
//                 >
//                   <img
//                     src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${item.image_urls[0]}`}
//                     alt={item.name}
//                     loading="lazy"
//                     className="w-full h-40 object-cover rounded-lg shadow-md group-hover:-translate-y-2 transition-all duration-300"
//                   />
//                   <h2 className="text-sm md:text-sm font-bold mt-2 group-hover:-translate-y-3 transition-all duration-300 flex justify-between ">
//                     <span>{item.name}</span>
//                     <span className="text-xs italic text-gray-700">
//                       {item.quantity}
//                     </span>
//                   </h2>
//                   {/* <p className="text-gray-500 text-xs md:text-sm group-hover:-translate-y-5 transition-all duration-300">
//                   {item.description}
//                 </p> */}
//                   <p className="hidden w-full items-center justify-between group-hover:-translate-y-5 transition-all duration-300">
//                     <span className=" italic text-xs flex flex-wrap">
//                       {/* Main price */}
//                       <span className="font-bold">
//                         ${item.price.toFixed(2)}USD
//                       </span>
//                       {/* Discounted price */}
//                       {item.discount > 0 && (
//                         <span className="line-through text-gray-400 ml-2">
//                           ${(item.price * (1 + item.discount)).toFixed(2)}USD
//                         </span>
//                       )}
//                     </span>
//                   </p>
//                   <button className="absolute top-2 right-2 bg-white/80 group-hover:bg-white text-sm py-2 px-4 cursor-pointer rounded-md group-hover:-translate-y-2 transition-all duration-300">
//                     Order
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//       <FooterMain />
//     </div>
//   );
// };

// export default Collection;

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { UseCart } from '../../../context/CartContext';
import { FaTshirt, FaShoePrints, FaSearch, FaFilter } from 'react-icons/fa';
import Navbar from '../../../components/user/Navbar/Navbar';
import FooterMain from '../../../components/user/Footer/FooterMain';
import { FaCartShopping, FaX } from 'react-icons/fa6';
import { GiClothes, GiArmorVest, GiCancel } from 'react-icons/gi';
import CardPlaceholder from '../../../components/user/card-placeholder/CardPlaceholder';
import CartOverlayModal from '../../../components/user/cart-overlay/CartOverlayModal';
import ProductCard from '../../../components/user/product-card/ProductCard';

const Collection = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);

  // Consume your cart actions
  const { addToCart } = UseCart();

  const categories = [
    { name: 'All', icon: GiClothes },
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
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
      toast.error("Can't seem to connect to server", { id: 'fetch error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    if (item.quantity <= 0) {
      toast.error(`${item.name} is currently out of stock!`);
      return;
    }
    // Default size to 'M' for rapid orders, customizable during final checkout
    addToCart(item, 'M');
    toast.success(`${item.name} added to your cart!`);
  };

  // Filter products based on search term and active categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (product.category &&
        product.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20 px-4 md:px-8 bg-gray-50/50">
      <Navbar />
      <div className=" max-w-7xl max-auto ">
        <section className="flex flex-col  gap-4 ">
          <div className="w-full h-full flex flex-col gap-4 items-start mt-20 p-4 md:p-8">
            {/* Controls Bar */}
            <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 text-[#8b4a1f] border-b border-orange-700 pb-4">
              <h1 className="text-[#8b4a1f] italic text-xl tracking-tight uppercase">
                M & K Collections
              </h1>

              <div className="w-full md:w-auto flex flex-row items-center gap-4">
                {/* Search input */}
                <div className="relative border border-amber-950/80 rounded-lg w-full md:w-sm bg-white">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 pr-8 w-full border-none outline-none text-sm text-gray-800"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 text-amber-950/60">
                    <FaSearch />
                  </div>
                </div>

                {/* Filter toggle button */}
                <button
                  onClick={() => setShowCategory(!showCategory)}
                  className={`text-xs border p-3 rounded-lg hover:scale-105 cursor-pointer transition-all ${
                    showCategory
                      ? 'bg-[#8b4a1f] text-white border-[#8b4a1f]'
                      : 'border-[#8b4a1f]'
                  }`}
                >
                  {showCategory ? <FaX /> : <FaFilter />}
                </button>
              </div>
            </div>

            {/* Dynamic Categories Container */}
            {showCategory && (
              <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 w-full py-2 transition-all duration-300">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`border border-amber-950/80 p-2 px-4 rounded-full hover:scale-105 cursor-pointer text-xs flex items-center gap-2 transition-all duration-200 ${
                        isActive
                          ? 'bg-[#8b4a1f] text-white'
                          : 'text-[#8b4a1f] bg-transparent'
                      }`}
                    >
                      <Icon />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Product Items Canvas */}
            {loading ? (
              <div className="w-full h-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-center place-items-center">
                {Array.from({ length: 16 }).map((_, index) => (
                  <CardPlaceholder key={index} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="w-full py-20 text-center text-gray-500 italic text-sm">
                No products found matching the criteria.
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
                {filteredProducts.map((item) => (
                  <ProductCard item={item} />
                ))}
              </div>
            )}
          </div>

          {cartOpen && (
            <CartOverlayModal
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
            />
          )}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="fixed bottom-5 right-5 bg-orange-400 text-white text-2xl md:text-4xl p-3 rounded-full cursor-pointer "
          >
            <FaCartShopping />
          </button>
        </section>
      </div>

      <FooterMain />
    </div>
  );
};

export default Collection;
