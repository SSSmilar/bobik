import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';
import SearchBox from './SearchBox';
import CartIcon from './CartIcon';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = {
    ru: [
      { name: 'Главная', href: '/' },
      { name: 'Каталог', href: '/catalog' },
      { name: 'Доставка', href: '/delivery' },
      { name: 'Отзывы', href: '/reviews' },
    ],
    en: [
      { name: 'Home', href: '/' },
      { name: 'Catalog', href: '/catalog' },
      { name: 'Delivery', href: '/delivery' },
      { name: 'Reviews', href: '/reviews' },
    ],
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Logo className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 group-hover:animate-shine" />
              </div>
              <span className="text-lg font-medium bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent bg-[length:200%_100%] group-hover:animate-gradient">
                Japan is nearby
              </span>
            </Link>
          </div>

          {/* Search, Cart, and Language */}
          <div className="hidden md:flex items-center gap-6">
            {navigation[language].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link relative group ${
                  isActive(item.href) ? 'text-primary' : 'text-white'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <>
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                    <div className="absolute -inset-2 bg-primary/5 rounded-lg blur-sm" />
                    <div className="absolute -inset-6 bg-primary/5 rounded-lg blur-md" />
                  </>
                )}
                <div className="absolute -inset-2 bg-primary/0 group-hover:bg-primary/5 rounded-lg transition-colors duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <SearchBox />
            <CartIcon />
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-primary transition-colors"
            >
              {language === 'ru' ? 'RU' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-primary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-primary/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation[language].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium relative ${
                  isActive(item.href) 
                    ? 'text-primary bg-primary/5' 
                    : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-primary/5 rounded-lg blur-sm" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;