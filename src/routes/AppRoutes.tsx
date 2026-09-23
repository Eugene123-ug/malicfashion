import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import AccountLayout from '../layouts/AccountLayout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetail from '../pages/Product/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Wishlist from '../pages/Wishlist/Wishlist';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Checkout from '../pages/Checkout/Checkout';
import OrderConfirmation from '../pages/Checkout/OrderConfirmation';
import Dashboard from '../pages/Account/Dashboard';
import Orders from '../pages/Account/Orders';
import AccountWishlist from '../pages/Account/AccountWishlist';
import Addresses from '../pages/Account/Addresses';
import Settings from '../pages/Account/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="shop" element={<Shop title="Shop" subtitle="Browse the full collection." />} />
        <Route path="men" element={<Shop title="Men" subtitle="Contemporary menswear essentials." presetFilter={(p) => p.gender === 'men'} />} />
        <Route path="women" element={<Shop title="Women" subtitle="Elegant pieces for the modern woman." presetFilter={(p) => p.gender === 'women'} />} />
        <Route path="unisex" element={<Shop title="Unisex" subtitle="Designed for everyone." presetFilter={(p) => p.gender === 'unisex'} />} />
        <Route path="new-arrivals" element={<Shop title="New Arrivals" subtitle="The latest drop." presetFilter={(p) => p.newArrival} />} />
        <Route path="sale" element={<Shop title="Sale" subtitle="Reduced while stock lasts." presetFilter={(p) => Boolean(p.salePrice)} />} />
        <Route path="collections" element={<Shop title="Collections" subtitle="Curated edits." />} />

        <Route path="product/:slug" element={<ProductDetail />} />

        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />

        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="account" element={<AccountLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<AccountWishlist />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}