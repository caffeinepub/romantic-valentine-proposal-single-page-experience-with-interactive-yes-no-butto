import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function FloatingThoughts() {
  const [isHovered, setIsHovered] = useState(false);
  const words = ['You', 'are', 'in', 'my', 'thoughts'];

  return (
    <div className="relative w-full flex items-center justify-center py-12 pointer-events-none">
      <div
        className="relative pointer-events-auto cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >
        {/* Floating words */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {words.map((word, index) => (
            <span
              key={index}
              className={`
                text-2xl md:text-4xl font-bold text-primary/70
                animate-floating-word
                transition-all duration-500
                ${isHovered ? 'scale-110 text-primary' : ''}
              `}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: `${3 + index * 0.3}s`
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Floating hearts around the text */}
        <Heart
          className={`
            absolute -top-4 -right-4 w-6 h-6 text-primary/50 fill-primary/30
            animate-floating-heart-1
            transition-all duration-500
            ${isHovered ? 'fill-primary text-primary scale-125' : ''}
          `}
        />
        <Heart
          className={`
            absolute -bottom-4 -left-4 w-5 h-5 text-primary/40 fill-primary/20
            animate-floating-heart-2
            transition-all duration-500
            ${isHovered ? 'fill-primary text-primary scale-125' : ''}
          `}
        />
        <Heart
          className={`
            absolute top-1/2 -left-8 w-4 h-4 text-primary/30 fill-primary/10
            animate-floating-heart-3
            transition-all duration-500
            ${isHovered ? 'fill-primary text-primary scale-125' : ''}
          `}
        />
        <Heart
          className={`
            absolute top-1/2 -right-8 w-4 h-4 text-primary/30 fill-primary/10
            animate-floating-heart-4
            transition-all duration-500
            ${isHovered ? 'fill-primary text-primary scale-125' : ''}
          `}
        />
      </div>
    </div>
  );
}
