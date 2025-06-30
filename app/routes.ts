import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/_index.tsx'),
  route('product/:id', 'routes/product.$id.tsx'),
  route('cart', 'routes/cart.tsx'),
  route('checkout', 'routes/checkout.tsx'),
  route('*', 'routes/$.tsx'),
] satisfies RouteConfig;
