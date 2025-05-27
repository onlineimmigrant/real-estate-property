import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';

function VideoModal({ isOpen, onClose, videoError, handleVideoError, videoPublicId, posterPublicId }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  // Helper function to check if a public_id is a URL
  const isThirdPartyUrl = (publicId) => {
    return publicId.startsWith('http://') || publicId.startsWith('https://');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="m-2 bg-white rounded-lg p-4 w-7/8 sm:w-auto sm:w-3/4 max-w-4xl relative">
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
        ) : isThirdPartyUrl(videoPublicId) ? (
          <video
            controls
            className="w-full sm:w-auto h-auto sm:h-[640px] rounded"
            autoPlay
            poster={isThirdPartyUrl(posterPublicId) ? posterPublicId : cld.image(posterPublicId).quality('auto').toURL()}
            onError={handleVideoError}
          >
            <source src={videoPublicId} type="video/mp4" />
            <p>Ваш браузер не поддерживает видео.</p>
          </video>
        ) : (
          <AdvancedVideo
            cldVid={cld.video(videoPublicId).quality('auto').format('mp4')}
            poster={isThirdPartyUrl(posterPublicId) ? posterPublicId : cld.image(posterPublicId).quality('auto').toURL()}
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