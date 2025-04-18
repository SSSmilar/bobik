import { createContext, useContext, useState, useEffect, type FC, type ReactNode } from 'react';
import { Product, CartContextType } from '../types/product';
import { products } from '../data/products';

// Функция для получения доступного количества товара по ID варианта
const getAvailableStock = (variantId: string): number => {
  // Находим продукт по ID варианта
  const product = products.find(p => 
    p.id === variantId || p.variants?.some(v => v.id === variantId)
  );
  
  if (!product) return 0;
  
  // Если это ID самого продукта (без варианта)
  if (product.id === variantId) {
    // Возвращаем сумму стоков всех вариантов или 0, если вариантов нет
    return product.variants?.reduce((total, v) => total + (v.stock || 0), 0) || 0;
  }
  
  // Ищем конкретный вариант
  const variant = product.variants?.find(v => v.id === variantId);
  return variant?.stock || 0;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bobik_cart';

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = savedCart ? JSON.parse(savedCart) : {};
      console.log('[CartContext] Loaded cart from localStorage:', parsed);
      return parsed;
    } catch (error) {
      console.error('[CartContext] Failed to load cart from localStorage:', error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      console.log('[CartContext] Saved cart to localStorage:', cart);
    } catch (error) {
      console.error('[CartContext] Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (variantId: string, quantity: number) => {
    console.log('[CartContext] Adding to cart:', { variantId, quantity, existingQuantity: cart[variantId] || 0 });
    
    // Получаем доступное количество товара
    const availableStock = getAvailableStock(variantId);
    // Текущее количество в корзине
    const currentQuantity = cart[variantId] || 0;
    // Проверяем, не превышаем ли лимит
    const newQuantity = currentQuantity + quantity;
    
    if (newQuantity > availableStock) {
      console.warn('[CartContext] Cannot add to cart: requested quantity exceeds available stock', {
        variantId, 
        requestedAdd: quantity,
        currentInCart: currentQuantity,
        wouldBecomeTotal: newQuantity,
        availableStock
      });
      return false;
    }
    
    setCart(prev => {
      const newCart = {
        ...prev,
        [variantId]: (prev[variantId] || 0) + quantity
      };
      console.log('[CartContext] New cart state:', newCart);
      return newCart;
    });
    
    return true;
  };

  const removeFromCart = (variantId: string) => {
    console.log('[CartContext] Removing from cart:', { variantId, existingQuantity: cart[variantId] || 0 });
    setCart(prev => {
      const { [variantId]: _, ...rest } = prev;
      console.log('[CartContext] Cart after removal:', rest);
      return rest;
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    console.log('[CartContext] Updating quantity:', { variantId, newQuantity: quantity, oldQuantity: cart[variantId] || 0 });
    
    // Если новое количество равно 0, просто удаляем товар из корзины
    if (quantity <= 0) {
      removeFromCart(variantId);
      return true;
    }
    
    // Получаем доступное количество товара
    const availableStock = getAvailableStock(variantId);
    
    if (quantity > availableStock) {
      console.warn('[CartContext] Cannot update quantity: requested quantity exceeds available stock', {
        variantId, 
        requestedQuantity: quantity,
        availableStock
      });
      return false;
    }
    
    setCart(prev => {
      const newCart = {
        ...prev,
        [variantId]: quantity
      };
      console.log('[CartContext] Cart after update:', newCart);
      return newCart;
    });
    
    return true;
  };

  const getCartQuantity = (variantId: string) => {
    const quantity = cart[variantId] || 0;
    console.log('[CartContext] Getting cart quantity:', { variantId, quantity });
    return quantity;
  };

  const clearCart = () => {
    console.log('[CartContext] Clearing cart, previous state:', cart);
    setCart({});
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartQuantity,
    clearCart
  };

  console.log('CartContext value:', value); // Debug log

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
