import { BrowserRouter, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider, useUI } from './context/UIContext';
import CartDrawer from './components/cart/CartDrawer';

function GlobalCartDrawer() {
  const { isCartOpen, closeCart } = useUI();
  return <CartDrawer isOpen={isCartOpen} onClose={closeCart} />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <AppRoutes key={location.pathname} />
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            <AnimatedRoutes />
            <GlobalCartDrawer />
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;