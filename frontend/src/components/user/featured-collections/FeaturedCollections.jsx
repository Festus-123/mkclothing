import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabse/supabaseClient';
import { Link } from 'react-router-dom';
import CardPlaceholder from '../card-placeholder/CardPlaceholder';
import ProductCard from '../product-card/ProductCard';

const FeaturedCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { error, data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        setLoading(false);
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
      //   toast.error("Can't seem to connect to server", { id: 'fetch error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
    <div className="w-full bg-gray-100 h-125 animate-pulse">
        { Array.from({length: products.length}).map((__, index) => (
            <CardPlaceholder key={index}/>
        ))}
    </div>
    );
  }

  return (
    <div className="py-16 md:py-24 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-5xl font-light">Our Collections</h2>

          <Link 
            to="/collections"
            className="text-sm border p-2 border-black hover:scale-105 cursor-pointer transition">
            View All
          </Link>
            

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((item) => (
            <ProductCard 
                item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
