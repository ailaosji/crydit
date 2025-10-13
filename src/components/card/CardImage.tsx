import React, { useState } from 'react';

interface CardImageProps {
  name: string;
  cardImage?: string;
}

const CardImage: React.FC<CardImageProps> = ({ name, cardImage }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // If no image is provided, show the default placeholder immediately.
  if (!cardImage) {
    return (
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">{name}</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Skeleton: visible only during the 'loading' state */}
      {status === 'loading' && (
        <div className="card-skeleton absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="h-full w-full flex items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Image: always in the DOM, visibility controlled by opacity and display style */}
      <img
        src={cardImage}
        alt={`${name} Card`}
        className={`card-real-image absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        width="600"
        height="378"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{ display: status === 'error' ? 'none' : 'block' }}
      />

      {/* Fallback: visible only on error */}
      {status === 'error' && (
        <div className="card-fallback flex absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 items-center justify-center">
          <span className="text-white text-2xl font-bold">{name}</span>
        </div>
      )}
    </div>
  );
};

export default CardImage;