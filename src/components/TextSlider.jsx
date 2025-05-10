import React, { useState, useEffect, useCallback, memo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import PropTypes from 'prop-types';

const TextSlider = ({ lines = [], resources = [] }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  // Debug logging
  useEffect(() => {
    console.log('TextSlider lines:', lines);
    console.log('TextSlider resources:', resources);
  }, [lines, resources]);

  // Navigation handlers
  const goToPrev = useCallback(() => {
    setCurrentLine((prev) => (prev - 1 + lines.length) % lines.length);
  }, [lines.length]);

  const goToNext = useCallback(() => {
    setCurrentLine((prev) => (prev + 1) % lines.length);
  }, [lines.length]);

  const goToLine = useCallback((index) => {
    setCurrentLine(index);
  }, []);

  // Get media for current line
  const getMediaForLine = useCallback(
    (line) => {
      if (!resources?.length || !line) return [];
      return line.object_type === 'general'
        ? resources
        : resources.filter((item) => item.object_type === line.object_type);
    },
    [resources]
  );

  if (!lines?.length) {
    return <p className="text-gray-600 text-center">No content available</p>;
  }

  // Determine min-height based on media presence for the current line
  const hasMedia = getMediaForLine(lines[currentLine]).length > 0;
  const minHeightClass = hasMedia ? 'min-h-64' : 'min-h-12';

  return (
    <div className="relative w-full mx-auto">
      {/* Content wrapper with dynamic min-height */}
      <div className={`relative ${minHeightClass}`}>
        {lines.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full top-0 transition-opacity duration-500 ${
              index === currentLine ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } flex flex-col items-center space-y-4`}
            role="tabpanel"
            aria-hidden={index !== currentLine}
          >
            {/* Text content */}
            <p className="text-gray-600 leading-relaxed text-lg text-center">{item.line}</p>

            {/* Media gallery */}
            {getMediaForLine(item).length > 0 && (
              <div className="flex flex-row space-x-2 overflow-x-auto snap-x snap-mandatory py-2 w-full  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {getMediaForLine(item).map((mediaItem, mediaIndex) => (
                  <div key={mediaItem.public_id} className="flex-shrink-0 snap-center">
                    {mediaItem.resource_type === 'video' ? (
                      <AdvancedVideo
                        cldVid={cld.video(mediaItem.public_id).quality('auto').format('mp4')}
                        controls
                        className="h-48 w-auto rounded-lg object-cover"
                        onError={() => console.error('Video load failed:', mediaItem.public_id)}
                      />
                    ) : (
                      <AdvancedImage
                        cldImg={cld.image(mediaItem.public_id).quality('auto').format('auto')}
                        className="h-48 w-auto rounded-lg object-cover"
                        alt={`Interior image ${mediaIndex + 1}`}
                        loading={mediaIndex === 0 ? 'eager' : 'lazy'}
                        onError={() => console.error('Image load failed:', mediaItem.public_id)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center space-x-3 mt-4">
        <button
          onClick={goToPrev}
          className="slider-button text-lg bg-gray-400 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-500 transition-colors disabled:opacity-50"
          aria-label="Previous slide"
          disabled={lines.length <= 1}
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="slider-button text-lg bg-teal-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50"
          aria-label="Next slide"
          disabled={lines.length <= 1}
        >
          →
        </button>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-2 space-x-1.5">
        {lines.map((_, index) => (
          <button
            key={lines[index].id}
            onClick={() => goToLine(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentLine ? 'bg-teal-600' : 'bg-gray-400'
            } hover:bg-teal-500`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentLine}
          />
        ))}
      </div>
    </div>
  );
};

// PropTypes for type checking
TextSlider.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      line: PropTypes.string.isRequired,
      object_type: PropTypes.string,
    })
  ),
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      public_id: PropTypes.string.isRequired,
      resource_type: PropTypes.string.isRequired,
      object_type: PropTypes.string,
    })
  ),
};

// Memoize component to prevent unnecessary re-renders
export default memo(TextSlider);