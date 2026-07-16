import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { UseCart } from '../../../context/CartContext';
import { FaTshirt, FaShoePrints, FaSearch, FaFilter } from 'react-icons/fa';
import Navbar from '../../../components/user/Navbar/Navbar';
import FooterMain from '../../../components/user/Footer/FooterMain';
import { FaCartShopping, FaX, FaChevronUp, FaCheck, FaChevronDown } from 'react-icons/fa6';
import { GiClothes, GiArmorVest, GiCancel } from 'react-icons/gi';
import CardPlaceholder from '../../../components/user/card-placeholder/CardPlaceholder';
import CartOverlayModal from '../../../components/user/cart-overlay/CartOverlayModal';
import ProductCard from '../../../components/user/product-card/ProductCard';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [cartOpen, setCartOpen] = useState(false);

  /* Filter Accordion */

  const [openSection, setOpenSection] = useState('category');

  const { addToCart } = UseCart();

  /* Filters */

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  /* Mobile Filter */

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { name: 'All', icon: GiClothes },
    { name: 'Jackets', icon: GiClothes },
    { name: 'Cargo Pants', icon: GiArmorVest },
    { name: 'Tops', icon: FaTshirt },
    { name: 'Sport Wears', icon: FaShoePrints },
  ];

  const prices = ['All', 'Under ₦20,000', '₦20,000 - ₦50,000', 'Above ₦50,000'];

  const availability = ['All', 'In Stock', 'Out of Stock'];

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? '' : section));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPrice('All');
    setSelectedAvailability('All');
  };

  // const activeFilters = [];

  // if (selectedCategory !== "All")
  //   activeFilters.push(selectedCategory);

  // if (selectedPrice !== "All")
  //   activeFilters.push(selectedPrice);

  // if (selectedAvailability !== "All")
  //   activeFilters.push(selectedAvailability);

  // if (searchQuery.trim())
  //   activeFilters.push(`"${searchQuery}"`);

  // const filteredProducts = products.filter((product) => {
  //   /* Search */

  //   const matchesSearch =
  //     product.name
  //       ?.toLowerCase()
  //       .includes(searchQuery.toLowerCase()) ||
  //     product.category
  //       ?.toLowerCase()
  //       .includes(searchQuery.toLowerCase());

  //   /* Category */

  //   const matchesCategory =
  //     selectedCategory === "All" ||
  //     product.category?.toLowerCase() ===
  //       selectedCategory.toLowerCase();

  //   /* Price */

  //   let matchesPrice = true;

  //   if (selectedPrice === "Under ₦20,000") {
  //     matchesPrice = product.price < 20000;
  //   }

  //   if (selectedPrice === "₦20,000 - ₦50,000") {
  //     matchesPrice =
  //       product.price >= 20000 &&
  //       product.price <= 50000;
  //   }

  //   if (selectedPrice === "Above ₦50,000") {
  //     matchesPrice = product.price > 50000;
  //   }

  //   /* Availability */

  //   let matchesAvailability = true;

  //   if (selectedAvailability === "In Stock") {
  //     matchesAvailability = product.quantity > 0;
  //   }

  //   if (selectedAvailability === "Out of Stock") {
  //     matchesAvailability = product.quantity <= 0;
  //   }

  //   return (
  //     matchesSearch &&
  //     matchesCategory &&
  //     matchesPrice &&
  //     matchesAvailability
  //   );
  // });

  const removeFilter = (filter) => {
    if (filter === selectedCategory) setSelectedCategory('All');

    if (filter === selectedPrice) setSelectedPrice('All');

    if (filter === selectedAvailability) setSelectedAvailability('All');

    if (filter === `"${searchQuery}"`) setSearchQuery('');
  };

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
    <div className="min-h-screen bg-[#faf9f7]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}

        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
            M & K Fashion
          </p>

          <div className="mt-3 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-light leading-tight">
                Discover Our
                <span className="italic text-orange-500"> Collections</span>
              </h1>

              <p className="mt-5 max-w-2xl text-gray-500 leading-8">
                Explore premium eccentric fashion crafted to make bold
                statements. Browse timeless essentials, modern classics and
                signature pieces tailored for individuals who appreciate
                confidence and elegance.
              </p>
            </div>

            <div className="text-sm text-gray-500">
              {filteredProducts.length} Products Available
            </div>
          </div>
        </div>

        {/* Search */}

        <div className="mb-10">
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jackets, cargo pants, tops..."
              className="w-full rounded-full border border-gray-300 bg-white py-4 pl-14 pr-6 text-sm outline-none transition focus:border-orange-500"
            />
          </div>
        </div>

        {/* Mobile Filter Button */}

        <div className="lg:hidden mb-8">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium shadow-sm hover:shadow-md transition"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Layout */}

        <div className="grid lg:grid-cols-[290px_1fr] gap-10">
          {/* Sidebar */}

          <aside className="hidden lg:block sticky top-28 h-fit rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Refine Results</h2>

              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-wider text-orange-500 hover:text-black transition"
              >
                Clear
              </button>
            </div>

            {/* CATEGORY */}

            <div className="border-b border-gray-200 pb-6">
              <button
                onClick={() => toggleSection('category')}
                className="flex w-full items-center justify-between"
              >
                <span className="font-medium">Category</span>

                {openSection === 'category' ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>

              {openSection === 'category' && (
                <div className="mt-5 space-y-3">
                  {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition ${
                          selectedCategory === category.name
                            ? 'bg-orange-500 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon />

                          <span className="text-sm">{category.name}</span>
                        </div>

                        {selectedCategory === category.name && <FaCheck />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PRICE */}

            <div className="border-b border-gray-200 py-6">
              <button
                onClick={() => toggleSection('price')}
                className="flex w-full items-center justify-between"
              >
                <span className="font-medium">Price Range</span>

                {openSection === 'price' ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {openSection === 'price' && (
                <div className="mt-5 space-y-3">
                  {prices.map((price) => (
                    <button
                      key={price}
                      onClick={() => setSelectedPrice(price)}
                      className={`w-full rounded-xl px-4 py-3 text-left transition ${
                        selectedPrice === price
                          ? 'bg-orange-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AVAILABILITY */}

            <div className="pt-6">
              <button
                onClick={() => toggleSection('availability')}
                className="flex w-full items-center justify-between"
              >
                <span className="font-medium">Availability</span>

                {openSection === 'availability' ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>

              {openSection === 'availability' && (
                <div className="mt-5 space-y-3">
                  {availability.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedAvailability(item)}
                      className={`w-full rounded-xl px-4 py-3 text-left transition ${
                        selectedAvailability === item
                          ? 'bg-orange-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Products Area */}

          <div>
            {/* Active Filters */}

            <div className="flex flex-wrap gap-3 mb-8">
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
                >
                  {selectedCategory}
                  <FaX className="text-xs" />
                </button>
              )}

              {selectedPrice !== 'All' && (
                <button
                  onClick={() => setSelectedPrice('All')}
                  className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
                >
                  {selectedPrice}
                  <FaX className="text-xs" />
                </button>
              )}

              {selectedAvailability !== 'All' && (
                <button
                  onClick={() => setSelectedAvailability('All')}
                  className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
                >
                  {selectedAvailability}
                  <FaX className="text-xs" />
                </button>
              )}

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm text-orange-700"
                >
                  "{searchQuery}"
                  <FaX className="text-xs" />
                </button>
              )}
            </div>

            {/* Product Section Starts Here */}
            {/* Product Grid */}

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <CardPlaceholder key={index} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-28 px-6 text-center">
                <FaSearch className="text-5xl text-gray-300 mb-6" />

                <h2 className="text-2xl font-semibold mb-3">
                  No Matching Products
                </h2>

                <p className="max-w-md text-gray-500 leading-7">
                  We couldn't find any products matching your search or selected
                  filters. Try adjusting your filters or searching with
                  different keywords.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-8 rounded-full bg-black px-6 py-3 text-white transition hover:bg-orange-500"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product Count */}

                <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-5">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Available Products
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Showing {filteredProducts.length} product
                      {filteredProducts.length !== 1 && 's'}
                    </p>
                  </div>
                </div>

                {/* Cards */}

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onAddToCart={() => handleAddToCart(item)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>

                <button
                  onClick={() => setShowFilters(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <FaX />
                </button>
              </div>

              {/* Category */}

              <div className="mb-8">
                <h3 className="mb-4 font-medium">Category</h3>

                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <button
                        key={category.name}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setShowFilters(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                          selectedCategory === category.name
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}

              <div className="mb-8">
                <h3 className="mb-4 font-medium">Price Range</h3>

                <div className="space-y-2">
                  {prices.map((price) => (
                    <button
                      key={price}
                      onClick={() => {
                        setSelectedPrice(price);
                        setShowFilters(false);
                      }}
                      className={`w-full rounded-xl px-4 py-3 text-left transition ${
                        selectedPrice === price
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}

              <div>
                <h3 className="mb-4 font-medium">Availability</h3>

                <div className="space-y-2">
                  {availability.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSelectedAvailability(item);
                        setShowFilters(false);
                      }}
                      className={`w-full rounded-xl px-4 py-3 text-left transition ${
                        selectedAvailability === item
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                className="mt-10 w-full rounded-full border border-gray-300 py-3 font-medium transition hover:bg-black hover:text-white"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Cart */}

        {cartOpen && (
          <CartOverlayModal
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
          />
        )}

        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl text-white shadow-xl transition hover:scale-110 hover:bg-black"
        >
          <FaCartShopping />
        </button>
      </div>

      <FooterMain />
    </div>
  );
};

export default Collection;

// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../../supabse/supabaseClient';
// import { toast } from 'sonner';
// import { UseCart } from '../../../context/CartContext';
// import { FaTshirt, FaShoePrints, FaSearch, FaFilter } from 'react-icons/fa';
// import Navbar from '../../../components/user/Navbar/Navbar';
// import FooterMain from '../../../components/user/Footer/FooterMain';
// import { FaCartShopping, FaX } from 'react-icons/fa6';
// import { GiClothes, GiArmorVest, GiCancel } from 'react-icons/gi';
// import CardPlaceholder from '../../../components/user/card-placeholder/CardPlaceholder';
// import CartOverlayModal from '../../../components/user/cart-overlay/CartOverlayModal';
// import ProductCard from '../../../components/user/product-card/ProductCard';

// const Collection = () => {
//   const [showCategory, setShowCategory] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [cartOpen, setCartOpen] = useState(false);

//   // Consume your cart actions
//   const { addToCart } = UseCart();

//   const categories = [
//     { name: 'All', icon: GiClothes },
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
//         setProducts(data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//       toast.error("Can't seem to connect to server", { id: 'fetch error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleAddToCart = (item) => {
//     if (item.quantity <= 0) {
//       toast.error(`${item.name} is currently out of stock!`);
//       return;
//     }
//     // Default size to 'M' for rapid orders, customizable during final checkout
//     addToCart(item, 'M');
//     toast.success(`${item.name} added to your cart!`);
//   };

//   // Filter products based on search term and active categories
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === 'All' ||
//       (product.category &&
//         product.category.toLowerCase() === selectedCategory.toLowerCase());
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className=" bg-gray-50/50 min-h-screen">
//       <Navbar />
//       <div className=" max-w-7xl mx-auto py-16 md:py-24 px-4">
//         <section className="flex flex-col  gap-4 ">
//           <div className="w-full h-full flex flex-col gap-4 items-start mt-20">
//             {/* Controls Bar */}
//             <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 text-[#8b4a1f] border-b border-orange-700 pb-4">
//               <h1 className="text-[#8b4a1f] italic text-xl tracking-tight uppercase">
//                 M & K Collections
//               </h1>

//               <div className="w-full md:w-auto flex flex-row items-center gap-4">
//                 {/* Search input */}
//                 <div className="relative border border-amber-950/80 rounded-lg w-full md:w-sm bg-white">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="p-2 pr-8 w-full border-none outline-none text-sm text-gray-800"
//                   />
//                   <div className="absolute top-1/2 -translate-y-1/2 right-3 text-amber-950/60">
//                     <FaSearch />
//                   </div>
//                 </div>

//                 {/* Filter toggle button */}
//                 <button
//                   onClick={() => setShowCategory(!showCategory)}
//                   className={`text-xs border p-3 rounded-lg hover:scale-105 cursor-pointer transition-all ${
//                     showCategory
//                       ? 'bg-[#8b4a1f] text-white border-[#8b4a1f]'
//                       : 'border-[#8b4a1f]'
//                   }`}
//                 >
//                   {showCategory ? <FaX /> : <FaFilter />}
//                 </button>
//               </div>
//             </div>

//             {/* Dynamic Categories Container */}
//             {showCategory && (
//               <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 w-full py-2 transition-all duration-300">
//                 {categories.map((category, index) => {
//                   const Icon = category.icon;
//                   const isActive = selectedCategory === category.name;
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedCategory(category.name)}
//                       className={`border border-amber-950/80 p-2 px-4 rounded-full hover:scale-105 cursor-pointer text-xs flex items-center gap-2 transition-all duration-200 ${
//                         isActive
//                           ? 'bg-[#8b4a1f] text-white'
//                           : 'text-[#8b4a1f] bg-transparent'
//                       }`}
//                     >
//                       <Icon />
//                       {category.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Product Items Canvas */}
//             {loading ? (
//               <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-center place-items-center">
//                 {Array.from({ length: 16 }).map((_, index) => (
//                   <CardPlaceholder key={index} />
//                 ))}
//               </div>
//             ) : filteredProducts.length === 0 ? (
//               <div className="w-full py-20 text-center text-gray-500 italic text-sm">
//                 No products found matching the criteria.
//               </div>
//             ) : (
//               <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
//                 {filteredProducts.map((item) => (
//                   <ProductCard item={item} />
//                 ))}
//               </div>
//             )}
//           </div>

//           {cartOpen && (
//             <CartOverlayModal
//               isOpen={cartOpen}
//               onClose={() => setCartOpen(false)}
//             />
//           )}
//           <button
//             onClick={() => setCartOpen(!cartOpen)}
//             className="fixed bottom-5 right-5 bg-orange-400 text-white text-2xl md:text-4xl p-3 rounded-full cursor-pointer "
//           >
//             <FaCartShopping />
//           </button>
//         </section>
//       </div>

//       <FooterMain />
//     </div>
//   );
// };

// export default Collection;
