import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import ConfirmModal from './ConfirmModal';
import { products } from '../data/products';
import { Product, ProductVariant } from '../types/product';
import { useNotification } from '../contexts/NotificationContext';

interface CartItemType {
  variantId: string;
  quantity: number;
  product: Product | undefined;
  variant: ProductVariant | undefined;
  price: number;
}

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { showNotification } = useNotification();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Количество товаров в корзине
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  
  console.log('[CartIcon] Current cart state:', {
    cart,
    itemCount,
    productsAvailable: products.length
  });

  // Получаем информацию о товарах в корзине
  const cartItems: CartItemType[] = Object.entries(cart).map(([variantId, quantity]) => {
    // Логируем, что пытаемся обработать
    console.log('[CartIcon] Processing cart item ID:', variantId, 'Quantity:', quantity);
    
    // Обрабатываем ID с форматом productId-variantId и без него
    let productId = variantId;
    let variantIdPart = null;
    
    if (variantId.includes('-')) {
      const parts = variantId.split('-');
      productId = parts[0];
      variantIdPart = parts.length > 1 ? parts.slice(1).join('-') : null;
    }
    
    // Находим продукт по ID
    const product = products.find((p: Product) => p.id === productId);
    
    // Если не нашли продукт, пробуем поискать по части варианта
    const productByVariant = product ? product : products.find((p: Product) => 
      p.variants?.some(v => v.id === variantIdPart || v.id === variantId)
    );
    
    // Выбираем найденный продукт
    const finalProduct = product || productByVariant;
    
    // Ищем вариант в выбранном продукте
    let variant: ProductVariant | undefined = undefined;
    
    if (finalProduct?.variants && variantIdPart) {
      // Сначала ищем по части ID варианта
      variant = finalProduct.variants.find(v => v.id === variantIdPart);
      
      // Если не нашли, попробуем по полному ID
      if (!variant) {
        variant = finalProduct.variants.find(v => v.id === variantId);
      }
    } else if (finalProduct?.variants) {
      // Если формат без разделения, ищем по полному ID
      variant = finalProduct.variants.find(v => v.id === variantId);
    }
    
    console.log('[CartIcon] Found:', {
      variantId,
      productId,
      variantIdPart,
      productFound: !!finalProduct,
      variantFound: !!variant,
      productName: finalProduct?.name,
      variant: variant ? `ø${variant.diameter}" ET${variant.et}` : 'undefined'
    });
    
    return {
      variantId,
      quantity,
      product: finalProduct,
      variant,
      price: variant?.price || finalProduct?.price || 0
    };
  }).filter(item => item.product !== undefined);

  // Общая сумма
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Закрытие при клике вне корзины
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Блокировка скролла при открытой корзине
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Функция для получения доступного количества товара
  const getAvailableStock = (item: CartItemType): number => {
    const product = item.product;
    const variant = item.variant;
    
    if (!product) return 0;
    
    if (variant) {
      return variant.stock;
    }
    
    // Если вариант не указан, берем общее количество из продукта
    return product.variants?.[0]?.stock || 0;
  };

  // Обработчик изменения количества товара в корзине
  const handleQuantityChange = (item: CartItemType, delta: number) => {
    const newQuantity = item.quantity + delta;
    
    // Проверяем ограничения на количество
    if (newQuantity <= 0) {
      removeFromCart(item.variantId);
      return;
    }
    
    // Проверяем максимально доступное количество
    const availableStock = getAvailableStock(item);
    
    // Если пытаемся добавить больше, чем доступно - ничего не делаем
    if (newQuantity > availableStock) {
      // Не показываем ошибку, так как кнопка визуально неактивна
      return;
    }
    
    // Обновляем количество
    const success = updateQuantity(item.variantId, newQuantity);
    
    if (!success) {
      showNotification({
        title: 'Ошибка обновления корзины',
        message: `Невозможно добавить больше этого товара`,
        type: 'error'
      });
    }
  };

  return (
    <>
      <button 
        className="relative p-2 hover:bg-primary/10 rounded-full transition-all duration-300 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Выдвижная корзина */}
            <motion.div
              ref={drawerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-96 bg-surface border-l border-primary/20 shadow-xl z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-primary/20">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Корзина</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-primary/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-3">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                      <p className="text-text-secondary">Корзина пуста</p>
                      {Object.keys(cart).length > 0 && (
                        <div className="mt-4 text-xs text-text-secondary">
                          <p>Товары в cart: {JSON.stringify(cart)}</p>
                          <p className="mt-2">Но ни один не отображается. Возможно, проблема с ID товаров.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    cartItems.map((item) => {
                      if (!item.product) return null;
                      return (
                        <div
                          key={item.variantId}
                          className="flex items-center justify-between p-3 bg-primary/5 rounded-lg group hover:bg-primary/10 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            {item.product.images && item.product.images[0] && (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            )}
                            <div>
                              <h4 className="text-sm font-medium text-white">{item.product.name}</h4>
                              {item.variant && (
                                <p className="text-sm text-text-secondary">
                                  ø{item.variant.diameter}" ET{item.variant.et}
                                </p>
                              )}
                              <div className="flex items-center space-x-2 mt-1">
                                <button
                                  onClick={() => handleQuantityChange(item, -1)}
                                  className="p-1 bg-primary/10 hover:bg-primary/20 text-white rounded-md transition-colors"
                                  aria-label="Уменьшить количество"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-medium text-white min-w-[1.5rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item, 1)}
                                  className={`p-1 bg-primary/10 hover:bg-primary/20 text-white rounded-md transition-colors ${
                                    item.quantity >= getAvailableStock(item) ? "opacity-40" : ""
                                  }`}
                                  aria-label="Увеличить количество"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-medium text-primary ml-2">
                                  {new Intl.NumberFormat('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                    maximumFractionDigits: 0
                                  }).format(item.price)}
                                </span>
                              </div>
                              <p className="text-xs text-text-secondary mt-1">
                                ID: {item.variantId}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.variantId)}
                            className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all duration-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="p-4 border-t border-primary/20 bg-surface/80 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-white">Итого:</span>
                      <span className="text-lg font-semibold text-primary">
                        {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'RUB',
                          maximumFractionDigits: 0
                        }).format(total)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          // TODO: Добавить переход к оформлению заказа
                        }}
                        className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium"
                      >
                        Оформить заказ
                      </button>
                      <button
                        onClick={() => setIsConfirmOpen(true)}
                        className="w-full px-4 py-2.5 border-2 border-primary/20 text-white rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium flex items-center justify-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Очистить</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsConfirmOpen(false);
        }}
        title="Очистить корзину"
        message="Вы уверены, что хотите очистить корзину? Это действие нельзя отменить."
      />
    </>
  );
};

export default CartIcon;
