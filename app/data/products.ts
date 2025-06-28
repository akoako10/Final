export type ProductSize = 'XS' | 'S' | 'M' | 'L';

export type ProductCategory = 'WOMEN' | 'MEN' | 'KIDS';

export type ProductSizeStock = {
  size: ProductSize;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: ProductCategory;
  sizes: ProductSizeStock[];
};

const products: Product[] = [
  {
    id: '1',
    name: "Women's Running Shorts",
    price: '$50.00',
    image: '/product_1.png',
    description: 'Comfortable running shorts for women.',
    category: 'WOMEN',
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 2 },
    ],
  },
  {
    id: '2',
    name: "Women's Running Shorts out of stock",
    price: '$50.00',
    image: '/product_1.png',
    description: 'Comfortable running shorts for women.',
    category: 'WOMEN',
    sizes: [
      { size: 'XS', stock: 0 },
      { size: 'S', stock: 0 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
    ],
  },
  {
    id: '3',
    name: "Women's Yoga Leggings",
    price: '$65.00',
    image: '/product_2.png',
    description: 'High-waisted yoga leggings.',
    category: 'WOMEN',
    sizes: [
      { size: 'XS', stock: 0 },
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 0 },
    ],
  },
  {
    id: '4',
    name: "Men's Athletic T-Shirt",
    price: '$35.00',
    image: '/product_3.png',
    description: 'Breathable athletic shirt for men.',
    category: 'MEN',
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 4 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 7 },
    ],
  },
  {
    id: '5',
    name: "Men's Training Shorts",
    price: '$45.00',
    image: '/product_4.png',
    description: 'Durable training shorts for men.',
    category: 'MEN',
    sizes: [
      { size: 'XS', stock: 0 },
      { size: 'S', stock: 2 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 1 },
    ],
  },
  {
    id: '6',
    name: "Kids' Fun T-Shirt",
    price: '$25.00',
    image: '/product_1.png',
    description: 'Colorful and comfortable t-shirt for kids.',
    category: 'KIDS',
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 4 },
    ],
  },
  {
    id: '7',
    name: "Kids' Play Shorts",
    price: '$30.00',
    image: '/product_2.png',
    description: 'Comfortable shorts for active kids.',
    category: 'KIDS',
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 6 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
    ],
  },
  {
    id: '8',
    name: "Women's Sports Bra",
    price: '$40.00',
    image: '/product_3.png',
    description: 'Supportive sports bra for workouts.',
    category: 'WOMEN',
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 7 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 6 },
    ],
  },
  {
    id: '9',
    name: "Men's Jogger Pants",
    price: '$55.00',
    image: '/product_4.png',
    description: 'Comfortable jogger pants for men.',
    category: 'MEN',
    sizes: [
      { size: 'XS', stock: 1 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 4 },
    ],
  },
];

export default products;
