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
import Filter from '../../../components/user/filter-tab/Filter';
import FilterBar from '../../../components/user/filter-tab/FilterBar';
import FilterMobile from '../../../components/user/filter-tab/FilterMobile';
import ProductModal from '../../../components/user/productModal/ProductModal';
import { motion, AnimatePresence } from 'motion/react';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [openSection, setOpenSection] = useState('category');
  const { addToCart } = UseCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [added, setAdded] = useState(false);
  let [count, setCount] = useState(0);
  const { getCartCount } = UseCart();
  // const [modal, setModal] = useState(false)

  const categories = [
    { name: 'All', icon: GiClothes },
    { name: 'Jackets', icon: GiClothes },
    { name: 'Cargo Pants', icon: GiArmorVest },
    { name: 'Tops', icon: FaTshirt },
    { name: 'Sport Wears', icon: FaShoePrints },
  ];

  const prices = [0, 20000, 50000, 100000, 500000];
  const availability = ['All', 'In Stock', 'Out of Stock'];

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? '' : section));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPrice(0);
    setSelectedAvailability('All');
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

    const cartCount = getCartCount();
    if (cartCount === 0) {
      setCount(0);
    }
    // Default size to 'M' for rapid orders, customizable during final checkout
    addToCart(item, 'M');
    setAdded(true);
    setCount((prev) => prev + 1);
    // toast.success(`${item.name} added to your cart!`);
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
    const matchesPrices =
      selectedPrice === 0 || (product.price && product.price >= selectedPrice);
    return matchesSearch && matchesCategory && matchesPrices;
  });

  useEffect(() => {
    if (!added) return;

    const timeOut = setTimeout(() => setAdded(false), 1000);
    return () => clearTimeout(timeOut);
  }, [added]);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 mt-10">
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

        <div className="flex flex-col lg:flex-row items-start">
          <Filter
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            categories={categories}
            setShowFilters={setShowFilters}
            toggleSection={toggleSection}
            clearFilters={clearFilters}
            openSection={openSection}
            prices={prices}
            availability={availability}
            setSelectedAvailability={setSelectedAvailability}
            setSelectedPrice={setSelectedPrice}
            selectedAvailability={selectedAvailability}
            selectedPrice={selectedPrice}
          />

          {/* Products Area */}

          <div className="w-full flex-1 flex flex-col">
            {/* Active Filters */}

            <FilterBar
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={setSelectedAvailability}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
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

        <FilterMobile
          selectedAvailability={selectedAvailability}
          categories={categories}
          prices={prices}
          availability={availability}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          setSelectedAvailability={setSelectedAvailability}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          clearFilters={clearFilters}
        />

        {/* Cart */}
        <AnimatePresence>
          {cartOpen && (
            <motion.div
              className="fixed inset-0 z-50"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm w-full "
                onClick={() => setCartOpen(false)}
              />

              {/* Cart */}
              
                <CartOverlayModal
                  isOpen={cartOpen}
                  onClose={() => setCartOpen(false)}
                />{' '}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {added && (
            <motion.div
              key={count}
              initial={{ opacity: 0.2, y: 60, scale: 0.7 }}
              animate={{ opacity: 0.9, y: -20, scale: 0.9 }}
              exit={{ opacity: 0, y: -50, scale: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`fixed top-1/4 left-1/4 flex items-center justify-center w-10 h-10 md:w-20 md:h-20 bg-green-400 text-white p-4 rounded-full transition-all`}
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>

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
