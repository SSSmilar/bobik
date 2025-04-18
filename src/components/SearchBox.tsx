import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types/product';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearchTerm('');
        setFilteredProducts([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isExpanded]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const lowerCaseTerm = term.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredProducts(term ? filtered : []);
  };

  const handleProductSelect = (productId: string) => {
    setIsExpanded(false);
    setSearchTerm('');
    navigate(`/product/${productId}`);
  };

  const inputContainerVariants = {
    hidden: { 
      width: 0, 
      opacity: 0, 
      paddingLeft: 0, 
      paddingRight: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      width: '16rem',
      opacity: 1,
      paddingLeft: '1rem',
      paddingRight: '1rem',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div ref={searchRef} className="relative h-10 w-10 flex items-center justify-center">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-full flex items-center justify-center bg-surface rounded-lg border border-primary/20 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 group z-10"
        aria-label={isExpanded ? "Close search" : "Open search"}
      >
        <Search className={`w-4 h-4 transition-colors ${isExpanded ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`} />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="search-input-container"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={inputContainerVariants}
            className="absolute top-0 right-0 h-full bg-surface rounded-lg border border-primary flex items-center overflow-hidden z-0"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Поиск..."
              className="w-full h-full bg-transparent text-white px-4 py-2 outline-none focus:ring-0 border-none"
              aria-label="Search"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-0 w-64 mt-2 bg-surface border border-primary/20 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-2 hover:bg-primary/10 cursor-pointer flex items-center gap-2"
                onClick={() => handleProductSelect(product.id)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="text-white text-sm">{product.name}</div>
                  <div className="text-primary text-xs">
                    {product.price.toLocaleString()} ₽
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
