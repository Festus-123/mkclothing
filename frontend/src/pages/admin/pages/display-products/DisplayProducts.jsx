import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../supabse/supabaseClient';
import { toast } from 'sonner';
import { Link, useLocation } from 'react-router-dom';
// import { FiSearch, FiX } from 'react-icons/fi';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Confirm from '../../../../components/confirm/Confirm';
import Placeholder from '../../../../components/admin/placeholder/Placeholder';
import ProductHeader from '../../../../components/admin/product-header/ProductHeader';
import ProductStats from '../../../../components/admin/product-stats/ProductStats';
import SearchOverlay from '../../../../components/admin/search-overlay/SearchOverlay';
import ProductSection from '../../../../components/admin/product-sections/ProductSection';

import ProductModal from '../../../../components/admin/product-modal/ProductModal';

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
  const [recent, setRecent] = useState([]);
  const [older, setOlder] = useState([]);
  // const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);

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

      setConfirm(false);
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

  if (loading) {
    return <Placeholder />;
  }

  // console.log("Selected", selectedProduct.image_urls)

  return (
    // container

    <div className="relative flex flex-col gap-8 min-h-screen overflow-hidden max-w-7xl mx-auto py-8 px-4 ">
      <ProductHeader
        products={products}
        onOpenSearch={() => setSearching(true)}
      />

      {searching && (
        <SearchOverlay
          products={products}
          open={searching}
          onClose={() => setSearching(false)}
          onSelectProduct={(product) => {
            setPreviewProduct(product);
            return (
              <ProductModal
                open={!!previewProduct}
                product={previewProduct}
                onClose={() => setPreviewProduct(null)}
                onDelete={(product) => {
                  setSelectedProduct(product);
                  setConfirm(true);
                }}
              />
            );
          }}
        />
      )}

      {confirm && (
        <Confirm
          close={() => setConfirm(false)}
          onClick={() => handleDelete(selectedProduct)}
        />
      )}

      <ProductStats products={products} recent={recent} older={older} />

      <ProductSection
        loading={loading}
        products={products}
        onProductClick={(product) => setPreviewProduct(product)}
        onDelete={(product) => {
          setSelectedProduct(product);

          setConfirm(true);
        }}
        onOpenSearch={() => setSearching(true)}
      />

      <ProductModal
        open={!!previewProduct}
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
        onDelete={(product) => {
          setSelectedProduct(product);
          setConfirm(true);
        }}
      />
    </div>
  );
};

export default DisplayProducts;
