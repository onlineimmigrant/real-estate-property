import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';

function VideoModal({ isOpen, onClose, videoError, handleVideoError }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-4 w-full sm:w-auto sm:w-3/4 max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full"
          aria-label="Закрыть видео"
        >
          ×
        </button>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Видео тура по помещению</h3>
        {videoError ? (
          <p className="text-red-600 text-center">{videoError}</p>
        ) : (
          <AdvancedVideo
          cldVid={cld.video('bmovy3i3i43kts5wa11u').quality('auto').format('mp4')}
          poster={cld.image('fdnaj1skiohqpipsibbz').quality('auto').toURL()}
            controls
            className="w-full sm:w-auto h-auto sm:h-128 rounded"
            autoPlay
            onError={handleVideoError}
          />
        )}
      </div>
    </div>
  );
}

export default VideoModal;