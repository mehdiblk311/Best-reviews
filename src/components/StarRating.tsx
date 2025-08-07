import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  language: 'en' | 'fr' | 'ar';
  animated?: boolean;
}

const tooltips = {
  en: ['Terrible', 'Poor', 'Average', 'Good', 'Amazing!'],
  fr: ['Terrible', 'Mauvais', 'Moyen', 'Bon', 'Incroyable!'],
  ar: ['فظيع', 'سيء', 'متوسط', 'جيد', 'رائع!']
};

const getStarColor = (rating: number) => {
  switch (rating) {
    case 1: return 'text-star-1';
    case 2: return 'text-star-2';
    case 3: return 'text-star-3';
    case 4: return 'text-star-4';
    case 5: return 'text-star-5';
    default: return 'text-muted-foreground';
  }
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  language,
  animated = true
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState(0);

  const displayRating = hoveredRating || rating;

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
    setTooltipIndex(index - 1);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
    setShowTooltip(false);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
    
    // Trigger celebration animation for high ratings
    if (index >= 4 && animated) {
      // Create particle effect
      const starElement = document.getElementById(`star-${index}`);
      if (starElement) {
        starElement.classList.add('animate-bounce-in');
        
        // Create particles
        for (let i = 0; i < 6; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-2 h-2 bg-secondary rounded-full animate-particle-burst pointer-events-none';
          particle.style.left = '50%';
          particle.style.top = '50%';
          particle.style.transform = `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`;
          particle.style.animationDelay = `${i * 0.1}s`;
          
          starElement.appendChild(particle);
          
          setTimeout(() => {
            particle.remove();
          }, 600);
        }
        
        setTimeout(() => {
          starElement.classList.remove('animate-bounce-in');
        }, 600);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      {showTooltip && (
        <div className="absolute -top-12 px-3 py-2 bg-card rounded-lg shadow-lg border animate-fade-in">
          <p className="text-sm font-medium text-foreground">
            {tooltips[language][tooltipIndex]}
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            id={`star-${index}`}
            className={cn(
              "relative p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
              displayRating >= index ? "animate-star-glow" : ""
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                "w-12 h-12 transition-all duration-300",
                displayRating >= index
                  ? `${getStarColor(displayRating)} fill-current`
                  : "text-muted-foreground hover:text-secondary"
              )}
            />
          </button>
        ))}
      </div>
      
      {rating > 0 && (
        <p className={cn(
          "text-lg font-semibold animate-fade-in",
          getStarColor(rating)
        )}>
          {tooltips[language][rating - 1]}
        </p>
      )}
    </div>
  );
};