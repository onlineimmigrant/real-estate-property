import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import propertyData from './property.json';

function Gallery() {
  const [media, setMedia] = useState([]);
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  useEffect(() => {
    // Load media from local property.json
    setMedia(propertyData.resources);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Видео, Фотографии</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.public_id} className="bg-white p-2 rounded shadow">
            {item.resource_type === 'video' ? (
              <AdvancedVideo
                cldVid={cld.video(item.public_id).quality('auto')}
                controls
                className="w-full h-auto rounded"
              />
            ) : (
              <AdvancedImage
                cldImg={cld.image(item.public_id).quality('auto').format('auto')}
                className="w-full h-auto rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;