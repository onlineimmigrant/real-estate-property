import React, { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import propertyData from './property.json';

function MediaScroll() {
  const [media, setMedia] = useState([]);
  const [resizedStates, setResizedStates] = useState([]);
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  // Load media from property.json
  useEffect(() => {
    const resources = propertyData.resources;
    setMedia(resources);
    setResizedStates(new Array(resources.length).fill(false)); // Initialize resized states
  }, []);

  // Toggle resize state on double-click
  const toggleResize = (index) => {
    setResizedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="my-16 h-48 sm:h-48 overflow-x-auto overflow-y-hidden flex flex-row space-x-4 snap-x snap-mandatory  py-2">
      {media.map((item, index) => (
        <div
          key={item.public_id}
          className="flex-shrink-0 snap-center"
          onDoubleClick={() => toggleResize(index)}
        >
          {item.resource_type === 'video' ? (
            <AdvancedVideo
              cldVid={cld.video(item.public_id).quality('auto').format('mp4')}
              controls
              className={`${
                resizedStates[index] ? 'h-96' : 'h-48'
              } w-auto rounded-lg transition-all duration-300`}
            />
          ) : (
            <AdvancedImage
              cldImg={cld.image(item.public_id).quality('auto').format('auto')}
              className={`${
                resizedStates[index] ? 'h-96' : 'h-48'
              } w-auto rounded-lg transition-all duration-300`}
              alt={`Интерьер помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MediaScroll;