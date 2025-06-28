import React, { useState, useEffect } from 'react';
import MainNavigation from '../components/MainNavigation';
import PriceDisplay from '../components/PriceDisplay';
import { Link, useSearchParams } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { getCurrentStock } from '../utils/stock';
import { isProductInCart } from '../utils/cart';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

const Home = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = (searchParams.get('category') || 'WOMEN') as 'WOMEN' | 'MEN' | 'KIDS';
  const [cartUpdate, setCartUpdate] = useState(0);
  const [products, setProducts] = useState(() => getCurrentStock());

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  const isCompletelyOutOfStock = (product: (typeof products)[0]) => {
    return product.sizes.every(sizeOption => sizeOption.stock === 0);
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartUpdate(prev => prev + 1);
      setProducts(getCurrentStock());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light mb-12">{selectedCategory}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative cursor-pointer"
            >
              <div className={`relative overflow-hidden bg-gray-100`}>
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover object-center"
                />

                {isCompletelyOutOfStock(product) && (
                  <div className="absolute inset-0 bg-white/30 flex items-center justify-center">
                    <span className="text-gray-500 font-medium text-lg">OUT OF STOCK</span>
                  </div>
                )}

                {isProductInCart(product.id) && (
                  <div className="absolute bottom-4 right-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3
                  className={`text-lg font-medium ${
                    isCompletelyOutOfStock(product) ? 'text-gray-400' : ''
                  }`}
                >
                  {product.name}
                </h3>
                <PriceDisplay
                  price={product.price}
                  className={`mt-1 text-lg ${
                    isCompletelyOutOfStock(product) ? 'text-gray-400' : ''
                  }`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
