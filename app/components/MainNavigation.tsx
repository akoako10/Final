import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { getCartItemCount } from '../utils/cart';
import CurrencySelector from './CurrencySelector';

const NavigationItem = ({
  category,
  activeCategory,
  onClick,
}: {
  category: string;
  activeCategory: string;
  onClick: (category: string) => void;
}) => {
  return (
    <button
      className={`font-medium cursor-pointer ${
        activeCategory === category
          ? 'text-green-500 border-green-500  border-b-2'
          : 'text-gray-600 hover:text-black'
      }`}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );
};

const MainNavigation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get('category') || 'WOMEN';
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartData = () => {
      setCartItemCount(getCartItemCount());
    };

    updateCartData();

    const handleStorageChange = () => {
      updateCartData();
    };

    window.addEventListener('storage', handleStorageChange);

    const handleCartUpdate = () => {
      updateCartData();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleNavigationClick = (category: string) => {
    console.log(`Navigating to ${category}`);
    navigate(`/?category=${category}`);
  };

  return (
    <div className="relative">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold cursor-pointer">
                ECOMMERCE
              </Link>

              <nav className="flex space-x-8">
                <NavigationItem
                  category="WOMEN"
                  activeCategory={activeCategory}
                  onClick={handleNavigationClick}
                />
                <NavigationItem
                  category="MEN"
                  activeCategory={activeCategory}
                  onClick={handleNavigationClick}
                />
                <NavigationItem
                  category="KIDS"
                  activeCategory={activeCategory}
                  onClick={handleNavigationClick}
                />
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <CurrencySelector />

              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-black cursor-pointer transition-colors"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
