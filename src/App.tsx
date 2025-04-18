import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Catalog from './pages/Catalog';
import Delivery from './pages/Delivery';
import Reviews from './pages/Reviews';
import ProductPage from './pages/ProductPage';
import './App.css';
import Footer from './components/Footer';
import NotificationManager from './components/NotificationManager';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <NotificationProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="catalog" element={<Catalog />} />
                  <Route path="delivery" element={<Delivery />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="product/:id" element={<ProductPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          <NotificationManager />
        </NotificationProvider>
      </CartProvider>
    </LanguageProvider>
  );
}