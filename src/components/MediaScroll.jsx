import React, { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import propertyData from './property.json';

function MediaScroll() {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [errorStates, setErrorStates] = useState([]);
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  // Load media from property.json
  useEffect(() => {
    const resources = propertyData.resources;
    setMedia(resources);
    setErrorStates(new Array(resources.length).fill(false));
  }, []);

  // Handle media load errors
  const handleMediaError = (index, type) => {
    console.error(`Failed to load ${type} at index ${index}: ${media[index].public_id}`);
    setErrorStates((prev) =>
      prev.map((state, i) => (i === index ? true : state))
    );
  };

  // Open modal on double-click
  const openModal = (item) => setSelectedMedia(item);

  // Close modal
  const closeModal = () => setSelectedMedia(null);

  // Helper function to check if public_id is a URL
  const isThirdPartyUrl = (publicId) => {
    return publicId.startsWith('http://') || publicId.startsWith('https://');
  };

  return (
    <>
      <div className="my-8 h-48 sm:h-48 overflow-x-auto overflow-y-hidden flex flex-row space-x-4 snap-x snap-mandatory py-2">
        {media.map((item, index) => (
          <div
            key={item.public_id}
            className="flex-shrink-0 snap-center"
            onDoubleClick={() => openModal(item)}
            aria-label={`${
              item.resource_type === 'video' ? 'Видео' : 'Изображение'
            } помещения, двойной клик для увеличения`}
          >
            {errorStates[index] ? (
              <div className="h-48 w-48 bg-gray-200 flex items-center justify-center rounded-lg text-red-600 text-sm">
                Не удалось загрузить {item.resource_type === 'video' ? 'видео' : 'изображение'}
              </div>
            ) : item.resource_type === 'video' ? (
              isThirdPartyUrl(item.public_id) ? (
                <video
                  controls
                  className="h-48 w-auto rounded-lg"
                  onError={() => handleMediaError(index, 'third-party video')}
                >
                  <source src={item.public_id} type="video/mp4" />
                  <p>Ваш браузер не поддерживает видео.</p>
                </video>
              ) : (
                <AdvancedVideo
                  cldVid={cld.video(item.public_id).quality('auto').format('mp4')}
                  controls
                  className="h-48 w-auto rounded-lg"
                  onError={() => handleMediaError(index, 'Cloudinary video')}
                />
              )
            ) : isThirdPartyUrl(item.public_id) ? (
              <img
                src={item.public_id}
                className="h-48 w-auto rounded-lg"
                alt={`Интерьер помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={() => handleMediaError(index, 'third-party image')}
              />
            ) : (
              <AdvancedImage
                cldImg={cld.image(item.public_id).quality('auto').format('auto')}
                className="h-48 w-auto rounded-lg"
                alt={`Интерьер помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={() => handleMediaError(index, 'Cloudinary image')}
              />
            )}
          </div>
        ))}
      </div>

      {/* Full-Screen Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            aria-label="Закрыть полноэкранное изображение или видео"
          >
            ×
          </button>
          {selectedMedia.resource_type === 'video' ? (
            isThirdPartyUrl(selectedMedia.public_id) ? (
              <video
                controls
                className="max-h-[90vh] max-w-[90vw] rounded-lg"
                autoPlay
              >
                <source src={selectedMedia.public_id} type="video/mp4" />
                <p>Ваш браузер не поддерживает видео.</p>
              </video>
            ) : (
              <AdvancedVideo
                cldVid={cld.video(selectedMedia.public_id).quality('auto').format('mp4')}
                controls
                className="max-h-[90vh] max-w-[90vw] rounded-lg"
                autoPlay
              />
            )
          ) : isThirdPartyUrl(selectedMedia.public_id) ? (
            <img
              src={selectedMedia.public_id}
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
              alt={`Интерьер помещения на Петра Мстиславца 1, Минск, полноэкранное изображение`}
            />
          ) : (
            <AdvancedImage
              cldImg={cld.image(selectedMedia.public_id).quality('auto').format('auto')}
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
              alt={`Интерьер помещения на Петра Мстиславца 1, Минск, полноэкранное изображение`}
            />
          )}
        </div>
      )}
    </>
  );
}

export default MediaScroll;