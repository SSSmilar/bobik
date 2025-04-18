import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, ThumbsUp, ThumbsDown, Plus, Calendar, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import AddReviewModal from '../components/AddReviewModal';
import { products } from '../data/products';
import { Review as ReviewType } from '../types/product';
import Footer from '../components/Footer';

interface ReviewWithProductInfo extends ReviewType {
  productName: string;
  productModel: string;
  likes?: number;
  dislikes?: number;
}

// Получаем все уникальные бренды из продуктов
const AVAILABLE_BRANDS = Array.from(
  new Set(products.map(product => product.name.split(' ')[0]))
);

const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<'newest' | 'positive' | 'negative'>('newest');
  const [filteredReviews, setFilteredReviews] = useState<ReviewWithProductInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const brandFilter = searchParams.get('brand');

  // Извлекаем отзывы из всех продуктов и добавляем информацию о продукте
  useEffect(() => {
    const allReviews: ReviewWithProductInfo[] = [];
    
    products.forEach(product => {
      const productBrand = product.name.split(' ')[0];
      const productReviews = product.reviews.map(review => ({
        ...review,
        productName: product.name,
        productModel: productBrand,
        likes: Math.floor(Math.random() * 20), // Для демо
        dislikes: Math.floor(Math.random() * 5) // Для демо
      }));
      
      allReviews.push(...productReviews);
    });
    
    setFilteredReviews(allReviews);
  }, []);

  const handleBrandChange = (brand: string | null) => {
    if (brand) {
      setSearchParams({ brand });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    let reviews: ReviewWithProductInfo[] = [];
    
    products.forEach(product => {
      const productBrand = product.name.split(' ')[0];
      
      if (!brandFilter || productBrand === brandFilter) {
        const productReviews = product.reviews.map(review => ({
          ...review,
          productName: product.name,
          productModel: productBrand,
          likes: Math.floor(Math.random() * 20), // Для демо
          dislikes: Math.floor(Math.random() * 5) // Для демо
        }));
        
        reviews.push(...productReviews);
      }
    });

    switch (sortBy) {
      case 'positive':
        reviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'negative':
        reviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'newest':
        reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setFilteredReviews(reviews);
  }, [brandFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Отзывы покупателей</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить отзыв</span>
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-4 min-w-[200px]">
            <select
              value={brandFilter || ''}
              onChange={(e) => handleBrandChange(e.target.value || null)}
              className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-surface text-white hover:border-primary/40 focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Все бренды</option>
              {AVAILABLE_BRANDS.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'positive' | 'negative')}
              className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-surface text-white hover:border-primary/40 focus:border-primary focus:outline-none transition-colors cursor-pointer"
            >
              <option value="newest">Сначала новые</option>
              <option value="positive">Сначала положительные</option>
              <option value="negative">Сначала отрицательные</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-surface p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    {review.avatar && (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-lg text-white">{review.author}</h3>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <Package className="w-4 h-4" />
                        <span>{review.productModel}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-white mb-4">{review.text}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.images.map((image, index) => (
                      <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
                        <img src={image} alt={`Изображение ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-text-secondary hover:text-primary">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-text-secondary hover:text-red-500">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{review.dislikes}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-surface p-6 rounded-lg border border-primary/20 text-center">
              <p className="text-white mb-4">Отзывы не найдены.</p>
              <p className="text-text-secondary">Будьте первым, кто оставит отзыв о данном товаре.</p>
            </div>
          )}
        </div>
      </div>
      
      <AddReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          // Здесь должен быть код для добавления отзыва
          setIsModalOpen(false);
        }}
      />
      
      <Footer />
    </div>
  );
};

export default Reviews; 