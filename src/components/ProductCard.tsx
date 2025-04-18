import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Product, ProductVariant, Review } from '../types/product';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Plus, Minus, MessageSquare, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/priceUtils';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

export interface ProductCardProps {
  product: Product;
  onHighlight?: (productId: string) => void;
  isHighlighted?: boolean;
}

const ProductCard = ({ product, onHighlight, isHighlighted }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [defaultVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const imageIntervalRef = useRef<number | null>(null);
  const { addToCart, getCartQuantity, updateQuantity } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const variantId = defaultVariant?.id;
  const cartQuantity = variantId ? getCartQuantity(variantId) : 0;
  const price = defaultVariant?.price || product.price;

  const availableStock = useMemo(() => {
    return defaultVariant?.stock || 0;
  }, [defaultVariant]);

  const remainingStock = useMemo(() => Math.max(0, availableStock - cartQuantity), [availableStock, cartQuantity]);

  const totalPrice = useMemo(() => {
    return price * quantity;
  }, [price, quantity]);

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    const newQuantity = quantity + delta;
    if (newQuantity >= 0 && newQuantity <= remainingStock) {
      setQuantity(newQuantity);
    } else if (newQuantity > remainingStock && remainingStock > 0) {
      setQuantity(remainingStock);
    } else if (newQuantity < 0) {
      setQuantity(0);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!defaultVariant || quantity <= 0 || quantity > remainingStock || availableStock === 0) {
      showNotification({
        title: 'Ошибка',
        message: quantity > remainingStock ? `Доступно только ${remainingStock} шт.` : 'Невозможно добавить товар',
        type: 'error'
      });
      return;
    }

    if (cartQuantity > 0) {
      updateQuantity(defaultVariant.id, cartQuantity + quantity);
      showNotification({
        title: 'Корзина обновлена',
        message: `Количество ${product.name} (${defaultVariant.diameter}"/${defaultVariant.et} ET) изменено.`,
        type: 'success'
      });
    } else {
      const success = addToCart(defaultVariant.id, quantity);
      if (success) {
        showNotification({
          title: 'Добавлено в корзину',
          message: `${product.name} (${defaultVariant.diameter}"/${defaultVariant.et} ET, ${quantity} шт.)`,
          type: 'success'
        });
      } else {
        showNotification({
          title: 'Ошибка добавления',
          message: 'Не удалось добавить товар в корзину.',
          type: 'error'
        });
      }
    }
    setQuantity(1);
  };

  const handleProceedToCheckout = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!defaultVariant || quantity <= 0 || quantity > remainingStock || availableStock === 0) {
      showNotification({
        title: 'Ошибка',
        message: quantity > remainingStock ? `Доступно только ${remainingStock} шт.` : 'Невозможно добавить товар',
        type: 'error'
      });
      return;
    }

    if (cartQuantity > 0) {
      updateQuantity(defaultVariant.id, cartQuantity + quantity);
    } else {
      const success = addToCart(defaultVariant.id, quantity);
      if (!success) {
        showNotification({
          title: 'Ошибка добавления',
          message: 'Не удалось добавить товар в корзину перед переходом к оплате.',
          type: 'error'
        });
        return;
      }
    }
    setQuantity(1);
    navigate('/checkout');

  }, [defaultVariant, quantity, remainingStock, availableStock, navigate, showNotification, cartQuantity, addToCart, updateQuantity, product.name]);

  const handleReviewsClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}?tab=reviews`); 
  }, [product.id, navigate]);

  const handleImageDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  useEffect(() => {
    setQuantity(remainingStock > 0 ? 1 : 0);
  }, [remainingStock]);

  useEffect(() => {
    if (isHighlighted) {
      setIsHovered(true);
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightTimeoutRef.current = window.setTimeout(() => {
        setIsHovered(false);
      }, 3000);
    }
    if (!isHovered) {
      setCurrentImageIndex(0);
    }
    return () => {
      if (highlightTimeoutRef.current) window.clearTimeout(highlightTimeoutRef.current);
      if (imageIntervalRef.current) window.clearInterval(imageIntervalRef.current);
    };
  }, [isHighlighted, isHovered]);

  return (
    <motion.div
      ref={cardRef}
      id={`product-${product.id}`}
      className={cn(
        'relative bg-surface/80 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden transition-all duration-300 flex flex-col',
        isHighlighted && 'ring-2 ring-primary shadow-lg scale-105',
        isHovered && 'shadow-xl border-primary/40 bg-surface/90'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
    >
      <div className="relative aspect-square cursor-pointer" onClick={handleCardClick}>
        <ProductImage 
          images={product.images} 
          currentIndex={currentImageIndex} 
          onDotClick={handleImageDotClick}
        />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleImageDotClick(e, index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentImageIndex === index 
                  ? "bg-primary scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-white hover:text-primary transition-colors cursor-pointer" onClick={handleCardClick}>{product.name}</h3>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= (product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <button
                onClick={handleReviewsClick}
                className="text-text-secondary hover:text-primary transition-colors text-sm flex items-center gap-1"
                title={language === 'ru' ? 'Читать отзывы' : 'Read reviews'}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                ({product.reviews.length})
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-3">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => handleQuantityChange(e, -1)}
                  disabled={quantity <= 0 || !defaultVariant || availableStock === 0}
                  className="p-1 rounded-full bg-surface-light hover:bg-primary/10 disabled:opacity-50 cursor-default transition-all"
                >
                  <Minus className="w-3 h-3 text-text-secondary" />
                </button>
                <span className="font-medium text-white w-6 text-center">{quantity}</span>
                <button
                  onClick={(e) => handleQuantityChange(e, 1)}
                  disabled={quantity >= remainingStock || !defaultVariant || availableStock === 0}
                  className="p-1 rounded-full bg-surface-light hover:bg-primary/10 disabled:opacity-50 cursor-default transition-all"
                >
                  <Plus className="w-3 h-3 text-text-secondary" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className={cn(
                "text-sm font-medium",
                remainingStock > 10 ? "text-green-400" : 
                remainingStock > 0 ? "bg-gradient-to-r from-white to-primary bg-clip-text text-transparent" : 
                "text-red-400"
              )}>
                {remainingStock > 0 
                  ? `${language === 'ru' ? 'В наличии' : 'In stock'}: ${remainingStock} ${language === 'ru' ? 'шт.' : 'pcs'}`
                  : language === 'ru' ? 'Нет в наличии' : 'Out of stock'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!defaultVariant || availableStock === 0 || quantity > remainingStock || quantity === 0}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-700 disabled:text-gray-300 cursor-default transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">{language === 'ru' ? 'В корзину' : 'Add to Cart'}</span>
          </button>
          <button
            onClick={handleProceedToCheckout}
            disabled={!defaultVariant || availableStock === 0 || quantity > remainingStock || quantity === 0}
            className="flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white disabled:border-gray-700 disabled:text-gray-500 cursor-default transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm"
          >
            {language === 'ru' ? 'Купить' : 'Buy'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;