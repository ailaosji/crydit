import React from 'react';

interface CardImageProps {
  name: string;
  cardImage?: string; // Make cardImage optional
}

const CardImage: React.FC<CardImageProps> = ({ name, cardImage }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget;
    console.warn(`Failed to load card image: ${imgElement.src}`);

    // Hide the broken image
    imgElement.style.display = 'none';

    // Show the fallback
    const container = imgElement.closest('.card-image-container');
    const fallback = container?.querySelector('.card-fallback-placeholder');

    if (fallback) {
      fallback.classList.remove('hidden');
      fallback.classList.add('flex');
    }
  };

  return (
    <div className="relative h-full w-full">
      {cardImage ? (
        <div className="card-image-container relative h-full w-full">
          <img
            src={cardImage}
            alt={`${name} Card`}
            className="card-real-image h-full w-full rounded-2xl object-cover"
            loading="lazy"
            width="600"
            height="378"
            onError={handleImageError}
          />
          <div className="card-fallback-placeholder hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{name}</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">{name}</span>
        </div>
      )}
    </div>
  );
};

export default CardImage;