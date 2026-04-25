import { Heart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  title: string;
  image?: string;
  price?: string;
  rating?: number;
  isFavorite?: boolean;
  variant?: 'default' | 'small' | 'horizontal';
  className?: string;
}

export function ProductCard({
  title,
  image,
  price,
  rating = 4.5,
  isFavorite = false,
  variant = 'default',
  className = ''
}: ProductCardProps) {
  if (variant === 'horizontal') {
    return (
      <div className={`bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] ${className}`}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
            {image ? (
              <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400">📦</div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-1">{title}</h4>
            {price && <p className="text-gray-600">{price}</p>}
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-[var(--orange)] text-[var(--orange)]" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>
          <button className="hover:scale-110 transition-transform">
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className={`bg-white/70 backdrop-blur-xl rounded-3xl p-5 border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] ${className}`}>
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center overflow-hidden">
          {image ? (
            <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl">📦</div>
          )}
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium mb-1 text-sm">{title}</h4>
            {price && <p className="text-gray-600 text-sm">{price}</p>}
          </div>
          <button className="hover:scale-110 transition-transform">
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] ${className}`}>
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center overflow-hidden relative">
        {image ? (
          <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl">📦</div>
        )}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-transform">
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div>
        <h3 className="font-medium mb-2">{title}</h3>
        {price && <p className="text-gray-600 mb-3">{price}</p>}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[var(--orange)] text-[var(--orange)]" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
