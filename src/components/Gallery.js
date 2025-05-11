import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import propertyData from './property.json';

function Gallery() {
  const [media, setMedia] = useState([]);
  const [errorStates, setErrorStates] = useState([]); // Track errors for each media item
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  useEffect(() => {
    // Load media from local property.json
    const resources = propertyData.resources;
    setMedia(resources);
    setErrorStates(new Array(resources.length).fill(false)); // Initialize error states
  }, []);

  // Handle media load errors
  const handleMediaError = (index, type) => {
    console.error(`Failed to load ${type} at index ${index}: ${media[index].public_id}`);
    setErrorStates((prev) =>
      prev.map((state, i) => (i === index ? true : state))
    );
  };

  // Helper function to check if public_id is a URL
  const isThirdPartyUrl = (publicId) => {
    return publicId.startsWith('http://') || publicId.startsWith('https://');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Видео, Фотографии</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item, index) => (
          <div
            key={item.public_id}
            className="bg-white p-2 rounded shadow"
            aria-label={`${
              item.resource_type === 'video' ? 'Видео' : 'Изображение'
            } помещения`}
          >
            {errorStates[index] ? (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded text-red-600 text-sm">
                Не удалось загрузить {item.resource_type === 'video' ? 'видео' : 'изображение'}
              </div>
            ) : item.resource_type === 'video' ? (
              isThirdPartyUrl(item.public_id) ? (
                <video
                  controls
                  className="w-full h-auto rounded"
                  onError={() => handleMediaError(index, 'third-party video')}
                >
                  <source src={item.public_id} type="video/mp4" />
                  <p>Ваш браузер не поддерживает видео.</p>
                </video>
              ) : (
                <AdvancedVideo
                  cldVid={cld.video(item.public_id).quality('auto').format('mp4')}
                  controls
                  className="w-full h-auto rounded"
                  onError={() => handleMediaError(index, 'Cloudinary video')}
                />
              )
            ) : isThirdPartyUrl(item.public_id) ? (
              <img
                src={item.public_id}
                className="w-full h-auto rounded"
                alt={`Интерьер помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={() => handleMediaError(index, 'third-party image')}
              />
            ) : (
              <AdvancedImage
                cldImg={cld.image(item.public_id).quality('auto').format('auto')}
                className="w-full h-auto rounded"
                alt={`Интерьер помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={() => handleMediaError(index, 'Cloudinary image')}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;