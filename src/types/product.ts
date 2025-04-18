export interface ProductVariant {
  id: string;
  diameter: string;
  width: string;
  et: string;
  price: number;
  stock: number;
}

export interface ProductSpecs {
  diameter: string | string[];
  width: string | string[];
  pcd: string;
  et: string | string[];
  dia: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
  images?: string[]; 
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  specs: ProductSpecs;
  variants: ProductVariant[];
  reviews: Review[];
  rating?: number; // Средний рейтинг
}

export interface CartContextType {
  cart: Record<string, number>;
  addToCart: (variantId: string, quantity: number) => boolean;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => boolean;
  getCartQuantity: (variantId: string) => number;
  clearCart: () => void;
}

export interface CartItem {
  variantId: string;
  quantity: number;
}