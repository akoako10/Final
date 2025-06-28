import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import PriceDisplay from '../components/PriceDisplay';
import { useParams } from 'react-router';
import MainNavigation from '../components/MainNavigation';
import { getCurrentStock } from '../utils/stock';
import type { ProductSize } from '../data/products';
import { addToCart, getCurrentCartQuantity } from '../utils/cart';

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(() => getCurrentStock());
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (product && selectedSize) {
      setCartQuantity(getCurrentCartQuantity(product.id, selectedSize));
    }
  }, [product, selectedSize]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (product && selectedSize) {
        setCartQuantity(getCurrentCartQuantity(product.id, selectedSize));
      }
      setProducts(getCurrentStock());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [product, selectedSize]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !product) return;

    setIsAddingToCart(true);
    setMessage(null);

    try {
      const result = addToCart(product, selectedSize);
      if (result.success) {
        setMessage('Item added to cart successfully!');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage(result.message || 'Failed to add item to cart');
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Error adding item to cart');
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
          <div className="flex gap-6">
            <div className="flex-1 max-w-md">
              <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 max-w-sm space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <p className="text-gray-600 mt-1">{product.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">PRICE:</label>
                <PriceDisplay price={product.price} className="text-2xl font-semibold" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">SIZE:</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {product.sizes.map(sizeOption => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={sizeOption.stock === 0}
                      className={`
                        relative border-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors
                        ${
                          selectedSize === sizeOption.size
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : sizeOption.stock === 0
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 cursor-pointer'
                        }
                      `}
                    >
                      <div className="text-center font-semibold">{sizeOption.size}</div>
                    </button>
                  ))}
                </div>

                {selectedSize && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">Stock for size {selectedSize}: </span>
                      <span
                        className={`font-semibold ${
                          product.sizes.find(s => s.size === selectedSize)?.stock === 0
                            ? 'text-red-600'
                            : product.sizes.find(s => s.size === selectedSize)?.stock! <= 3
                            ? 'text-orange-600'
                            : 'text-green-600'
                        }`}
                      >
                        {product.sizes.find(s => s.size === selectedSize)?.stock === 0
                          ? 'Out of Stock'
                          : `${product.sizes.find(s => s.size === selectedSize)?.stock} available`}
                      </span>
                    </div>
                    {cartQuantity > 0 && (
                      <div>
                        <span className="font-medium">In your cart: </span>
                        <span className="font-semibold text-blue-600">{cartQuantity}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm font-medium ${
                    message.includes('successfully')
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}

              <Button
                onClick={handleAddToCart}
                className="w-full py-3 rounded"
                disabled={
                  !selectedSize ||
                  product.sizes.find(s => s.size === selectedSize)?.stock === 0 ||
                  (selectedSize &&
                    cartQuantity >=
                      (product.sizes.find(s => s.size === selectedSize)?.stock || 0)) ||
                  isAddingToCart
                }
              >
                {isAddingToCart
                  ? 'ADDING...'
                  : !selectedSize
                  ? 'SELECT SIZE'
                  : selectedSize &&
                    cartQuantity >= (product.sizes.find(s => s.size === selectedSize)?.stock || 0)
                  ? 'MAX QUANTITY REACHED'
                  : 'ADD TO CART'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
