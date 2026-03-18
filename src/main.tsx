import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import RestaurantMenu from './pages/RestaurantMenu.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import OrderSuccess from './pages/OrderSuccess.tsx';
import TermsConditions from './pages/TermsConditions.tsx';
import Careers from './pages/Careers.tsx';
import Blog from './pages/Blog.tsx';
import ContactUs from './pages/ContactUs.tsx';
import About from './pages/About.tsx';
import { CartProvider } from './context/CartContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </CartProvider>
    </Router>
  </StrictMode>,
);
