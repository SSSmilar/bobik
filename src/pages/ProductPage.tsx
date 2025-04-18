import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star, ShoppingCart, Heart, Truck, Package2, Info, MessageSquare, Minus, Plus } from 'lucide-react';

type TabType = 'specs' | 'description' | 'reviews';

const ProductPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const { addToCart, updateQuantity, getCartQuantity } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ diameter: string; pcd: string; width: string; et: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('specs');
  
  const product = products.find(p => p.id === id);
  
  useEffect(() => {
    // Установка активной вкладки из URL
    const tab = searchParams.get('tab') as TabType | null;
    if (tab && ['specs', 'description', 'reviews'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Выбор первого варианта по умолчанию и установка начальных опций
    if (product && product.variants.length > 0 && !selectedVariant) {
      const firstVariant = product.variants[0];
      setSelectedVariant(firstVariant.id);
      setSelectedOptions({
        diameter: firstVariant.diameter,
        pcd: product.specs.pcd, // PCD обычно одинаковый для продукта
        width: firstVariant.width,
        et: firstVariant.et
      });
    }
  }, [product, selectedVariant]);
  
  // Получить уникальные доступные диаметры на основе текущих выбранных опций
  const getAvailableDiameters = (): string[] => {
    if (!product || !selectedOptions) return [];
    
    // Фильтруем по уже выбранным параметрам
    const filtered = product.variants.filter(v => {
      if (selectedOptions.width && v.width !== selectedOptions.width) return false;
      if (selectedOptions.et && v.et !== selectedOptions.et) return false;
      return true;
    });
    
    return ["", ...new Set(filtered.map(v => v.diameter))];
  };
  
  // Получить уникальные доступные значения ширины на основе текущих выбранных опций
  const getAvailableWidths = (): string[] => {
    if (!product || !selectedOptions) return [];
    
    // Фильтруем по уже выбранным параметрам
    const filtered = product.variants.filter(v => {
      if (selectedOptions.diameter && v.diameter !== selectedOptions.diameter) return false;
      if (selectedOptions.et && v.et !== selectedOptions.et) return false;
      return true;
    });
    
    return ["", ...new Set(filtered.map(v => v.width))];
  };
  
  // Получить уникальные доступные значения вылета на основе текущих выбранных опций
  const getAvailableEts = (): string[] => {
    if (!product || !selectedOptions) return [];
    
    // Фильтруем по уже выбранным параметрам
    const filtered = product.variants.filter(v => {
      if (selectedOptions.diameter && v.diameter !== selectedOptions.diameter) return false;
      if (selectedOptions.width && v.width !== selectedOptions.width) return false;
      return true;
    });
    
    return ["", ...new Set(filtered.map(v => v.et))];
  };

  // Обработчик изменения опции
  const handleOptionChange = (key: keyof NonNullable<typeof selectedOptions>, value: string) => {
    if (!selectedOptions || !product) return;
    
    // Создаем новый объект опций с обновленным значением
    const newOptions = { ...selectedOptions, [key]: value };
    
    // Если меняем PCD, просто обновляем опции и выходим (PCD не влияет на выбор варианта)
    if (key === 'pcd') {
      setSelectedOptions(newOptions);
      return;
    }
    
    // Обработка "Любая" (пустого значения)
    if (value === "") {
      setSelectedOptions(newOptions);
      
      // Если все опции сброшены, берем первый вариант
      if (!newOptions.diameter && !newOptions.width && !newOptions.et) {
        const firstVariant = product.variants[0];
        setSelectedVariant(firstVariant.id);
        setQuantity(1);
      } 
      // Иначе находим подходящий вариант на основе оставшихся выбранных параметров
      else {
        const filteredVariants = product.variants.filter(v => {
          if (newOptions.diameter && v.diameter !== newOptions.diameter) return false;
          if (newOptions.width && v.width !== newOptions.width) return false;
          if (newOptions.et && v.et !== newOptions.et) return false;
          return true;
        });
        
        if (filteredVariants.length > 0) {
          setSelectedVariant(filteredVariants[0].id);
          setQuantity(1);
        }
      }
      return;
    }
    
    // Проверяем, существует ли вариант с новыми опциями (только если не выбрано "Любая")
    const matchingVariant = product.variants.find(v => 
      (!newOptions.diameter || v.diameter === newOptions.diameter) && 
      (!newOptions.width || v.width === newOptions.width) && 
      (!newOptions.et || v.et === newOptions.et)
    );
    
    // Если такого варианта нет, нужно скорректировать другие параметры
    if (!matchingVariant) {
      // Находим первый вариант, соответствующий измененному параметру
      const compatibleVariants = key === 'diameter' 
        ? product.variants.filter(v => v.diameter === value)
        : key === 'width' 
          ? product.variants.filter(v => v.width === value)
          : product.variants.filter(v => v.et === value);
      
      if (compatibleVariants.length > 0) {
        // Берем первый совместимый вариант
        const compatibleVariant = compatibleVariants[0];
        // Обновляем все опции в соответствии с совместимым вариантом
        newOptions.diameter = compatibleVariant.diameter;
        newOptions.width = compatibleVariant.width;
        newOptions.et = compatibleVariant.et;
      }
    }
    
    // Обновляем состояние выбранных опций
    setSelectedOptions(newOptions);
    
    // Находим подходящий вариант для обновленных опций
    const variants = product.variants.filter(v => 
      (!newOptions.diameter || v.diameter === newOptions.diameter) && 
      (!newOptions.width || v.width === newOptions.width) && 
      (!newOptions.et || v.et === newOptions.et)
    );
    
    if (variants.length > 0) {
      setSelectedVariant(variants[0].id);
      setQuantity(1); // Сбрасываем количество при смене варианта
    }
  };
  
  const selectedVariantObj = product?.variants.find(v => v.id === selectedVariant);
  const cartQuantity = selectedVariant ? getCartQuantity(selectedVariant) : 0;
  const stockCount = selectedVariantObj?.stock || 0;
  const remainingStock = stockCount - cartQuantity;
  
  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    
    if (cartQuantity > 0) {
      updateQuantity(selectedVariant, cartQuantity + quantity);
    } else {
      addToCart(selectedVariant, quantity);
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    // Редирект на страницу оформления заказа
    window.location.href = '/checkout';
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="bg-surface p-8 rounded-lg shadow-xl text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {language === 'ru' ? 'Товар не найден' : 'Product not found'}
            </h1>
            <p className="text-text-secondary mb-6">
              {language === 'ru' 
                ? 'Запрашиваемый товар не найден в нашем каталоге.' 
                : 'The requested product was not found in our catalog.'}
            </p>
            <a 
              href="/catalog" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
            >
              {language === 'ru' ? 'Вернуться в каталог' : 'Back to catalog'}
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Вычисляем цену выбранного варианта
  const price = selectedVariantObj?.price || product.price;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-surface border border-primary/30">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg bg-surface border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer">
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 bg-surface p-6 rounded-lg border border-primary/20">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-white">{product.name}</h1>
              <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent font-bold text-lg">Japan is nearby</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= (product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <span className="text-text-secondary text-sm">
                {product.rating} ({product.reviews.length} {language === 'ru' ? 'отзывов' : 'reviews'})
              </span>
            </div>
            
            {/* Variants Selection Dropdowns */}
            {product && product.variants.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="diameter" className="block text-sm font-medium text-text-secondary mb-1">Диаметр (ø)</label>
                  <select 
                    id="diameter"
                    value={selectedOptions?.diameter || ''}
                    onChange={(e) => handleOptionChange('diameter', e.target.value)}
                    className="w-full bg-black border border-primary/30 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none custom-select"
                  >
                    {getAvailableDiameters().map(d => (
                      <option key={d} value={d}>{d ? d + '"' : 'Любой'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="pcd" className="block text-sm font-medium text-text-secondary mb-1">Сверловка (PCD)</label>
                  <select 
                    id="pcd"
                    value={selectedOptions?.pcd || ''}
                    onChange={(e) => handleOptionChange('pcd', e.target.value)}
                    className="w-full bg-black border border-primary/30 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none custom-select"
                  >
                    {/* PCD берем из specs продукта, т.к. он обычно один */}
                    <option value={product.specs.pcd}>{product.specs.pcd}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-text-secondary mb-1">Ширина (J)</label>
                  <select 
                    id="width"
                    value={selectedOptions?.width || ''}
                    onChange={(e) => handleOptionChange('width', e.target.value)}
                    className="w-full bg-black border border-primary/30 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none custom-select"
                  >
                    {getAvailableWidths().map(w => (
                      <option key={w} value={w}>{w || 'Любая'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="et" className="block text-sm font-medium text-text-secondary mb-1">Вылет (ET)</label>
                  <select 
                    id="et"
                    value={selectedOptions?.et || ''}
                    onChange={(e) => handleOptionChange('et', e.target.value)}
                    className="w-full bg-black border border-primary/30 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none custom-select"
                  >
                    {getAvailableEts().map(et => (
                      <option key={et} value={et}>{et || 'Любой'}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="space-y-2">
              <h3 className="text-white font-medium">
                {language === 'ru' ? 'Количество' : 'Quantity'}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-primary/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                    className={`p-2 focus:outline-none ${
                      quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-text-secondary hover:bg-surface-light'
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => quantity < remainingStock && setQuantity(q => q + 1)}
                    className={`p-2 focus:outline-none ${
                      quantity >= remainingStock ? 'text-gray-400 cursor-not-allowed' : 'text-text-secondary hover:bg-surface-light'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-text-secondary text-sm">
                  {stockCount > 0 
                    ? `${language === 'ru' ? 'В наличии' : 'In stock'}: ${stockCount} ${language === 'ru' ? 'шт.' : 'pcs'}`
                    : language === 'ru' ? 'Нет в наличии' : 'Out of stock'
                  }
                </span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || stockCount === 0}
                className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{language === 'ru' ? 'В корзину' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedVariant || stockCount === 0}
                className="bg-surface-light text-primary border border-primary py-3 px-6 rounded-lg hover:bg-primary hover:text-white disabled:bg-gray-800 disabled:border-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300"
              >
                {language === 'ru' ? 'Купить сейчас' : 'Buy Now'}
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="space-y-2 pt-2 border-t border-primary/20">
              <div className="flex items-center gap-2 text-text-secondary">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-sm">{language === 'ru' ? 'Бесплатная доставка по России' : 'Free shipping across Russia'}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Package2 className="w-4 h-4 text-primary" />
                <span className="text-sm">{language === 'ru' ? 'Гарантия качества' : 'Quality guarantee'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-primary/20">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-3 font-medium text-sm transition-all duration-300 border-b-2 ${
                activeTab === 'specs' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-text-secondary hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1">
                <Info className="w-4 h-4" />
                {language === 'ru' ? 'Характеристики' : 'Specifications'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-medium text-sm transition-all duration-300 border-b-2 ${
                activeTab === 'description' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-text-secondary hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1">
                <Package2 className="w-4 h-4" />
                {language === 'ru' ? 'Описание' : 'Description'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium text-sm transition-all duration-300 border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-text-secondary hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {language === 'ru' ? `Отзывы (${product.reviews.length})` : `Reviews (${product.reviews.length})`}
              </span>
            </button>
          </div>
          
          <div className="py-6 bg-surface rounded-lg mt-4 p-6 border border-primary/20">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">
                  {language === 'ru' ? 'Технические характеристики' : 'Technical Specifications'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-text-secondary">{language === 'ru' ? 'Диаметр' : 'Diameter'}</span>
                      <span className="text-white font-medium">
                        {Array.isArray(product.specs.diameter) 
                          ? product.specs.diameter.join(', ') 
                          : product.specs.diameter}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-text-secondary">{language === 'ru' ? 'Ширина' : 'Width'}</span>
                      <span className="text-white font-medium">{product.specs.width}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-text-secondary">PCD</span>
                      <span className="text-white font-medium">{product.specs.pcd}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-text-secondary">ET</span>
                      <span className="text-white font-medium">
                        {Array.isArray(product.specs.et) 
                          ? product.specs.et.join(', ') 
                          : product.specs.et}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-text-secondary">DIA</span>
                      <span className="text-white font-medium">{product.specs.dia}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">
                  {language === 'ru' ? 'Описание товара' : 'Product Description'}
                </h2>
                <div className="text-text-secondary">
                  <p>{product.description}</p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    {language === 'ru' ? 'Отзывы покупателей' : 'Customer Reviews'}
                  </h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    {language === 'ru' ? 'Написать отзыв' : 'Write a Review'}
                  </button>
                </div>
                
                {product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-primary/10 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            {review.avatar && (
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-white">{review.author}</h4>
                              <div className="text-text-secondary text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white">{review.text}</p>
                        
                        {review.images && review.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {review.images.map((image, index) => (
                              <div key={index} className="w-16 h-16 rounded overflow-hidden">
                                <img src={image} alt={`Review image ${index}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-secondary">
                      {language === 'ru' ? 'Отзывов пока нет. Будьте первым!' : 'No reviews yet. Be the first!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage; 