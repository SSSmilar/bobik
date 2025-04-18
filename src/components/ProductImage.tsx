import { cn } from '../lib/utils';
import type { MouseEvent } from 'react';

interface ProductImageProps {
  images: string[];
  currentIndex: number;
  onDotClick: (e: MouseEvent, index: number) => void;
  className?: string;
}

const ProductImage = ({ images, currentIndex, onDotClick, className }: ProductImageProps) => {
  const currentImage = images[currentIndex] || '/placeholder.svg';

  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-lg bg-gray-100", className)}>
      <img
        src={currentImage}
        alt="Product"
        className="h-full w-full object-cover transition-transform duration-300"
      />
      
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => onDotClick(e, index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;